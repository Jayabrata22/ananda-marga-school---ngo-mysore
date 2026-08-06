import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

// Security Middleware: Set security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Restrict payload sizes to prevent Denial of Service / payload flooding
app.use(express.json({ limit: '50kb' }));

// Helper function to sanitize server-side inputs
function sanitizeString(str: any, maxLen: number = 300): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .substring(0, maxLen);
}

// Initialize GoogleGenAI lazily / safely
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Ananda Marga Welfare Society Mysore API' });
});

// AI Assistant & Custom Impact Generator
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const rawMessage = req.body?.message;
    const rawContext = req.body?.context;

    const message = sanitizeString(rawMessage, 300);
    const context = sanitizeString(rawContext, 100);

    if (!message) {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    const ai = getGenAI();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not set
      return res.json({
        reply: `Namaskar! Thank you for reaching out to Ananda Marga Welfare Society, Mysore. We provide free Neohumanist primary education, midday meals, elderly healthcare, and tree plantation. How can we assist you today?`,
        fallback: true
      });
    }

    const systemPrompt = `You are the Virtual Assistant for "Ananda Marga Welfare Society" (Mysore, Karnataka).
Your goal is to answer questions about the trust's mission, causes (Neohumanist Education, Support for Old Age Parents, Tree Plantation & Environment, Animal Welfare), volunteer roles, donation impact, SBI bank transfer details (A/C: 44052849230, IFSC: SBIN0016499), and 80G tax deductible receipts.
Keep responses concise, warm, polite, and helpful.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}\nContext: ${context || 'General query'}` }] }
      ]
    });

    const reply = response.text || "Namaskar! Thank you for supporting Ananda Marga Welfare Society.";
    res.json({ reply, fallback: false });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    res.json({
      reply: `Ananda Marga Welfare Society is a registered non-profit trust dedicated to universal service in Mysore. Every contribution supports our primary school, old age welfare, or tree plantation drives.`,
      fallback: true,
      error: err.message
    });
  }
});

async function startServer() {
  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NGO Application Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawMessage = req.body?.message;
    const rawContext = req.body?.context;

    const message = typeof rawMessage === 'string'
      ? rawMessage.replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '').replace(/javascript:/gi, '').trim().substring(0, 300)
      : '';
    const context = typeof rawContext === 'string'
      ? rawContext.replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '').replace(/javascript:/gi, '').trim().substring(0, 100)
      : '';

    if (!message) {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(200).json({
        reply: `Namaskar! Thank you for reaching out to Ananda Marga Welfare Society, Mysore. We provide free Neohumanist education, midday meals, elderly care, and tree plantation. How can we assist you today?`,
        fallback: true
      });
    }

    const systemPrompt = `You are the Virtual Assistant for "Ananda Marga Welfare Society" (Mysore, Karnataka).
Your goal is to answer questions about the trust's mission, causes (Neohumanist Education, Support for Old Age Parents, Tree Plantation & Environment, Animal Welfare), volunteer opportunities, SBI bank transfer details (A/C: 44052849230, IFSC: SBIN0016499), and 80G tax deductible receipts.
Keep responses concise, warm, polite, and helpful.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}\nContext: ${context || 'General query'}` }] }
      ]
    });

    const reply = response.text || "Namaskar! Thank you for supporting Ananda Marga Welfare Society.";
    return res.status(200).json({ reply, fallback: false });
  } catch (err: any) {
    return res.status(200).json({
      reply: `Namaskar! Ananda Marga Welfare Society is a registered trust dedicated to universal service in Mysore. You can support our primary school, old age welfare, or tree plantation drives.`,
      fallback: true,
      error: err.message
    });
  }
}

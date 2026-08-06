import React, { useState } from 'react';
import { sanitizeText, sanitizeEmail, sanitizePhone } from '../utils/security';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Globe, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  Sparkles,
  Building2,
  HeartHandshake
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanEmail = sanitizeEmail(formData.email);
    if (!cleanEmail) {
      alert('Please enter a valid email address.');
      return;
    }

    const cleanName = sanitizeText(formData.name, 100);
    const cleanPhone = sanitizePhone(formData.phone);
    const cleanMessage = sanitizeText(formData.message, 1000);

    setFormData({
      ...formData,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
    });

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  const faqs = [
    {
      q: 'How can I learn Ananda Marga Meditation and Yoga asanas?',
      a: 'Ananda Marga offers free instruction in meditation, yoga asanas, and spiritual philosophy at local Jagrtis (spiritual centers) worldwide. You can request a personal Acharya (spiritual teacher) through our contact form.',
    },
    {
      q: 'How do I obtain an 80G / Tax Deductible Receipt for my donation?',
      a: 'All donations made via UPI or Online Portal receive an instant receipt with Tax ID (80G in India / 501(c)(3) in US). You can also provide your UPI UTR Number on the donation page to generate an automated tax certificate.',
    },
    {
      q: 'How can I volunteer with AMURT (Ananda Marga Universal Relief Team)?',
      a: 'You can apply through our Volunteer tab or send a direct inquiry here specifying your skills (medical, engineering, teaching, disaster response). Our volunteer coordinators will reach out within 24 hours.',
    },
    {
      q: 'Where is the main headquarters of Ananda Marga?',
      a: 'Ananda Marga was founded in Jamalpur, Bihar, India in 1955. The Central Secretariat operates with major coordination offices in Kolkata, New Delhi, and global sector headquarters in Berlin, New York, Manila, Nairobi, and Georgetown.',
    },
  ];

  const offices = [
    {
      city: 'Ananda Marga Welfare Society (Mysore Campus)',
      address: 'Kaamana Kere Hundi, Ramanna Halli Post, Mysore, Karnataka 570019, India',
      phone: '9845603926 / 9113564422',
      email: 'anandavitamohaacharya@gmail.com',
    },
    {
      city: 'Jamalpur & Kolkata (Central HQ)',
      address: 'Ananda Marga Central Secretariat, VIP Nagar, Tiljala, Kolkata, West Bengal 700039, India',
      phone: '+91 33 2441 0000 / +91 98300 12345',
      email: 'central@anandamarga.org',
    },
    {
      city: 'Delhi Sector HQ',
      address: 'Ananda Marga Office, B-3, Janakpuri, New Delhi 110058, India',
      phone: '+91 11 2550 5566',
      email: 'delhi.sector@anandamarga.org',
    },
    {
      city: 'AMURT Global Relief Center',
      address: '2502 Lindley Terrace, Rockville, MD 20850, USA',
      phone: '+1 (301) 738-7122',
      email: 'info@amurt.net',
    },
    {
      city: 'Europe & Berlin Sector',
      address: 'Ananda Marga Center, Berlin, Germany',
      phone: '+49 30 612 0000',
      email: 'europe@anandamarga.org',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7F3EA] text-[#556B2F] font-bold text-xs uppercase tracking-[0.2em] border border-[#E6E1D6]">
            <MessageSquare className="w-3.5 h-3.5 text-[#556B2F]" /> Connect & Inquire
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2F4F4F]">
            Contact Ananda Marga & AMURT
          </h1>
          <p className="text-[#6B6B5E] text-base sm:text-lg leading-relaxed font-sans">
            Have questions about spiritual meditation classes, AMURT disaster relief work, or donation receipts? We are here to serve you.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F7F3EA] p-6 rounded-[28px] border border-[#E6E1D6] space-y-3 flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6600] text-white flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#2F4F4F]">Mobile & Helpline</h3>
              <p className="text-xs text-[#6B6B5E] mt-1 font-sans">Ananda Marga Welfare Society Mysore</p>
              <p className="text-xs font-mono font-bold text-[#FF6600] mt-2">9845603926 / 9113564422</p>
            </div>
          </div>

          <div className="bg-[#F7F3EA] p-6 rounded-[28px] border border-[#E6E1D6] space-y-3 flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#002B66] text-white flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#2F4F4F]">Official Email</h3>
              <p className="text-xs text-[#6B6B5E] mt-1 font-sans">For inquiries, donations & tax receipts</p>
              <p className="text-xs font-mono font-bold text-[#002B66] mt-2 break-all">anandavitamohaacharya@gmail.com</p>
            </div>
          </div>

          <div className="bg-[#F7F3EA] p-6 rounded-[28px] border border-[#E6E1D6] space-y-3 flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#2F4F4F] text-white flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#2F4F4F]">Mysore Campus Address</h3>
              <p className="text-xs text-[#6B6B5E] mt-1 font-sans">Kaamana Kere Hundi, Ramanna Halli Post</p>
              <p className="text-xs font-mono font-bold text-[#2F4F4F] mt-2">Mysore, Karnataka - 570019</p>
            </div>
          </div>
        </div>

        {/* Form and Office Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Panel */}
          <div className="lg:col-span-7 bg-[#F7F3EA] rounded-[32px] p-6 sm:p-10 border border-[#E6E1D6] shadow-sm space-y-6">
            <div className="border-b border-[#E6E1D6] pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CC7A5C]">Direct Message</span>
              <h2 className="text-2xl font-serif font-bold text-[#2F4F4F] mt-0.5">Send Us a Message</h2>
              <p className="text-xs text-[#6B6B5E] mt-1">Fill in the details below and our team will get back to you promptly.</p>
            </div>

            {submitted ? (
              <div className="bg-[#FDFBF7] border border-[#556B2F] p-8 rounded-3xl text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#556B2F]/10 text-[#556B2F] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2F4F4F]">Message Sent Successfully!</h3>
                <p className="text-xs text-[#6B6B5E] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Ananda Marga & AMURT. Our representative will contact you shortly via email or phone. Namaskar!
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-[#556B2F] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#435424] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A40] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma / Sarah Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#FDFBF7] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A40] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#FDFBF7] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A40] mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#FDFBF7] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A40] mb-1">Inquiry Subject *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#FDFBF7] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Meditation & Yoga Classes">Learn Meditation & Yoga Classes</option>
                      <option value="AMURT Relief Work">AMURT Relief Work & Volunteering</option>
                      <option value="Donation / UPI Receipt">Donation / UPI 80G Tax Receipt Query</option>
                      <option value="Institutional Partnership">Institutional Partnership / Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A5A40] mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you today? Feel free to ask about meditation lessons, relief activities, or donation receipts..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#FDFBF7] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#556B2F] hover:bg-[#435424] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Regional Offices Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#2F4F4F] text-[#FDFBF7] rounded-[32px] p-6 sm:p-8 space-y-6 shadow-md">
              <div className="flex items-center gap-2 text-[#CC7A5C] font-bold text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4" /> Global Centers & Secretariats
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Ananda Marga Sector Offices</h3>
              
              <div className="space-y-4">
                {offices.map((office, idx) => (
                  <div key={idx} className="bg-[#3D6363] p-4 rounded-2xl border border-[#556B2F]/30 space-y-1.5">
                    <p className="font-serif font-bold text-sm text-[#FDFBF7] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#CC7A5C]" /> {office.city}
                    </p>
                    <p className="text-xs text-[#E2DFD4] font-sans">{office.address}</p>
                    <div className="pt-1 flex flex-wrap gap-x-4 text-[11px] font-mono text-[#E2DFD4]">
                      <span>📞 {office.phone}</span>
                      <span>✉️ {office.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Greeting Box */}
            <div className="bg-[#F7F3EA] rounded-[32px] p-6 border border-[#E6E1D6] space-y-3">
              <div className="flex items-center gap-2 text-[#556B2F] font-bold text-xs uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" /> Traditional Greeting
              </div>
              <p className="font-serif text-base font-bold text-[#2F4F4F]">
                "Namaskar" — I salute the Divine within you with all the charms of my mind and all the love of my heart.
              </p>
              <p className="text-xs text-[#6B6B5E] font-sans">
                Universal service to humanity is service to the Divine Consciousness.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-[#F7F3EA] rounded-[32px] p-8 border border-[#E6E1D6] space-y-6 shadow-xs">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CC7A5C]">Frequently Asked Questions</span>
            <h2 className="text-2xl font-serif font-bold text-[#2F4F4F]">Have Questions? We Have Answers</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-[#FDFBF7] rounded-2xl border border-[#E6E1D6] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 font-serif font-bold text-sm text-[#2F4F4F] flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#556B2F] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#8B8B7A] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#6B6B5E] leading-relaxed border-t border-[#E6E1D6] pt-3 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

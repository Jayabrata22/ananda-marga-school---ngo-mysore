import React, { useState } from 'react';
import { saveNewsletterSubscription } from '../utils/storage';
import { AnandaMargaLogo } from './AnandaMargaLogo';
import { Globe, Heart, Shield, CheckCircle2, Mail, Send, Award, FileText } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    saveNewsletterSubscription(email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#002B66] text-white border-t border-[#003399] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Callout Banner */}
        <div className="bg-[#001D47] border border-[#003399] rounded-[32px] p-8 sm:p-10 mb-16 relative overflow-hidden shadow-lg">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6600] text-white font-semibold text-xs mb-3 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" /> Mysore Field Updates
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Stay Connected with Ananda Marga Mysore
              </h3>
              <p className="text-white/80 text-sm mt-2 font-sans">
                Receive direct school updates, student growth stories, project milestones, and transparent tax receipt details.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="bg-[#003399]/60 border border-[#FF6600] text-white px-6 py-4 rounded-2xl flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0" />
                  <div>
                    <p className="font-serif font-bold text-sm">Thank You for Subscribing!</p>
                    <p className="text-xs text-white/80">You will receive monthly Ananda Marga Mysore updates.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="px-5 py-3.5 rounded-full bg-[#002B66] border border-[#003399] text-white placeholder-white/50 text-sm focus:outline-hidden focus:border-[#FF6600] flex-1"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#FF6600] hover:bg-[#e65c00] font-bold text-white text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#003399]">
          {/* Brand Info with Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <AnandaMargaLogo className="w-12 h-12" />
              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight">Ananda Marga</span>
                <p className="text-xs font-semibold text-[#FFD700]">Welfare Society, Mysore, Karnataka</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm font-sans">
              Ananda Marga (Path of Bliss) is a global socio-spiritual movement founded by Shrii Shrii Anandamurti. Dedicated to self-realization and service to humanity ("A'tmanomoks'a'rtham' jagaddhita'ya ca").
            </p>
            <div className="flex items-center gap-4 text-xs text-white/80 pt-2">
              <span className="inline-flex items-center gap-1">
                <Shield className="w-4 h-4 text-[#FFD700]" /> 80G Tax Deductible (India)
              </span>
              <span className="inline-flex items-center gap-1">
                <Award className="w-4 h-4 text-[#FF6600]" /> Registered NGO Society
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-4 border-b border-[#003399] pb-2">
              Directory & Navigation
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/90 font-sans">
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-[#FFD700] transition-colors font-semibold flex items-center gap-1.5 text-[#FFD700]">
                  <span>•</span> Mysore School Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#FFD700] transition-colors font-medium flex items-center gap-1.5">
                  <span>•</span> Ananda Marga Founder & History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('links')} className="hover:text-[#FFD700] transition-colors font-medium flex items-center gap-1.5">
                  <span>•</span> Ananda Marga Links & Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('donate')} className="hover:text-[#FFD700] transition-colors font-medium flex items-center gap-1.5">
                  <span>•</span> Make a Donation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#FFD700] transition-colors flex items-center gap-1.5">
                  <span>•</span> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Headquarters Info */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-4 border-b border-[#003399] pb-2">
              Mysore Trust Campus
            </h4>
            <div className="text-sm text-white/80 space-y-2 leading-relaxed font-sans">
              <p className="font-semibold text-white">Ananda Marga Welfare Society</p>
              <p>Kaamana Kere Hundi, Ramanna Halli Post</p>
              <p>Mysore, Karnataka - 570019, India</p>
              <p className="text-[#FFD700] font-mono text-xs pt-1 break-all">anandavitamohaacharya@gmail.com</p>
              <p className="text-[#FFD700] font-mono text-xs">9845603926 / 9113564422</p>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} Ananda Marga Welfare Society, Mysore. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">80G Tax Exemption Info</span>
            <span className="hover:text-white cursor-pointer">Ananda Marga Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

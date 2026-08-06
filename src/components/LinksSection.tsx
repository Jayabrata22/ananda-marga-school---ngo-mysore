import React, { useState } from 'react';
import { AnandaMargaLink } from '../types';
import { MOCK_ANANDA_MARGA_LINKS } from '../data/mockData';
import { AnandaMargaLogo } from './AnandaMargaLogo';
import { 
  Globe, 
  ExternalLink, 
  Search, 
  Copy, 
  Check, 
  Bookmark, 
  BookOpen, 
  Heart, 
  Sparkles, 
  GraduationCap, 
  Music, 
  Building2, 
  Flame, 
  ShieldCheck
} from 'lucide-react';

export const LinksSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Secretariat & HQ',
    'Neohumanist Education',
    'Philosophy & Literature',
    'Relief & AMURT',
    'Yoga & Spiritual Practices',
  ];

  const filteredLinks = MOCK_ANANDA_MARGA_LINKS.filter((link) => {
    const matchesCategory = selectedCategory === 'All' || link.category === selectedCategory;
    const matchesSearch =
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Secretariat & HQ':
        return <Building2 className="w-4 h-4 text-[#002B66]" />;
      case 'Neohumanist Education':
        return <GraduationCap className="w-4 h-4 text-[#FF6600]" />;
      case 'Philosophy & Literature':
        return <BookOpen className="w-4 h-4 text-[#003399]" />;
      case 'Relief & AMURT':
        return <Heart className="w-4 h-4 text-[#FF6600]" />;
      case 'Yoga & Spiritual Practices':
        return <Flame className="w-4 h-4 text-[#002B66]" />;
      default:
        return <Globe className="w-4 h-4 text-[#002B66]" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F8F9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title with Logo */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex justify-center mb-2">
            <AnandaMargaLogo className="w-16 h-16" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F0F4F8] text-[#002B66] font-bold text-xs uppercase tracking-[0.2em] border border-[#CBD5E1]">
            <Globe className="w-3.5 h-3.5 text-[#003399]" /> Ananda Marga Directory & Resource Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#002B66]">
            Official Ananda Marga Links & Portals
          </h1>
          <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed font-sans">
            Access official websites (including <a href="https://anandamarga.us" target="_blank" rel="noopener noreferrer" className="text-[#003399] font-bold underline">anandamarga.us</a>), Neohumanist education portals, Shrii Shrii Anandamurti literature archives, AMURT relief units, and meditation centers worldwide.
          </p>
        </div>

        {/* Search & Filter Control Panel */}
        <div className="bg-white rounded-[32px] p-6 border border-[#E2E8F0] space-y-4 shadow-xs">
          <div className="relative">
            <Search className="w-5 h-5 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search links (e.g. 'Mysore', 'Meditation', 'Kiirtan', 'AMURT', 'Prabhat Samgiita', 'P.R. Sarkar')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#F0F4F8] border border-[#CBD5E1] rounded-2xl text-xs font-medium text-[#002B66] focus:outline-hidden focus:border-[#002B66]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#002B66] text-white shadow-xs'
                    : 'bg-[#F0F4F8] text-[#002B66] hover:bg-[#E2E8F0] border border-[#CBD5E1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Links Cards Grid */}
        {filteredLinks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-[32px] border border-[#E2E8F0] space-y-2">
            <p className="font-serif font-bold text-lg text-[#002B66]">No links found matching "{searchTerm}"</p>
            <p className="text-xs text-[#64748B]">Try adjusting your search terms or clearing category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLinks.map((link) => (
              <div
                key={link.id}
                className="bg-white rounded-[28px] p-6 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#002B66] uppercase tracking-wider bg-[#F0F4F8] px-3 py-1 rounded-full border border-[#CBD5E1]">
                      {getCategoryIcon(link.category)}
                      {link.category}
                    </span>

                    {link.badge && (
                      <span className="px-2.5 py-0.5 bg-[#FF6600] text-white font-sans text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#002B66] leading-snug">
                    {link.title}
                  </h3>

                  <p className="text-xs text-[#4A5568] leading-relaxed font-sans">
                    {link.description}
                  </p>

                  <div className="text-[11px] font-mono text-[#64748B] truncate pt-1">
                    {link.url}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#E2E8F0]">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-[#002B66] hover:bg-[#001D47] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 text-center cursor-pointer"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FFD700]" />
                  </a>

                  <button
                    onClick={() => handleCopy(link.id, link.url)}
                    title="Copy URL"
                    className="p-2.5 bg-[#F0F4F8] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#002B66] rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    {copiedId === link.id ? (
                      <Check className="w-4 h-4 text-[#002B66]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#64748B]" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Informational Banner */}
        <div className="bg-[#002B66] text-white rounded-[32px] p-8 sm:p-10 space-y-4 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Global Neohumanist Network
            </span>
            <h2 className="text-2xl font-serif font-bold text-white">
              Ananda Marga School Mysore & Universal Network
            </h2>
            <p className="text-xs text-white/80 leading-relaxed font-sans">
              Ananda Marga School in Mysore operates under the Neohumanist Education system (NHE), linking our local Mysore students to thousands of sister schools, children's homes, and disaster relief projects across the globe.
            </p>
          </div>

          <div className="md:col-span-4 text-center md:text-right">
            <a
              href="https://anandamarga.us"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors shadow-xs"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Ananda Marga US</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

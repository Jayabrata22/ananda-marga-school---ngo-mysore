import React, { useState } from 'react';
import { Currency } from '../types';
import { AnandaMargaLogo } from './AnandaMargaLogo';
import { 
  Heart, 
  Menu, 
  X, 
  Globe, 
  GraduationCap,
  Users, 
  BookOpen, 
  Info,
  Phone,
  Home,
  ShieldAlert,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Lock,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  isAdminLoggedIn?: boolean;
  onOpenAdminModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isAdminLoggedIn,
  onOpenAdminModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Mysore School Projects', icon: GraduationCap, badge: 'Active' },
    { id: 'volunteer', label: 'Join as Volunteer', icon: Users },
    { id: 'about', label: 'Founder & History', icon: Info },
    { id: 'links', label: 'Links & Directory', icon: Globe },
    { id: 'donate', label: 'Make a Donation', icon: Heart, isCTA: true },
    { id: 'contact', label: 'Contact Us', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      {/* Top Banner (Ananda Marga Saffron) */}
      {bannerVisible && (
        <div className="bg-[#FF6600] text-white text-xs px-4 py-1.5 flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-center sm:text-left justify-center sm:justify-start flex-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#002B66] text-white font-bold text-[10px] uppercase tracking-wider">
              <AlertCircle className="w-3 h-3 text-[#FFD700]" /> Urgent Drive
            </span>
            <span className="font-medium text-white text-xs">
              Mysore School Science Lab & Midday Meal Fund Active — 80G Tax Deductible.
            </span>
            <button
              onClick={() => setActiveTab('donate')}
              className="hidden md:inline-flex items-center gap-1 text-white hover:text-[#FFD700] font-bold underline ml-2 transition-colors cursor-pointer"
            >
              Donate Now <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="text-white/80 hover:text-white p-1 rounded-md cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Brand Bar with Official Emblem Logo */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:h-20">
          {/* Official Ananda Marga Logo & Name */}
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer shrink-0 min-w-0"
          >
            <AnandaMargaLogo className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-2xl font-serif font-bold text-[#002B66] tracking-tight">Ananda Marga</span>
                <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-[#FF6600] text-white rounded-full">Mysore</span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#4A5568] hidden xs:block">Welfare Society & School, Mysore</p>
            </div>
          </button>

          {/* Right Header Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-end">
            {/* Currency Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F4F8] rounded-full border border-[#CBD5E1] text-xs font-bold text-[#002B66]">
              <Globe className="w-3.5 h-3.5 text-[#003399]" />
              <span>₹ INR (80G Tax Receipt)</span>
            </div>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdminModal}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-[11px] sm:text-xs font-bold rounded-full border transition-all cursor-pointer min-h-[38px] ${
                isAdminLoggedIn
                  ? 'bg-[#002B66] text-white border-[#002B66]'
                  : 'bg-[#F0F4F8] text-[#002B66] border-[#CBD5E1] hover:bg-[#E2E8F0]'
              }`}
              title="Admin Portal Login"
            >
              {isAdminLoggedIn ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span className="hidden sm:inline">Admin Mode</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#003399]" />
                  <span className="hidden sm:inline">Admin Login</span>
                </>
              )}
            </button>

            {/* Direct Donation CTA */}
            <button
              onClick={() => setActiveTab('donate')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-white bg-[#FF6600] hover:bg-[#e65c00] rounded-full shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer min-h-[38px]"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/30 text-white shrink-0" />
              <span>Donate</span>
            </button>

            {/* Mobile drawer button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#002B66] hover:bg-[#F0F4F8] rounded-xl cursor-pointer min-w-[42px] min-h-[42px] flex items-center justify-center"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Navigation Bar (Royal Blue Theme from anandamarga.us) */}
      <div className="bg-[#002B66] text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none scroll-smooth">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    item.isCTA
                      ? isActive
                        ? 'bg-[#FF6600] text-white shadow-sm'
                        : 'bg-[#FF6600] text-white hover:bg-[#e65c00]'
                      : isActive
                      ? 'bg-white text-[#002B66] shadow-sm font-extrabold'
                      : 'text-white/90 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? (item.isCTA ? 'text-white' : 'text-[#002B66]') : 'text-white/80'
                  }`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-[#FF6600] text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center pb-2.5 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <AnandaMargaLogo className="w-6 h-6" />
              <span className="text-xs font-bold text-[#002B66] uppercase tracking-wider">Ananda Marga Mysore</span>
            </div>
            <span className="bg-[#F0F4F8] font-bold text-[11px] px-2.5 py-1 rounded-full text-[#002B66] border border-[#CBD5E1]">
              ₹ INR (80G Eligible)
            </span>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-between cursor-pointer min-h-[48px] active:scale-[0.98] ${
                    isActive
                      ? 'bg-[#002B66] text-white shadow-xs'
                      : item.isCTA
                      ? 'bg-[#FF6600] text-white'
                      : 'text-[#002B66] hover:bg-[#F0F4F8] active:bg-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFD700]' : item.isCTA ? 'text-white' : 'text-[#003399]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#FF6600] text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Actions in Drawer */}
          <div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveTab('donate');
                setMobileMenuOpen(false);
              }}
              className="py-3 px-3 rounded-2xl bg-[#FF6600] hover:bg-[#e65c00] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[44px]"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Donate Now</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdminModal) onOpenAdminModal();
              }}
              className="py-3 px-3 rounded-2xl bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#002B66] border border-[#CBD5E1] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              <Lock className="w-4 h-4 text-[#003399]" />
              <span>{isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

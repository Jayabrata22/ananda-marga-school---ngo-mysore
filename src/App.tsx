import React, { useState, useEffect } from 'react';
import { Currency } from './types';
import { CURRENCY_RATES } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { DonationPortal } from './components/DonationPortal';
import { VolunteerSignup } from './components/VolunteerSignup';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { ProjectsSection } from './components/ProjectsSection';
import { LinksSection } from './components/LinksSection';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currency, setCurrency] = useState<Currency>('INR');

  // Admin Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('am_mysore_admin_logged') === 'true';
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Selected cause or prefilled donation amount in INR when navigating to donation portal
  const [targetCauseId, setTargetCauseId] = useState<string | undefined>(undefined);
  const [targetDonationINR, setTargetDonationINR] = useState<number | undefined>(undefined);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleAdminLogin = (id: string, pass: string): boolean => {
    if (id === 'admin' && pass === 'Admin@223344') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('am_mysore_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('am_mysore_admin_logged');
  };

  const handleNavigateTab = (tab: string, causeId?: string) => {
    if (causeId) {
      setTargetCauseId(causeId);
    }
    setActiveTab(tab);
  };

  const handleSelectImpactAmount = (amountINR: number) => {
    setTargetDonationINR(amountINR);
    setActiveTab('donate');
  };

  const currencyRate = CURRENCY_RATES.INR;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-sans flex flex-col selection:bg-[#CC7A5C]/20 selection:text-[#2F4F4F]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero
              currencyRate={currencyRate}
              onNavigateTab={handleNavigateTab}
              onSelectImpactAmount={handleSelectImpactAmount}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          </div>
        )}

        {activeTab === 'causes' && (
          <DonationPortal
            currency={currency}
            setCurrency={setCurrency}
            preselectedCauseId={targetCauseId}
            initialAmountINR={targetDonationINR}
          />
        )}

        {activeTab === 'donate' && (
          <DonationPortal
            currency={currency}
            setCurrency={setCurrency}
            preselectedCauseId={targetCauseId}
            initialAmountINR={targetDonationINR}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsSection
            onDonateToProject={() => setActiveTab('donate')}
            isAdminLoggedIn={isAdminLoggedIn}
            onOpenAdminModal={() => setIsAdminModalOpen(true)}
          />
        )}

        {activeTab === 'links' && <LinksSection />}

        {activeTab === 'volunteer' && <VolunteerSignup />}

        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'blog' && <BlogSection />}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Admin Authentication Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { CurrencyRate, BeneficiaryStory } from '../types';
import { ImpactCalculator } from './ImpactCalculator';
import { AnandaMargaLogo } from './AnandaMargaLogo';
import { sanitizeText, sanitizePhone, securityLimiter } from '../utils/security';
import { 
  Heart, 
  Users, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2,
  TreePine,
  Dog,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Quote,
  Building2,
  Award,
  BookOpen,
  Plus,
  Phone,
  MapPin,
  X,
  Send,
  Lock,
  Trash2
} from 'lucide-react';

interface HeroProps {
  currencyRate: CurrencyRate;
  onNavigateTab: (tab: string, causeId?: string) => void;
  onSelectImpactAmount: (amountINR: number) => void;
  isAdminLoggedIn?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  currencyRate,
  onNavigateTab,
  onSelectImpactAmount,
  isAdminLoggedIn = false,
}) => {
  // Activity Slider index
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Default Beneficiary Stories
  const defaultStories: BeneficiaryStory[] = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      phone: '+91 9845012345',
      location: 'Parent of Student, Mysore',
      quote: 'Ananda Marga Primary School provided my daughter with quality Neohumanist education, free books, and nutritious lunches. It has given our family hope for a bright future.',
      date: 'August 2025',
    },
    {
      id: '2',
      name: 'Lakshmi Devi',
      phone: '+91 9886098765',
      location: 'Senior Citizen Beneficiary, Mysore',
      quote: 'The weekly health and food distribution program by Ananda Marga Welfare Society brings immense comfort to old age parents like us. Their love and dedication is truly divine.',
      date: 'July 2025',
    },
    {
      id: '3',
      name: 'Dr. S. N. Murthy',
      phone: '+91 9448011223',
      location: 'Regular Supporter & Donor, Mysore',
      quote: 'Supporting Ananda Marga Mysore is deeply fulfilling. 100% transparency, official 80G receipts, and genuine ground-level impact for education, nature, and elderly care.',
      date: 'June 2025',
    },
  ];

  // Stories State with LocalStorage Persistence
  const [stories, setStories] = useState<BeneficiaryStory[]>(() => {
    try {
      const saved = localStorage.getItem('am_mysore_user_stories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved stories', e);
    }
    return defaultStories;
  });

  // Story Modal State
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [newStoryQuote, setNewStoryQuote] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [storyFormError, setStoryFormError] = useState('');
  const [storySuccessMsg, setStorySuccessMsg] = useState('');

  const handlePostStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoryFormError('');
    setStorySuccessMsg('');

    // Check Rate Limiter
    const rateCheck = securityLimiter.isAllowed('post_story_attempt', 5, 60000);
    if (!rateCheck.allowed) {
      setStoryFormError('Too many submissions. Please wait a minute before submitting again.');
      return;
    }

    const cleanQuote = sanitizeText(newStoryQuote, 600);
    const cleanName = sanitizeText(newName, 100);
    const cleanPhone = sanitizePhone(newPhone);
    const cleanLocation = sanitizeText(newLocation, 100);

    if (!cleanQuote || cleanQuote.length < 10) {
      setStoryFormError('Please write a brief story or blessing (at least 10 characters).');
      return;
    }
    if (!cleanName) {
      setStoryFormError('Please enter your Full Name.');
      return;
    }
    if (!cleanPhone || cleanPhone.length < 8) {
      setStoryFormError('Please enter a valid Contact Number.');
      return;
    }
    if (!cleanLocation) {
      setStoryFormError('Please enter your Location / Role (e.g. Mysore / Parent of Student).');
      return;
    }

    const newStory: BeneficiaryStory = {
      id: `story_${Date.now()}`,
      name: cleanName,
      phone: cleanPhone,
      location: cleanLocation,
      quote: cleanQuote,
      date: 'Just Now',
    };

    const updatedStories = [newStory, ...stories];
    setStories(updatedStories);
    try {
      localStorage.setItem('am_mysore_user_stories', JSON.stringify(updatedStories));
    } catch (e) {
      console.error('Failed to save story to storage', e);
    }

    setStorySuccessMsg('Thank you! Your story & blessing has been published successfully.');
    setTimeout(() => {
      setStorySuccessMsg('');
      setNewStoryQuote('');
      setNewName('');
      setNewPhone('');
      setNewLocation('');
      setIsStoryModalOpen(false);
    }, 1500);
  };

  // Section Hide State for Voices of Impact
  const [isVoicesOfImpactHidden, setIsVoicesOfImpactHidden] = useState<boolean>(() => {
    return localStorage.getItem('am_mysore_hide_voices_section') === 'true';
  });

  const toggleHideVoicesSection = () => {
    if (!isAdminLoggedIn) return;
    const nextVal = !isVoicesOfImpactHidden;
    setIsVoicesOfImpactHidden(nextVal);
    localStorage.setItem('am_mysore_hide_voices_section', String(nextVal));
  };

  const handleClearAllStories = () => {
    if (!isAdminLoggedIn) return;
    if (confirm('Admin: Delete ALL stories from Voices of Impact?')) {
      setStories([]);
      localStorage.setItem('am_mysore_user_stories', JSON.stringify([]));
    }
  };

  const activities = [
    {
      id: 1,
      title: 'Tree Plantation & Environmental Drive at Mysore Campus',
      date: 'August 2025',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      description: 'Volunteers and students planted over 250 native saplings in and around the Mysore campus to promote green cover and eco-awareness.',
      category: 'Environment',
    },
    {
      id: 2,
      title: 'Free Midday Meal & Book Distribution for Needy Children',
      date: 'July 2025',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      description: 'Distributed 500+ free study material kits and healthy hot meals to primary school students from nearby rural villages.',
      category: 'Education',
    },
    {
      id: 3,
      title: 'Health & Nutrition Camp for Senior Citizens & Old Age Parents',
      date: 'June 2025',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      description: 'Conducted free health checkups, vision tests, and provided essential medicines and nutritious food kits to elderly community members.',
      category: 'Elderly Support',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      role: 'Parent of Student, Mysore',
      quote: 'Ananda Marga Primary School provided my daughter with quality Neohumanist education, free books, and nutritious lunches. It has given our family hope for a bright future.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'Lakshmi Devi',
      role: 'Senior Citizen Beneficiary',
      quote: 'The weekly health and food distribution program by Ananda Marga Welfare Society brings immense comfort to old age parents like us. Their love and dedication is truly divine.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      name: 'Dr. S. N. Murthy',
      role: 'Regular Supporter & Donor',
      quote: 'Supporting Ananda Marga Mysore is deeply fulfilling. 100% transparency, official 80G receipts, and genuine ground-level impact for education, nature, and elderly care.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* 1. Main Hero Banner */}
      <section className="relative rounded-[32px] overflow-hidden bg-[#002B66] text-white shadow-xl border border-[#003399]">
        {/* Background Image: Children Studying & Volunteers Planting Trees */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80"
            alt="Ananda Marga Volunteers & School Children"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001D47] via-[#002B66]/90 to-[#002B66]/65" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#001D47] text-white border border-[#003399] font-bold text-xs uppercase tracking-[0.15em] shadow-sm">
              <AnandaMargaLogo className="w-6 h-6" />
              <span>Ananda Marga Welfare Society • Mysore</span>
            </div>

            {/* Tagline Prominently Displayed */}
            <div className="space-y-2">
              <span className="text-[#FFD700] text-xs font-bold uppercase tracking-[0.2em] block font-sans">
                "Service to Humanity is Service to GOD"
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif leading-[1.15] text-white">
                Empowering children, elders & <span className="text-[#FFD700] italic">nature</span> with universal love.
              </h1>
            </div>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Welcome to Ananda Marga Welfare Society, Mysore. Guided by Shrii Shrii Anandamurti’s philosophy of Neohumanism, we serve humanity through free education, support for old age parents, environmental conservation, and animal care.
            </p>

            {/* Action Buttons: "Join Us" and "Contribute as you can" */}
            <div className="flex flex-wrap gap-4 pt-3">
              <button
                onClick={() => onNavigateTab('volunteer')}
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-lg transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-white" />
                <span>Join Us as Volunteer</span>
              </button>

              <button
                onClick={() => onNavigateTab('donate')}
                className="inline-flex items-center gap-2 px-7 py-4 bg-white text-[#002B66] hover:bg-[#F0F4F8] font-bold rounded-full text-xs uppercase tracking-widest shadow-lg transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-[#FF6600] text-[#FF6600]" />
                <span>Contribute as You Can</span>
              </button>
            </div>

            {/* Quick Verification Chips */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/15 text-xs text-white/90 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFD700]" /> 80G Tax Deductible (India)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFD700]" /> Registered Trust (SBI A/C: 44052849230)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFD700]" /> 100% Volunteer Driven
              </span>
            </div>
          </div>

          {/* Right Quick Contribution Box */}
          <div className="lg:col-span-5 bg-white text-[#1A202C] p-6 sm:p-8 rounded-[28px] shadow-2xl border border-[#E2E8F0] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6600]">Direct Support</span>
                <h3 className="text-xl font-serif font-bold text-[#002B66]">Mysore Trust Fund</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#002B66] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                80G
              </div>
            </div>

            <p className="text-xs text-[#4A5568] leading-relaxed">
              Every small contribution makes a massive difference for school children, senior citizens, and environmental projects in Mysore.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[500, 1000, 2500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => onSelectImpactAmount(amt)}
                  className="py-3 px-2 bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#002B66] font-bold text-sm sm:text-base rounded-2xl border border-[#CBD5E1] text-center transition-colors cursor-pointer"
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('donate')}
              className="w-full py-3.5 bg-[#002B66] hover:bg-[#001D47] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Custom Amount / Bank Transfer</span>
              <ArrowRight className="w-4 h-4 text-[#FFD700]" />
            </button>
          </div>
        </div>

        {/* Bottom Banner Stats */}
        <div className="bg-[#001D47] border-t border-white/10 px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#FFD700]">500+</p>
            <p className="text-xs text-white/80 font-medium uppercase tracking-wider">Students Educated</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#FFD700]">100+</p>
            <p className="text-xs text-white/80 font-medium uppercase tracking-wider">Senior Citizens Served</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#FFD700]">1000+</p>
            <p className="text-xs text-white/80 font-medium uppercase tracking-wider">Trees Planted</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#FFD700]">80G</p>
            <p className="text-xs text-white/80 font-medium uppercase tracking-wider">Tax Exempt Receipts</p>
          </div>
        </div>
      </section>

      {/* 2. Brief About the Trust (3-4 Lines Mission) */}
      <section className="bg-[#F0F4F8] border border-[#CBD5E1] rounded-[32px] p-8 sm:p-12 space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6600]">About Ananda Marga Welfare Society</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#002B66]">
            Our Mission: Service to Education, Elders, Nature & Animals
          </h2>
          <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed font-sans">
            Ananda Marga Welfare Society is dedicated to universal service based on Neohumanist principles. We provide free, holistic education and midday meals to underprivileged children, healthcare and emotional shelter for elderly parents, active tree plantation drives to restore local ecosystems, and compassionate care for animals in need.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-[#CBD5E1] flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[#002B66] shrink-0" />
            <div>
              <p className="font-bold text-xs text-[#002B66]">Neohumanist Education</p>
              <p className="text-[10px] text-[#64748B]">Free Schooling & Nutrition</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#CBD5E1] flex items-center gap-3">
            <Users className="w-8 h-8 text-[#FF6600] shrink-0" />
            <div>
              <p className="font-bold text-xs text-[#002B66]">Old Age Support</p>
              <p className="text-[10px] text-[#64748B]">Dignity & Health Camps</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#CBD5E1] flex items-center gap-3">
            <TreePine className="w-8 h-8 text-[#002B66] shrink-0" />
            <div>
              <p className="font-bold text-xs text-[#002B66]">Tree Plantation</p>
              <p className="text-[10px] text-[#64748B]">Eco Protection Drives</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#CBD5E1] flex items-center gap-3">
            <Dog className="w-8 h-8 text-[#FF6600] shrink-0" />
            <div>
              <p className="font-bold text-xs text-[#002B66]">Animal Welfare</p>
              <p className="text-[10px] text-[#64748B]">Compassionate Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Core Causes (Icons & Photos) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6600]">Pillars of Impact</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#002B66] mt-1">Our Core Causes</h2>
          </div>
          <button
            onClick={() => onNavigateTab('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#002B66] hover:text-[#003399] bg-[#F0F4F8] px-5 py-2.5 rounded-full border border-[#CBD5E1] cursor-pointer"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 text-[#FF6600]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cause 1: Education for Needy Children */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                  alt="Education for Needy Children"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#002B66] text-white p-2 rounded-xl shadow-md">
                  <GraduationCap className="w-5 h-5 text-[#FFD700]" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6600]">Cause #1</span>
                <h3 className="text-xl font-serif font-bold text-[#002B66]">Education for Needy Children</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Providing free schooling, textbooks, uniforms, digital computer labs, and hot midday meals at Ananda Marga Primary School, Mysore.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigateTab('donate')}
                className="w-full py-3 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer"
              >
                Contribute to Education
              </button>
            </div>
          </div>

          {/* Cause 2: Support for Old Age Parents */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
                  alt="Support for Old Age Parents"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#002B66] text-white p-2 rounded-xl shadow-md">
                  <Users className="w-5 h-5 text-[#FFD700]" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6600]">Cause #2</span>
                <h3 className="text-xl font-serif font-bold text-[#002B66]">Support for Old Age Parents</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Providing elderly healthcare camps, monthly ration kits, emotional companionship, and basic medical aid to destitute senior citizens.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigateTab('donate')}
                className="w-full py-3 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer"
              >
                Support Elderly Parents
              </button>
            </div>
          </div>

          {/* Cause 3: Tree Plantation & Environment */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="Tree Plantation & Environment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#002B66] text-white p-2 rounded-xl shadow-md">
                  <TreePine className="w-5 h-5 text-[#FFD700]" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6600]">Cause #3</span>
                <h3 className="text-xl font-serif font-bold text-[#002B66]">Tree Plantation & Environment</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Planting saplings across rural Mysore, rainwater harvesting, solar energy initiatives, and fostering Neohumanist ecological balance.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigateTab('donate')}
                className="w-full py-3 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer"
              >
                Plant a Tree Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest Activities / Events Slider */}
      <section className="bg-white rounded-[32px] p-8 sm:p-10 border border-[#E2E8F0] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6600]">Field Updates</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#002B66]">Latest Activities & Events</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentEventIndex((prev) => (prev === 0 ? activities.length - 1 : prev - 1))}
              className="p-2.5 rounded-full bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#002B66] transition-colors cursor-pointer"
              aria-label="Previous Activity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentEventIndex((prev) => (prev === activities.length - 1 ? 0 : prev + 1))}
              className="p-2.5 rounded-full bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#002B66] transition-colors cursor-pointer"
              aria-label="Next Activity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Activity Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 rounded-2xl overflow-hidden h-64 sm:h-80 border border-[#CBD5E1]">
            <img
              src={activities[currentEventIndex].image}
              alt={activities[currentEventIndex].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF6600]">
              <Calendar className="w-4 h-4" />
              <span>{activities[currentEventIndex].date}</span>
              <span>•</span>
              <span className="bg-[#F0F4F8] text-[#002B66] px-2.5 py-0.5 rounded-md border border-[#CBD5E1]">
                {activities[currentEventIndex].category}
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#002B66] leading-snug">
              {activities[currentEventIndex].title}
            </h3>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              {activities[currentEventIndex].description}
            </p>
            <button
              onClick={() => onNavigateTab('blog')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#002B66] hover:bg-[#001D47] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer"
            >
              <span>Read Full News Update</span>
              <ArrowRight className="w-4 h-4 text-[#FFD700]" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Testimonial / Stories Section */}
      {(!isVoicesOfImpactHidden || isAdminLoggedIn) && (
        <section className={`space-y-8 ${isVoicesOfImpactHidden ? 'opacity-60 bg-amber-50/50 p-6 rounded-3xl border-2 border-dashed border-amber-300' : ''}`}>
          {isVoicesOfImpactHidden && isAdminLoggedIn && (
            <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2 rounded-2xl text-xs font-bold flex items-center justify-between">
              <span>⚠️ Admin Notice: This "Voices of Impact" section is currently hidden from public visitors.</span>
              <button
                onClick={toggleHideVoicesSection}
                className="underline text-amber-900 hover:text-black font-extrabold cursor-pointer"
              >
                Unhide Section
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#CBD5E1] pb-4">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6600]">Voices of Impact</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#002B66]">Stories & Blessings from Beneficiaries</h2>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center sm:justify-end">
              {isAdminLoggedIn && (
                <>
                  <button
                    type="button"
                    onClick={toggleHideVoicesSection}
                    title="Admin: Hide or show this entire section"
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer border border-slate-300 flex items-center gap-1.5"
                  >
                    <span>{isVoicesOfImpactHidden ? 'Unhide Section' : 'Delete/Hide Section'}</span>
                  </button>

                  {stories.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllStories}
                      title="Admin: Clear all beneficiary stories"
                      className="px-3.5 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-full transition-colors cursor-pointer border border-red-300 flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Delete All Stories</span>
                    </button>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={() => setIsStoryModalOpen(true)}
                className="px-5 py-2.5 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 border border-[#FF6600]"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Post Your Story</span>
              </button>
            </div>
          </div>

          {stories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#CBD5E1] p-8">
              <p className="text-sm text-[#64748B] italic">No beneficiary stories posted yet. Click "Post Your Story" to share your blessings!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stories.map((s) => (
                <div key={s.id} className="bg-white p-6 rounded-[28px] border border-[#CBD5E1] shadow-xs space-y-4 flex flex-col justify-between relative group hover:border-[#002B66] transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Quote className="w-8 h-8 text-[#FF6600] opacity-40" />
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase">{s.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed italic font-sans">
                      "{s.quote}"
                    </p>
                  </div>

                  {/* Author Info without image as requested */}
                  <div className="pt-4 border-t border-[#CBD5E1] space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-[#002B66]">{s.name}</h4>
                        <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
                          <span>{s.location}</span>
                        </p>
                      </div>
                      {isAdminLoggedIn && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Admin: Delete story by ${s.name}?`)) {
                              const filtered = stories.filter(st => st.id !== s.id);
                              setStories(filtered);
                              localStorage.setItem('am_mysore_user_stories', JSON.stringify(filtered));
                            }
                          }}
                          title="Delete Story (Admin)"
                          className="px-2 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer shrink-0 font-bold border border-red-200 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>

                    {/* Contact phone number hidden from public UI, strictly visible ONLY to logged-in Admin */}
                    {isAdminLoggedIn && (
                      <div className="mt-2 pt-2 border-t border-dashed border-[#CBD5E1] flex items-center justify-between text-[11px] text-[#002B66] bg-[#F0F4F8] px-3 py-1.5 rounded-xl">
                        <span className="font-mono font-bold flex items-center gap-1.5 text-[#002B66]">
                          <Phone className="w-3.5 h-3.5 text-[#FF6600]" />
                          <span>Phone: {s.phone}</span>
                        </span>
                        <span className="text-[9px] font-extrabold uppercase bg-[#002B66] text-white px-2 py-0.5 rounded-full">
                          Admin Only
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Post Your Story Popup Modal */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-[32px] max-w-lg w-full p-6 sm:p-8 border border-[#CBD5E1] shadow-2xl relative space-y-5">
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#CBD5E1]/40 text-[#002B66] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FF6600]/10 text-[#FF6600] flex items-center justify-center shrink-0 border border-[#FF6600]/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6600]">
                  Beneficiary & Supporter Voice
                </span>
                <h3 className="font-serif font-bold text-xl text-[#002B66]">Post Your Story & Blessing</h3>
              </div>
            </div>

            <form onSubmit={handlePostStorySubmit} className="space-y-4">
              {storyFormError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl">
                  {storyFormError}
                </div>
              )}

              {storySuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{storySuccessMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#002B66] mb-1">Your Story or Blessing *</label>
                <textarea
                  required
                  rows={3}
                  maxLength={600}
                  placeholder="Write a brief story, blessing, or words of encouragement..."
                  value={newStoryQuote}
                  onChange={(e) => setNewStoryQuote(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-[#CBD5E1] bg-white text-xs text-[#002B66] focus:outline-hidden focus:border-[#002B66] focus:ring-2 focus:ring-[#002B66]/20 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#002B66] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#CBD5E1] bg-white text-xs text-[#002B66] focus:outline-hidden focus:border-[#002B66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#002B66] mb-1">Contact Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9845603926"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#CBD5E1] bg-white text-xs text-[#002B66] focus:outline-hidden focus:border-[#002B66]"
                  />
                </div>
              </div>

              <div className="bg-[#F0F4F8] p-2.5 rounded-xl border border-[#CBD5E1] flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#4A5568] leading-tight">
                  <strong>Privacy Note:</strong> Your contact number is kept safe & confidential. It will <strong>NOT</strong> be displayed publicly in the UI and is only visible to authorized administrators.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#002B66] mb-1">Location / Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mysore, Karnataka / Parent of Student"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#CBD5E1] bg-white text-xs text-[#002B66] focus:outline-hidden focus:border-[#002B66]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Publish My Story</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Impact Calculator Simulator */}
      <ImpactCalculator
        currencyRate={currencyRate}
        onSelectAmount={(usd) => onSelectImpactAmount(usd)}
      />
    </div>
  );
};


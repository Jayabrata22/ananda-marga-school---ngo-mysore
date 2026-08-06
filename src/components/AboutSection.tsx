import React, { useState } from 'react';
import { AnandaMargaLogo } from './AnandaMargaLogo';
const founderPortrait = '/images/PRSarkar_GentlemanPhoto_1.jpg';
import { 
  ShieldCheck, 
  Award, 
  Globe, 
  Target, 
  Eye, 
  Heart, 
  BookOpen, 
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Sun,
  Flame,
  Feather
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'founder' | 'history' | 'philosophy' | 'amurt'>('founder');

  const milestones = [
    {
      year: '1955',
      title: 'Founding of Ananda Marga in Jamalpur',
      description: 'Shrii Shrii Anandamurti (Prabhat Ranjan Sarkar) founded Ananda Marga (Path of Bliss) in Jamalpur, Bihar, India, establishing a socio-spiritual movement based on Tantra yoga and universal service.',
      highlight: 'First spiritual seekers initiated in Jamalpur.',
    },
    {
      year: '1962',
      title: 'Propounding Neohumanism & Educational Network',
      description: 'Establishment of the first Ananda Marga Neohumanist primary school in Anandanagar (Purulia, West Bengal), pioneering education rooted in love for all beings.',
      highlight: 'Anandanagar Master Unit created.',
    },
    {
      year: '1965',
      title: 'Establishment of AMURT Relief Team',
      description: 'Founding of AMURT (Ananda Marga Universal Relief Team) to provide disaster relief, emergency food, medical care, and clean water during crises regardless of caste, creed, or nation.',
      highlight: 'First major disaster response during Bihar drought.',
    },
    {
      year: '1970s',
      title: 'Global Expansion across Continents',
      description: 'Spiritual teachers (Acharyas) traveled worldwide, establishing meditation centers, children\'s homes, free clinics, and Master Units across North America, Europe, South America, Asia, Africa, and Oceania.',
      highlight: 'Over 100 country centers established.',
    },
    {
      year: '1975',
      title: 'Establishment of AMURTEL for Women & Children',
      description: 'AMURTEL founded as a branch managed by women for women and children, specializing in maternal healthcare, midwifery, and girls\' education in crisis zones.',
      highlight: 'Women-led international humanitarian aid.',
    },
    {
      year: '1982',
      title: 'Composer of Prabhat Samgiita',
      description: 'Shrii Shrii Anandamurti began composing Prabhat Samgiita ("Songs of the New Dawn"), creating 5,018 songs of devotion, nature, and human liberation in Bengali, Hindi, Sanskrit, and Urdu.',
      highlight: '5,018 devotional masterpieces composed.',
    },
    {
      year: 'Present Day',
      title: 'Global Movement for Universal Well-Being',
      description: 'Operating in over 120 countries with thousands of Neohumanist schools, AMURT relief units, ecological farms, and free yoga meditation instruction centers.',
      highlight: 'Millions served worldwide under "Baba Nam Kevalam".',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8F9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title with Logo */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex justify-center mb-2">
            <AnandaMargaLogo className="w-16 h-16" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F0F4F8] text-[#002B66] font-bold text-xs uppercase tracking-[0.2em] border border-[#CBD5E1]">
            <Compass className="w-3.5 h-3.5 text-[#003399]" /> Ananda Marga Pracaraka Samgha
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#002B66]">
            The Founder, History & Spirit of Ananda Marga
          </h1>
          <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed font-sans">
            "A'tmanomoks'a'rtham' jagaddhita'ya ca" — For self-realization and service to humanity. Discover the life of Shrii Shrii Anandamurti and the global history of Ananda Marga.
          </p>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: 'founder', label: 'The Founder: Shrii Shrii Anandamurti' },
              { id: 'history', label: 'History & Milestones' },
              { id: 'philosophy', label: 'Philosophy & Neohumanism' },
              { id: 'amurt', label: 'AMURT Disaster Relief' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#002B66] text-white shadow-sm'
                    : 'bg-[#F0F4F8] text-[#002B66] hover:bg-[#E2E8F0] border border-[#CBD5E1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: The Founder (Shrii Shrii Anandamurti) */}
        {activeTab === 'founder' && (
          <div className="space-y-10">
            {/* Main Founder Card */}
            <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#E2E8F0] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
                <div className="relative inline-block mx-auto lg:mx-0">
                  <div className="w-full max-w-xs h-64 sm:w-64 sm:h-80 rounded-[32px] overflow-hidden border-4 border-[#002B66] shadow-xl mx-auto bg-white p-1.5">
                    <img
                      src={founderPortrait}
                      alt="Shrii Shrii Anandamurti (Prabhat Ranjan Sarkar) - Founder of Ananda Marga"
                      className="w-full h-full object-cover rounded-[24px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#002B66] text-white font-serif font-bold text-xs uppercase tracking-widest rounded-full shadow-xs whitespace-nowrap">
                    1921 — 1990
                  </span>
                </div>

                <div className="pt-2">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#002B66]">
                    Shrii Shrii Anandamurti
                  </h2>
                  <p className="text-xs font-bold text-[#FF6600] uppercase tracking-wider mt-1">
                    (Prabhat Ranjan Sarkar)
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5">Spiritual Master, Philosopher, Social Reformer & Polymath</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-sm text-[#1A202C] leading-relaxed font-sans">
                <div className="bg-[#F0F4F8] p-4 rounded-2xl border border-[#CBD5E1]">
                  <p className="font-serif font-bold text-[#002B66] text-base italic">
                    "Service to humanity is service to God. Infinite bliss is the inherent right of every living being."
                  </p>
                </div>

                <p>
                  <strong>Prabhat Ranjan Sarkar (Shrii Shrii Anandamurti)</strong> was born on May 21, 1921, in Jamalpur, Bihar, India. From early childhood, he demonstrated extraordinary spiritual realization, profound wisdom, and deep compassion for all living beings.
                </p>

                <p>
                  In 1955, while working as an accounts clerk in the Jamalpur Railway Workshop, he founded <strong>Ananda Marga</strong> ("The Path of Bliss"). He introduced a synthesis of ancient Tantra and Yoga tailored for modern humanity, providing practical techniques for physical health, mental clarity, and spiritual enlightenment.
                </p>

                <p>
                  Beyond spiritual guidance, Shrii Shrii Anandamurti was a prolific author of over 250 books covering economics (PROUT), philosophy, linguistics, medicine, ecology, and socio-cultural liberation. Between 1982 and 1990, he composed <strong>5,018 spiritual songs</strong> known as <em>Prabhat Samgiita</em> ("Songs of the New Dawn").
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#F0F4F8] rounded-xl border border-[#CBD5E1]">
                    <span className="text-[10px] font-bold text-[#FF6600] uppercase tracking-wider">Motto</span>
                    <p className="font-serif font-bold text-xs text-[#002B66] mt-0.5">Self-Realization & Service to All</p>
                  </div>
                  <div className="p-3 bg-[#F0F4F8] rounded-xl border border-[#CBD5E1]">
                    <span className="text-[10px] font-bold text-[#003399] uppercase tracking-wider">Universal Mantra</span>
                    <p className="font-serif font-bold text-xs text-[#002B66] mt-0.5">Baba Nam Kevalam (Love is All)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Teachings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-[28px] border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#002B66] text-white flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#002B66]">Scientific Spiritual Practice</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-sans">
                  Systematic six-lesson meditation (Sadhana), yoga asanas, pranayama, and vegetarian diet designed to elevate human consciousness and harmonize body, mind, and spirit.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[28px] border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#FF6600] text-white flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#002B66]">Neohumanist Philosophy</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-sans">
                  Expansion of human love beyond national, racial, or species boundaries to encompass all human beings, animals, plants, and the natural ecosystem.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[28px] border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#003399] text-white flex items-center justify-center">
                  <Feather className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#002B66]">PROUT Socio-Economics</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-sans">
                  Progressive Utilization Theory (PROUT): A holistic socio-economic system ensuring basic necessities (food, clothing, housing, education, medical care) for all citizens through decentralized regional planning.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: History & Milestones */}
        {activeTab === 'history' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-[#E2E8F0] shadow-sm space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6600]">1955 to Present</span>
                <h2 className="text-2xl font-serif font-bold text-[#002B66]">Historical Journey of Ananda Marga</h2>
                <p className="text-xs text-[#4A5568] font-sans">
                  From a small spiritual gathering in Bihar, India, to a worldwide non-profit and spiritual movement spanning over 120 countries.
                </p>
              </div>

              <div className="relative border-l-2 border-[#002B66]/30 ml-4 sm:ml-8 space-y-8">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#002B66] ring-4 ring-[#E2E8F0]" />
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-3 py-0.5 bg-[#002B66] text-white rounded-md">
                        {m.year}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#002B66] mt-1.5">{m.title}</h3>
                    <p className="text-xs text-[#4A5568] mt-1 leading-relaxed font-sans">{m.description}</p>
                    <p className="text-[11px] font-bold text-[#FF6600] mt-2 bg-[#F0F4F8] border border-[#CBD5E1] px-3 py-1 rounded-xl inline-block">
                      ★ Key Impact: {m.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Philosophy & Neohumanism */}
        {activeTab === 'philosophy' && (
          <div className="space-y-8">
            <div className="bg-[#002B66] text-white rounded-[32px] p-8 sm:p-12 space-y-8 shadow-md">
              <div className="max-w-2xl mx-auto text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">Universal Worldview</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Neohumanism & Universal Brotherhood
                </h2>
                <p className="text-xs text-white/80 font-sans">
                  Removing sentimentality, dogma, and artificial divisions through rational spirituality and cosmic love.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#001D47] p-6 rounded-2xl border border-[#003399] space-y-3">
                  <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FF6600]" /> Neohumanist Education
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    Ananda Marga runs hundreds of schools across India, Nepal, Kenya, Brazil, Haiti, and the US based on Neohumanist Education — cultivating moral integrity, universal love, critical thinking, ecological stewardship, and artistic creativity in young minds.
                  </p>
                </div>

                <div className="bg-[#001D47] p-6 rounded-2xl border border-[#003399] space-y-3">
                  <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#FFD700]" /> Master Units & Ecovillages
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    Master Units are model eco-farming and community development projects (like Anandanagar in Purulia, WB). They feature organic agriculture, herbal medicine centers, cottage industries, schools, and children's homes functioning in harmony with nature.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6600]">Spiritual Sound & Joy</span>
                <h3 className="text-2xl font-serif font-bold text-[#002B66]">Kiirtan: "Baba Nam Kevalam"</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-sans">
                  <em>Kiirtan</em> is the singing of the universal acoustic mantra <strong>"Baba Nam Kevalam"</strong>, which means "Love is the essence of everything" or "Only the name of the Divine Supreme exists." Accompanied by the <em>Lalita Marmika</em> dance, it brings immediate peace, joy, and mental purification to practitioners.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-[#002B66]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6600]" /> Open to all people regardless of background or beliefs
                </div>
              </div>

              <div className="bg-[#F0F4F8] p-6 rounded-2xl border border-[#CBD5E1] space-y-3">
                <h4 className="font-serif font-bold text-base text-[#002B66]">Daily Spiritual Practices Include:</h4>
                <ul className="text-xs text-[#4A5568] space-y-2 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-[#002B66] font-bold">•</span>
                    <span><strong>Sadhana (Meditation):</strong> Systematic technique for internal mind concentration and bliss.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#002B66] font-bold">•</span>
                    <span><strong>Yoga Asanas:</strong> Postures to balance hormones, strengthen organs, and calm the nervous system.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#002B66] font-bold">•</span>
                    <span><strong>Sattva Diet:</strong> Pure lacto-vegetarian nutrition promoting physical vitality and mental tranquility.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#002B66] font-bold">•</span>
                    <span><strong>Seva (Selfless Service):</strong> Serving suffering humanity, animals, and environment as a divine duty.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: AMURT & Disaster Relief */}
        {activeTab === 'amurt' && (
          <div className="space-y-8">
            <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#E2E8F0] space-y-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6600]">Founded in 1965</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#002B66]">
                    AMURT & AMURTEL Relief Team
                  </h2>
                  <p className="text-xs text-[#64748B] font-sans mt-0.5">
                    Ananda Marga Universal Relief Team — Delivering emergency aid and sustainable rehabilitation worldwide.
                  </p>
                </div>

                <div className="px-4 py-2 bg-[#002B66] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  100+ Disaster Missions Completed
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#F0F4F8] p-6 rounded-2xl border border-[#CBD5E1] space-y-2">
                  <span className="text-xs font-bold text-[#002B66] uppercase tracking-wider">Emergency Relief</span>
                  <h3 className="font-serif font-bold text-base text-[#002B66]">Disaster First Responders</h3>
                  <p className="text-xs text-[#4A5568] font-sans">
                    Rapid deployment during earthquakes, floods, tsunamis, and cyclones in India, Haiti, Nepal, Indonesia, and Bangladesh.
                  </p>
                </div>

                <div className="bg-[#F0F4F8] p-6 rounded-2xl border border-[#CBD5E1] space-y-2">
                  <span className="text-xs font-bold text-[#FF6600] uppercase tracking-wider">Clean Water & Sanitation</span>
                  <h3 className="font-serif font-bold text-base text-[#002B66]">Boreholes & Water Filtration</h3>
                  <p className="text-xs text-[#4A5568] font-sans">
                    Constructing solar-powered deep boreholes, rainwater harvesting tanks, and water purification facilities in drought zones.
                  </p>
                </div>

                <div className="bg-[#F0F4F8] p-6 rounded-2xl border border-[#CBD5E1] space-y-2">
                  <span className="text-xs font-bold text-[#003399] uppercase tracking-wider">Children's Care</span>
                  <h3 className="font-serif font-bold text-base text-[#002B66]">Orphanages & Homes</h3>
                  <p className="text-xs text-[#4A5568] font-sans">
                    Providing loving homes, nutritious meals, and complete education to orphaned, abandoned, or underprivileged children.
                  </p>
                </div>

                <div className="bg-[#F0F4F8] p-6 rounded-2xl border border-[#CBD5E1] space-y-2">
                  <span className="text-xs font-bold text-[#002B66] uppercase tracking-wider">Healthcare</span>
                  <h3 className="font-serif font-bold text-base text-[#002B66]">Mobile Medical Clinics</h3>
                  <p className="text-xs text-[#4A5568] font-sans">
                    Free medical camps, homeopathy clinics, maternal health care, and disaster trauma counseling for isolated rural populations.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#002B66] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-base text-white">Want to Support AMURT Field Missions?</h4>
                  <p className="text-xs text-white/80 font-sans">You can make a direct contribution via UPI or Card on our Donation Portal.</p>
                </div>
                <a
                  href="#donate"
                  className="px-6 py-2.5 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors shrink-0"
                >
                  Donate via UPI / Card
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

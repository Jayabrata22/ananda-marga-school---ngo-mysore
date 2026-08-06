import React from 'react';
import { 
  Users, 
  Clock, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  HeartHandshake, 
  Stethoscope, 
  TreePine,
  GraduationCap
} from 'lucide-react';

export const VolunteerSignup: React.FC = () => {
  const volunteerPrograms = [
    {
      title: 'Elementary & Primary Teaching',
      description: 'Assist teachers in English, Kannada, Mathematics, and Science for rural children in Kaamana Kere Hundi, Mysore.',
      icon: GraduationCap,
      tag: 'Teaching & Literacy'
    },
    {
      title: 'Midday Meal & Nutrition Service',
      description: 'Help serve daily nutritious hot meals to over 100 students at our primary school kitchen.',
      icon: HeartHandshake,
      tag: 'Child Nutrition'
    },
    {
      title: 'Medical & Hygiene Camps',
      description: 'Healthcare professionals & students supporting free health checkups and hygiene awareness camps.',
      icon: Stethoscope,
      tag: 'Healthcare'
    },
    {
      title: 'Campus Greening & Eco Plantation',
      description: 'Participate in organic gardening, tree planting, and campus maintenance in Mysore.',
      icon: TreePine,
      tag: 'Environment'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title & Notice */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF6600]/10 text-[#FF6600] font-extrabold text-xs uppercase tracking-[0.2em] border border-[#FF6600]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" /> Online Portal Under Development
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#002B66]">
            Join as a Volunteer
          </h1>
          <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed font-sans">
            Our online volunteer registration portal for Ananda Marga Welfare Society & Primary School is currently upcoming & under development.
          </p>
        </div>

        {/* Primary Announcement & Contact Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#002B66] space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#002B66] text-white shrink-0">
              <Clock className="w-7 h-7 text-[#FFD700]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#002B66]">
                Volunteer Registration Opening Soon!
              </h2>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                We are building an interactive online portal for local and international volunteers to join teaching, midday meal distribution, medical camps, and campus greening at our <strong>Kaamana Kere Hundi campus in Mysore, Karnataka</strong>.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#CBD5E1] flex flex-col md:flex-row items-center justify-between gap-4 bg-[#F0F4F8] p-4 rounded-2xl">
            <div className="text-center md:text-left">
              <span className="block text-xs font-extrabold text-[#002B66] uppercase tracking-wider">
                Direct Volunteer Inquiries & Immediate Signups
              </span>
              <span className="text-xs text-[#64748B]">
                Contact our Mysore campus coordinator directly to start volunteering today.
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
              <a
                href="tel:+919845603926"
                className="px-5 py-2.5 bg-[#002B66] hover:bg-[#001D47] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2 shadow-xs cursor-pointer min-h-[42px]"
              >
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <span>Call 9845603926</span>
              </a>
              <a
                href="mailto:anandavitamohaacharya@gmail.com"
                className="px-5 py-2.5 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2 shadow-xs cursor-pointer min-h-[42px]"
              >
                <Mail className="w-4 h-4 text-white" />
                <span>Email Coordinator</span>
              </a>
            </div>
          </div>
        </div>

        {/* Preview of Volunteer Programs */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-serif font-bold text-[#002B66]">
              Key Service Areas at Mysore School
            </h3>
            <p className="text-xs text-[#64748B]">
              Preview the ongoing community initiatives where volunteers contribute:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {volunteerPrograms.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-3 hover:border-[#002B66] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#F0F4F8] text-[#002B66]">
                      <Icon className="w-5 h-5 text-[#002B66]" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#FF6600]/10 text-[#FF6600] border border-[#FF6600]/20">
                      {prog.tag}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#002B66]">
                    {prog.title}
                  </h4>
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    {prog.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location Footer Note */}
        <div className="p-5 rounded-2xl bg-[#F0F4F8] border border-[#CBD5E1] text-center space-y-2 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#002B66] font-bold text-xs uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-[#FF6600]" />
            <span>Mysore Campus Address</span>
          </div>
          <p className="text-xs text-[#4A5568]">
            Ananda Marga Primary School, Kaamana Kere Hundi, Near TVS Factory, Kadakola Post, Mysore, Karnataka - 571311
          </p>
        </div>
      </div>
    </section>
  );
};

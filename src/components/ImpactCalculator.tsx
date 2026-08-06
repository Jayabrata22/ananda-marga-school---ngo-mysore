import React, { useState } from 'react';
import { CurrencyRate } from '../types';
import { Droplets, BookOpen, HeartPulse, Utensils, Sparkles, Check } from 'lucide-react';

interface ImpactCalculatorProps {
  currencyRate?: CurrencyRate;
  onSelectAmount: (amountINR: number) => void;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({
  onSelectAmount,
}) => {
  const [sliderVal, setSliderVal] = useState(2500);

  const formatAmount = (inrVal: number) => {
    return `₹${inrVal.toLocaleString()}`;
  };

  const calculateImpacts = (inrVal: number) => {
    return [
      {
        icon: Utensils,
        title: 'Free Midday Meals',
        stat: `${Math.max(1, Math.floor(inrVal / 25))} Meals`,
        desc: `nutritious midday meals cooked fresh for Mysore school students.`,
        color: 'text-[#556B2F] bg-[#F7F3EA] border-[#E6E1D6]',
      },
      {
        icon: BookOpen,
        title: 'School Kits & Books',
        stat: `${Math.max(1, Math.floor(inrVal / 500))} Students`,
        desc: `equipped with notebooks, textbooks, uniforms & science kits.`,
        color: 'text-[#CC7A5C] bg-[#F7F3EA] border-[#E6E1D6]',
      },
      {
        icon: HeartPulse,
        title: 'Free Medical Camps',
        stat: `${Math.max(1, Math.floor(inrVal / 250))} Patients`,
        desc: `provided with free checkups, eye testing & basic medicines.`,
        color: 'text-[#2F4F4F] bg-[#F7F3EA] border-[#E6E1D6]',
      },
      {
        icon: Droplets,
        title: 'Clean Drinking Water',
        stat: `${Math.max(1, Math.floor(inrVal / 100))} Days`,
        desc: `of purified RO drinking water supplied to primary school blocks.`,
        color: 'text-[#556B2F] bg-[#F7F3EA] border-[#E6E1D6]',
      },
    ];
  };

  const impacts = calculateImpacts(sliderVal);

  return (
    <div className="bg-[#556B2F] text-white rounded-[32px] p-6 sm:p-10 shadow-lg relative overflow-hidden border border-[#E6E1D6]">
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7F3EA] text-[#556B2F] font-bold text-xs uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5 text-[#CC7A5C]" /> Interactive Impact Calculator
        </span>
        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
          See What Your Gift Can Achieve in Mysore
        </h3>
        <p className="text-[#E2DFD4] text-sm sm:text-base font-sans">
          Adjust the slider to see how direct contributions nurture education and community service in Mysore, Karnataka.
        </p>
      </div>

      {/* Slider Controls */}
      <div className="max-w-2xl mx-auto bg-[#FDFBF7] text-[#333333] p-6 sm:p-8 rounded-[28px] border border-[#E6E1D6] mb-8 space-y-6 shadow-md">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B8B7A]">Contribution Level (INR)</span>
          <span className="text-3xl sm:text-4xl font-serif font-bold text-[#2F4F4F]">
            {formatAmount(sliderVal)}
          </span>
        </div>

        <input
          type="range"
          min="500"
          max="25000"
          step="500"
          value={sliderVal}
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full h-3 bg-[#E2DFD4] rounded-lg appearance-none cursor-pointer accent-[#CC7A5C]"
        />

        <div className="flex justify-between text-xs text-[#6B6B5E] font-medium">
          <span>{formatAmount(500)}</span>
          <span>{formatAmount(5000)}</span>
          <span>{formatAmount(15000)}</span>
          <span>{formatAmount(25000)}</span>
        </div>

        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {[500, 1000, 2500, 5000, 10000].map((preset) => (
            <button
              key={preset}
              onClick={() => setSliderVal(preset)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border cursor-pointer ${
                sliderVal === preset
                  ? 'bg-[#CC7A5C] text-white border-[#CC7A5C]'
                  : 'bg-[#F7F3EA] text-[#2F4F4F] border-[#E6E1D6] hover:bg-[#E2DFD4]'
              }`}
            >
              {formatAmount(preset)}
            </button>
          ))}
        </div>
      </div>

      {/* Impact Outcomes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {impacts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#FDFBF7] text-[#333333] border border-[#E6E1D6] p-5 rounded-[24px] flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B8B7A]">{item.title}</p>
                <p className="text-xl font-serif font-bold text-[#2F4F4F] mt-1">{item.stat}</p>
                <p className="text-xs text-[#6B6B5E] mt-1 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={() => onSelectAmount(sliderVal)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#CC7A5C] hover:bg-[#b86d52] text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Donate {formatAmount(sliderVal)} Now</span>
        </button>
      </div>
    </div>
  );
};

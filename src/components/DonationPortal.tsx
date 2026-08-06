import React, { useState } from 'react';
import { Cause, Currency, DonationFrequency, DonationRecord } from '../types';
import { MOCK_CAUSES, CURRENCY_RATES, INITIAL_RECENT_DONATIONS } from '../data/mockData';
import { saveDonation, getSavedDonations } from '../utils/storage';
import { ReceiptModal } from './ReceiptModal';
import { sanitizeText, sanitizeEmail, sanitizeAmount, sanitizeReferenceNumber } from '../utils/security';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Heart, 
  CreditCard, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Gift, 
  Users,
  Building2,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Smartphone,
  Download,
  ExternalLink,
  ArrowRight,
  AlertCircle,
  UserCheck
} from 'lucide-react';

interface DonationPortalProps {
  currency?: Currency;
  setCurrency?: (c: Currency) => void;
  preselectedCauseId?: string;
  initialAmountINR?: number;
}

export const DonationPortal: React.FC<DonationPortalProps> = ({
  preselectedCauseId,
  initialAmountINR,
}) => {
  // Selected cause
  const [selectedCauseId, setSelectedCauseId] = useState<string>(
    preselectedCauseId || MOCK_CAUSES[0].id
  );

  // Donation form state
  const [frequency, setFrequency] = useState<DonationFrequency>('one-time');
  const [amountINR, setAmountINR] = useState<number>(initialAmountINR || 1000);
  const [customAmountStr, setCustomAmountStr] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Donor fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [honoreeName, setHonoreeName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank' | 'card'>('upi');

  // Official Verified Details from Ananda Marga Welfare Society Documents
  const officialUpiId = 'qr.139131093648460076@sbi';
  const officialAccountNo = '44052849230';
  const officialIfsc = 'SBIN0016499';
  const officialMicr = '570002016';
  const officialTrustName = 'Ananda Marga Welfare Society';
  const officialSchoolName = 'Ananda Marga Primary School';
  const officialBankBranch = 'State Bank of India, N.R. Mohalla-Mysuru (Branch Code: 16499)';

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');

  // Processing & Receipt
  const [isProcessing, setIsProcessing] = useState(false);
  const [latestDonation, setLatestDonation] = useState<DonationRecord | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  const selectedCause = MOCK_CAUSES.find((c) => c.id === selectedCauseId) || MOCK_CAUSES[0];

  const presetINRs = [500, 1000, 2500, 5000, 10000];

  const formatCurrency = (inrVal: number) => {
    return `₹${inrVal.toLocaleString()}`;
  };

  const handlePresetSelect = (inrVal: number) => {
    setIsCustom(false);
    setAmountINR(inrVal);
    setCustomAmountStr('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmountStr(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmountINR(parsed);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(officialUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(officialAccountNo);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleCopyIfsc = () => {
    navigator.clipboard.writeText(officialIfsc);
    setCopiedIfsc(true);
    setTimeout(() => setCopiedIfsc(false), 2500);
  };

  const isEmailValid = Boolean(sanitizeEmail(donorEmail));
  const isNameValid = Boolean(isAnonymous || donorName.trim().length > 0);
  const isDetailsFilled = isEmailValid && isNameValid;

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required donor details first
    const cleanName = sanitizeText(donorName, 100);
    if (!cleanName && !isAnonymous) {
      alert('Please fill in your Full Name first before proceeding with payment.');
      const nameEl = document.getElementById('donorNameInput');
      if (nameEl) {
        nameEl.focus();
        nameEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const cleanEmail = sanitizeEmail(donorEmail);
    if (!cleanEmail) {
      alert('Please fill in a valid Email Address first to receive your 80G tax receipt.');
      const emailEl = document.getElementById('donorEmailInput');
      if (emailEl) {
        emailEl.focus();
        emailEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const cleanAmount = sanitizeAmount(amountINR, 10, 1000000);
    const cleanHonoree = sanitizeText(honoreeName, 100);
    const cleanUtr = sanitizeReferenceNumber(utrNumber, 30);

    setIsProcessing(true);

    setTimeout(() => {
      const receiptNo = `AM80G-${Math.floor(100000 + Math.random() * 900000)}`;
      const taxId = paymentMethod === 'upi' ? `80G-PAN-AAATA0123F-UTR-${cleanUtr || 'VERIFIED'}` : '80G-PAN-AAATA0123F';

      const formatted = formatCurrency(cleanAmount) + (frequency === 'monthly' ? '/mo' : '');

      const newRecord: DonationRecord = {
        id: `don-${Date.now()}`,
        donorName: isAnonymous ? 'Anonymous' : cleanName || 'Kind Supporter',
        donorEmail: cleanEmail,
        amountUSD: Math.round(cleanAmount / 83.5),
        currency: 'INR',
        formattedAmount: formatted,
        frequency: frequency,
        causeId: selectedCause.id,
        causeTitle: selectedCause.title,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isAnonymous: isAnonymous,
        honoreeName: cleanHonoree || undefined,
        receiptNumber: receiptNo,
        taxDeductibleId: taxId,
      };

      saveDonation(newRecord);
      setLatestDonation(newRecord);
      setIsProcessing(false);
      setReceiptModalOpen(true);
    }, 1500);
  };

  const savedDonations = getSavedDonations();

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7F3EA] text-[#556B2F] font-bold text-xs uppercase tracking-[0.2em] border border-[#E6E1D6]">
            <Heart className="w-3.5 h-3.5 text-[#CC7A5C] fill-[#CC7A5C]" /> Official Ananda Marga & AMURT Donation Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2F4F4F]">
            Support Relief & Service Projects
          </h1>
          <p className="text-[#6B6B5E] text-base sm:text-lg leading-relaxed font-sans">
            100% of non-overhead funds go directly to verified clean water, education, medical camps, and emergency flood relief. Instant 80G / 501(c)(3) tax exemption receipt provided.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Donation Form Panel (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7F3EA] rounded-[32px] p-6 sm:p-8 border border-[#E6E1D6] shadow-sm space-y-8">
            <form onSubmit={handleSubmitDonation} className="space-y-8">
              {/* Step 1: Select Frequency */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B8B7A] mb-3">
                  1. Choose Giving Frequency
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FDFBF7] rounded-full border border-[#E6E1D6]">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      frequency === 'one-time'
                        ? 'bg-[#556B2F] text-white shadow-xs'
                        : 'text-[#5A5A40] hover:text-[#2F4F4F]'
                    }`}
                  >
                    One-Time Gift
                  </button>

                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all relative cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-[#CC7A5C] text-white shadow-xs'
                        : 'text-[#5A5A40] hover:text-[#2F4F4F]'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-white fill-white" /> Monthly Circle
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 2: Choose Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
                    2. Select Donation Amount (INR)
                  </label>
                  <div className="text-xs text-[#002B66] font-bold flex items-center gap-1 bg-[#F0F4F8] px-2.5 py-1 rounded-full border border-[#CBD5E1]">
                    <Globe className="w-3.5 h-3.5 text-[#003399]" />
                    <span>Currency: INR (₹)</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5 mb-3">
                  {presetINRs.map((preset) => {
                    const isSelected = !isCustom && amountINR === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetSelect(preset)}
                        className={`py-3 px-1.5 sm:px-2 rounded-2xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#002B66] text-white border-[#002B66] shadow-xs'
                            : 'bg-[#F0F4F8] text-[#002B66] border-[#CBD5E1] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        {formatCurrency(preset)}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter Custom Amount in INR"
                    value={customAmountStr}
                    onChange={(e) => {
                      setIsCustom(true);
                      handleCustomChange(e);
                    }}
                    className={`w-full pl-9 pr-4 py-3 bg-white border rounded-2xl text-sm font-bold text-[#002B66] focus:outline-hidden ${
                      isCustom ? 'border-[#002B66] ring-2 ring-[#002B66]/20' : 'border-[#CBD5E1]'
                    }`}
                  />
                </div>

                {/* Tangible Impact Banner */}
                <div className="mt-4 p-4 rounded-2xl bg-[#F0F4F8] border border-[#CBD5E1] text-xs text-[#002B66] flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#002B66]">Tangible Impact for {formatCurrency(amountINR)}:</p>
                    <p className="text-[#4A5568] mt-0.5">{selectedCause.impactMetrics}</p>
                  </div>
                </div>
              </div>

              {/* Step 4: Donor Contact & Options */}
              {/* Step 3: Donor Information */}
              <div className="space-y-4 pt-2 border-t border-[#E6E1D6]">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B8B7A]">
                  3. Donor Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A40] mb-1">Full Name *</label>
                    <input
                      id="donorNameInput"
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required={!isAnonymous}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#CBD5E1] bg-white text-sm text-[#002B66] focus:outline-hidden focus:border-[#002B66] focus:ring-2 focus:ring-[#002B66]/20 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A40] mb-1">Email Address (for 80G tax receipt) *</label>
                    <input
                      id="donorEmailInput"
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#CBD5E1] bg-white text-sm text-[#002B66] focus:outline-hidden focus:border-[#002B66] focus:ring-2 focus:ring-[#002B66]/20 font-bold"
                    />
                  </div>
                </div>

                {/* Honoree Dedication */}
                <div>
                  <label className="block text-xs font-semibold text-[#5A5A40] mb-1">
                    Dedicate this gift (Optional)
                  </label>
                  <input
                    type="text"
                    value={honoreeName}
                    onChange={(e) => setHonoreeName(e.target.value)}
                    placeholder="In honor of or memory of someone special"
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#FDFBF7] text-sm text-[#333333] focus:outline-hidden focus:border-[#556B2F]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="anonymousCheck"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-[#556B2F] rounded-md border-[#E6E1D6] focus:ring-[#556B2F] cursor-pointer"
                  />
                  <label htmlFor="anonymousCheck" className="text-xs text-[#6B6B5E] cursor-pointer">
                    Make this donation anonymous on public donor walls.
                  </label>
                </div>
              </div>

              {/* Step 4: Payment Method Selector (UPI, Direct Bank Transfer & Card) */}
              <div className="space-y-4 pt-2 border-t border-[#CBD5E1]">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
                  4. Payment Method
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'upi', label: 'UPI / Scan QR', icon: QrCode, badge: 'Instant' },
                    { id: 'bank', label: 'SBI Bank Transfer', icon: Building2, badge: 'NEFT/RTGS' },
                    { id: 'card', label: 'Card Payment', icon: CreditCard },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-colors cursor-pointer relative ${
                          paymentMethod === pm.id
                            ? 'border-[#002B66] bg-[#002B66] text-white shadow-sm'
                            : 'border-[#CBD5E1] bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#002B66]'
                        }`}
                      >
                        {pm.badge && (
                          <span className={`absolute -top-2 px-2 py-0.5 text-white text-[9px] uppercase tracking-wider rounded-full font-sans font-bold ${
                            paymentMethod === pm.id ? 'bg-[#FF6600]' : 'bg-[#003399]'
                          }`}>
                            {pm.badge}
                          </span>
                        )}
                        <Icon className={`w-5 h-5 ${paymentMethod === pm.id ? 'text-[#FFD700]' : 'text-[#002B66]'}`} />
                        <span>{pm.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Option 1: UPI Scan & Pay Section */}
                {paymentMethod === 'upi' && (
                  <div className="bg-[#F0F4F8] border-2 border-[#002B66] p-6 rounded-3xl space-y-6 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#CBD5E1]">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-[#002B66]" />
                        <div>
                          <h3 className="font-serif font-bold text-base text-[#002B66]">SBI Scan & Pay UPI QR</h3>
                          <p className="text-[11px] text-[#64748B]">Google Pay, PhonePe, Paytm, BHIM, Yono SBI, SBI Pay</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF6600] text-white text-[10px] font-bold uppercase tracking-wider">
                        Official SBI UPI
                      </span>
                    </div>

                    {!isDetailsFilled ? (
                      /* Prompt to fill details first if blank */
                      <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-[#FF6600] text-center space-y-4 shadow-sm">
                        <div className="w-12 h-12 bg-[#FF6600]/10 text-[#FF6600] rounded-full flex items-center justify-center mx-auto">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-base text-[#002B66]">
                            Please Fill Your Name & Email Details First
                          </h4>
                          <p className="text-xs text-[#4A5568] leading-relaxed max-w-md mx-auto">
                            To open PhonePe / GPay or scan the UPI QR code, please enter your <strong>Full Name</strong> and <strong>Email Address</strong> in Step 3 above. Your email is required to issue your instant 80G Tax Exemption Receipt.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const nameEl = document.getElementById('donorNameInput');
                            if (nameEl) {
                              nameEl.focus();
                              nameEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }}
                          className="px-6 py-3 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer inline-flex items-center gap-2 animate-bounce"
                        >
                          <UserCheck className="w-4 h-4 text-white" />
                          <span>Fill Name & Email First</span>
                        </button>
                      </div>
                    ) : (
                      /* Active QR & Payment launcher unlocked */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Left: QR Code Display Container */}
                        <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] text-center space-y-3 shadow-xs max-w-xs mx-auto md:mx-0">
                          <div className="space-y-0.5">
                            <p className="text-[11px] font-extrabold text-[#002B66] uppercase tracking-wider">
                              State Bank of India (SBI)
                            </p>
                            <p className="text-[10px] font-bold text-[#FF6600] uppercase tracking-wider">
                              Ananda Marga Welfare Society
                            </p>
                          </div>

                          {/* Real Scannable UPI QR Code */}
                          <div className="bg-[#F8F9FA] p-3 rounded-2xl border-2 border-[#002B66] flex flex-col justify-center items-center relative group">
                            <QRCodeSVG
                              value={`upi://pay?pa=${officialUpiId}&pn=ANANDA%20MARGA%20WELFARE%20SOCIETY&am=${amountINR}&cu=INR&tn=${encodeURIComponent('Donation for ' + selectedCause.title)}`}
                              size={180}
                              level="M"
                              marginSize={2}
                              bgColor="#FFFFFF"
                              fgColor="#002B66"
                              className="rounded-lg shadow-xs"
                            />

                            <div className="flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-[#CBD5E1] w-full">
                              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                              <span className="text-[10px] font-bold text-[#002B66] uppercase tracking-wider">
                                Scan with GPay, PhonePe, Paytm, BHIM
                              </span>
                            </div>
                          </div>

                          <div className="text-center space-y-0.5 pt-1">
                            <p className="font-serif font-bold text-xs text-[#002B66] uppercase">Ananda Marga Welfare Society Mysore</p>
                            <p className="text-sm font-mono font-bold text-[#FF6600]">
                              Amount to Pay: ₹{amountINR.toLocaleString()} INR
                            </p>
                          </div>
                        </div>

                        {/* Right: Copyable UPI ID, App Launcher & UTR Entry */}
                        <div className="space-y-4">
                          {/* Copy UPI ID Box */}
                          <div className="bg-white p-4 rounded-2xl border border-[#CBD5E1] space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Official SBI UPI ID</span>
                            <div className="flex items-center justify-between gap-2 bg-[#F0F4F8] p-2.5 rounded-xl border border-[#CBD5E1]">
                              <span className="font-mono font-bold text-xs text-[#002B66] select-all truncate">
                                {officialUpiId}
                              </span>
                              <button
                                type="button"
                                onClick={handleCopyUpi}
                                className="px-3 py-1.5 bg-[#002B66] hover:bg-[#001D47] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                              >
                                {copiedUpi ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#FFD700]" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-[11px] text-[#4A5568]">
                              Open BHIM / GPay / PhonePe / Paytm / Yono SBI and pay directly to <strong>{officialUpiId}</strong>
                            </p>
                          </div>

                          {/* Pay via Mobile App direct launcher */}
                          <a
                            href={`upi://pay?pa=${officialUpiId}&pn=Ananda Marga Welfare Society&am=${amountINR}&cu=INR&tn=Donation for ${encodeURIComponent(selectedCause.title)}`}
                            className="w-full py-2.5 px-4 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center shadow-xs"
                          >
                            <Smartphone className="w-4 h-4 text-white" />
                            <span>Tap to Open UPI App on Mobile</span>
                            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                          </a>

                          {/* UPI UTR / Transaction ID Field */}
                          <div className="space-y-1 pt-1">
                            <label className="block text-xs font-semibold text-[#002B66]">
                              Enter UPI Transaction Ref / UTR No. (12-Digits)
                            </label>
                            <input
                              type="text"
                              maxLength={16}
                              placeholder="e.g. 421890123456"
                              value={utrNumber}
                              onChange={(e) => setUtrNumber(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-2xl border border-[#CBD5E1] bg-white font-mono text-xs text-[#002B66] focus:outline-hidden focus:border-[#002B66]"
                            />
                            <p className="text-[10px] text-[#64748B]">
                              Available in your GPay / PhonePe / Paytm payment status receipt screen.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Option 2: SBI Bank Transfer (NEFT / RTGS / IMPS) */}
                {paymentMethod === 'bank' && (
                  <div className="bg-[#F0F4F8] border-2 border-[#002B66] p-6 rounded-3xl space-y-6 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#CBD5E1]">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#002B66]" />
                        <div>
                          <h3 className="font-serif font-bold text-base text-[#002B66]">Official SBI Bank Account</h3>
                          <p className="text-[11px] text-[#64748B]">NEFT, RTGS, IMPS & Direct Net Banking Transfers</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#002B66] text-white text-[10px] font-bold uppercase tracking-wider">
                        State Bank of India
                      </span>
                    </div>

                    {/* Bank Details Table Card */}
                    <div className="bg-white rounded-2xl p-5 border border-[#CBD5E1] space-y-4 shadow-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E2E8F0] space-y-1">
                          <span className="text-[10px] font-bold uppercase text-[#64748B]">Trust Name (Beneficiary)</span>
                          <p className="font-serif font-bold text-sm text-[#002B66]">{officialTrustName}</p>
                          <p className="text-[10px] text-[#4A5568] font-sans">Ananda Marga Primary School, Mysore</p>
                        </div>

                        <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E2E8F0] space-y-1">
                          <span className="text-[10px] font-bold uppercase text-[#64748B]">Bank Name & Branch</span>
                          <p className="font-bold text-xs text-[#002B66]">State Bank of India (SBI)</p>
                          <p className="text-[10px] text-[#4A5568]">N.R. Mohalla-Mysuru (Code: 16499)</p>
                        </div>
                      </div>

                      {/* Account No & IFSC Grid with Copy Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-[#002B66] text-white rounded-xl space-y-1 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#FFD700]">Account Number</span>
                            <p className="font-mono font-bold text-base text-white">{officialAccountNo}</p>
                            <p className="text-[9px] text-white/80">Current Account (CA-REGULAR)</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyAccount}
                            className="px-3 py-1.5 bg-[#FF6600] hover:bg-[#e65c00] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            {copiedAccount ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="p-3 bg-[#002B66] text-white rounded-xl space-y-1 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#FFD700]">IFSC Code</span>
                            <p className="font-mono font-bold text-base text-white">{officialIfsc}</p>
                            <p className="text-[9px] text-white/80">MICR Code: {officialMicr}</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyIfsc}
                            className="px-3 py-1.5 bg-[#FF6600] hover:bg-[#e65c00] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            {copiedIfsc ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#4A5568] space-y-1 pt-1 border-t border-[#E2E8F0]">
                        <p><strong>Branch Address:</strong> No. 4 Rajendranagar Mainroad, N.R. Mohalla, Mysuru, Karnataka - 570007</p>
                        <p><strong>Trust Email:</strong> anandvitamohaacharya@gmail.com | <strong>Branch Phone:</strong> 0821-2495055</p>
                        <p className="text-[#FF6600] font-bold pt-1">
                          "GOD THANK INDEED" — All trust accounts are registered and verified under 80G Tax Exemption.
                        </p>
                      </div>
                    </div>

                    {/* UTR Reference Input for Bank Transfer */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#002B66]">
                        Enter Bank UTR / NEFT / IMPS Reference Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. N08224012345678"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl border border-[#CBD5E1] bg-white font-mono text-xs text-[#002B66] focus:outline-hidden focus:border-[#002B66]"
                      />
                      <p className="text-[10px] text-[#64748B]">
                        Found in your bank net banking or mobile banking transfer confirmation email/SMS.
                      </p>
                    </div>
                  </div>
                )}

                {/* Option 3: Card Payment */}
                {paymentMethod === 'card' && (
                  <div className="bg-[#F0F4F8] border border-[#CBD5E1] p-5 rounded-2xl text-xs space-y-2 text-[#4A5568]">
                    <p className="flex items-center gap-2 font-bold text-[#002B66]">
                      <Lock className="w-4 h-4 text-[#FF6600]" />
                      256-Bit Encrypted Debit / Credit Card Payment
                    </p>
                    <p className="text-[11px]">
                      Secure gateway supports Visa, Mastercard, RuPay & Maestro. An official 80G tax receipt will be issued immediately.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing & Verifying Gift...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white/30 text-white" />
                    <span>
                      {paymentMethod === 'upi'
                        ? 'Verify UPI Payment & Get 80G Receipt'
                        : paymentMethod === 'bank'
                        ? 'Verify Bank Transfer & Get 80G Receipt'
                        : `Complete Gift of ${formatCurrency(amountINR)}`}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Sidebar: Selected Cause Details & Live Donor Wall (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mysore School Fund Spotlight */}
            <div className="bg-[#F7F3EA] rounded-[32px] p-6 border border-[#E6E1D6] overflow-hidden space-y-4 shadow-sm">
              <div className="relative h-48 rounded-[24px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                  alt="Ananda Marga School Mysore"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e2e]/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="px-3 py-0.5 rounded-full bg-[#556B2F] text-[10px] font-bold uppercase tracking-widest">
                    Mysore Campus & Relief
                  </span>
                  <h3 className="font-serif font-bold text-lg mt-1">Ananda Marga School Development Fund</h3>
                  <p className="text-xs text-[#E2DFD4]">Mysore, Karnataka, India</p>
                </div>
              </div>

              <p className="text-xs text-[#6B6B5E] leading-relaxed font-sans">
                Your contributions directly fund student midday meals, solar power infrastructure, computer lab hardware, and rural school bus transportation.
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#556B2F]">Raised: ₹18,50,000</span>
                  <span className="text-[#8B8B7A]">Goal: ₹25,00,000</span>
                </div>
                <div className="w-full bg-[#E2DFD4] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#556B2F] h-full rounded-full"
                    style={{ width: '74%' }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#8B8B7A]">
                  <span>1,420 Generous Donors</span>
                  <span>74% funded</span>
                </div>
              </div>
            </div>

            {/* Donor Wall Ticker */}
            <div className="bg-[#F7F3EA] rounded-[32px] p-6 border border-[#E6E1D6] space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D6]">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#556B2F]" />
                  <h4 className="font-serif font-bold text-sm text-[#2F4F4F]">Recent Community Donors</h4>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E2DFD4] text-[#556B2F] px-2.5 py-0.5 rounded-full">
                  Live
                </span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {/* Local user saved donations first */}
                {savedDonations.map((d) => (
                  <div key={d.id} className="p-3 bg-[#FDFBF7] border border-[#E6E1D6] rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#2F4F4F]">{d.donorName}</p>
                      <p className="text-[11px] text-[#8B8B7A]">{d.causeTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-bold text-[#556B2F]">{d.formattedAmount}</p>
                      <p className="text-[10px] text-[#8B8B7A]">Just now</p>
                    </div>
                  </div>
                ))}

                {INITIAL_RECENT_DONATIONS.map((rd, i) => (
                  <div key={i} className="p-3 bg-[#FDFBF7] rounded-2xl border border-[#E6E1D6]/60 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#2F4F4F]">{rd.donorName}</p>
                      <p className="text-[11px] text-[#8B8B7A]">{rd.causeTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-bold text-[#2F4F4F]">${rd.amount}</p>
                      <p className="text-[10px] text-[#8B8B7A]">{rd.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transparency Trust Card */}
            <div className="bg-[#2F4F4F] text-[#FDFBF7] p-6 rounded-[32px] space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-[#CC7A5C] font-bold text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> 100% Direct Impact & 80G Tax Exemption
              </div>
              <p className="text-xs text-[#E2DFD4] leading-relaxed font-sans">
                Ananda Marga Pracaraka Samgha & AMURT are registered non-profit organizations. All UPI and online contributions are eligible for 80G tax exemption certificates in India and 501(c)(3) in US.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Receipt Modal */}
      <ReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        donation={latestDonation}
      />
    </section>
  );
};

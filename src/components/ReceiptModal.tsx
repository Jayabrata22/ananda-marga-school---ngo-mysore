import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DonationRecord } from '../types';
import { sanitizeText, escapeHtml } from '../utils/security';
import { CheckCircle2, Download, Printer, Share2, X, Heart, Shield, Sparkles, Building2, ExternalLink } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: DonationRecord | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, donation }) => {
  if (!isOpen || !donation) return null;

  const handlePrint = () => {
    window.print();
  };

  // Generate downloadable receipt text blob link
  const receiptDownloadUrl = useMemo(() => {
    if (!donation) return '';
    const cleanDonorName = sanitizeText(donation.isAnonymous ? 'Anonymous Supporter' : donation.donorName, 100);
    const cleanDonorEmail = sanitizeText(donation.donorEmail, 100);
    const cleanCauseTitle = sanitizeText(donation.causeTitle, 150);
    const cleanHonoreeName = donation.honoreeName ? sanitizeText(donation.honoreeName, 100) : '';

    const textContent = `
====================================================================
           ANANDA MARGA WELFARE SOCIETY - OFFICIAL RECEIPT
       Ananda Marga Primary School, Mysore Campus, Karnataka
       SBI A/C: 44052849230 | IFSC: SBIN0016499 | 80G Tax Exempt
====================================================================

RECEIPT NUMBER:   ${donation.receiptNumber}
DATE OF ISSUE:    ${donation.date}
TRUST NAME:       Ananda Marga Welfare Society
TAX DEDUCTIBLE ID: ${donation.taxDeductibleId} (80G Tax Exempt Certificate)

DONOR DETAILS:
- Name:           ${cleanDonorName}
- Email:          ${cleanDonorEmail}
${cleanHonoreeName ? `- Honoree Dedication: In honor of ${cleanHonoreeName}\n` : ''}
DONATION SUMMARY:
- Designated Cause: ${cleanCauseTitle}
- Contribution:    ${donation.formattedAmount} (${donation.frequency.toUpperCase()})
- Currency:        ${donation.currency}

OFFICIAL BANKING DETAILS (STATE BANK OF INDIA):
- Beneficiary:     Ananda Marga Welfare Society
- SBI Account No:  44052849230
- IFSC Code:       SBIN0016499
- MICR Code:       570002016
- Branch Name:     N.R. Mohalla-Mysuru (Code: 16499)
- Trust Email:     anandvitamohaacharya@gmail.com

IMPACT CERTIFICATION:
Ananda Marga Welfare Society & AMURT certify that 100% of non-overhead
funds from this donation are directly allocated towards Neohumanist primary
school infrastructure in Mysore, clean water, midday meals, and student welfare.

"GOD THANK INDEED"
Thank you for your noble support and commitment to universal service!
====================================================================
`.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    return URL.createObjectURL(blob);
  }, [donation]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f3434]/80 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-[32px] shadow-2xl border border-[#E6E1D6] overflow-hidden my-8"
        >
          {/* Top Bar with Ananda Marga Brand Theme */}
          <div className="bg-[#002B66] text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-[#CBD5E1] hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close receipt modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3.5 mb-2">
              <div className="p-2.5 bg-[#FF6600] rounded-2xl shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
                  Official Trust Receipt • 80G Tax Exemption
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Ananda Marga Welfare Society
                </h2>
              </div>
            </div>
            <p className="text-[#CBD5E1] text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Ananda Marga Primary School, Mysore. Contribution verified under SBI A/C: <strong>44052849230</strong> (IFSC: SBIN0016499).
            </p>
          </div>

          {/* Printable Receipt Body */}
          <div className="p-6 sm:p-8 space-y-6" id="printable-donation-receipt">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#F0F4F8] rounded-2xl border border-[#CBD5E1] gap-4">
              <div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Receipt Reference Number</p>
                <p className="text-base font-mono font-bold text-[#002B66]">{donation.receiptNumber}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">80G Tax Exempt ID</p>
                <p className="text-xs font-mono font-bold text-[#FF6600]">{donation.taxDeductibleId}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-2xl border border-[#CBD5E1] bg-[#F0F4F8]/60">
                <p className="text-[10px] text-[#64748B] font-bold uppercase mb-1">Donor Details</p>
                <p className="font-bold text-[#002B66] text-sm">{donation.isAnonymous ? 'Anonymous Supporter' : donation.donorName}</p>
                <p className="text-[#4A5568] mt-0.5">{donation.donorEmail}</p>
              </div>

              <div className="p-4 rounded-2xl border border-[#CBD5E1] bg-[#F0F4F8]/60">
                <p className="text-[10px] text-[#64748B] font-bold uppercase mb-1">Frequency & Issue Date</p>
                <p className="font-bold text-[#002B66] text-sm capitalize">{donation.frequency} Contribution</p>
                <p className="text-[#4A5568] mt-0.5">Issued: {donation.date}</p>
              </div>
            </div>

            {/* Allocated Cause & Amount */}
            <div className="border-2 border-[#002B66] bg-[#F0F4F8] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-[#CBD5E1]">
                <div>
                  <p className="text-[10px] font-bold text-[#002B66] uppercase tracking-wider">Designated School / Relief Cause</p>
                  <p className="font-serif font-bold text-[#002B66] text-lg mt-0.5">{donation.causeTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#002B66] uppercase tracking-wider">Total Gift</p>
                  <p className="text-2xl font-serif font-bold text-[#FF6600]">{donation.formattedAmount}</p>
                </div>
              </div>

              {donation.honoreeName && (
                <div className="text-xs text-[#002B66] bg-white p-3 rounded-xl flex items-center gap-2 border border-[#CBD5E1]">
                  <Heart className="w-4 h-4 text-[#FF6600] fill-[#FF6600] shrink-0" />
                  <span>Dedicated in honor of: <strong>{donation.honoreeName}</strong></span>
                </div>
              )}
            </div>

            {/* Verified Bank Box */}
            <div className="p-4 bg-white border border-[#CBD5E1] rounded-2xl text-xs space-y-1.5 text-[#1A202C]">
              <div className="flex items-center gap-2 text-[#002B66] font-bold">
                <Building2 className="w-4 h-4 text-[#FF6600]" />
                <span>Verified Beneficiary Account: Ananda Marga Welfare Society</span>
              </div>
              <p className="text-[11px] text-[#4A5568] font-mono">
                SBI A/C: 44052849230 | IFSC: SBIN0016499 | Branch: N.R. Mohalla-Mysuru (16499)
              </p>
              <p className="text-[10px] text-[#64748B] italic">"GOD THANK INDEED"</p>
            </div>
          </div>

          {/* Action Bar with Downloadable Receipt Link */}
          <div className="bg-[#F0F4F8] px-6 py-5 border-t border-[#CBD5E1] flex flex-wrap gap-3 justify-between items-center">
            {/* Downloadable Link */}
            <a
              href={receiptDownloadUrl}
              download={`Ananda_Marga_Tax_Receipt_${donation.receiptNumber}.txt`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#002B66] hover:bg-[#001D47] rounded-full transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FFD700]" />
              <span>Download Official Receipt (.txt)</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#002B66] bg-white border border-[#CBD5E1] hover:bg-[#E2E8F0] rounded-full transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#002B66]" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#FF6600] hover:bg-[#e65c00] rounded-full transition-colors cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


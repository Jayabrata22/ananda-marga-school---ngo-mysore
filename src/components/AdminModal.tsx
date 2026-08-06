import React, { useState } from 'react';
import { Lock, X, CheckCircle2, ShieldCheck, Key, User, LogOut, AlertTriangle } from 'lucide-react';
import { sanitizeText, securityLimiter } from '../utils/security';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLogin: (id: string, pass: string) => boolean;
  onLogout: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onLogin,
  onLogout,
}) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Check Rate Limiter (Max 5 attempts per 60s)
    const rateCheck = securityLimiter.isAllowed('admin_login_attempt', 5, 60000);
    if (!rateCheck.allowed) {
      const remainingSec = Math.ceil(rateCheck.remainingMs / 1000);
      setErrorMsg(`Security Lockout: Too many failed login attempts. Please wait ${remainingSec} seconds.`);
      return;
    }

    const cleanId = sanitizeText(adminId, 50);
    const cleanPass = sanitizeText(password, 50);

    const success = onLogin(cleanId, cleanPass);
    if (success) {
      securityLimiter.reset('admin_login_attempt');
      setSuccessMsg('Admin authentication successful! You can now manage Mysore School Projects.');
      setTimeout(() => {
        setSuccessMsg('');
        setAdminId('');
        setPassword('');
        onClose();
      }, 1200);
    } else {
      setErrorMsg('Invalid Admin ID or Password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] rounded-[32px] max-w-md w-full p-6 sm:p-8 border border-[#E6E1D6] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#E2DFD4] text-[#2F4F4F] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#556B2F] text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CC7A5C]">
              Authorized Personnel
            </span>
            <h3 className="font-serif font-bold text-xl text-[#2F4F4F]">Admin Portal</h3>
          </div>
        </div>

        {isAdminLoggedIn ? (
          <div className="space-y-6 text-center">
            <div className="bg-[#F7F3EA] border border-[#556B2F] p-5 rounded-2xl space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#556B2F] mx-auto" />
              <p className="font-serif font-bold text-base text-[#2F4F4F]">Admin Mode Active</p>
              <p className="text-xs text-[#6B6B5E]">
                Logged in as <span className="font-bold text-[#2F4F4F]">admin</span>. You can now add, edit, or delete any project in the Mysore School Projects tab.
              </p>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-3 bg-[#CC7A5C] hover:bg-[#b86d52] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Admin</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#5A5A40] mb-1">Admin ID *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B8B7A]" />
                <input
                  type="text"
                  required
                  placeholder="Enter Admin ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5A5A40] mb-1">Password *</label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B8B7A]" />
                <input
                  type="password"
                  required
                  placeholder="Enter Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E6E1D6] bg-[#F7F3EA] text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#556B2F] hover:bg-[#435424] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>Log In as Admin</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

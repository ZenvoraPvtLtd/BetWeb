import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { messagesService } from '../../../../services/settings/messagesService';
import type { MessagesFormData } from '../../../../config/superAdmin/messages';

interface MessagesFormProps {
  initialData: MessagesFormData;
}

export const MessagesForm: React.FC<MessagesFormProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<MessagesFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof MessagesFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof MessagesFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      maintenanceEnabled: checked,
    }));
    if (!checked) {
      setErrors((prev) => ({
        ...prev,
        maintenanceMessage: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof MessagesFormData, string>> = {};

    if (!formData.headerMessage.trim()) {
      newErrors.headerMessage = 'Header Message is required.';
    }
    if (!formData.adminMessage.trim()) {
      newErrors.adminMessage = 'Admin Message is required.';
    }
    if (!formData.userMessage.trim()) {
      newErrors.userMessage = 'User Message is required.';
    }
    if (!formData.headerMessageLink.trim()) {
      newErrors.headerMessageLink = 'Header Message Link is required.';
    }
    if (formData.maintenanceEnabled && !formData.maintenanceMessage.trim()) {
      newErrors.maintenanceMessage =
        'Maintenance message is required when maintenance mode is active.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setShowSuccess(false);

    try {
      await messagesService.updateMessages(formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to submit messages form', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Toast alert banner */}
      {showSuccess && (
        <div className="mb-4 p-3 bg-[#131B2E] border border-emerald-500/40 text-emerald-300 rounded-[8px] text-xs flex items-center gap-2 select-none animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">Messages updated successfully.</span>
        </div>
      )}

      {/* Main input form layout */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-6 shadow-xl flex flex-col gap-6 select-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-5 text-left">
            {/* Header Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="headerMessage"
                className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
              >
                Header Message *
              </label>
              <input
                id="headerMessage"
                name="headerMessage"
                type="text"
                value={formData.headerMessage}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                  ${
                    errors.headerMessage
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[#233252]'
                  }
                `}
              />
              {errors.headerMessage && (
                <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                  <AlertCircle className="w-3 h-3" />
                  {errors.headerMessage}
                </span>
              )}
            </div>

            {/* Admin Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="adminMessage"
                className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
              >
                Admin Message *
              </label>
              <input
                id="adminMessage"
                name="adminMessage"
                type="text"
                value={formData.adminMessage}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                  ${
                    errors.adminMessage
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[#233252]'
                  }
                `}
              />
              {errors.adminMessage && (
                <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                  <AlertCircle className="w-3 h-3" />
                  {errors.adminMessage}
                </span>
              )}
            </div>

            {/* User Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="userMessage"
                className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
              >
                User Message *
              </label>
              <input
                id="userMessage"
                name="userMessage"
                type="text"
                value={formData.userMessage}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                  ${
                    errors.userMessage
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[#233252]'
                  }
                `}
              />
              {errors.userMessage && (
                <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                  <AlertCircle className="w-3 h-3" />
                  {errors.userMessage}
                </span>
              )}
            </div>

            {/* Submit Button (Desktop layout) */}
            <div className="hidden lg:block mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 h-[38px] rounded-[8px] text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white shadow-md shadow-orange-950/40 transition-colors cursor-pointer focus:outline-none"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 text-left">
            {/* Under Maintenance Message */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <input
                  id="maintenanceEnabled"
                  name="maintenanceEnabled"
                  type="checkbox"
                  checked={formData.maintenanceEnabled}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 rounded border-[#233252] bg-[#090E17] text-orange-500 focus:ring-orange-500 cursor-pointer focus:outline-none"
                />
                <label
                  htmlFor="maintenanceEnabled"
                  className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono cursor-pointer select-none"
                >
                  Under Maintenance Message *
                </label>
              </div>
              <input
                id="maintenanceMessage"
                name="maintenanceMessage"
                type="text"
                value={formData.maintenanceMessage}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                  ${
                    errors.maintenanceMessage
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[#233252]'
                  }
                  ${!formData.maintenanceEnabled ? 'opacity-50 cursor-not-allowed bg-[#070A10]' : ''}
                `}
                disabled={!formData.maintenanceEnabled}
              />
              {errors.maintenanceMessage && (
                <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                  <AlertCircle className="w-3 h-3" />
                  {errors.maintenanceMessage}
                </span>
              )}
            </div>

            {/* Header Message Link */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="headerMessageLink"
                className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
              >
                Header Message Link *
              </label>
              <input
                id="headerMessageLink"
                name="headerMessageLink"
                type="text"
                value={formData.headerMessageLink}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                  ${
                    errors.headerMessageLink
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[#233252]'
                  }
                `}
              />
              {errors.headerMessageLink && (
                <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                  <AlertCircle className="w-3 h-3" />
                  {errors.headerMessageLink}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Submit button (Mobile viewport) */}
        <div className="block lg:hidden w-full text-left">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[40px] rounded-[8px] text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md transition-all cursor-pointer focus:outline-none"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

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
    // Clear validation error dynamically
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
    // Reset maintenance message error when unchecked
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
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-[6px] text-xs flex items-center gap-2 select-none animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">Messages updated successfully.</span>
        </div>
      )}

      {/* Main input form layout */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-zinc-200 rounded-[8px] p-6 shadow-sm flex flex-col gap-6 select-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-5 text-left">
            {/* Header Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="headerMessage"
                className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                Header Message *
              </label>
              <input
                id="headerMessage"
                name="headerMessage"
                type="text"
                value={formData.headerMessage}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white
                  ${
                    errors.headerMessage
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.headerMessage && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.headerMessage}
                </span>
              )}
            </div>

            {/* Admin Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="adminMessage"
                className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                Admin Message *
              </label>
              <input
                id="adminMessage"
                name="adminMessage"
                type="text"
                value={formData.adminMessage}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white
                  ${
                    errors.adminMessage
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.adminMessage && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.adminMessage}
                </span>
              )}
            </div>

            {/* User Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="userMessage"
                className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                User Message *
              </label>
              <input
                id="userMessage"
                name="userMessage"
                type="text"
                value={formData.userMessage}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white
                  ${
                    errors.userMessage
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.userMessage && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
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
                className="px-6 h-[38px] rounded-[6px] text-xs font-bold uppercase tracking-wider bg-zinc-950 hover:bg-zinc-850 disabled:bg-zinc-800 text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-700"
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
                  className="w-4 h-4 rounded border-zinc-350 text-indigo-600 focus:ring-indigo-500 cursor-pointer focus:outline-none"
                />
                <label
                  htmlFor="maintenanceEnabled"
                  className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono cursor-pointer select-none"
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
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white
                  ${
                    errors.maintenanceMessage
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                  ${!formData.maintenanceEnabled ? 'opacity-60 cursor-not-allowed bg-zinc-50/60' : ''}
                `}
                disabled={!formData.maintenanceEnabled}
              />
              {errors.maintenanceMessage && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.maintenanceMessage}
                </span>
              )}
            </div>

            {/* Header Message Link */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="headerMessageLink"
                className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                Header Message Link *
              </label>
              <input
                id="headerMessageLink"
                name="headerMessageLink"
                type="text"
                value={formData.headerMessageLink}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white
                  ${
                    errors.headerMessageLink
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.headerMessageLink && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
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
            className="w-full h-[38px] rounded-[6px] text-xs font-bold uppercase tracking-wider bg-zinc-955 hover:bg-zinc-850 disabled:bg-zinc-800 text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

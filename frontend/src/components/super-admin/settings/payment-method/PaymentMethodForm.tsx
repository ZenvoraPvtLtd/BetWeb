import React, { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle2, AlertCircle, X } from 'lucide-react';

export type PaymentMethodForm = {
  bankName: string;
  upiId: string;
  ifscCode: string;
  accountNumber: string;
  upiName: string;
  accountHolderName: string;
  qrCode: File | null;
};

export const PaymentMethodForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentMethodForm>({
    bankName: '',
    upiId: '',
    ifscCode: '',
    accountNumber: '',
    upiName: '',
    accountHolderName: '',
    qrCode: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PaymentMethodForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error dynamically
    if (errors[name as keyof PaymentMethodForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          qrCode: 'Please select a valid QR image (PNG, JPEG, WEBP).',
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        qrCode: file,
      }));

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));

      setErrors((prev) => ({
        ...prev,
        qrCode: undefined,
      }));
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      qrCode: null,
    }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PaymentMethodForm, string>> = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank Name is required.';
    }
    if (!formData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required.';
    }
    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC Code is required.';
    }
    if (!formData.qrCode) {
      newErrors.qrCode = 'UPI QR Code image is required.';
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required.';
    }
    if (!formData.upiName.trim()) {
      newErrors.upiName = 'UPI Name is required.';
    }
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account Holder Name is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setShowSuccess(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        bankName: '',
        upiId: '',
        ifscCode: '',
        accountNumber: '',
        upiName: '',
        accountHolderName: '',
        qrCode: null,
      });
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="w-full relative">
      {/* Toast alert banner */}
      {showSuccess && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-[6px] text-xs flex items-center gap-2 select-none animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">Payment Method updated successfully.</span>
        </div>
      )}

      {/* Main Form Container Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-zinc-200 rounded-[8px] p-6 shadow-sm flex flex-col gap-6 select-none"
      >
        {/* Section title */}
        <div className="border-b border-zinc-150 pb-3 flex items-center">
          <h2 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">
            Account-Setting
          </h2>
        </div>

        {/* Desktop 2-column Grid */}
        <div className="hidden lg:grid grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-5 text-left">
            {/* Bank Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="bankName"
                className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                Bank Name *
              </label>
              <input
                id="bankName"
                name="bankName"
                type="text"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                  ${
                    errors.bankName
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.bankName && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.bankName}
                </span>
              )}
            </div>

            {/* IFSC Code */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ifscCode"
                className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                IFSC Code *
              </label>
              <input
                id="ifscCode"
                name="ifscCode"
                type="text"
                placeholder="IFSC Code"
                value={formData.ifscCode}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                  ${
                    errors.ifscCode
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.ifscCode && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.ifscCode}
                </span>
              )}
            </div>

            {/* Account Number */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="accountNumber"
                className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                Account Number *
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                  ${
                    errors.accountNumber
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.accountNumber && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.accountNumber}
                </span>
              )}
            </div>

            {/* Account Holder Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="accountHolderName"
                className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                Account Holder Name *
              </label>
              <input
                id="accountHolderName"
                name="accountHolderName"
                type="text"
                placeholder="Account Holder Name"
                value={formData.accountHolderName}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                  ${
                    errors.accountHolderName
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.accountHolderName && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.accountHolderName}
                </span>
              )}
            </div>

            {/* Submit Button (Desktop position) */}
            <div className="mt-2">
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
            {/* Upi Id */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="upiId"
                className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                Upi Id *
              </label>
              <input
                id="upiId"
                name="upiId"
                type="text"
                placeholder="UPI ID"
                value={formData.upiId}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                  ${
                    errors.upiId
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.upiId && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.upiId}
                </span>
              )}
            </div>

            {/* UPI QR Code upload */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono">
                UPI QR Code *
              </span>
              <div
                className={`w-full border border-dashed rounded-[6px] p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[148px]
                  ${errors.qrCode ? 'border-red-400 bg-red-50/10' : 'border-zinc-250 hover:bg-zinc-50/30'}
                `}
              >
                <input
                  id="qrCode"
                  name="qrCode"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />

                {!formData.qrCode ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 text-zinc-500 cursor-pointer group focus:outline-none"
                  >
                    <Upload className="w-6 h-6 text-zinc-400 group-hover:text-zinc-650 transition-colors" />
                    <span className="text-xs font-semibold text-zinc-700 group-hover:text-indigo-650 transition-colors">
                      Upload QR Code
                    </span>
                    <span className="text-[10px] text-zinc-400">PNG, JPEG, WEBP up to 5MB</span>
                  </button>
                ) : (
                  <div className="w-full flex flex-col items-center gap-2">
                    {previewUrl && (
                      <div className="relative w-16 h-16 border border-zinc-200 rounded overflow-hidden shadow-sm bg-zinc-50 flex items-center justify-center select-none">
                        <img src={previewUrl} alt="QR Preview" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-0.5 right-0.5 w-4 h-4 bg-zinc-950/80 rounded-full flex items-center justify-center text-white hover:bg-red-650 transition-colors cursor-pointer"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}
                    <span className="text-[11px] font-semibold text-zinc-700 max-w-[200px] truncate">
                      {formData.qrCode.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[10px] text-indigo-650 hover:text-indigo-850 font-bold uppercase tracking-wider cursor-pointer focus:outline-none"
                    >
                      Change File
                    </button>
                  </div>
                )}
              </div>
              {errors.qrCode && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.qrCode}
                </span>
              )}
            </div>

            {/* Upi Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="upiName"
                className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
              >
                Upi Name *
              </label>
              <input
                id="upiName"
                name="upiName"
                type="text"
                placeholder="UPI Name"
                value={formData.upiName}
                onChange={handleChange}
                className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                  ${
                    errors.upiName
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                  }
                `}
              />
              {errors.upiName && (
                <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.upiName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Viewport Layout - Linear list */}
        <div className="flex lg:hidden flex-col gap-5 text-left">
          {/* 1. Bank Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mob_bankName"
              className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
            >
              Bank Name *
            </label>
            <input
              id="mob_bankName"
              name="bankName"
              type="text"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={handleChange}
              className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                ${
                  errors.bankName
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                }
              `}
            />
            {errors.bankName && (
              <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                {errors.bankName}
              </span>
            )}
          </div>

          {/* 2. Upi Id */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mob_upiId"
              className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
            >
              Upi Id *
            </label>
            <input
              id="mob_upiId"
              name="upiId"
              type="text"
              placeholder="UPI ID"
              value={formData.upiId}
              onChange={handleChange}
              className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                ${
                  errors.upiId
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                }
              `}
            />
            {errors.upiId && (
              <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                {errors.upiId}
              </span>
            )}
          </div>

          {/* 3. IFSC Code */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mob_ifscCode"
              className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
            >
              IFSC Code *
            </label>
            <input
              id="mob_ifscCode"
              name="ifscCode"
              type="text"
              placeholder="IFSC Code"
              value={formData.ifscCode}
              onChange={handleChange}
              className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                ${
                  errors.ifscCode
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                }
              `}
            />
            {errors.ifscCode && (
              <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                {errors.ifscCode}
              </span>
            )}
          </div>

          {/* 4. UPI QR Code */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono">
              UPI QR Code *
            </span>
            <div
              className={`w-full border border-dashed rounded-[6px] p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[148px]
                ${errors.qrCode ? 'border-red-400 bg-red-50/10' : 'border-zinc-250 hover:bg-zinc-50/30'}
              `}
            >
              <input
                id="mob_qrCode"
                name="qrCode"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
              />

              {!formData.qrCode ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 text-zinc-500 cursor-pointer group focus:outline-none"
                >
                  <Upload className="w-6 h-6 text-zinc-400 group-hover:text-zinc-650 transition-colors" />
                  <span className="text-xs font-semibold text-zinc-700 group-hover:text-indigo-650 transition-colors">
                    Upload QR Code
                  </span>
                  <span className="text-[10px] text-zinc-400">PNG, JPEG, WEBP up to 5MB</span>
                </button>
              ) : (
                <div className="w-full flex flex-col items-center gap-2">
                  {previewUrl && (
                    <div className="relative w-16 h-16 border border-zinc-200 rounded overflow-hidden shadow-sm bg-zinc-50 flex items-center justify-center select-none">
                      <img src={previewUrl} alt="QR Preview" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="absolute top-0.5 right-0.5 w-4 h-4 bg-zinc-950/80 rounded-full flex items-center justify-center text-white hover:bg-red-650 transition-colors cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                  <span className="text-[11px] font-semibold text-zinc-700 max-w-[200px] truncate">
                    {formData.qrCode.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] text-indigo-650 hover:text-indigo-850 font-bold uppercase tracking-wider cursor-pointer focus:outline-none"
                  >
                    Change File
                  </button>
                </div>
              )}
            </div>
            {errors.qrCode && (
              <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                {errors.qrCode}
              </span>
            )}
          </div>

          {/* 5. Account Number */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mob_accountNumber"
              className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
            >
              Account Number *
            </label>
            <input
              id="mob_accountNumber"
              name="accountNumber"
              type="text"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                ${
                  errors.accountNumber
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                }
              `}
            />
            {errors.accountNumber && (
              <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                {errors.accountNumber}
              </span>
            )}
          </div>

          {/* 6. Upi Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mob_upiName"
              className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
            >
              Upi Name *
            </label>
            <input
              id="mob_upiName"
              name="upiName"
              type="text"
              placeholder="UPI Name"
              value={formData.upiName}
              onChange={handleChange}
              className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                ${
                  errors.upiName
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                }
              `}
            />
            {errors.upiName && (
              <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                {errors.upiName}
              </span>
            )}
          </div>

          {/* 7. Account Holder Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mob_accountHolderName"
              className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-mono"
            >
              Account Holder Name *
            </label>
            <input
              id="mob_accountHolderName"
              name="accountHolderName"
              type="text"
              placeholder="Account Holder Name"
              value={formData.accountHolderName}
              onChange={handleChange}
              className={`w-full px-3.5 h-[38px] rounded-[6px] border text-xs font-medium bg-zinc-50/20 text-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                ${
                  errors.accountHolderName
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                }
              `}
            />
            {errors.accountHolderName && (
              <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                {errors.accountHolderName}
              </span>
            )}
          </div>

          {/* Submit Button (Mobile layout position) */}
          <div className="mt-2 w-full text-left">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[38px] rounded-[6px] text-xs font-bold uppercase tracking-wider bg-zinc-955 hover:bg-zinc-850 disabled:bg-zinc-800 text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

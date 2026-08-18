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
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required.';
    }
    if (!formData.upiName.trim()) {
      newErrors.upiName = 'UPI Name is required.';
    }
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account Holder Name is required.';
    }
    if (!formData.qrCode) {
      newErrors.qrCode = 'UPI QR Code file is required.';
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
      // Simulate network save request
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to submit payment method form', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Toast Alert Banner */}
      {showSuccess && (
        <div className="mb-4 p-3 bg-[#131B2E] border border-emerald-500/40 text-emerald-300 rounded-[8px] text-xs flex items-center gap-2 select-none animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">Payment method updated successfully.</span>
        </div>
      )}

      {/* Main input form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-6 shadow-xl flex flex-col gap-6 select-none"
      >
        <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-5 items-start text-left">
          {/* Row 1 Left: Bank Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="bankName"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
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
              className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                ${errors.bankName ? 'border-red-500/80 focus:border-red-500' : 'border-[#233252]'}
              `}
            />
            {errors.bankName && (
              <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.bankName}
              </span>
            )}
          </div>

          {/* Row 1 Right: Account Number */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="accountNumber"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
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
              className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                ${errors.accountNumber ? 'border-red-500/80 focus:border-red-500' : 'border-[#233252]'}
              `}
            />
            {errors.accountNumber && (
              <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.accountNumber}
              </span>
            )}
          </div>

          {/* Row 2 Left: UPI ID */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="upiId"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
            >
              UPI ID *
            </label>
            <input
              id="upiId"
              name="upiId"
              type="text"
              placeholder="UPI ID"
              value={formData.upiId}
              onChange={handleChange}
              className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                ${errors.upiId ? 'border-red-500/80 focus:border-red-500' : 'border-[#233252]'}
              `}
            />
            {errors.upiId && (
              <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.upiId}
              </span>
            )}
          </div>

          {/* Row 2 Right: UPI Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="upiName"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
            >
              UPI Name *
            </label>
            <input
              id="upiName"
              name="upiName"
              type="text"
              placeholder="UPI Name"
              value={formData.upiName}
              onChange={handleChange}
              className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                ${errors.upiName ? 'border-red-500/80 focus:border-red-500' : 'border-[#233252]'}
              `}
            />
            {errors.upiName && (
              <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.upiName}
              </span>
            )}
          </div>

          {/* Row 3 Left: IFSC Code */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="ifscCode"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
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
              className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                ${errors.ifscCode ? 'border-red-500/80 focus:border-red-500' : 'border-[#233252]'}
              `}
            />
            {errors.ifscCode && (
              <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.ifscCode}
              </span>
            )}
          </div>

          {/* Row 3 Right: Account Holder Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="accountHolderName"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono"
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
              className={`w-full px-3.5 h-[38px] rounded-[8px] border text-xs font-medium bg-[#090E17] text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:border-orange-500
                ${errors.accountHolderName ? 'border-red-500/80 focus:border-red-500' : 'border-[#233252]'}
              `}
            />
            {errors.accountHolderName && (
              <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.accountHolderName}
              </span>
            )}
          </div>

          {/* Row 4 Left: UPI QR Code */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              UPI QR Code *
            </span>
            <div
              className={`w-full border border-dashed rounded-[8px] p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[148px] bg-[#0E1524]
                ${errors.qrCode ? 'border-red-500/50 bg-red-950/10' : 'border-[#233252] hover:border-orange-500/50'}
              `}
            >
              <input
                ref={fileInputRef}
                id="qrCode"
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
                  className="flex flex-col items-center gap-2 text-slate-400 cursor-pointer group focus:outline-none"
                >
                  <Upload className="w-6 h-6 text-slate-500 group-hover:text-orange-400 transition-colors" />
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-orange-400 transition-colors">
                    Upload QR Code
                  </span>
                  <span className="text-[10px] text-slate-500">PNG, JPEG, WEBP up to 5MB</span>
                </button>
              ) : (
                <div className="w-full flex flex-col items-center gap-2">
                  {previewUrl && (
                    <div className="relative w-16 h-16 border border-[#233252] rounded-[6px] overflow-hidden shadow-sm bg-[#090E17] flex items-center justify-center select-none">
                      <img src={previewUrl} alt="QR Preview" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                  <span className="text-[11px] font-semibold text-slate-300 max-w-[200px] truncate">
                    {formData.qrCode.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] text-orange-400 hover:text-orange-300 font-bold uppercase tracking-wider cursor-pointer focus:outline-none"
                  >
                    Change File
                  </button>
                </div>
              )}
            </div>
            {errors.qrCode && (
              <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.qrCode}
              </span>
            )}
          </div>

          {/* Row 4 Right: Submit Button Desktop */}
          <div className="flex flex-col justify-end h-full pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[40px] rounded-[8px] text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white shadow-md shadow-orange-950/40 transition-all cursor-pointer focus:outline-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        {/* Mobile Viewport Form Controls */}
        <div className="flex lg:hidden flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Bank Name *
            </label>
            <input
              name="bankName"
              type="text"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full px-3.5 h-[38px] rounded-[8px] border border-[#233252] text-xs font-medium bg-[#090E17] text-slate-100"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Account Number *
            </label>
            <input
              name="accountNumber"
              type="text"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full px-3.5 h-[38px] rounded-[8px] border border-[#233252] text-xs font-medium bg-[#090E17] text-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[40px] rounded-[8px] text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md transition-all mt-2"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

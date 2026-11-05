import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function Toast() {
  const { toast } = useHotel();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed top-24 right-5 z-50 max-w-sm w-full animate-fadeIn">
      <div
        className={`skeuo-plate p-4 flex items-start gap-3 border shadow-skeuo-elevated ${
          isSuccess ? 'border-emerald-300 bg-[#F4FBF7]' : 'border-rose-300 bg-[#FFF5F5]'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        )}

        <div className="flex-1 text-xs text-charcoal font-medium leading-relaxed">
          {toast.message}
        </div>
      </div>
    </div>
  );
}


import React, { useEffect } from 'react';
import { ReservationForm } from './ReservationForm';
import { X, CalendarCheck } from 'lucide-react';
import { RESORT_INFO } from '../data/resortData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomId?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedRoomId,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative animate-scale-up my-8">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-800 flex items-center justify-center text-teal-200">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="reservation-modal-title" className="font-serif text-lg font-bold">
                Reserve Your Stay at Bikini Valley
              </h2>
              <p className="text-xs text-stone-300">
                {RESORT_INFO.location} · Sample Educational Inquiry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <ReservationForm initialRoomId={preselectedRoomId} />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors cursor-pointer border border-stone-700"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-teal-700 text-white transition-all cursor-pointer border border-stone-700 shadow-lg"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-teal-700 text-white transition-all cursor-pointer border border-stone-700 shadow-lg"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Lightbox Card */}
      <div className="max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] max-h-[68vh] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption & Metadata Bar */}
        <div className="p-4 sm:p-6 bg-stone-900 text-stone-200 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-400 mb-1">
              <span className="font-semibold uppercase tracking-wider">{item.categoryLabel}</span>
              <span className="text-stone-600">·</span>
              <span className="flex items-center gap-1 text-stone-400">
                <MapPin className="w-3 h-3 text-teal-500" />
                {item.location}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">{item.caption}</p>
          </div>

          <div className="text-xs text-stone-400 font-mono shrink-0">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};

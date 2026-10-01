import React, { useState } from 'react';
import { GALLERY_ITEMS, PHOTO_CREDITS } from '../data/resortData';
import { GalleryItem } from '../types';
import { Lightbox } from '../components/Lightbox';
import {
  Maximize2,
  Filter,
  Sparkles,
  MapPin,
  Camera,
  Info,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'beach-pool', label: 'Beach & Pool' },
    { id: 'rooms', label: 'Guest Accommodations' },
    { id: 'dining-garden', label: 'Dining & Tropical Gardens' },
    { id: 'moments', label: 'Atmosphere & Recreation' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-800">
          Visual Showcase
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight text-balance">
          Resort Photo Gallery
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed text-balance">
          Take a visual journey through Bikini Valley Resort in Samara, Aringay, La Union. Click any photograph to view high-resolution imagery and detailed architectural captions.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Responsive Photo Grid (Consistent aspect ratios, object-cover) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Image Container with 4:3 Ratio */}
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 rounded-full bg-white/90 text-stone-900 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Category pill */}
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-teal-200 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md">
                {item.categoryLabel}
              </div>
            </div>

            {/* Caption & Location metadata */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1">
                  <MapPin className="w-3 h-3 text-teal-600" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-teal-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-teal-700 font-medium">
                <span>Click to enlarge photo</span>
                <span className="text-stone-400">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Credits & Transparency Section as instructed by prompt */}
      <section className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 text-xs text-stone-600 space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
          <Camera className="w-4 h-4 text-teal-700" />
          <span>Visual Asset & Photography Disclosure</span>
        </div>
        <p className="leading-relaxed">
          In strict compliance with project guidelines, all visual representations, architectural renders, and imagery featured on this website are educational assets crafted for the Bikini Valley Resort hospitality management simulation. They represent the tropical coastal concept in Samara, Aringay, La Union and do not claim to depict existing unverified physical structures.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] text-stone-500 border-t border-stone-200">
          <div>
            <strong className="text-stone-700 block">Photographic Direction:</strong>
            Tropical Philippine coastal resort aesthetic, natural daylight, warm bamboo and rattan accents.
          </div>
          <div>
            <strong className="text-stone-700 block">Project Attribution:</strong>
            Prepared for College Hospitality Management Academic Presentation (La Union, Philippines).
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

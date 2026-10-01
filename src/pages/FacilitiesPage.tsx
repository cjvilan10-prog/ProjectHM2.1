import React, { useState } from 'react';
import { PageId } from '../types';
import { FACILITIES_DATA, RESORT_INFO } from '../data/resortData';
import {
  Clock,
  Sparkles,
  Check,
  CalendarCheck,
  Palmtree,
  Waves,
  Utensils,
  Car,
  Gamepad2,
  Users2,
  Flower2,
} from 'lucide-react';

interface FacilitiesPageProps {
  onOpenReservation: () => void;
  onNavigate: (page: PageId) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  onOpenReservation,
  onNavigate,
}) => {
  const [activeFacilityId, setActiveFacilityId] = useState<string>('all');

  const facilityIcons: Record<string, React.ReactNode> = {
    'swimming-pool': <Waves className="w-5 h-5 text-teal-600" />,
    restaurant: <Utensils className="w-5 h-5 text-amber-600" />,
    garden: <Flower2 className="w-5 h-5 text-emerald-600" />,
    'beach-area': <Palmtree className="w-5 h-5 text-teal-700" />,
    'parking-area': <Car className="w-5 h-5 text-stone-700" />,
    'recreation-area': <Gamepad2 className="w-5 h-5 text-indigo-600" />,
    'function-hall': <Users2 className="w-5 h-5 text-rose-600" />,
  };

  const displayedFacilities =
    activeFacilityId === 'all'
      ? FACILITIES_DATA
      : FACILITIES_DATA.filter((f) => f.id === activeFacilityId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-800">
          Resort Lifestyle & Services
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight text-balance">
          Facilities & Services
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed text-balance">
          Discover everything Bikini Valley Resort offers for an unforgettable stay. From our tranquil swimming pool and open-air beachfront restaurant to spacious event grounds and recreational areas.
        </p>
      </div>

      {/* Quick Facility Filter Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <button
          onClick={() => setActiveFacilityId('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeFacilityId === 'all'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          All Facilities ({FACILITIES_DATA.length})
        </button>
        {FACILITIES_DATA.map((fac) => (
          <button
            key={fac.id}
            onClick={() => setActiveFacilityId(fac.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFacilityId === fac.id
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {fac.title}
          </button>
        ))}
      </div>

      {/* Facilities Grid with High-Quality Photographs and Captions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedFacilities.map((facility) => (
          <div
            key={facility.id}
            className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
          >
            {/* Facility Image with Caption Overlay */}
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src={facility.image}
                alt={`${facility.title} at Bikini Valley Resort, Samara, Aringay`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[11px] text-teal-300 font-medium block">
                  {facility.hours}
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {facility.title}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Caption as required by prompt */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs italic text-stone-700">
                  "{facility.caption}"
                </div>

                <p className="text-stone-700 text-xs leading-relaxed font-medium">
                  {facility.shortDescription}
                </p>

                <p className="text-stone-500 text-xs leading-relaxed">
                  {facility.fullDescription}
                </p>

                {/* Features List */}
                <div className="pt-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 block mb-2">
                    Key Features:
                  </span>
                  <div className="space-y-1 text-xs text-stone-600">
                    {facility.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Operating Hours Bar */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-700" />
                  <span>{facility.hours}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Function Hall & Event Inquiries Callout */}
      <section className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
              Events, Banquets & Celebrations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Hosting a Special Event in Samara, Aringay?
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">
              Our Aringay Function Hall and beachfront grounds accommodate up to 120 guests with flexible table setups, audiovisual sound systems, and tailored catering packages. Perfect for family reunions, birthdays, school retreats, and coastal weddings.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={onOpenReservation}
              className="py-3 px-6 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow transition-colors text-center cursor-pointer"
            >
              Inquire for Event Packages
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="py-3 px-6 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors text-center cursor-pointer"
            >
              Contact Event Coordinator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

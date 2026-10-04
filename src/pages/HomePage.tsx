import React from 'react';
import { PageId } from '../types';
import { RESORT_INFO, RESORT_IMAGES, ROOMS_DATA, FACILITIES_DATA, WHY_CHOOSE_US } from '../data/resortData';
import { ResortLogo } from '../components/ResortLogo';
import { VideoPlayer } from '../components/VideoPlayer';
import {
  MapPin,
  CalendarCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Waves,
  Sun,
  Palmtree,
  Check,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenReservation: (roomId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenReservation,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center text-white overflow-hidden">
        {/* Large Tropical Beach Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={RESORT_IMAGES.hero}
            alt="Oceana Haven tropical beachfront in Corong-Corong, El Nido, Palawan"
            className="w-full h-full object-cover brightness-[0.78] transform scale-105 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Measured Scrim Overlay for WCAG contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-stone-900/25" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          {/* Location & Brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/60 backdrop-blur-md border border-white/20 text-xs font-medium text-teal-200 mb-6">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Corong-Corong, El Nido, Palawan, Philippines</span>
          </div>

          {/* Slogan & Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-md text-balance">
            Oceana Haven
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-amber-300 font-normal mb-6 tracking-wide drop-shadow">
            "{RESORT_INFO.slogan}"
          </p>

          <p className="text-stone-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 text-balance drop-shadow">
            Escape to the peaceful coastal charm of El Nido. Savor tranquil beach waters overlooking Bacuit Bay, relaxing tropical gardens, modern guestrooms, and warm island hospitality.
          </p>

          {/* Prominent Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenReservation()}
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4 text-teal-100" />
              <span>BOOK NOW</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md border border-white/40 text-white font-semibold text-sm uppercase tracking-wider rounded-xl shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>CONTACT US</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-200">
            <div className="flex items-center justify-center gap-1.5">
              <Waves className="w-4 h-4 text-teal-300" />
              <span>Beachfront Access</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-300" />
              <span>West Coast Sunsets</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Palmtree className="w-4 h-4 text-emerald-300" />
              <span>Tropical Gardens</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>24/7 Front Desk Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WELCOMING INTRODUCTION & WHY GUESTS ENJOY STAYING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Story & Intro */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Welcome to Oceana Haven</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight text-balance">
              Your Peaceful Coastal Getaway in Corong-Corong, El Nido
            </h2>

            <p className="text-stone-600 text-base leading-relaxed">
              Located along the scenic beachfront of <strong className="text-stone-800 font-medium">Corong-Corong, El Nido, Palawan</strong>, Oceana Haven was envisioned as an unhurried sanctuary for travelers seeking the breathtaking limestone seascapes and tropical breeze of Palawan without the hectic noise of crowded commercial strips.
            </p>

            <p className="text-stone-600 text-sm leading-relaxed">
              Whether you are relaxing in our private beachfront cabanas, enjoying an afternoon swim in the freshwater pool, savoring fresh seafood at the open-air restaurant, or spending quality evenings with family in our spacious suites, our resort invites you to leave your worries behind.
            </p>

            {/* Academic Notice */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/60 text-xs text-teal-900 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-teal-950">Hospitality Management Student Showcase:</span>
                This portal demonstrates our full hotel management prototype, presenting authentic room tiers, sample educational rates in Philippine Pesos (PHP), and online inquiry processing.
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('rooms')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 hover:text-teal-900 border-b border-teal-800 pb-0.5 transition-colors cursor-pointer"
              >
                <span>Explore Accommodations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('facilities')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 border-b border-stone-300 pb-0.5 transition-colors cursor-pointer"
              >
                <span>View Facilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Relevant Photographs: At least 2 photographs in this section */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md group">
                <img
                  src={RESORT_IMAGES.beachCabana}
                  alt="Tranquil beach cabana and ocean shore at Oceana Haven"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-medium">
                    Private Beachfront Cabanas
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-stone-100 border border-stone-200/80 text-xs text-stone-700">
                <span className="font-semibold text-stone-900 block mb-1">
                  Pristine Shoreline
                </span>
                Soft sand and calm tidal waters ideal for morning strolls and sunset contemplation.
              </div>
            </div>

            <div className="space-y-4 sm:pt-8">
              <div className="relative rounded-2xl overflow-hidden shadow-md group">
                <img
                  src={RESORT_IMAGES.pool}
                  alt="Sparkling swimming pool at Oceana Haven"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-medium">
                    Freshwater Oasis Swimming Pool
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-stone-100 border border-stone-200/80 text-xs text-stone-700">
                <span className="font-semibold text-stone-900 block mb-1">
                  Resort Oasis Pool
                </span>
                Lap swimming, child-friendly shallow ledge, and sun loungers under white umbrellas.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY GUESTS LOVE BIKINI VALLEY RESORT */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-800 block mb-2">
              The Oceana Haven Experience
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Why Guests Enjoy Staying With Us
            </h2>
            <p className="text-stone-600 text-sm mt-3">
              Crafted for family holidays, island escapes, and romantic retreats on the scenic coast of El Nido, Palawan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-4 font-serif font-bold text-base">
                  0{idx + 1}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 block mb-1">
                  {item.highlight}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREVIEW OF ACCOMMODATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-800 block mb-2">
              Rest & Refresh
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Featured Accommodations
            </h2>
            <p className="text-stone-600 text-sm mt-2 max-w-xl">
              Each room includes air conditioning, private bathroom with hot shower, high-speed Wi-Fi, and television. Sample educational rates in Philippine Pesos (PHP).
            </p>
          </div>

          <button
            onClick={() => onNavigate('rooms')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All Rooms & Rates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS_DATA.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-stone-900/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-mono font-medium">
                  ₱{room.samplePricePHP.toLocaleString()} <span className="text-[10px] text-stone-300">/ night</span>
                </div>
                {room.popular && (
                  <div className="absolute top-3 left-3 bg-teal-700 text-white px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                    Guest Favorite
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span>Up to {room.capacityGuests} Guests</span>
                    <span>·</span>
                    <span>{room.roomSize}</span>
                    <span>·</span>
                    <span>{room.view}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed mb-4 line-clamp-2">
                    {room.shortDescription}
                  </p>

                  <div className="space-y-1.5 mb-6 text-xs text-stone-600">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => onOpenReservation(room.id)}
                    className="flex-1 py-2.5 px-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center cursor-pointer"
                  >
                    Book This Room
                  </button>
                  <button
                    onClick={() => onNavigate('rooms')}
                    className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PREVIEW OF FACILITIES & SERVICES */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 block mb-2">
                Resort Amenities
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Facilities & Services Preview
              </h2>
              <p className="text-stone-300 text-sm mt-2 max-w-xl">
                Everything you need for an unforgettable seaside stay: sparkling pool, fresh coastal restaurant, tranquil garden, recreation hall, and direct beach access.
              </p>
            </div>

            <button
              onClick={() => onNavigate('facilities')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES_DATA.slice(0, 4).map((facility) => (
              <div
                key={facility.id}
                onClick={() => onNavigate('facilities')}
                className="group cursor-pointer rounded-xl overflow-hidden bg-stone-800/80 border border-stone-700/80 hover:border-teal-500 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif text-lg font-bold text-white">
                      {facility.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-stone-300 line-clamp-2 mb-3">
                    {facility.caption}
                  </p>
                  <span className="text-[11px] text-teal-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Discover facility →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROMOTIONAL VIDEO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-800 block mb-2">
            Experience the Atmosphere
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Resort Tour & Promotional Video
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Watch our student-produced promotional tour of Oceana Haven. Explore our tranquil beachfront facing Bacuit Bay, pool oasis, and coastal accommodations in El Nido, Palawan.
          </p>
        </div>

        <VideoPlayer />
      </section>

      {/* 7. BOTTOM BANNER CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-stone-900 text-white p-8 sm:p-12 lg:p-16 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
              Plan Your Visit to Corong-Corong, El Nido
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Ready for a Relaxing Tropical Escape?
            </h2>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Contact our front desk team today or submit an inquiry to check room availability for your upcoming weekend break or family gathering.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenReservation()}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs uppercase tracking-wider rounded-xl shadow transition-all cursor-pointer"
              >
                Book Your Room Now
              </button>
              <a
                href={RESORT_INFO.telLink}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Call: {RESORT_INFO.contactNumber}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

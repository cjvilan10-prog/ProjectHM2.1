import React, { useState } from 'react';
import { PageId, Room } from '../types';
import { ROOMS_DATA, RESORT_INFO } from '../data/resortData';
import {
  Users,
  Check,
  CalendarCheck,
  Info,
  Maximize2,
  Tv,
  Wifi,
  Wind,
  Bath,
  Coffee,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface RoomsPageProps {
  onOpenReservation: (roomId?: string) => void;
  onNavigate: (page: PageId) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  onOpenReservation,
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'couples' | 'family'>('all');
  const [activeModalRoom, setActiveModalRoom] = useState<Room | null>(null);

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (selectedFilter === 'couples') return room.capacityGuests <= 3;
    if (selectedFilter === 'family') return room.capacityGuests >= 4;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-800">
          Accommodations & Suites
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight text-balance">
          Rooms & Guest Stays
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed text-balance">
          Unwind in clean, air-conditioned comfort in Corong-Corong, El Nido. Choose between our restful Standard Room, scenic ocean-view Deluxe Room, or our expansive Family Suite.
        </p>
      </div>

      {/* Prominent Educational Rate Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
          <Info className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs sm:text-sm">
          <strong className="font-semibold block text-amber-950">
            Educational Sample Rate Policy (Philippine Pesos - PHP):
          </strong>
          All prices stated below (₱1,500, ₱2,500, and ₱4,000) are sample educational rates created for a college Hospitality Management simulation. They can be revised and do not constitute final confirmed resort rates until direct reservation confirmation.
        </div>
      </div>

      {/* Interactive Filter Tabs */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          All Rooms ({ROOMS_DATA.length})
        </button>
        <button
          onClick={() => setSelectedFilter('couples')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedFilter === 'couples'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Couples & Small Groups (2-3 Guests)
        </button>
        <button
          onClick={() => setSelectedFilter('family')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedFilter === 'family'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Family Suites (6 Guests)
        </button>
      </div>

      {/* Main Room Cards (Consistent 4:3 image ratio, no distortion) */}
      <div className="space-y-12">
        {filteredRooms.map((room, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={room.id}
              className={`bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0 ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Room Image Slot (4:3 ratio, object-cover) */}
              <div
                className={`lg:col-span-6 relative aspect-[4/3] lg:aspect-auto min-h-[300px] lg:min-h-[420px] overflow-hidden bg-stone-100 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <img
                  src={room.image}
                  alt={`${room.name} at Oceana Haven, Corong-Corong, El Nido, Palawan`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Sample Rate Badge */}
                <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
                  <span className="text-[10px] text-stone-300 uppercase tracking-wider block">
                    Sample Rate
                  </span>
                  <span className="font-serif font-bold text-lg text-teal-300">
                    ₱{room.samplePricePHP.toLocaleString()} PHP
                  </span>
                  <span className="text-xs text-stone-300"> / night</span>
                </div>

                {room.popular && (
                  <div className="absolute top-4 right-4 bg-teal-700 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow">
                    Most Popular
                  </div>
                )}
              </div>

              {/* Room Details & Amenities */}
              <div
                className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div>
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-3 font-medium">
                    <span className="flex items-center gap-1 text-teal-800">
                      <Users className="w-3.5 h-3.5" />
                      <span>Max {room.capacityGuests} Guests</span>
                    </span>
                    <span>·</span>
                    <span>{room.roomSize}</span>
                    <span>·</span>
                    <span>{room.bedConfiguration}</span>
                    <span>·</span>
                    <span className="text-stone-700">{room.view}</span>
                  </div>

                  {/* Room Name */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                    {room.name}
                  </h2>

                  {/* Descriptions */}
                  <p className="text-stone-700 text-sm leading-relaxed mb-3">
                    {room.shortDescription}
                  </p>
                  <p className="text-stone-500 text-xs leading-relaxed mb-6">
                    {room.fullDescription}
                  </p>

                  {/* Key Highlights Grid */}
                  <div className="mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-3">
                      Included Room Amenities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => onOpenReservation(room.id)}
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4 text-teal-200" />
                    <span>BOOK THIS ROOM</span>
                  </button>

                  <div className="text-right sm:text-right w-full sm:w-auto">
                    <span className="text-[11px] text-stone-400 block">
                      Sample Educational Rate
                    </span>
                    <span className="text-xs font-mono font-medium text-stone-700">
                      ₱{room.samplePricePHP.toLocaleString()} PHP / night
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <section className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-800 block mb-1">
            Compare Options
          </span>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Room Specifications Comparison
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Review room features side-by-side to choose the ideal accommodation for your stay in El Nido.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-300 text-stone-700 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-semibold">Room Type</th>
                <th className="py-3 px-4 font-semibold">Max Guests</th>
                <th className="py-3 px-4 font-semibold">Bedding Setup</th>
                <th className="py-3 px-4 font-semibold">Size</th>
                <th className="py-3 px-4 font-semibold">Sample Rate</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {ROOMS_DATA.map((room) => (
                <tr key={room.id} className="hover:bg-white transition-colors">
                  <td className="py-4 px-4 font-serif font-bold text-stone-900 text-sm">
                    {room.name}
                  </td>
                  <td className="py-4 px-4 text-stone-700">
                    {room.capacityGuests} Guests
                  </td>
                  <td className="py-4 px-4 text-stone-600">
                    {room.bedConfiguration}
                  </td>
                  <td className="py-4 px-4 text-stone-600">
                    {room.roomSize}
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-teal-800">
                    ₱{room.samplePricePHP.toLocaleString()} PHP <span className="text-[10px] text-stone-400 block">(Sample)</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onOpenReservation(room.id)}
                      className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-medium text-[11px] uppercase tracking-wider cursor-pointer"
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Guest Policies & Information */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-stone-600">
        <div className="p-5 bg-white rounded-2xl border border-stone-200">
          <h4 className="font-serif font-bold text-stone-900 text-sm mb-2">
            Check-in & Check-out
          </h4>
          <p className="leading-relaxed">
            Standard check-in time starts at 2:00 PM. Check-out is at 12:00 PM noon. Early check-in or late check-out is subject to room availability upon inquiry.
          </p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-stone-200">
          <h4 className="font-serif font-bold text-stone-900 text-sm mb-2">
            Front Desk Service
          </h4>
          <p className="leading-relaxed">
            Our front desk is staffed 24 hours daily to assist you with room keys, luggage storage, fresh towels, and local travel directions in El Nido and Palawan.
          </p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-stone-200">
          <h4 className="font-serif font-bold text-stone-900 text-sm mb-2">
            Reservation Confirmation
          </h4>
          <p className="leading-relaxed">
            All submitted reservation requests are processed through our reservations desk via email (oceanahaven38@gmail.com) and phone (09539661524).
          </p>
        </div>
      </section>
    </div>
  );
};

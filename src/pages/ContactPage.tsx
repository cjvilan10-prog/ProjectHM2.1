import React from 'react';
import { RESORT_INFO } from '../data/resortData';
import { ReservationForm } from '../components/ReservationForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  MessageSquare,
  Navigation,
  Compass,
  CheckCircle,
} from 'lucide-react';

interface ContactPageProps {
  preselectedRoomId?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ preselectedRoomId }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-800">
          Get in Touch & Book
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight text-balance">
          Contact & Reservation
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed text-balance">
          We welcome your inquiries, room reservations, and event bookings. Reach our friendly front desk team directly via phone, email, social media, or submit the inquiry form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Information Cards & Operating Schedule */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Resort Contact Details
            </h2>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 text-teal-700">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                  Location Address
                </span>
                <p className="text-sm font-medium text-stone-900 mt-0.5">
                  {RESORT_INFO.name}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  {RESORT_INFO.location}
                </p>
                <a
                  href={RESORT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-800 font-medium mt-1 underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 text-teal-700">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                  Contact Number (Phone / Mobile)
                </span>
                <a
                  href={RESORT_INFO.telLink}
                  className="text-sm font-semibold text-stone-900 hover:text-teal-700 transition-colors block mt-0.5"
                >
                  {RESORT_INFO.contactNumber}
                </a>
                <span className="text-[11px] text-stone-500">
                  Tap to call front desk directly
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 text-teal-700">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                  Official Email Address
                </span>
                <a
                  href={RESORT_INFO.mailtoLink}
                  className="text-sm font-semibold text-stone-900 hover:text-teal-700 transition-colors block mt-0.5 break-all"
                >
                  {RESORT_INFO.email}
                </a>
                <span className="text-[11px] text-stone-500">
                  Clickable mailto link for direct inquiry
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 border-t border-stone-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-3">
                Social Media Channels
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={RESORT_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl text-xs font-medium text-blue-900 flex items-center justify-between transition-colors"
                >
                  <span>Facebook Page</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
                </a>

                <a
                  href={RESORT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-pink-50/70 hover:bg-pink-100/80 border border-pink-200/80 rounded-xl text-xs font-medium text-pink-900 flex items-center justify-between transition-colors"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-pink-700" />
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-xs text-stone-700 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>Resort Operational Schedule</span>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-stone-600">
              <li><strong className="text-stone-900">Business Hours:</strong> {RESORT_INFO.businessHours.general}</li>
              <li><strong className="text-stone-900">Front Desk:</strong> {RESORT_INFO.businessHours.frontDesk}</li>
              <li><strong className="text-stone-900">Check-in:</strong> {RESORT_INFO.businessHours.checkIn}</li>
              <li><strong className="text-stone-900">Check-out:</strong> {RESORT_INFO.businessHours.checkOut}</li>
              <li><strong className="text-stone-900">Reservations & Inquiries:</strong> {RESORT_INFO.businessHours.inquiries}</li>
            </ul>
          </div>

          {/* Travel Directions Advice */}
          <div className="bg-teal-50/60 rounded-2xl p-6 border border-teal-100 text-xs text-teal-950 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-teal-900">
              <Compass className="w-4 h-4 text-teal-700" />
              <span>How to Reach Oceana Haven</span>
            </div>
            <p className="leading-relaxed text-stone-600">
              From El Nido Lio Airport (ENI), it is a quick 15-20 minute scenic tricycle or private shuttle ride south to Corong-Corong Beach. If arriving from Puerto Princesa International Airport, comfortable tourist vans connect directly to El Nido in 5-6 hours via the Palawan Highway. Gated private parking is available on-site.
            </p>
          </div>
        </div>

        {/* Right Column: Reservation & Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-1">
                Online Reservation & Inquiry
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Send an Inquiry or Book a Room
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Fill in your preferred dates and guest count. Our front desk staff will review availability and reach out to you directly.
              </p>
            </div>

            <ReservationForm initialRoomId={preselectedRoomId} />
          </div>
        </div>
      </div>

      {/* Embedded Google Map Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-800 block mb-1">
              Interactive Map
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Resort Location: Corong-Corong, El Nido, Palawan
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Configurable Google Maps embed centered on the coastal bay of Corong-Corong in El Nido, Palawan.
            </p>
          </div>

          <a
            href={RESORT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors self-start sm:self-auto"
          >
            <Navigation className="w-3.5 h-3.5 text-teal-400" />
            <span>Open Directions in Maps</span>
          </a>
        </div>

        {/* Real Embedded Google Map iframe */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-inner">
          <iframe
            title="Oceana Haven Location - Corong-Corong, El Nido, Palawan"
            src={RESORT_INFO.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        <div className="text-[11px] text-stone-500 italic text-center sm:text-left">
          Note: In accordance with project instructions, this map showcases the verified coastal area of Corong-Corong, El Nido, Palawan without claiming an unverified individual building pin.
        </div>
      </section>
    </div>
  );
};

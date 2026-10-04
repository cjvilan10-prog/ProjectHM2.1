import React from 'react';
import { PageId } from '../types';
import { ResortLogo } from './ResortLogo';
import { RESORT_INFO } from '../data/resortData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Heart,
  ChevronRight,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenReservation,
}) => {
  const quickLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms & Accommodations' },
    { id: 'facilities', label: 'Facilities & Services' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'contact', label: 'Contact & Inquiries' },
  ];

  const handleNav = (id: PageId) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <ResortLogo variant="light" size="lg" />
            <p className="text-amber-400 font-serif italic text-base">
              "{RESORT_INFO.slogan}"
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              A serene tropical beach resort sanctuary nestled along the peaceful coastline of Corong-Corong, El Nido, Palawan. Experience authentic island hospitality, relaxing Bacuit Bay ocean views, and memories with family and friends.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-medium">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={RESORT_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-800 hover:bg-teal-700 text-stone-200 text-xs rounded-md transition-colors flex items-center gap-1.5"
                  aria-label="Facebook Page"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
                <a
                  href={RESORT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-800 hover:bg-pink-700 text-stone-200 text-xs rounded-md transition-colors flex items-center gap-1.5"
                  aria-label="Instagram Profile"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-white text-base font-semibold mb-4">
              Explore Resort
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="text-stone-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-teal-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="text-xs uppercase tracking-wider font-semibold text-teal-400 hover:text-teal-300 underline cursor-pointer"
                >
                  Request a Room Reservation →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="font-serif text-white text-base font-semibold mb-4">
              Resort Location & Contact
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  {RESORT_INFO.location}
                  <a
                    href={RESORT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-teal-400 hover:underline mt-0.5"
                  >
                    View on Google Maps ↗
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={RESORT_INFO.telLink}
                  className="hover:text-teal-300 transition-colors"
                >
                  {RESORT_INFO.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={RESORT_INFO.mailtoLink}
                  className="hover:text-teal-300 transition-colors break-all"
                >
                  {RESORT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Hours & Academic Project Notice */}
          <div>
            <h4 className="font-serif text-white text-base font-semibold mb-4">
              Hours & Schedule
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-stone-300">{RESORT_INFO.businessHours.general}</span>
              </div>
              <p>· Front Desk: {RESORT_INFO.businessHours.frontDesk}</p>
              <p>· Check-in: {RESORT_INFO.businessHours.checkIn}</p>
              <p>· Check-out: {RESORT_INFO.businessHours.checkOut}</p>
              <p>· Inquiries: {RESORT_INFO.businessHours.inquiries}</p>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-stone-800/80 border border-stone-700/60 text-[11px] text-stone-400">
              <span className="font-semibold text-stone-300 block mb-1">
                College Hospitality Management Project
              </span>
              Sample educational rates (PHP) for academic demonstration. Unconfirmed until direct resort communication.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Oceana Haven. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Hospitality Management Showcase · El Nido, Palawan, PH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

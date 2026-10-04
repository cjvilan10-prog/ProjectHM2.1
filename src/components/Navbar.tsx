import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ResortLogo } from './ResortLogo';
import { Menu, X, CalendarCheck, Phone, Mail } from 'lucide-react';
import { RESORT_INFO } from '../data/resortData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenReservation: (roomId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms & Accommodations' },
    { id: 'facilities', label: 'Facilities & Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact & Reservation' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner with Quick Contact (Desktop only) */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 hidden md:block border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-stone-400">
              Corong-Corong, El Nido, Palawan, Philippines
            </span>
            <span className="text-stone-600">·</span>
            <a
              href={RESORT_INFO.telLink}
              className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span>{RESORT_INFO.contactNumber}</span>
            </a>
            <span className="text-stone-600">·</span>
            <a
              href={RESORT_INFO.mailtoLink}
              className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-teal-400" />
              <span>{RESORT_INFO.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-400">Front Desk: Open 24 Hours</span>
            <span className="text-amber-400/90 font-medium">Relax. Explore. Experience.</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-stone-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Wordmark & Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg"
            aria-label="Oceana Haven Home"
          >
            <ResortLogo size="md" />
          </button>

          {/* Zone 2: Navigation Links (Clean text links with active indicator) */}
          <nav
            className="hidden lg:flex items-center gap-8 text-sm font-medium"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-teal-800 font-semibold'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenReservation()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-teal-200" />
              <span>Book Now</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-stone-900" />
              ) : (
                <Menu className="w-6 h-6 text-stone-900" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-stone-200 shadow-xl z-30 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-stone-100 space-y-3 px-4 pb-2">
              <a
                href={RESORT_INFO.telLink}
                className="flex items-center gap-2 text-xs text-stone-600 hover:text-teal-700"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call: {RESORT_INFO.contactNumber}</span>
              </a>
              <a
                href={RESORT_INFO.mailtoLink}
                className="flex items-center gap-2 text-xs text-stone-600 hover:text-teal-700"
              >
                <Mail className="w-4 h-4 text-teal-600" />
                <span>Email: {RESORT_INFO.email}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full mt-2 py-3 bg-teal-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg text-center shadow-sm"
              >
                Book a Room Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [preselectedRoomId, setPreselectedRoomId] = useState<string | undefined>();

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'rooms', 'facilities', 'gallery', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReservation = (roomId?: string) => {
    setPreselectedRoomId(roomId);
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
    setPreselectedRoomId(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-stone-800 font-sans">
      {/* Universal Header / Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenReservation={handleOpenReservation}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenReservation={handleOpenReservation}
          />
        )}
        {currentPage === 'rooms' && (
          <RoomsPage
            onNavigate={handleNavigate}
            onOpenReservation={handleOpenReservation}
          />
        )}
        {currentPage === 'facilities' && (
          <FacilitiesPage
            onNavigate={handleNavigate}
            onOpenReservation={() => handleOpenReservation()}
          />
        )}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'contact' && (
          <ContactPage preselectedRoomId={preselectedRoomId} />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* Global Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
        preselectedRoomId={preselectedRoomId}
      />
    </div>
  );
}

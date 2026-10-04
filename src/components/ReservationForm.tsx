import React, { useState, useEffect } from 'react';
import { ROOMS_DATA, RESORT_INFO } from '../data/resortData';
import { ReservationFormData, ReservationSummary } from '../types';
import {
  Calendar,
  Users,
  Mail,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Send,
  ExternalLink,
  Info,
  Clock,
} from 'lucide-react';

interface ReservationFormProps {
  initialRoomId?: string;
  onSuccess?: (summary: ReservationSummary) => void;
  isCompact?: boolean;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  initialRoomId,
  onSuccess,
  isCompact = false,
}) => {
  // Preselect room if passed
  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    phone: '',
    roomType: initialRoomId || 'deluxe-room',
    checkInDate: '',
    checkOutDate: '',
    guestsCount: 2,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [submittedSummary, setSubmittedSummary] = useState<ReservationSummary | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync initialRoomId if prop changes
  useEffect(() => {
    if (initialRoomId) {
      setFormData((prev) => ({ ...prev, roomType: initialRoomId }));
    }
  }, [initialRoomId]);

  // Set default dates (tomorrow and day after tomorrow)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    setFormData((prev) => ({
      ...prev,
      checkInDate: prev.checkInDate || formatDate(tomorrow),
      checkOutDate: prev.checkOutDate || formatDate(dayAfter),
    }));
  }, []);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === formData.roomType);

  // Calculate nights and estimated sample total
  const calculateStay = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return { nights: 1, total: 0 };
    const start = new Date(formData.checkInDate);
    const end = new Date(formData.checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nights = diffDays > 0 ? diffDays : 0;
    const rate = selectedRoom ? selectedRoom.samplePricePHP : 2500;
    return { nights, total: nights * rate };
  };

  const { nights, total } = calculateStay();

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const phoneRegex = /^[\d\s+\-()]{7,16}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid contact number (e.g. 09539661524).';
    }

    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Please select a check-in date.';
    }

    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Please select a check-out date.';
    } else if (formData.checkInDate && formData.checkOutDate <= formData.checkInDate) {
      newErrors.checkOutDate = 'Check-out date must be strictly after the check-in date.';
    }

    if (formData.guestsCount < 1) {
      newErrors.guestsCount = 'At least 1 guest is required.';
    } else if (selectedRoom && formData.guestsCount > selectedRoom.capacityGuests) {
      newErrors.guestsCount = `${selectedRoom.name} can accommodate a maximum of ${selectedRoom.capacityGuests} guests. Please select a larger room or contact us.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Generate unique inquiry reference code
    const inquiryId = `BVR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const summary: ReservationSummary = {
      ...formData,
      inquiryId,
      submittedAt: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      nightsCount: nights,
      estimatedTotalPHP: total,
      roomDetails: selectedRoom,
    };

    setIsSubmitting(false);
    setSubmittedSummary(summary);
    if (onSuccess) onSuccess(summary);

    // Attempt to automatically open visitor's email app with inquiry details
    try {
      const mailtoUrl = generateMailtoHref(summary);
      window.location.href = mailtoUrl;
    } catch {
      // Fallback handled in UI
    }
  };

  // Plain text version for clipboard copying
  const generatePlainTextSummary = (summary: ReservationSummary) => {
    return `[Reservation Inquiry ${summary.inquiryId}] - ${summary.roomDetails?.name || 'Room Stay'}
Guest Name: ${summary.fullName}
Email: ${summary.email}
Phone: ${summary.phone}
Selected Room: ${summary.roomDetails?.name || 'General Inquiry'} (Sample Rate: ₱${summary.roomDetails?.samplePricePHP.toLocaleString()} / night)
Dates: ${summary.checkInDate} to ${summary.checkOutDate} (${summary.nightsCount} Night${summary.nightsCount > 1 ? 's' : ''})
Guests: ${summary.guestsCount}
Estimated Sample Total: ₱${summary.estimatedTotalPHP.toLocaleString()} PHP
Special Requests: ${summary.specialRequests || 'None'}
Resort: Oceana Haven (Corong-Corong, El Nido, Palawan, Philippines)`;
  };

  const handleCopy = (summary: ReservationSummary) => {
    const text = generatePlainTextSummary(summary);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  // Generate mailto link for direct submission to resort email
  const generateMailtoHref = (summary: ReservationSummary) => {
    const subject = encodeURIComponent(
      `[Reservation Inquiry ${summary.inquiryId}] - ${summary.roomDetails?.name || 'Room Stay'} - ${summary.fullName}`
    );
    const bodyText = `Dear Oceana Haven Reservations Team,

I would like to submit a reservation inquiry for Oceana Haven in Corong-Corong, El Nido, Palawan.

INQUIRY DETAILS:
• Reference Code: ${summary.inquiryId}
• Guest Name: ${summary.fullName}
• Email: ${summary.email}
• Contact Number: ${summary.phone}
• Selected Room: ${summary.roomDetails?.name || 'General Inquiry'} (Sample Rate: ₱${summary.roomDetails?.samplePricePHP.toLocaleString()} / night)
• Check-in Date: ${summary.checkInDate}
• Check-out Date: ${summary.checkOutDate} (${summary.nightsCount} Night${summary.nightsCount > 1 ? 's' : ''})
• Number of Guests: ${summary.guestsCount}
• Estimated Sample Total: ₱${summary.estimatedTotalPHP.toLocaleString()} PHP
• Special Requests: ${summary.specialRequests || 'None'}

Please advise on room availability and confirmation steps.

Thank you,
${summary.fullName}`;

    return `mailto:${RESORT_INFO.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  const generateGmailWebHref = (summary: ReservationSummary) => {
    const subject = encodeURIComponent(
      `[Reservation Inquiry ${summary.inquiryId}] - ${summary.roomDetails?.name || 'Room Stay'} - ${summary.fullName}`
    );
    const bodyText = encodeURIComponent(
      `Dear Oceana Haven Reservations Team,\n\nI would like to submit a reservation inquiry for Oceana Haven in Corong-Corong, El Nido, Palawan.\n\nINQUIRY DETAILS:\n• Reference Code: ${summary.inquiryId}\n• Guest Name: ${summary.fullName}\n• Email: ${summary.email}\n• Contact Number: ${summary.phone}\n• Selected Room: ${summary.roomDetails?.name || 'General Inquiry'}\n• Dates: ${summary.checkInDate} to ${summary.checkOutDate} (${summary.nightsCount} Nights)\n• Guests: ${summary.guestsCount}\n• Estimated Sample Total: ₱${summary.estimatedTotalPHP.toLocaleString()} PHP\n• Special Requests: ${summary.specialRequests || 'None'}\n\nPlease advise on availability.\n\nThank you,\n${summary.fullName}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${RESORT_INFO.email}&su=${subject}&body=${bodyText}`;
  };

  if (submittedSummary) {
    return (
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-teal-100 shadow-sm animate-fade-in text-stone-800">
        <div className="flex items-center gap-3 mb-4 text-emerald-700">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Inquiry Form Prepared!
            </h3>
            <p className="text-xs text-stone-500">
              Reference: <span className="font-mono font-semibold text-teal-800">{submittedSummary.inquiryId}</span> · {submittedSummary.submittedAt}
            </p>
          </div>
        </div>

        {/* Academic status disclosure */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 mb-6 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Free Static Website Inquiry:</span>
            Your email app has been prompted to open. Send the email directly to <strong className="font-medium text-amber-950">{RESORT_INFO.email}</strong> to finalize your booking inquiry with our team.
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-stone-50 rounded-lg p-4 border border-stone-200 text-xs space-y-2.5 mb-6">
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Guest Name:</span>
            <span className="font-medium text-stone-900">{submittedSummary.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Contact Details:</span>
            <span className="font-medium text-stone-900">
              {submittedSummary.email} · {submittedSummary.phone}
            </span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Selected Room:</span>
            <span className="font-medium text-teal-900">
              {submittedSummary.roomDetails?.name || 'Selected Room'}
            </span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Dates of Stay:</span>
            <span className="font-medium text-stone-900">
              {submittedSummary.checkInDate} to {submittedSummary.checkOutDate} ({submittedSummary.nightsCount} night{submittedSummary.nightsCount > 1 ? 's' : ''})
            </span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Guest Count:</span>
            <span className="font-medium text-stone-900">{submittedSummary.guestsCount} Guest(s)</span>
          </div>
          {submittedSummary.specialRequests && (
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Special Requests:</span>
              <span className="font-medium text-stone-900 text-right max-w-[60%]">
                {submittedSummary.specialRequests}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-sm font-semibold text-stone-900">
            <span>Estimated Sample Total:</span>
            <span className="text-teal-800 font-mono">
              ₱{submittedSummary.estimatedTotalPHP.toLocaleString()} PHP
            </span>
          </div>
        </div>

        {/* Working Actions: Multiple Options for Any Device/Browser */}
        <div className="space-y-3">
          <a
            href={generateMailtoHref(submittedSummary)}
            className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Open in Default Email App (Mailto)</span>
          </a>

          <a
            href={generateGmailWebHref(submittedSummary)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Open in Gmail (Web Browser)</span>
          </a>

          <button
            onClick={() => handleCopy(submittedSummary)}
            className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Inquiry Copied to Clipboard!</span>
              </>
            ) : (
              <span>Copy Inquiry Details (Paste into Yahoo / Outlook / Messenger)</span>
            )}
          </button>

          <a
            href={RESORT_INFO.telLink}
            className="w-full py-2 px-4 text-stone-600 hover:text-teal-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-stone-500" />
            <span>Or Call Front Desk Directly: {RESORT_INFO.contactNumber}</span>
          </a>

          <button
            onClick={() => setSubmittedSummary(null)}
            className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-medium cursor-pointer underline text-center"
          >
            Submit Another Inquiry
          </button>
        </div>

        {/* Free Static Hosting Architecture Notice */}
        <div className="mt-6 pt-4 border-t border-stone-200 text-[11px] text-stone-400">
          <p className="font-semibold text-stone-600 mb-1">100% Free Static Hosting Architecture:</p>
          <p>
            This website operates as a 100% free static site with zero backend servers or external databases. Inquiries are processed client-side and dispatched directly to your resort inbox at <code className="text-teal-700 font-mono">{RESORT_INFO.email}</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-stone-800" noValidate>
      {/* Educational Notice Banner */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs text-stone-600 flex items-start gap-2">
        <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-stone-900">Reservations & Inquiries Desk:</span> 8:00 AM – 8:00 PM. Check-in is at 2:00 PM; Check-out is at 12:00 PM. Rates are sample educational rates.
        </div>
      </div>

      {/* Row 1: Full Name */}
      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="e.g. Maria Santos"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: undefined });
            }}
            className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
              errors.fullName
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-stone-300 focus:ring-teal-500 focus:border-teal-500'
            }`}
          />
        </div>
        {errors.fullName && (
          <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.fullName}</span>
          </p>
        )}
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="email"
              placeholder="e.g. maria@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-stone-300 focus:ring-teal-500 focus:border-teal-500'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Contact Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="tel"
              placeholder="e.g. 09539661524"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-stone-300 focus:ring-teal-500 focus:border-teal-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Room Type Selection */}
      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
          Select Room Type <span className="text-rose-500">*</span>
        </label>
        <select
          value={formData.roomType}
          onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
          className="w-full px-3 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {ROOMS_DATA.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} — ₱{room.samplePricePHP.toLocaleString()} / night (Max {room.capacityGuests} guests)
            </option>
          ))}
        </select>
        {selectedRoom && (
          <p className="text-xs text-stone-500 mt-1">
            Includes: {selectedRoom.bedConfiguration} · {selectedRoom.roomSize} · {selectedRoom.view}
          </p>
        )}
      </div>

      {/* Row 4: Dates & Number of Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Check-in Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="date"
              value={formData.checkInDate}
              onChange={(e) => {
                setFormData({ ...formData, checkInDate: e.target.value });
                if (errors.checkInDate) setErrors({ ...errors, checkInDate: undefined });
              }}
              className={`w-full pl-9 pr-2 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                errors.checkInDate
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-stone-300 focus:ring-teal-500'
              }`}
            />
          </div>
          {errors.checkInDate && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.checkInDate}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Check-out Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="date"
              value={formData.checkOutDate}
              min={formData.checkInDate}
              onChange={(e) => {
                setFormData({ ...formData, checkOutDate: e.target.value });
                if (errors.checkOutDate) setErrors({ ...errors, checkOutDate: undefined });
              }}
              className={`w-full pl-9 pr-2 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                errors.checkOutDate
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-stone-300 focus:ring-teal-500'
              }`}
            />
          </div>
          {errors.checkOutDate && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.checkOutDate}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Guests <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="number"
              min="1"
              max={selectedRoom ? selectedRoom.capacityGuests + 2 : 10}
              value={formData.guestsCount}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  guestsCount: parseInt(e.target.value, 10) || 1,
                });
                if (errors.guestsCount) setErrors({ ...errors, guestsCount: undefined });
              }}
              className={`w-full pl-9 pr-2 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                errors.guestsCount
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-stone-300 focus:ring-teal-500'
              }`}
            />
          </div>
          {errors.guestsCount && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.guestsCount}</p>
          )}
        </div>
      </div>

      {/* Row 5: Special Requests */}
      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
          Special Requests / Arrival Notes <span className="text-stone-400 font-normal">(Optional)</span>
        </label>
        <textarea
          rows={2}
          placeholder="Early check-in request, extra pillows, transportation guidance from MacArthur Highway, dietary inquiries, etc."
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Calculation Summary Bar */}
      {nights > 0 && selectedRoom && (
        <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs flex items-center justify-between">
          <div>
            <span className="text-stone-600">Sample Estimate:</span>{' '}
            <strong className="text-stone-900 font-medium">
              ₱{selectedRoom.samplePricePHP.toLocaleString()} × {nights} Night{nights > 1 ? 's' : ''}
            </strong>
          </div>
          <div className="text-sm font-bold text-teal-800 font-mono">
            ₱{total.toLocaleString()} PHP
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-4 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
      >
        {isSubmitting ? (
          <span>Processing Inquiry...</span>
        ) : (
          <>
            <Send className="w-4 h-4 text-teal-200" />
            <span>Submit Reservation Request</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-stone-500">
        By submitting, you send an academic reservation inquiry to Oceana Haven ({RESORT_INFO.email}). No immediate payment is charged.
      </p>
    </form>
  );
};

import { FormEvent, useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  buildWhatsAppEnquiryUrl,
  buildWhatsAppMessage,
  GLAMOUR_HUB_CONFIG,
} from '../data/studioConfig';

interface EnquirySectionProps {
  selectedService: string;
  onSelectService: (serviceName: string) => void;
}

export function EnquirySection({ selectedService, onSelectService }: EnquirySectionProps) {
  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(GLAMOUR_HUB_CONFIG.preferredTimeWindows[0]);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedDetails, setSubmittedDetails] = useState<{
    name: string;
    service: string;
    date: string;
    time: string;
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const locationPinUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Hello ${GLAMOUR_HUB_CONFIG.businessName} Team, could you please share your studio location pin and available slots?`,
    );
    return `https://wa.me/${GLAMOUR_HUB_CONFIG.whatsappNumber}?text=${text}`;
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setFormError('Please enter your name so our studio team knows who to address.');
      return;
    }
    if (!date) {
      setFormError('Please choose a preferred appointment date.');
      return;
    }

    setFormError(null);
    setSubmittedDetails({
      name: trimmedName,
      service: selectedService,
      date,
      time,
      message: message.trim(),
    });
  };

  const whatsappUrl = submittedDetails ? buildWhatsAppEnquiryUrl(submittedDetails) : '';
  const whatsappPreview = submittedDetails ? buildWhatsAppMessage(submittedDetails) : '';

  const handleCopy = async () => {
    if (!whatsappPreview) return;
    try {
      await navigator.clipboard.writeText(whatsappPreview);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="enquiry" className="bg-[#F5E8E6] py-16 sm:py-24">
      <div className="max-w-[1220px] w-[90vw] mx-auto grid gap-10 lg:grid-cols-[1fr_1.15fr] items-start">
        {/* Left Column: Studio Contact Info */}
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#7A4B54] mb-3">
            Reserve Your Time
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-[#2D2124] leading-[1.15] text-balance mb-4">
            Book Your Appointment
          </h2>
          <p className="text-[#665458] text-base sm:text-lg max-w-[50ch] mb-7">
            Tell us what you are celebrating and when you would like to visit. Your request prepares a
            personal WhatsApp enquiry directly with our studio concierge.
          </p>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#8E636B]/16 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8E636B] mb-1">
                Phone &amp; WhatsApp Concierge
              </p>
              <a
                href={GLAMOUR_HUB_CONFIG.phoneHref}
                className="font-display text-2xl text-[#2D2124] hover:text-[#7A4B54] transition-colors inline-flex items-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-[#7A4B54]" />
                <span className="tabular-nums">{GLAMOUR_HUB_CONFIG.phoneDisplay}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#8E636B]/14">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8E636B] mb-1">
                Studio Hours
              </p>
              <p className="text-sm text-[#2D2124] font-medium tabular-nums">
                {GLAMOUR_HUB_CONFIG.studioHours}
              </p>
            </div>

            <div className="pt-4 border-t border-[#8E636B]/14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8E636B] mb-1">
                  Studio Location
                </p>
                <p className="text-sm text-[#665458] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#7A4B54] shrink-0 mt-0.5" />
                  <span>{GLAMOUR_HUB_CONFIG.locationSummary}</span>
                </p>
              </div>
              <a
                href={locationPinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5E8E6] text-[#7A4B54] text-xs font-semibold hover:bg-[#7A4B54] hover:text-white transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Request Pin</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Enquiry Form / WhatsApp Preview */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#8E636B]/16 shadow-[0_20px_50px_rgba(142,99,107,0.08)]">
          {submittedDetails ? (
            <div className="space-y-5" aria-live="polite">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#7A4B54]">
                    Enquiry Ready
                  </p>
                  <h3 className="font-display text-2xl text-[#2D2124] mt-1">
                    Send via WhatsApp
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedDetails(null)}
                  className="text-xs font-semibold text-[#7A4B54] hover:text-[#2D2124] underline underline-offset-4 cursor-pointer whitespace-nowrap"
                >
                  Edit Details
                </button>
              </div>

              <div className="rounded-2xl bg-[#FAF6F2] border border-[#8E636B]/16 p-4 sm:p-5">
                <pre className="whitespace-pre-wrap font-sans text-sm text-[#2D2124] leading-relaxed m-0">
                  {whatsappPreview}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#7A4B54] text-white text-sm font-semibold hover:bg-[#8E636B] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open in WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#F5E8E6] text-[#7A4B54] text-sm font-semibold hover:bg-[#EDD5D1] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy Message'}</span>
                </button>
              </div>

              <p className="text-xs text-[#665458] bg-[#F5E8E6] rounded-xl px-4 py-3">
                Appointments are confirmed by Glamour Hub directly on WhatsApp (
                {GLAMOUR_HUB_CONFIG.phoneDisplay}) once studio availability is verified.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block text-xs font-semibold text-[#2D2124] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="e.g., Meera Kapoor"
                    className="w-full px-4 py-3 rounded-xl border border-[#8E636B]/20 bg-[#FAF6F2] text-[#2D2124] text-sm placeholder:text-[#8E636B]/60 focus:border-[#7A4B54] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-service"
                    className="block text-xs font-semibold text-[#2D2124] mb-1.5"
                  >
                    Selected Service
                  </label>
                  <select
                    id="enquiry-service"
                    value={selectedService}
                    onChange={(e) => onSelectService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#8E636B]/20 bg-[#FAF6F2] text-[#2D2124] text-sm focus:border-[#7A4B54] focus:outline-none"
                  >
                    {GLAMOUR_HUB_CONFIG.services.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div>
                  <label
                    htmlFor="enquiry-date"
                    className="block text-xs font-semibold text-[#2D2124] mb-1.5"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="enquiry-date"
                    type="date"
                    required
                    min={todayIso}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#8E636B]/20 bg-[#FAF6F2] text-[#2D2124] text-sm tabular-nums focus:border-[#7A4B54] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-time"
                    className="block text-xs font-semibold text-[#2D2124] mb-1.5"
                  >
                    Preferred Time
                  </label>
                  <select
                    id="enquiry-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#8E636B]/20 bg-[#FAF6F2] text-[#2D2124] text-sm focus:border-[#7A4B54] focus:outline-none"
                  >
                    {GLAMOUR_HUB_CONFIG.preferredTimeWindows.map((windowLabel) => (
                      <option key={windowLabel} value={windowLabel}>
                        {windowLabel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="enquiry-message"
                  className="block text-xs font-semibold text-[#2D2124] mb-1.5"
                >
                  Additional Message
                </label>
                <textarea
                  id="enquiry-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your occasion, outfit palette, or preferred look..."
                  className="w-full px-4 py-3 rounded-xl border border-[#8E636B]/20 bg-[#FAF6F2] text-[#2D2124] text-sm placeholder:text-[#8E636B]/60 focus:border-[#7A4B54] focus:outline-none resize-y"
                />
              </div>

              {formError && (
                <p
                  role="alert"
                  className="mb-4 text-xs font-medium text-[#7A4B54] bg-[#F5E8E6] rounded-xl px-4 py-2.5"
                >
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#7A4B54] text-white text-sm font-semibold hover:bg-[#8E636B] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7A4B54]/20 transition-all duration-200 cursor-pointer"
              >
                Request Appointment via WhatsApp
              </button>

              <div className="mt-4 px-4 py-3 rounded-xl bg-[#F5E8E6] text-xs text-[#665458]">
                Appointments are confirmed by Glamour Hub directly on WhatsApp (
                {GLAMOUR_HUB_CONFIG.phoneDisplay}) after availability is checked.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

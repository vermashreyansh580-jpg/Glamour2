import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { GLAMOUR_HUB_CONFIG } from '../data/studioConfig';

const NAV_LINKS = [
  { href: '#featured', label: 'Highlights' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#enquiry', label: 'Enquiry' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF6F2]/95 backdrop-blur-sm border-b border-[#8E636B]/16">
        <div className="max-w-[1220px] w-[90vw] mx-auto py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-2xl tracking-[0.04em] text-[#2D2124] whitespace-nowrap shrink-0"
          >
            {GLAMOUR_HUB_CONFIG.displayBrandPrimary}
            <span className="text-[#7A4B54]">{GLAMOUR_HUB_CONFIG.displayBrandAccent}</span>
          </a>

          {/* Zone 2: 5 concise single-line text links */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#665458] hover:text-[#7A4B54] transition-colors duration-200 whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#enquiry"
              className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#7A4B54] text-white text-sm font-semibold hover:bg-[#8E636B] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7A4B54]/20 transition-all duration-200 whitespace-nowrap shrink-0"
            >
              Book Appointment
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#8E636B]/20 text-sm font-medium text-[#2D2124] hover:border-[#7A4B54] transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Sheet */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#FAF6F2] p-8 flex flex-col justify-between lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-[0.04em] text-[#2D2124]">
              {GLAMOUR_HUB_CONFIG.displayBrandPrimary}
              <span className="text-[#7A4B54]">{GLAMOUR_HUB_CONFIG.displayBrandAccent}</span>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 rounded-full bg-white border border-[#8E636B]/20 flex items-center justify-center text-[#2D2124] hover:border-[#7A4B54] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav aria-label="Mobile links">
            <ul className="space-y-5 my-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl text-[#2D2124] hover:text-[#7A4B54] transition-colors block"
                  >
                    {link.label === 'Enquiry' ? 'Book Your Appointment' : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <a
              href={GLAMOUR_HUB_CONFIG.phoneHref}
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#7A4B54] text-white text-sm font-semibold hover:bg-[#8E636B] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{GLAMOUR_HUB_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

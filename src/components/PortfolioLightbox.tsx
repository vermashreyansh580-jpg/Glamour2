import { useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PortfolioItem } from '../data/studioConfig';
import { StudioImage } from './StudioImage';

interface PortfolioLightboxProps {
  items: PortfolioItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  onEnquireLook: (serviceName: string) => void;
}

export function PortfolioLightbox({
  items,
  activeIndex,
  onClose,
  onSelectIndex,
  onEnquireLook,
}: PortfolioLightboxProps) {
  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const activeItem = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((activeIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onSelectIndex((activeIndex - 1 + items.length) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, items.length, onClose, onSelectIndex]);

  if (!isOpen || !activeItem || activeIndex === null) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2D2124]/92 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white text-[#2D2124] flex items-center justify-center hover:bg-[#F5E8E6] transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative max-w-4xl w-full flex items-center justify-center gap-3 sm:gap-6">
        <button
          type="button"
          onClick={() => onSelectIndex((activeIndex - 1 + items.length) % items.length)}
          aria-label="Previous portfolio image"
          className="hidden sm:flex w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white hover:text-[#2D2124] items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center max-w-2xl w-full">
          <div className="w-full overflow-hidden rounded-2xl bg-[#24191C] shadow-2xl">
            <StudioImage
              src={activeItem.src}
              alt={activeItem.alt}
              fallbackLabel={activeItem.title}
              className="w-full max-h-[68vh] object-cover"
            />
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 w-full px-1">
            <div className="text-center sm:text-left">
              <p className="font-display text-xl text-white">{activeItem.title}</p>
              <p className="text-sm text-[#E7D8D6] mt-0.5">{activeItem.caption}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onEnquireLook(activeItem.relatedService);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5E8E6] text-[#7A4B54] text-xs font-semibold hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Enquire About This Look</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectIndex((activeIndex + 1) % items.length)}
          aria-label="Next portfolio image"
          className="hidden sm:flex w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white hover:text-[#2D2124] items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

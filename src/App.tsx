import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUp, Minus, Plus, Star } from 'lucide-react';
import { Header } from './components/Header';
import { StudioImage } from './components/StudioImage';
import { PortfolioLightbox } from './components/PortfolioLightbox';
import { EnquirySection } from './components/EnquirySection';
import { GLAMOUR_HUB_CONFIG, STUDIO_IMAGES } from './data/studioConfig';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>(
    GLAMOUR_HUB_CONFIG.services[0].name,
  );
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(GLAMOUR_HUB_CONFIG.faqs[0].id);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSelectAndScroll = (serviceName: string) => {
    setSelectedService(serviceName);
    const el = document.getElementById('enquiry');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredServices =
    activeCategory === 'All'
      ? GLAMOUR_HUB_CONFIG.services
      : GLAMOUR_HUB_CONFIG.services.filter((svc) => svc.category === activeCategory);

  return (
    <div id="top" className="min-h-screen bg-[#FAF6F2] text-[#2D2124] flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 1. Split-Layout Hero */}
        <section className="py-10 sm:py-16 lg:py-20">
          <div className="max-w-[1220px] w-[90vw] mx-auto grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#7A4B54] mb-4">
                Glamour Hub · Modern Beauty Studio
              </p>

              <h1 className="font-display text-[clamp(2.75rem,5.2vw,4.5rem)] leading-[1.06] text-[#2D2124] text-balance mb-5">
                Your Beauty.
                <br />
                Your Signature.
              </h1>

              <p className="text-[#665458] text-base sm:text-lg leading-relaxed max-w-[52ch]">
                Soft-focus radiance, thoughtful skin preparation, and effortless hair styling inside a
                calm, contemporary beauty studio.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="#enquiry"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#7A4B54] text-white text-sm font-semibold hover:bg-[#8E636B] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7A4B54]/20 transition-all duration-200 whitespace-nowrap"
                >
                  Book Your Appointment
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-[#2D2124] border border-[#8E636B]/20 text-sm font-semibold hover:border-[#7A4B54] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
                >
                  Explore Our Services
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#665458]">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#7A4B54] text-[#7A4B54]" />
                  <strong className="font-semibold text-[#2D2124] tabular-nums">
                    {GLAMOUR_HUB_CONFIG.googleRating}
                  </strong>
                  <span>Google Rating</span>
                </span>
                <span aria-hidden="true" className="text-[#8E636B]/50">
                  ·
                </span>
                <span>Direct WhatsApp Concierge</span>
                <span aria-hidden="true" className="text-[#8E636B]/50">
                  ·
                </span>
                <a
                  href={GLAMOUR_HUB_CONFIG.phoneHref}
                  className="font-medium text-[#7A4B54] hover:underline tabular-nums"
                >
                  {GLAMOUR_HUB_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-[#F5E8E6] shadow-[0_24px_60px_rgba(142,99,107,0.14)]">
              <StudioImage
                src={STUDIO_IMAGES.hero}
                alt="Radiant modern beauty portrait in soft natural morning light"
                fallbackLabel="Effortless Studio Glow"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center justify-between gap-4 border border-[#8E636B]/12">
                <div>
                  <p className="font-semibold text-sm text-[#2D2124]">Effortless Studio Glow</p>
                  <p className="text-xs text-[#665458] mt-0.5">
                    Bridal &amp; signature soft-glam artistry
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('Bridal & Reception Artistry')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5E8E6] text-[#7A4B54] text-xs font-semibold hover:bg-[#7A4B54] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Featured Services Strip */}
        <section id="featured" className="bg-[#F5E8E6] py-16 sm:py-20">
          <div className="max-w-[1220px] w-[90vw] mx-auto grid gap-5 md:grid-cols-3">
            {GLAMOUR_HUB_CONFIG.highlights.map((item) => (
              <button
                key={item.index}
                type="button"
                onClick={() => handleSelectAndScroll(item.relatedService)}
                className="text-left bg-white border border-[#8E636B]/16 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200 cursor-pointer group"
              >
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8E636B] tabular-nums">
                  {item.index}. {item.tag}
                </p>
                <h2 className="font-display text-2xl text-[#2D2124] mt-2 mb-2 group-hover:text-[#7A4B54] transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-[#665458] leading-relaxed">{item.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* 3. About Our Beauty Philosophy */}
        <section id="philosophy" className="py-16 sm:py-24">
          <div className="max-w-[1220px] w-[90vw] mx-auto grid gap-10 lg:gap-16 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="rounded-3xl overflow-hidden bg-[#F5E8E6]">
              <StudioImage
                src={STUDIO_IMAGES.skincare}
                alt="Minimalist skincare serums and rose quartz on travertine"
                loading="lazy"
                fallbackLabel="Skin-First Philosophy"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#7A4B54] mb-3">
                Our Philosophy
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-[#2D2124] leading-[1.14] text-balance mb-5">
                Modern Beauty That Feels Like You.
              </h2>
              <p className="text-[#665458] text-base sm:text-lg leading-relaxed mb-4 max-w-[54ch]">
                At Glamour Hub, beauty is never about overdone layers. We believe in enhancing natural
                features with breathable textures, clean hygiene, and unhurried one-on-one
                consultations.
              </p>
              <p className="text-[#665458] text-base leading-relaxed mb-7 max-w-[54ch]">
                Every appointment is tailored around your skin tone, outfit palette, and personal
                comfort—so you walk out feeling poised and unmistakably yourself.
              </p>
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#2D2124] border border-[#8E636B]/20 text-sm font-semibold hover:border-[#7A4B54] hover:-translate-y-0.5 transition-all duration-200"
              >
                Start a WhatsApp Conversation
              </a>
            </div>
          </div>
        </section>

        {/* 4. Interactive Curated Beauty Services */}
        <section id="services" className="bg-[#F5E8E6] py-16 sm:py-24">
          <div className="max-w-[1220px] w-[90vw] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-[600px]">
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#7A4B54] mb-3">
                  Studio Menu
                </p>
                <h2 className="font-display text-3xl sm:text-5xl text-[#2D2124] leading-[1.15] text-balance mb-3">
                  Curated Beauty Services
                </h2>
                <p className="text-[#665458] text-base">
                  Select any service card below to pre-fill your WhatsApp appointment enquiry.
                </p>
              </div>

              {/* Interactive Category Filter Tabs */}
              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/80 rounded-2xl border border-[#8E636B]/14 self-start lg:self-end"
                role="tablist"
                aria-label="Filter beauty services by category"
              >
                {GLAMOUR_HUB_CONFIG.serviceCategories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#7A4B54] text-white'
                          : 'text-[#665458] hover:text-[#2D2124] hover:bg-[#FAF6F2]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => {
                const isSelected = selectedService === service.name;
                return (
                  <article
                    key={service.id}
                    className={`bg-white rounded-3xl p-7 border flex flex-col justify-between gap-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(142,99,107,0.1)] ${
                      isSelected ? 'border-[#7A4B54] ring-1 ring-[#7A4B54]/20' : 'border-[#8E636B]/16'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8E636B] font-semibold tracking-[0.08em] uppercase">
                        <span>{service.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums font-medium">{service.duration}</span>
                      </div>
                      <h3 className="font-display text-2xl text-[#2D2124] mt-2.5 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-[#665458] leading-relaxed">{service.summary}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectAndScroll(service.name)}
                      className={`self-start px-5 py-2.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-[#7A4B54] text-white'
                          : 'bg-[#F5E8E6] text-[#7A4B54] hover:bg-[#7A4B54] hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Selected · Enquire Now' : 'Select & Enquire'}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Image-Led Visual Portfolio */}
        <section id="portfolio" className="py-16 sm:py-24">
          <div className="max-w-[1220px] w-[90vw] mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#7A4B54] mb-3">
                  Visual Portfolio
                </p>
                <h2 className="font-display text-3xl sm:text-5xl text-[#2D2124] leading-[1.15] text-balance">
                  Soft Light &amp; Clean Craft
                </h2>
              </div>
              <p className="text-sm text-[#665458]">
                Studio inspiration gallery — select any frame to enlarge.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {GLAMOUR_HUB_CONFIG.portfolio.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="text-left rounded-3xl overflow-hidden bg-white border border-[#8E636B]/16 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#7A4B54]"
                >
                  <div className="overflow-hidden bg-[#F5E8E6]">
                    <StudioImage
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      fallbackLabel={item.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-5 py-4 flex items-center justify-between text-sm text-[#665458]">
                    <span className="font-medium text-[#2D2124]">{item.title}</span>
                    <span className="w-7 h-7 rounded-full bg-[#FAF6F2] flex items-center justify-center text-[#7A4B54] group-hover:bg-[#7A4B54] group-hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Why Choose Glamour Hub + Client Reviews */}
        <section id="reviews" className="bg-[#F5E8E6] py-16 sm:py-24">
          <div className="max-w-[1220px] w-[90vw] mx-auto">
            <div className="max-w-[600px] mb-10">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#7A4B54] mb-3">
                Why Glamour Hub
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-[#2D2124] leading-[1.15] text-balance">
                Thoughtful Details, Every Visit.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {GLAMOUR_HUB_CONFIG.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl p-7 border border-[#8E636B]/16"
                >
                  <h3 className="font-display text-2xl text-[#2D2124] mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[#665458] leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
              {GLAMOUR_HUB_CONFIG.reviews.map((review) => (
                <div
                  key={review.name}
                  className="bg-white rounded-2xl p-7 border border-[#8E636B]/16 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div
                      className="flex items-center gap-1 text-[#7A4B54] mb-3"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#7A4B54] text-[#7A4B54]" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-[#2D2124] leading-relaxed">
                      “{review.quote}”
                    </p>
                  </div>
                  <div className="text-xs text-[#8E636B] font-medium flex items-center gap-2">
                    <span className="text-[#2D2124] font-semibold">{review.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{review.occasion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Frequently Asked Questions */}
        <section id="faq" className="py-16 sm:py-24">
          <div className="max-w-[780px] w-[90vw] mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#7A4B54] mb-3">
                Questions
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-[#2D2124] leading-[1.15]">
                Good to Know
              </h2>
            </div>

            <div className="space-y-3.5">
              {GLAMOUR_HUB_CONFIG.faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white border border-[#8E636B]/16 rounded-2xl px-6"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={faq.id}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full py-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-[#2D2124] cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="text-[#7A4B54] shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div id={faq.id} className="pb-5 text-sm text-[#665458] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. Appointment Enquiry & Contact */}
        <EnquirySection
          selectedService={selectedService}
          onSelectService={setSelectedService}
        />
      </main>

      {/* 9. Elegant Footer */}
      <footer className="bg-[#24191C] text-[#F5ECEB] pt-14 pb-24 lg:pb-12">
        <div className="max-w-[1220px] w-[90vw] mx-auto">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-display text-2xl tracking-[0.04em] text-white mb-2">
                {GLAMOUR_HUB_CONFIG.displayBrandPrimary}
                <span className="text-[#C78B93]">{GLAMOUR_HUB_CONFIG.displayBrandAccent}</span>
              </p>
              <p className="text-sm text-[#D6C5C8] max-w-[34ch]">
                Contemporary beauty studio specializing in soft-glam artistry, hair rituals, and
                skin-first preparation.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C78B93] mb-2">
                Studio
              </p>
              <p className="text-sm mb-1">
                <a
                  href={GLAMOUR_HUB_CONFIG.phoneHref}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {GLAMOUR_HUB_CONFIG.phoneDisplay}
                </a>
              </p>
              <p className="text-xs text-[#C5B4B7] tabular-nums">
                {GLAMOUR_HUB_CONFIG.studioHours}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C78B93] mb-2">
                Explore
              </p>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-white transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#enquiry" className="hover:text-white transition-colors">
                    Book Your Appointment
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/12 flex flex-wrap items-center justify-between gap-4 text-xs text-[#C5B4B7]">
            <span>© {new Date().getFullYear()} Glamour Hub. Modern Beauty Studio.</span>
            <span>Rated {GLAMOUR_HUB_CONFIG.googleRating} ★ on Google</span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Quick Action Bar (compact, < 15% mobile viewport) */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[#8E636B]/16 px-4 py-2.5 grid grid-cols-2 gap-3 lg:hidden">
        <a
          href={GLAMOUR_HUB_CONFIG.phoneHref}
          className="inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-[#FAF6F2] border border-[#8E636B]/20 text-xs font-semibold text-[#2D2124]"
        >
          Call Now
        </a>
        <a
          href="#enquiry"
          className="inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-[#7A4B54] text-xs font-semibold text-white"
        >
          Book Now
        </a>
      </div>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-20 lg:bottom-8 right-6 z-30 w-11 h-11 rounded-full bg-white border border-[#8E636B]/20 text-[#7A4B54] shadow-md flex items-center justify-center transition-opacity duration-200 cursor-pointer hover:bg-[#F5E8E6] ${
          showTopBtn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Portfolio Lightbox */}
      <PortfolioLightbox
        items={GLAMOUR_HUB_CONFIG.portfolio}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
        onEnquireLook={handleSelectAndScroll}
      />
    </div>
  );
}

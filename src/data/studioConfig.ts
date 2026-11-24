export interface StudioService {
  id: string;
  name: string;
  category: 'Makeup' | 'Hair' | 'Skin' | 'Nails' | 'Brows & Lashes';
  duration: string;
  summary: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  caption: string;
  relatedService: string;
  src: string;
  alt: string;
}

export interface FeaturedHighlight {
  index: string;
  tag: string;
  title: string;
  description: string;
  relatedService: string;
}

export interface StudioPillar {
  title: string;
  description: string;
}

export interface ClientReview {
  name: string;
  occasion: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface EnquiryDetails {
  name: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

export const STUDIO_IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida/ALJJyrAgBt9h4kb6KwQV0W8zr_qSXcgC4-6Nr_jmUfD3kKP1Mduf2GcUr1rAegIgcVxn8H29g-Q4vuNgIK0FuIZ3yAz1mwKS3OdqJkP9KrJCXxx-6yUHC6V9rF4eSJQaiclbvBJqrZKt3spZgpfr_btIBlT-QxzMCsVlz7JaNIh9UMP3QnFyCklIfGWY8BCOjqOASmGfq8Y0iNTU3bgTSl5xFwCaKUrU3Mk9hOla1kSX4wzezg',
  skincare:
    'https://lh3.googleusercontent.com/aida/ALJJyrACtj1IOiq3GBf79eFRHW-yD22cDd5jf54cZAtK-2PNuFeKRJgxxc9pVb_k7Pffe_KkMfBOmoT29yodMb4LcjHlb06pHj3XnytrRoHIFVkFJSwguzbz9u1RJo4NbNuvTctRaPvpex0BEd_-5QBEPtDnySB-UM34nv00g4kbi10YWoCxpxiOVHWwvIJLOiAyMHL1TGBmpQeYOhCsxJBcB7bM4woFE6vV46wnmHjdwIb1C4y933w',
  hairRitual:
    'https://lh3.googleusercontent.com/aida/ALJJyrBbgayuYN4FGTWY8oWrGX9U8Ge3_N2TP_Qomg_n4CLRpBrPVxcgU4lgAC_De1g4PK5yZIz4LdXi8VGYnfxKc2oii4BW2vjQKvOeO9brkSo24I7A7nzWS7Mit8Cqplv1AQjVYTusyEITWLUkQDYFGmbDSiScl1aDTr_rOIJ_S2qoyTsEitOk98k8cuiG4W1oaZjDc5_4vG1N2x90JRX5fGQaQFGqi0wWA93GCk2xEke13Te5kWWyVSC8',
  makeupBar:
    'https://lh3.googleusercontent.com/aida/ALJJyrA0wpFddYakdNR22SC_d6HssnmZcxJt4l5PG0du6hvtCN3piRhssG7QyMScAl99fvLZBGuXimGladmrP6F5TwTzlIlZqOTgKddj07HPFkCsjCAwBf0sQO4GMRJAVdITw5o1OMu2eN1PiAYYG5P0l9WD5MY4O_x5-phimDLEjtA40NiWBFNG7sAt-eSTFo4pEuZwXwJmEEv2OjULJQRQQK8ftpOZ458eTLG22UrGQwwNJ_TVfLesKA',
};

export const GLAMOUR_HUB_CONFIG = {
  businessName: 'GLAMOUR HUB',
  displayBrandPrimary: 'Glamour',
  displayBrandAccent: 'Hub',
  phoneDisplay: '+91 82993 43261',
  phoneHref: 'tel:+918299343261',
  whatsappNumber: '918299343261',
  googleRating: '4.9',
  studioHours: 'Tue – Sun · 10:00 AM – 7:30 PM',
  locationSummary: 'Private studio suite · Exact directions shared upon enquiry',
  serviceCategories: ['All', 'Makeup', 'Hair', 'Skin', 'Nails', 'Brows & Lashes'] as const,
  highlights: [
    {
      index: '01',
      tag: 'Bridal',
      title: 'Soft-Glam Bridal',
      description: 'Luminous skin finishes designed to stay fresh from ceremony to celebration.',
      relatedService: 'Bridal & Reception Artistry',
    },
    {
      index: '02',
      tag: 'Hair',
      title: 'Silk & Wave Rituals',
      description: 'Healthy shine blowouts and sculpted movement without heavy stiffness.',
      relatedService: 'Signature Hair Styling & Rituals',
    },
    {
      index: '03',
      tag: 'Skin',
      title: 'Dewy Skin Prep',
      description: 'Calming hydration rituals before any occasion or bridal appointment.',
      relatedService: 'Skin Prep & Radiance Facials',
    },
  ] satisfies FeaturedHighlight[],
  services: [
    {
      id: 'bridal-glam',
      name: 'Bridal & Reception Artistry',
      category: 'Makeup',
      duration: '120 – 150 min',
      summary: 'Personalized bridal consultations, soft-focus base work, and long-wear finishes.',
    },
    {
      id: 'editorial-party',
      name: 'Evening & Occasion Makeup',
      category: 'Makeup',
      duration: '75 – 90 min',
      summary: 'Modern rosy neutrals or classic winged definition for events and portraits.',
    },
    {
      id: 'hair-styling',
      name: 'Signature Hair Styling & Rituals',
      category: 'Hair',
      duration: '60 – 90 min',
      summary: 'Effortless waves, sleek buns, and nourishing gloss treatments.',
    },
    {
      id: 'skin-radiance',
      name: 'Skin Prep & Radiance Facials',
      category: 'Skin',
      duration: '60 min',
      summary: 'Barrier-friendly hydration and gentle glow conditioning.',
    },
    {
      id: 'nail-studio',
      name: 'Luxury Nail & Hand Care',
      category: 'Nails',
      duration: '45 – 60 min',
      summary: 'Sheer blush neutrals, clean manicures, and lasting gel shine.',
    },
    {
      id: 'brow-lash',
      name: 'Brow Architecture & Lash Lift',
      category: 'Brows & Lashes',
      duration: '45 min',
      summary: 'Softly feathered brows and natural lash curl enhancement.',
    },
  ] satisfies StudioService[],
  portfolio: [
    {
      id: 'dewy-rose',
      title: 'Dewy Rose Look',
      caption: 'Dewy Rose Makeup — Soft-focus skin prep and luminous cheek flush',
      relatedService: 'Evening & Occasion Makeup',
      src: STUDIO_IMAGES.hero,
      alt: 'Radiant modern beauty portrait featuring dewy rose makeup in natural light',
    },
    {
      id: 'hair-rituals',
      title: 'Hair Rituals',
      caption: 'Glossy Waves — Weightless hold and natural movement in sunlit studio',
      relatedService: 'Signature Hair Styling & Rituals',
      src: STUDIO_IMAGES.hairRitual,
      alt: 'Glossy sculpted hair styling in a sunlit studio',
    },
    {
      id: 'studio-ambience',
      title: 'Studio Ambience',
      caption: 'Studio Vanity — Calm ivory and blush suites prepared for private appointments',
      relatedService: 'Bridal & Reception Artistry',
      src: STUDIO_IMAGES.makeupBar,
      alt: 'Blush pink and ivory modern beauty studio vanity interior',
    },
  ] satisfies PortfolioItem[],
  pillars: [
    {
      title: '4.9★ Rated Experience',
      description: 'Consistently praised by bridal and occasion guests for thoughtful artistry and calm care.',
    },
    {
      title: 'Skin-First Preparation',
      description: 'Every look starts with gentle hydration for comfortable, creaseless wear.',
    },
    {
      title: 'Direct Studio Access',
      description: 'Speak directly with the studio team on WhatsApp to plan your appointment.',
    },
  ] satisfies StudioPillar[],
  reviews: [
    {
      name: 'Ananya Mehra',
      occasion: 'Bridal & Reception Artistry',
      quote:
        'My bridal base felt weightless for over ten hours and looked completely natural in both daylight portraits and evening flash.',
      rating: 5,
    },
    {
      name: 'Kavya Nair',
      occasion: 'Evening Makeup & Hair Rituals',
      quote:
        'The studio atmosphere is serene and spotless. They listened closely to my outfit palette and nailed the soft-rose look effortlessly.',
      rating: 5,
    },
  ] satisfies ClientReview[],
  faqs: [
    {
      id: 'faq-booking',
      question: 'Does submitting the form confirm my booking immediately?',
      answer:
        'No — submitting prepares a pre-filled WhatsApp enquiry to Glamour Hub (+91 82993 43261) so our studio coordinator can check availability and confirm your preferred date and time personally.',
    },
    {
      id: 'faq-location',
      question: 'How do I receive the studio address and parking details?',
      answer:
        'Once you send your WhatsApp enquiry or call us directly, we share our exact Google Maps pin, studio suite directions, and arrival checklist for a relaxed visit.',
    },
    {
      id: 'faq-bridal-trial',
      question: 'Can I request a bridal consultation before finalizing my look?',
      answer:
        'Yes. Select Bridal & Reception Artistry in the enquiry form and mention your ceremony dates in the message field so we can schedule a dedicated consultation.',
    },
    {
      id: 'faq-skin-prep',
      question: 'How early should I book Skin Prep & Radiance Facials before an event?',
      answer:
        'We recommend scheduling calming hydration facials 3 to 5 days prior to major celebrations so your skin barrier settles into a supple, camera-ready glow.',
    },
  ] satisfies FaqItem[],
  preferredTimeWindows: [
    'Morning Preference (10:00 AM – 12:30 PM)',
    'Afternoon Preference (1:00 PM – 4:00 PM)',
    'Evening Preference (4:30 PM – 7:30 PM)',
    'Flexible — Please Suggest Availability',
  ],
};

export function buildWhatsAppMessage(details: EnquiryDetails): string {
  const name = details.name.trim() || 'Guest';
  const service = details.service.trim() || 'General Beauty Consultation';
  const date = details.date.trim() || 'Flexible';
  const time = details.time.trim() || 'Flexible';
  const message = details.message.trim() || 'Please share available slots.';

  return [
    `Hello ${GLAMOUR_HUB_CONFIG.businessName} Team,`,
    '',
    'I would like to request an appointment enquiry:',
    `• Name: ${name}`,
    `• Selected Service: ${service}`,
    `• Preferred Date: ${date}`,
    `• Preferred Time: ${time}`,
    `• Additional Message: ${message}`,
    '',
    'Kindly confirm availability. Thank you!',
  ].join('\n');
}

export function buildWhatsAppEnquiryUrl(details: EnquiryDetails): string {
  const encoded = encodeURIComponent(buildWhatsAppMessage(details));
  return `https://wa.me/${GLAMOUR_HUB_CONFIG.whatsappNumber}?text=${encoded}`;
}

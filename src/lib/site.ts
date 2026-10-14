// Single source for company facts + nav. Change them here, not in pages.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Base-aware internal URL: href('/services') -> '/Madison-Networks/services' */
export const href = (path = '/') => `${BASE}${path.startsWith('/') ? path : `/${path}`}`;

/** Hero art from public/media (burst centred). Wide = desktop 16:9, tall = phone 9:16. avif + webp each. */
export const photo = (kind: 'wide' | 'tall') => {
  const [big, small, bh] = kind === 'wide' ? [1920, 960, 1080] : [1080, 720, 1920];
  const set = (ext: string) => `${href(`/media/hero-${kind}-${small}.${ext}`)} ${small}w, ${href(`/media/hero-${kind}-${big}.${ext}`)} ${big}w`;
  return { avif: set('avif'), webp: set('webp'), src: href(`/media/hero-${kind}-${small}.webp`), width: big, height: bh };
};

export const COMPANY = {
  name: 'Madison Network Services',
  tagline: 'Philadelphia Area Fiber Optic Solutions Provider',
  city: 'Warminster',
  region: 'PA',
  zip: '18974',
  email: 'contactus@madisonworldwide.net',
  phone: undefined as string | undefined, // none listed: show "Contact us" until the client provides one
  serviceArea: 'Primarily Philadelphia and the surrounding areas, with options nationwide.',
  areaServed: ['Philadelphia, PA', 'United States'],
  workWith: [
    'Customers directly',
    'Customer technicians',
    'Network Operations Centers (NOC)',
    'Local ISP and telecom companies',
  ],
  workWithNote:
    'We work directly with customers, with their technicians, or with their Network Operations Centers (NOC), and closely with local ISP and telecom companies.',
} as const;

export const SERVICES = [
  {
    id: 'splicing',
    title: 'Fiber optic splicing and termination',
    items: [
      'OSP and ISP fiber splicing',
      'Loose tube and ribbon fiber splicing',
      'Point-to-point splicing connections',
      'Ring configuration splicing connections',
      'Small fiber placements and lashing',
      'Splicing customers in and out of live networks',
      'Re-entering existing fiber splice cases: mid-sheath entries (ring cuts/splices) and butt splices',
    ],
  },
  {
    id: 'testing',
    title: 'Fiber optic cable testing and certification',
    items: ['Fiber optic network audits', 'Reel testing'],
  },
  {
    id: 'restoration',
    title: 'Emergency restoration',
    items: ['Troubleshooting', 'Identification of the damage location', 'Repair service', '24x7 rapid response support'],
  },
] as const;

/** About copy, ported from the original site (name swapped for COMPANY.name; "technicians are" -> "is"). */
export const ABOUT = {
  lede: `${COMPANY.name} offers fast and easy fiber optics solutions for businesses throughout Philadelphia and the surrounding areas.`,
  cols: [
    'We are experts in fiber optics, working closely with local ISP and Telecom companies to provide timely, efficient services to our customers. Each of our technicians is fully equipped with the knowledge, expertise and state of the art equipment necessary to complete your project quickly and professionally.',
    'Our services are available primarily throughout the Philadelphia area, however we do offer options Nationwide.',
  ],
  promise: 'At Madison we provide a professional experience to assist you with your needs as quickly as possible.',
} as const;

export const NAV = [
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const;

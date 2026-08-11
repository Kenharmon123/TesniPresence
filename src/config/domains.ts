export type BrandColors = { primary: string; accent: string; ink: string; paper: string };
export type ContactDetails = { phone: string; phoneHref: string; email: string; address: string; city: string; region: string; postalCode: string };
export type DomainConfig = {
  domain: string; siteName: string; tagline: string; description: string; brand: BrandColors; logoPath: string;
  contact: ContactDetails; socialProfiles: string[]; organizationId: string; domainId: string; gaId: string;
  isLocalBusiness: boolean; legalDisclaimer: string;
};
const placeholder = 'SET_IN_AGENTS';
const common = { organizationId: placeholder, gaId: import.meta.env.PUBLIC_GA_ID ?? '' };
export const domains = {
  'tesnillc.com': {
    ...common, domain: 'tesnillc.com', siteName: 'Tesni, LLC', tagline: 'U.S. business lending marketplace.',
    description: 'Tesni, LLC is a U.S. business lending marketplace. Compare SBA 7(a) and 504 loans, business lines of credit, commercial real estate financing, DSCR loans, and real estate investment loans from vetted lenders nationwide.',
    brand: { primary: '#1d4ed8', accent: '#0f766e', ink: '#111827', paper: '#ffffff' }, logoPath: '/logos/tesni-llc.svg',
    contact: { phone: '+1-877-836-7642', phoneHref: '+18778367642', email: 'contact@tesnillc.com', address: '5900 Balcones Drive, Suite 100', city: 'Austin', region: 'TX', postalCode: '78731' },
    socialProfiles: ['https://www.linkedin.com/company/tesni-llc', 'https://www.facebook.com/tesnillc'], domainId: placeholder,
    isLocalBusiness: true, legalDisclaimer: 'Tesni, LLC is a U.S. business lending marketplace and broker. We are not a direct lender. We do not approve loans, fund loans, or set interest rates. All credit decisions are made by third-party lenders subject to their own underwriting guidelines. Programs, rates, and terms change frequently and are not guaranteed. Equal opportunity in lending.',
  },
  'tesnicapital.com': {
    ...common, domain: 'tesnicapital.com', siteName: 'Tesni Capital', tagline: 'Mortgage and commercial real estate lending.',
    description: 'Tesni Capital provides mortgage and commercial real estate lending guidance for borrowers evaluating a purchase, refinance, or investment property.',
    brand: { primary: '#1f4b45', accent: '#b7791f', ink: '#12211d', paper: '#fbfaf7' }, logoPath: '/logos/tesni-capital.svg',
    contact: { phone: '', phoneHref: '', email: 'contact@tesnicapital.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [], domainId: placeholder,
    isLocalBusiness: false, legalDisclaimer: 'Loan programs, rates, and terms are subject to change and borrower qualification. This site provides general information, not a commitment to lend.',
  },
  'tesnioutdoorliving.com': {
    ...common, domain: 'tesnioutdoorliving.com', siteName: 'Tesni Outdoor Living', tagline: 'Outdoor living for Texas homes.',
    description: 'Tesni Outdoor Living is a Texas-authorized pro dealer for Backyard Discovery and Range Outdoor Living, serving local outdoor-living customers.',
    brand: { primary: '#31503a', accent: '#bf6d36', ink: '#1d2d21', paper: '#faf6ed' }, logoPath: '/logos/tesni-outdoor.svg',
    contact: { phone: '', phoneHref: '', email: 'contact@tesnioutdoorliving.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [], domainId: placeholder,
    isLocalBusiness: true, legalDisclaimer: 'Product availability, pricing, delivery areas, and installation requirements vary. Backyard Discovery and Range Outdoor Living are trademarks of their respective owners.',
  },
  '4yourhomeloan.com': {
    ...common, domain: '4yourhomeloan.com', siteName: '4 Your Home Loan', tagline: 'Residential mortgage guidance.',
    description: '4 Your Home Loan provides residential mortgage education and loan-planning guidance for home buyers and homeowners.',
    brand: { primary: '#294b6d', accent: '#b7791f', ink: '#172838', paper: '#fbfaf7' }, logoPath: '/logos/4yourhome.svg',
    contact: { phone: '', phoneHref: '', email: 'contact@4yourhomeloan.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [], domainId: placeholder,
    isLocalBusiness: false, legalDisclaimer: 'This information is for educational purposes and is not a commitment to lend. Loan approval, rates, fees, and terms depend on borrower qualification and program availability.',
  },
} satisfies Record<string, DomainConfig>;
export type DomainKey = keyof typeof domains;
const requested = import.meta.env.PUBLIC_TESNI_DOMAIN ?? 'tesnillc.com';
export const activeDomain: DomainConfig = domains[requested as DomainKey] ?? domains['tesnillc.com'];
export const siteUrl = `https://${activeDomain.domain}`;
export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString().replace(/\/$/, path === '/' ? '/' : '');

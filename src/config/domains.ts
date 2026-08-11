export type BrandColors = { primary: string; accent: string; ink: string; paper: string };
export type ContactDetails = { phone: string; phoneHref: string; email: string; address: string; city: string; region: string; postalCode: string };
export type DomainConfig = {
  domain: string; siteName: string; tagline: string; description: string; brand: BrandColors; logoPath: string;
  contact: ContactDetails; socialProfiles: string[]; organizationId: string; domainId: string; gaId: string;
  isLocalBusiness: boolean; legalDisclaimer: string;
};
// Real tenant identifiers from the Tesni Agents database (project tqbvhikiicrkcegqyqtd).
// These are not secrets — they are opaque row identifiers, and all tenant access is
// enforced by RLS on the Agents side. They must match `domains` and `organizations`
// or lead capture will reject submissions with "Unknown domain".
const common = { gaId: import.meta.env.PUBLIC_GA_ID ?? '' };
export const domains = {
  'tesnillc.com': {
    ...common, domain: 'tesnillc.com', siteName: 'Tesni, LLC', tagline: 'U.S. business lending marketplace.',
    description: 'Tesni, LLC is a U.S. business lending marketplace. Compare SBA 7(a) and 504 loans, business lines of credit, commercial real estate financing, DSCR loans, and real estate investment loans from vetted lenders nationwide.',
    brand: { primary: '#1d4ed8', accent: '#0f766e', ink: '#111827', paper: '#ffffff' }, logoPath: '/logos/tesni-llc.svg',
    contact: { phone: '+1-877-836-7642', phoneHref: '+18778367642', email: 'ken@tesnillc.com', address: '5900 Balcones Drive, Suite 100', city: 'Austin', region: 'TX', postalCode: '78731' },
    socialProfiles: ['https://www.linkedin.com/company/tesni-llc', 'https://www.facebook.com/tesnillc'],
    organizationId: '0aebe0f3-4ccd-4566-b2eb-35b3340f1bb8', domainId: '47326d0c-5103-40bf-b1a5-ccd6250b00cc',
    isLocalBusiness: true, legalDisclaimer: 'Tesni, LLC is a U.S. business lending marketplace and broker. We are not a direct lender. We do not approve loans, fund loans, or set interest rates. All credit decisions are made by third-party lenders subject to their own underwriting guidelines. Programs, rates, and terms change frequently and are not guaranteed. Equal opportunity in lending.',
  },
  'tesnicapital.com': {
    ...common, domain: 'tesnicapital.com', siteName: 'Tesni Capital', tagline: 'Mortgage and commercial real estate lending.',
    description: 'Tesni Capital provides mortgage and commercial real estate lending guidance for borrowers evaluating a purchase, refinance, or investment property.',
    brand: { primary: '#1f4b45', accent: '#b7791f', ink: '#12211d', paper: '#fbfaf7' }, logoPath: '/logos/tesni-capital.svg',
    contact: { phone: '', phoneHref: '', email: 'ken@tesnillc.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [],
    organizationId: 'a0726567-8c25-43e9-b71d-813f2a6416c8', domainId: '58062811-3f2d-4593-b27f-1ab4fa91fea6',
    isLocalBusiness: false, legalDisclaimer: 'Loan programs, rates, and terms are subject to change and borrower qualification. This site provides general information, not a commitment to lend.',
  },
  'tesnioutdoorliving.com': {
    ...common, domain: 'tesnioutdoorliving.com', siteName: 'Tesni Outdoor Living', tagline: 'Outdoor living for Texas homes.',
    description: 'Tesni Outdoor Living is a Texas-authorized pro dealer for Backyard Discovery and Range Outdoor Living, serving local outdoor-living customers.',
    brand: { primary: '#31503a', accent: '#bf6d36', ink: '#1d2d21', paper: '#faf6ed' }, logoPath: '/logos/tesni-outdoor.svg',
    contact: { phone: '', phoneHref: '', email: 'ken@tesnillc.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [],
    organizationId: '5172ee66-b0bc-4232-af52-d2f24542485f', domainId: '2e6c2605-386c-484d-87c5-9f2d2bfb94ba',
    isLocalBusiness: true, legalDisclaimer: 'Product availability, pricing, delivery areas, and installation requirements vary. Backyard Discovery and Range Outdoor Living are trademarks of their respective owners.',
  },
  '4yourhomeloan.com': {
    ...common, domain: '4yourhomeloan.com', siteName: '4 Your Home Loan', tagline: 'Residential mortgage guidance.',
    description: '4 Your Home Loan provides residential mortgage education and loan-planning guidance for home buyers and homeowners.',
    brand: { primary: '#294b6d', accent: '#b7791f', ink: '#172838', paper: '#fbfaf7' }, logoPath: '/logos/4yourhome.svg',
    contact: { phone: '', phoneHref: '', email: 'Ken.Harmon@LoanFactory.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [],
    organizationId: '4f97a2de-f026-427d-b204-e80ced8dffe9', domainId: '175ffb5b-d406-4b22-b35a-540b5e8be0bc',
    isLocalBusiness: false, legalDisclaimer: 'This information is for educational purposes and is not a commitment to lend. Loan approval, rates, fees, and terms depend on borrower qualification and program availability.',
  },
} satisfies Record<string, DomainConfig>;
export type DomainKey = keyof typeof domains;
const requested = import.meta.env.PUBLIC_TESNI_DOMAIN ?? 'tesnillc.com';
export const activeDomain: DomainConfig = domains[requested as DomainKey] ?? domains['tesnillc.com'];
export const siteUrl = `https://${activeDomain.domain}`;
export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString().replace(/\/$/, path === '/' ? '/' : '');

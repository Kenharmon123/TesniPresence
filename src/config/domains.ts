export type BrandColors = { primary: string; accent: string; ink: string; paper: string };
export type ContactDetails = { phone: string; phoneHref: string; email: string; address: string; city: string; region: string; postalCode: string };
// Per-brand wording for the contact page and lead form. Without this, every site
// inherited business-lending copy, which was wrong on the outdoor-products brand
// (it offered "SBA loan" as an enquiry option and warned about credit pulls).
export type DomainCopy = {
  contactTitle: string; contactDescription: string; contactHeading: string; contactLead: string;
  formHeading: string; formNote: string; messageLabel: string; interestLabel: string; interestOptions: string[];
};
// Which content set a brand publishes. Previously every brand rendered the same
// business-lending services, locations and FAQs, so the outdoor-products store was
// publishing SBA and DSCR loan pages and asking "Is Tesni, LLC a direct lender?".
export type Vertical = 'business-lending' | 'commercial-lending' | 'outdoor-retail' | 'residential-mortgage';
export type DomainConfig = {
  domain: string; siteName: string; tagline: string; description: string; brand: BrandColors; logoPath: string;
  contact: ContactDetails; socialProfiles: string[]; organizationId: string; domainId: string; gaId: string;
  isLocalBusiness: boolean; legalDisclaimer: string; copy: DomainCopy; vertical: Vertical;
};
const lendingCopy = (siteName: string): DomainCopy => ({
  contactTitle: `Contact ${siteName} | Business Lending Consultations`,
  contactDescription: `Talk with ${siteName} about SBA loans, business lines of credit, and commercial real estate financing.`,
  contactHeading: 'Talk through your financing project',
  contactLead: 'Tell us about your business, project, and timeline. Sharing initial information does not authorize a credit pull and creates no obligation to apply.',
  formHeading: 'Request a consultation',
  formNote: 'Tell us about your project. Submitting this form does not authorize a credit pull.',
  messageLabel: 'Tell us about your project',
  interestLabel: 'What can we help with?',
  interestOptions: ['SBA loan', 'Business line of credit', 'Commercial real estate loan', 'DSCR loan', 'Real estate investment loan', 'Not sure yet'],
});
// Commercial and investment lending. Deliberately NOT residential mortgage: Tesni
// Capital and Tesni, LLC do business and investment lending, which carries different
// compliance obligations than consumer mortgage origination. Do not add consumer
// mortgage wording, NMLS IDs, or Equal Housing text to these brands.
const commercialCopy = (siteName: string): DomainCopy => ({
  contactTitle: `Contact ${siteName} | Business and Investment Property Lending`,
  contactDescription: `Talk with ${siteName} about commercial real estate financing, investment property loans, DSCR loans, and business credit.`,
  contactHeading: 'Talk through your financing project',
  contactLead: 'Tell us about the property or business, your timeline, and what you are trying to accomplish. Sharing initial information does not authorize a credit pull and creates no obligation to apply.',
  formHeading: 'Request a consultation',
  formNote: 'Tell us about the deal you are working on. Submitting this form does not authorize a credit pull.',
  messageLabel: 'Tell us about the property or business',
  interestLabel: 'What can we help with?',
  interestOptions: ['Commercial real estate loan', 'Investment or rental property', 'DSCR loan', 'Bridge or short-term financing', 'Business line of credit', 'SBA loan', 'Not sure yet'],
});
// Residential mortgage only. This brand is the one that operates under Ken Harmon's
// NMLS registration, so it is the only brand that carries the NMLS ID and the Equal
// Housing Opportunity statement.
const residentialCopy = (siteName: string): DomainCopy => ({
  contactTitle: `Contact ${siteName} | Mortgage Questions and Loan Planning`,
  contactDescription: `Talk with ${siteName} about a home purchase, refinance, or investment property loan.`,
  contactHeading: 'Talk through your home loan',
  contactLead: 'Tell us about the property, your timeline, and what you are trying to accomplish. Sharing initial information does not authorize a credit pull and creates no obligation to apply.',
  formHeading: 'Request a consultation',
  formNote: 'Tell us what you are planning. Submitting this form does not authorize a credit pull.',
  messageLabel: 'Tell us about your plans',
  interestLabel: 'What can we help with?',
  interestOptions: ['Buying a home', 'Refinancing', 'Cash-out refinance', 'FHA or VA loan', 'Investment or rental property', 'Not sure yet'],
});
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
    vertical: 'business-lending', copy: lendingCopy('Tesni, LLC'),
    isLocalBusiness: true, legalDisclaimer: 'Tesni, LLC is a U.S. business lending marketplace and broker. We are not a direct lender. We do not approve loans, fund loans, or set interest rates. All credit decisions are made by third-party lenders subject to their own underwriting guidelines. Programs, rates, and terms change frequently and are not guaranteed. Equal opportunity in lending.',
  },
  'tesnicapital.com': {
    ...common, domain: 'tesnicapital.com', siteName: 'Tesni Capital', tagline: 'Business and commercial real estate lending.',
    description: 'Tesni Capital provides business and investment property lending guidance, including commercial real estate financing, DSCR loans, and business credit.',
    brand: { primary: '#1f4b45', accent: '#b7791f', ink: '#12211d', paper: '#fbfaf7' }, logoPath: '/logos/tesni-capital.svg',
    contact: { phone: '', phoneHref: '', email: 'ken@tesnillc.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [],
    organizationId: 'a0726567-8c25-43e9-b71d-813f2a6416c8', domainId: '58062811-3f2d-4593-b27f-1ab4fa91fea6',
    vertical: 'commercial-lending', copy: commercialCopy('Tesni Capital'),
    isLocalBusiness: false, legalDisclaimer: 'Tesni Capital arranges business-purpose and investment property financing and is not a residential mortgage lender. Loan programs, rates, and terms are subject to change and borrower qualification. This site provides general information, not a commitment to lend.',
  },
  'tesnioutdoorliving.com': {
    ...common, domain: 'tesnioutdoorliving.com', siteName: 'Tesni Outdoor Living', tagline: 'Outdoor living for Texas homes.',
    description: 'Tesni Outdoor Living is a Texas-authorized pro dealer for Backyard Discovery and Range Outdoor Living, serving local outdoor-living customers.',
    brand: { primary: '#31503a', accent: '#bf6d36', ink: '#1d2d21', paper: '#faf6ed' }, logoPath: '/logos/tesni-outdoor.svg',
    contact: { phone: '', phoneHref: '', email: 'ken@tesnillc.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [],
    organizationId: '5172ee66-b0bc-4232-af52-d2f24542485f', domainId: '2e6c2605-386c-484d-87c5-9f2d2bfb94ba',
    vertical: 'outdoor-retail',
    copy: {
      contactTitle: 'Contact Tesni Outdoor Living | Pergolas, Gazebos and Play Sets',
      contactDescription: 'Talk with Tesni Outdoor Living about pergolas, grill gazebos, outdoor kitchens, and play sets for your Texas backyard.',
      contactHeading: 'Plan your backyard project',
      contactLead: 'Tell us about your space, the product you are considering, and your timeline. We will help you confirm sizing, delivery, and installation before you order.',
      formHeading: 'Ask about a product or project',
      formNote: 'Tell us about your backyard and what you are considering. We usually reply within one business day.',
      messageLabel: 'Tell us about your space and project',
      interestLabel: 'What are you interested in?',
      interestOptions: ['Pergola', 'Grill gazebo', 'Outdoor kitchen', 'Play set or swing set', 'Delivery and installation question', 'Order or warranty support', 'Not sure yet'],
    },
    isLocalBusiness: true, legalDisclaimer: 'Product availability, pricing, delivery areas, and installation requirements vary. Backyard Discovery and Range Outdoor Living are trademarks of their respective owners.',
  },
  '4yourhomeloan.com': {
    ...common, domain: '4yourhomeloan.com', siteName: '4 Your Home Loan', tagline: 'Residential mortgage guidance.',
    description: '4 Your Home Loan provides residential mortgage education and loan-planning guidance for home buyers and homeowners.',
    brand: { primary: '#294b6d', accent: '#b7791f', ink: '#172838', paper: '#fbfaf7' }, logoPath: '/logos/4yourhome.svg',
    contact: { phone: '', phoneHref: '', email: 'Ken.Harmon@LoanFactory.com', address: '', city: '', region: 'TX', postalCode: '' }, socialProfiles: [],
    organizationId: '4f97a2de-f026-427d-b204-e80ced8dffe9', domainId: '175ffb5b-d406-4b22-b35a-540b5e8be0bc',
    vertical: 'residential-mortgage', copy: residentialCopy('4 Your Home Loan'),
    isLocalBusiness: false, legalDisclaimer: 'Ken Harmon, NMLS #921561. Equal Housing Opportunity. This information is for educational purposes and is not a commitment to lend. Loan approval, rates, fees, and terms depend on borrower qualification and program availability. 4 Your Home Loan is operated separately from Tesni, LLC and Tesni Capital; residential mortgage applications are submitted through Loan Factory.',
  },
} satisfies Record<string, DomainConfig>;
export type DomainKey = keyof typeof domains;
const requested = import.meta.env.PUBLIC_TESNI_DOMAIN ?? 'tesnillc.com';
export const activeDomain: DomainConfig = domains[requested as DomainKey] ?? domains['tesnillc.com'];
export const siteUrl = `https://${activeDomain.domain}`;
export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString().replace(/\/$/, path === '/' ? '/' : '');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  author: string;
  category: string;
  datePublished: string;
  dateModified?: string;
  readTimeMinutes: number;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'sba-7a-vs-504-loans-which-fits-your-business',
    title: 'SBA 7(a) vs. 504 Loans: Which Program Fits Your Business?',
    description:
      'Compare the SBA 7(a) and SBA 504 loan programs side by side — eligibility, use of funds, terms, and how Tesni helps owners decide between them.',
    excerpt:
      'A side-by-side guide to SBA 7(a) vs. 504 loans, covering eligible uses, structures, typical timelines, and what documentation lenders expect from borrowers.',
    author: 'Tesni Editorial Team',
    category: 'SBA Loans',
    datePublished: '2025-08-12',
    dateModified: '2026-04-22',
    readTimeMinutes: 9,
    body: [
      'SBA 7(a) loans and SBA 504 loans are the two flagship Small Business Administration programs, and they serve very different financing goals. The 7(a) program is the SBA\'s most flexible offering and can be used for working capital, inventory, equipment, partner buyouts, debt refinance, and owner-occupied real estate. The 504 program, by contrast, is built specifically for the long-term acquisition or improvement of fixed assets such as commercial real estate and heavy equipment.',
      'A 7(a) loan is funded by a single SBA-approved lender and partially guaranteed by the SBA. Loan amounts go up to $5 million with terms up to 10 years for working capital and equipment, and up to 25 years for owner-occupied real estate. Interest rates may be variable or fixed and are negotiated with the lender within SBA caps. A 504 loan is structured as two notes: roughly 50% from a conventional lender, 40% from a Certified Development Company (CDC) backed by an SBA debenture, and the remaining 10% from the borrower as equity.',
      'Use of funds is the fastest way to narrow the choice. If the project is dominated by real estate or large equipment with a useful life of 10+ years, the SBA 504 program typically delivers a lower blended cost of capital and a long fixed-rate tranche on the CDC portion. If the project mixes working capital, inventory, soft costs, and partner buyouts, the SBA 7(a) program is usually the better fit because 504 funds cannot be used for those purposes.',
      'Eligibility for both programs is similar at a high level: the business must operate for profit in the U.S., meet SBA size standards, demonstrate the ability to repay, and show that owners have invested reasonable equity. Personal guarantees from owners holding 20% or more are standard. Tax returns, year-to-date financials, debt schedules, and a sources-and-uses statement are typically required.',
      'Timelines vary by lender. SBA 7(a) approvals through experienced lenders can move in two to six weeks for straightforward files; 504 transactions involve coordination between the bank, the CDC, and the SBA and often run six to ten weeks. Real estate appraisals, environmental reports, and construction draws can extend either timeline.',
      'At Tesni, LLC we are a U.S. business lending marketplace. We do not approve loans or set rates — we connect business owners with SBA-preferred lenders and Certified Development Companies that compete for their file. Programs and pricing change frequently, and we never guarantee approval, funding amount, or interest rate.',
    ],
  },
  {
    slug: 'business-line-of-credit-vs-term-loan',
    title: 'Business Line of Credit vs. Term Loan: Choosing the Right Tool',
    description:
      'Understand when a revolving business line of credit makes sense versus a fixed-payment term loan, with practical guidance for owners.',
    excerpt:
      'Lines of credit and term loans solve different problems. This guide explains how owners should evaluate cost, structure, and risk between the two.',
    author: 'Tesni Editorial Team',
    category: 'Working Capital',
    datePublished: '2025-09-04',
    readTimeMinutes: 7,
    body: [
      'A business line of credit is a revolving facility — the lender approves a maximum limit, and the borrower draws and repays funds repeatedly during a draw period. Interest is charged only on the outstanding balance, which makes a line of credit a strong fit for fluctuating working capital needs such as payroll smoothing, inventory restocking, and short receivable cycles.',
      'A term loan is a one-time advance with a fixed amortization schedule. The full balance is disbursed at closing, and the borrower repays the principal plus interest over a set number of months or years. Term loans are well-suited to defined, one-time projects: a build-out, an equipment purchase, an acquisition, or a debt consolidation.',
      'When evaluating cost, look beyond the headline rate. Lines of credit may carry annual renewal fees, unused-line fees, and draw fees in addition to interest. Term loans may carry origination fees, packaging fees, and prepayment penalties. The all-in cost depends on how the facility is used.',
      'Underwriting standards differ. Revolving lines tend to weigh accounts-receivable quality, monthly cash flow, and the operating account history more heavily; term loans focus on debt-service coverage and collateral. A borrower with strong recurring revenue but limited hard collateral may qualify for a line of credit before a term loan.',
      'Tesni helps owners model both options and submit a single, well-prepared file to multiple lenders. We are a marketplace and broker — we do not guarantee approval, available limit, or rate. All offers are issued by third-party lenders subject to their own underwriting.',
    ],
  },
  {
    slug: 'dscr-loans-explained-for-real-estate-investors',
    title: 'DSCR Loans Explained for Real Estate Investors',
    description:
      'A practical breakdown of debt-service coverage ratio (DSCR) loans for rental property investors, including how lenders calculate DSCR.',
    excerpt:
      'DSCR loans qualify a property based on its rental income, not the borrower\'s W-2 wages. Here is how the program works and where it fits.',
    author: 'Tesni Editorial Team',
    category: 'Real Estate Investment',
    datePublished: '2025-10-01',
    readTimeMinutes: 8,
    body: [
      'A DSCR loan is a non-QM mortgage product designed for real estate investors. Instead of qualifying the borrower based on personal income, tax returns, and debt-to-income ratios, the lender qualifies the property based on its debt-service coverage ratio: the property\'s gross rental income divided by the total mortgage payment (principal, interest, taxes, insurance, and HOA where applicable).',
      'Most DSCR lenders look for a ratio of 1.00 to 1.25 or higher, although programs exist for ratios below 1.00 with stronger credit and reserves. A DSCR of 1.20 means the property\'s rent covers 120% of the monthly debt service, leaving a 20% cushion.',
      'DSCR loans are popular among self-employed investors, full-time landlords, and anyone whose tax returns understate their true cash flow. They are typically available on single-family rentals, 2–4 unit properties, and small multifamily, with both purchase and cash-out refinance structures.',
      'Pricing on DSCR loans is generally above conventional owner-occupied rates because they are non-QM and held on private balance sheets or sold to specialty investors. Loan-to-value caps are usually 75–80% on purchases. Reserves of 6–12 months are common, and prepayment penalties are typical during the first 1–5 years.',
      'Tesni connects investors to DSCR lenders and helps prepare the property-level package: lease, rent schedule, appraisal with rent comparables, and entity documentation if the loan closes in an LLC. We do not approve loans or set rates and do not guarantee program availability.',
    ],
  },
  {
    slug: 'how-to-prepare-for-a-commercial-real-estate-loan',
    title: 'How to Prepare for a Commercial Real Estate Loan',
    description:
      'A step-by-step checklist for owners preparing to finance owner-occupied or investment commercial real estate.',
    excerpt:
      'Strong CRE loan packages start with clean financials, a clear sources-and-uses, and a property package the lender can underwrite quickly.',
    author: 'Tesni Editorial Team',
    category: 'Commercial Real Estate',
    datePublished: '2025-11-18',
    readTimeMinutes: 6,
    body: [
      'Commercial real estate financing covers a wide range of structures: SBA 7(a) and 504 for owner-occupied properties, conventional bank loans, life-company loans for stabilized assets, bridge loans for value-add projects, and CMBS for larger transactions. Each lender wants the same core information, and a clean package speeds the process meaningfully.',
      'At a minimum, lenders will request the last three years of business tax returns, year-to-date interim financials, a current debt schedule, three years of personal tax returns and a personal financial statement for each guarantor, and the property\'s rent roll, T-12, and any leases.',
      'Build a sources-and-uses statement on day one. The lender wants to see the full capital stack: senior debt, mezzanine or seller financing if any, and the borrower\'s cash equity. For owner-occupied SBA transactions, plan for at least 10% borrower equity; for conventional CRE, expect 25–35% equity depending on asset class.',
      'Order an appraisal and Phase I environmental report only after the lender has issued a term sheet — these are non-refundable third-party costs and lenders often have an approved-vendor list.',
      'Tesni works with banks, credit unions, CDCs, and private lenders nationwide. We help owners select the right structure for the project and submit a single underwriter-ready file. We are a marketplace and do not guarantee any specific terms.',
    ],
  },
  {
    slug: 'top-mistakes-business-owners-make-when-applying-for-financing',
    title: 'Top Mistakes Business Owners Make When Applying for Financing',
    description:
      'The most common errors that delay or kill business loan applications, and how to avoid them.',
    excerpt:
      'Most declined business loan files share a small set of avoidable mistakes. Here is what to fix before you submit.',
    author: 'Tesni Editorial Team',
    category: 'SBA Loans',
    datePublished: '2026-01-14',
    readTimeMinutes: 5,
    body: [
      'The first mistake is submitting an application before financials are reconciled. Lenders pull tax returns and bank statements and compare them to the financials provided. Unexplained gaps, missing schedules, or unfiled returns trigger immediate decline letters.',
      'The second mistake is shopping the same file to many lenders simultaneously without coordination. Hard credit pulls stack up, the file looks scattered, and lenders often share notes through industry channels. Submit through a single point of contact.',
      'The third mistake is asking for the wrong product. A long-amortization SBA loan will not fund a 30-day inventory cycle; a short-term line of credit will not fund a building purchase. Match the product to the use of funds.',
      'The fourth mistake is overlooking personal credit. Owners with 20% or more equity must personally guarantee most small-business loans. A 30-day late payment, a thin file, or a stale collection can move the file from approve to decline.',
      'Tesni helps owners avoid these mistakes by reviewing the file before submission. We are not a lender — we are a U.S. business lending marketplace, and we do not guarantee approval, funding amount, or rate.',
    ],
  },
  {
    slug: 'real-estate-investment-loan-options-for-investors',
    title: 'Real Estate Investment Loan Options for Investors',
    description:
      'A guide to the financing options available to U.S. real estate investors, from DSCR and bridge to portfolio and fix-and-flip loans.',
    excerpt:
      'Investors have more financing options than owner-occupants. This article walks through the main programs and when each makes sense.',
    author: 'Tesni Editorial Team',
    category: 'Real Estate Investment',
    datePublished: '2026-02-09',
    readTimeMinutes: 7,
    body: [
      'Real estate investment loans fall into a few broad categories. Long-term rental loans (DSCR and conventional non-owner-occupied) finance stabilized properties for buy-and-hold investors. Short-term bridge and fix-and-flip loans finance value-add projects with a 6–24 month exit. Portfolio loans cross-collateralize multiple properties under a single facility.',
      'Long-term rental loans typically use a DSCR product when the borrower\'s tax returns do not show enough income, and a conventional Fannie Mae investor loan when they do. DSCR rates run higher but qualification is property-based.',
      'Short-term loans are priced for speed and risk. Expect higher interest rates, points at closing, interest-only payments, and an exit strategy verified before funding. A clear renovation budget and contractor scope are required.',
      'Portfolio loans are useful for investors with five or more properties who want to consolidate notes, free up liquidity, or take cash out across the portfolio. Underwriting evaluates the portfolio\'s blended DSCR and the sponsor\'s track record.',
      'Tesni works with rental, bridge, fix-and-flip, and portfolio lenders nationwide. We are a marketplace and broker. We do not guarantee leverage, rate, or approval — every offer is subject to the lender\'s underwriting and program availability.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

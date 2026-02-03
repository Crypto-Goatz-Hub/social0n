// ============================================================
// Schema.org JSON-LD Component
// ============================================================
// Adds structured data for rich search results
// ============================================================

import {
  generateOrganizationSchema,
  generateProductSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  OrganizationSchema,
  ProductSchema,
  FAQItem,
} from '@/lib/sxo';

interface SchemaMarkupProps {
  type: 'organization' | 'product' | 'faq' | 'software' | 'breadcrumb' | 'multiple';
  organization?: OrganizationSchema;
  product?: ProductSchema;
  faq?: FAQItem[];
  software?: {
    name: string;
    description: string;
    applicationCategory: string;
    operatingSystem: string;
    offers: { price: number; currency: string }[];
  };
  breadcrumb?: { name: string; url: string }[];
  schemas?: object[];
}

export function SchemaMarkup({
  type,
  organization,
  product,
  faq,
  software,
  breadcrumb,
  schemas,
}: SchemaMarkupProps) {
  let schemaData: object | object[] = {};

  switch (type) {
    case 'organization':
      if (organization) schemaData = generateOrganizationSchema(organization);
      break;
    case 'product':
      if (product) schemaData = generateProductSchema(product);
      break;
    case 'faq':
      if (faq) schemaData = generateFAQSchema(faq);
      break;
    case 'software':
      if (software) schemaData = generateSoftwareApplicationSchema(software);
      break;
    case 'breadcrumb':
      if (breadcrumb) schemaData = generateBreadcrumbSchema(breadcrumb);
      break;
    case 'multiple':
      schemaData = schemas || [];
      break;
  }

  if (!schemaData || (Array.isArray(schemaData) && schemaData.length === 0)) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 0),
      }}
    />
  );
}

// ============================================================
// Pre-configured Schema for Social0n
// ============================================================
export function Social0nSchemas() {
  const organizationSchema = generateOrganizationSchema({
    name: 'Social0n',
    url: 'https://social0n.com',
    logo: 'https://social0n.com/logo.png',
    description: 'Campaign-as-a-Service platform for AI-powered social media automation that delivers real business results.',
    sameAs: [
      'https://twitter.com/social0n',
      'https://linkedin.com/company/social0n',
    ],
    contactPoint: {
      email: 'support@social0n.com',
      contactType: 'customer support',
    },
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'Social0n',
    description: 'AI-powered social media campaign automation platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: [
      { price: 197, currency: 'USD' },
      { price: 247, currency: 'USD' },
      { price: 297, currency: 'USD' },
      { price: 497, currency: 'USD' },
    ],
  });

  const faqSchema = generateFAQSchema([
    {
      question: 'What is Social0n?',
      answer: 'Social0n is a Campaign-as-a-Service platform that automates your social media marketing with AI-powered, outcome-driven campaigns.',
    },
    {
      question: 'How long does a campaign last?',
      answer: 'Each campaign runs for 30 days with a defined posting schedule and clear objectives.',
    },
    {
      question: 'Which social platforms are supported?',
      answer: 'Social0n supports LinkedIn, Facebook, Instagram, and Google Business Profile.',
    },
    {
      question: 'Do I need to create content myself?',
      answer: 'No. Our AI generates all content based on your business information and campaign objectives.',
    },
    {
      question: 'Is there a long-term contract?',
      answer: 'No contracts. You pay per campaign. Each campaign is a one-time purchase.',
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

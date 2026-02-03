import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import {
  generateLandingPageContent,
  generateFAQContent,
  generateFeatureDescriptions,
  generateMetaTags,
  generateTestimonials,
  ContentGenerationParams,
} from '@/lib/sxo/content-generator';

// ============================================================
// SXO Content Generation API
// ============================================================
// Dynamic AI content generation for SXO-optimized pages
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, ...params } = body;

    let result;

    switch (action) {
      case 'landing-page':
        result = await generateLandingPageContent(params as ContentGenerationParams);
        break;

      case 'faq':
        const { businessName, productDescription, existingFAQs = [], targetCount = 10 } = params;
        result = await generateFAQContent(businessName, productDescription, existingFAQs, targetCount);
        break;

      case 'features':
        const { features, industry, targetAudience } = params;
        result = await generateFeatureDescriptions(features, industry, targetAudience);
        break;

      case 'meta-tags':
        const { pageType, business, pageContent, targetKeywords } = params;
        result = await generateMetaTags(pageType, business, pageContent, targetKeywords);
        break;

      case 'testimonials':
        const { business: biz, industry: ind, idealCustomer, count = 5 } = params;
        result = await generateTestimonials(biz, ind, idealCustomer, count);
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: landing-page, faq, features, meta-tags, testimonials' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('SXO generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Content generation failed' },
      { status: 500 }
    );
  }
}

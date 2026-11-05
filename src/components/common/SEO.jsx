import { useEffect } from 'react';

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  schema
}) {
  useEffect(() => {
    // Update Title
    const fullTitle = title 
      ? `${title} | SHIVANANDI VISTA Bengaluru`
      : 'SHIVANANDI VISTA | Hotel & Resort in Yelahanka, Bengaluru';
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || 'Discover SHIVANANDI VISTA, a welcoming hotel and resort in Yelahanka Taluk, Bengaluru. Explore comfortable rooms, hospitality, and direct booking enquiries.';

    // Update Keywords if present
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    // Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical && canonicalUrl) {
      linkCanonical.href = `https://shivanandivista.com${canonicalUrl}`;
    }

    // Dynamic Schema Injection
    let schemaScript = document.getElementById('dynamic-page-schema');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description, keywords, canonicalUrl, schema]);

  return null;
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  MessageSquare,
  Sparkles,
  MapPin,
  CheckCircle2,
  Phone
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { blogPosts, property, openWhatsApp } = useHotel();

  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDesc || post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": "SHIVANANDI VISTA"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SHIVANANDI VISTA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shivanandivista.com/vite.svg"
      }
    },
    "datePublished": "2026-10-15"
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDesc || post.excerpt}
        keywords="Yelahanka Travel, Bangalore Airport Guide, Devanahalli Tourism, SHIVANANDI VISTA Guide"
        canonicalUrl={`/blog/${post.slug}`}
        schema={articleSchema}
      />

      {/* Breadcrumb Header */}
      <section className="bg-alabaster-200 border-b border-surface-border py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-charcoal-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-gold transition">Travel Blog</Link>
            <span>/</span>
            <span className="text-charcoal font-semibold truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
          </div>

          <Link
            to="/blog"
            className="flex items-center gap-1.5 text-gold-dark font-bold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>
      </section>

      {/* Main Article Container */}
      <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        
        {/* Title & Metadata */}
        <div className="space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-gold-dark bg-gold-cream px-3 py-1 rounded-full border border-gold/30">
            {post.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-surface-border text-xs text-charcoal-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold" />
                <span>By {post.author || 'Hospitality Desk'}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{post.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-charcoal-700 hover:text-gold transition font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden skeuo-plate p-2 shadow-skeuo-card">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 sm:h-[420px] object-cover rounded-xl"
          />
        </div>

        {/* Article Body Content */}
        <div className="skeuo-plate p-6 sm:p-10 border border-surface-border space-y-6 text-charcoal-800 leading-relaxed text-sm sm:text-base">
          {post.content ? (
            <div className="prose max-w-none space-y-4">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="font-serif text-2xl font-bold text-charcoal pt-4 border-b border-surface-border pb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('#### ')) {
                  return (
                    <h4 key={index} className="font-serif text-xl font-bold text-charcoal pt-2">
                      {paragraph.replace('#### ', '')}
                    </h4>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="space-y-1.5 pl-4 list-disc text-charcoal-700">
                      {items.map((it, i) => (
                        <li key={i}>{it.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>

        {/* Direct WhatsApp Callout for Readers */}
        <div className="skeuo-plate-gold p-6 sm:p-8 space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-gold text-charcoal-900 mx-auto flex items-center justify-center shadow-gold-btn">
            <Sparkles className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-charcoal">
            Planning Your Visit to North Bengaluru?
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto leading-relaxed">
            Stay at <strong>SHIVANANDI VISTA</strong> in Yelahanka Taluk. Enjoy comfortable air-conditioned suites, 24/7 check-in flexibility, and easy connectivity to Kempegowda Airport.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openWhatsApp(`Hello SHIVANANDI VISTA, I read your article "${post.title}" and would like to enquire about room availability.`)}
              className="skeuo-btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-charcoal-900" />
              <span>Enquire on WhatsApp</span>
            </button>

            <Link
              to="/booking"
              className="skeuo-btn-dark px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5"
            >
              <span>Book Your Stay</span>
            </Link>
          </div>
        </div>

        {/* Related Guides */}
        <div className="pt-8 border-t border-surface-border">
          <h3 className="font-serif text-2xl font-bold text-charcoal mb-6">
            More Travel Guides & Insights
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                to={`/blog/${rel.slug}`}
                className="skeuo-plate overflow-hidden group hover:border-gold/40 transition block"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] text-gold-dark font-bold uppercase">{rel.category}</span>
                  <h4 className="font-serif text-sm font-bold text-charcoal group-hover:text-gold-dark transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </article>
    </>
  );
}

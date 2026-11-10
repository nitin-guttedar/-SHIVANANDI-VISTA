import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  MessageSquare
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { blogPosts, openWhatsApp } = useHotel();

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
        "url": "https://shivanandivista.com/logo.jpg"
      }
    },
    "datePublished": "2026-10-15"
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      }).catch(() => { });
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
      <section className="bg-white border-b border-stone-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs text-obsidian-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-gold transition">Travel Blog</Link>
            <span>/</span>
            <span className="text-obsidian font-medium truncate max-w-[180px] sm:max-w-xs">{post.title}</span>
          </div>

          <Link
            to="/blog"
            className="flex items-center gap-1.5 text-gold-dark font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>
      </section>

      {/* Main Article Container */}
      <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">

        {/* Title & Metadata */}
        <div className="space-y-3">
          <span className="minimal-badge inline-block">
            {post.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-obsidian leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-stone-200 text-xs text-obsidian-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold" />
                <span>By {post.author || 'Hospitality Desk'}</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{post.date}</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-obsidian-700 hover:text-gold transition font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-stone-200">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 sm:h-[400px] object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 space-y-5 text-obsidian-800 leading-relaxed text-sm sm:text-base">
          {post.content ? (
            <div className="prose max-w-none space-y-4">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="font-serif text-xl sm:text-2xl font-bold text-obsidian pt-4 border-b border-stone-200 pb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('#### ')) {
                  return (
                    <h4 key={index} className="font-serif text-lg font-bold text-obsidian pt-2">
                      {paragraph.replace('#### ', '')}
                    </h4>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="space-y-1 pl-4 list-disc text-obsidian-700">
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
        <div className="bg-cream-100 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4 text-center">
          <h3 className="font-serif text-2xl font-bold text-obsidian">
            Planning Your Visit to North Bengaluru?
          </h3>

          <p className="text-xs sm:text-sm text-obsidian-600 max-w-lg mx-auto leading-relaxed">
            Stay at <strong>SHIVANANDI VISTA</strong> near Bengaluru International Airport. Enjoy comfortable air-conditioned suites, 24/7 check-in flexibility, and effortless 10-15 minute connectivity to Kempegowda Airport terminals.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openWhatsApp(`Hello SHIVANANDI VISTA, I read your article "${post.title}" and would like to enquire about room availability.`)}
              className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </button>

            <Link
              to="/booking"
              className="minimal-btn-outline px-6 py-2.5 text-xs sm:text-sm font-semibold"
            >
              <span>Book Your Stay</span>
            </Link>
          </div>
        </div>

        {/* Related Guides */}
        <div className="pt-8 border-t border-stone-200">
          <h3 className="font-serif text-xl font-bold text-obsidian mb-5">
            More Travel Guides & Insights
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                to={`/blog/${rel.slug}`}
                className="minimal-card overflow-hidden group block"
              >
                <div className="h-32 overflow-hidden bg-stone-100">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3.5 space-y-1">
                  <span className="text-[10px] text-gold-dark font-semibold uppercase">{rel.category}</span>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-obsidian group-hover:text-gold transition-colors line-clamp-2">
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

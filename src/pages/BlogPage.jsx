import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, User, ArrowRight, BookOpen, Compass } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function BlogPage() {
  const { blogPosts } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Airport Travel Information',
    'Yelahanka Travel Guide',
    'Devanahalli Attractions',
    'Hotel & Accommodation Tips',
    'Sightseeing & Nature',
    'North Bengaluru Destinations'
  ];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory);

  const featuredPost = blogPosts[0];

  return (
    <>
      <SEO
        title="Bengaluru Travel Blog | Yelahanka & Airport Travel Guide"
        description="Explore Bengaluru travel guides, Yelahanka destinations, Devanahalli attractions, airport travel tips and North Bengaluru sightseeing information."
        keywords="Bangalore Travel Blog, Yelahanka Travel Guide, Kempegowda Airport Guide, Devanahalli Fort Tourism, Hotels Near Bangalore Airport Blog"
        canonicalUrl="/blog"
      />

      {/* Header Banner */}
      <section className="bg-[#1C1917] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=80"
            alt="Travel Guide Blog at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-cream/10 border border-gold/30 text-gold-bright text-xs uppercase font-bold tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>Travel Inspiration & Local Insights</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Explore Bengaluru with SHIVANANDI VISTA
          </h1>
          <p className="text-charcoal-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Destination Guides, Airport Navigation Tips, and Local Travel Information in North Bengaluru.
          </p>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="py-6 bg-alabaster-200 border-b border-surface-border sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                  ? 'skeuo-btn-gold'
                  : 'bg-surface-muted text-charcoal-700 border border-surface-border hover:bg-surface-hover'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Magazine Layout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">

        {/* Featured Editorial Banner (When 'All' is active) */}
        {selectedCategory === 'All' && featuredPost && (
          <div className="skeuo-plate overflow-hidden border border-gold/30 shadow-skeuo-elevated group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-charcoal-800">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-gold text-charcoal-900 text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                  Featured Guide
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-dark bg-gold-cream px-2.5 py-1 rounded-md border border-gold/20">
                    {featuredPost.category}
                  </span>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-snug group-hover:text-gold-dark transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-charcoal-600 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs text-charcoal-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{featuredPost.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="skeuo-btn-gold px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-charcoal-900" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Cards Grid */}
        <div>
          <div className="border-b border-surface-border pb-3 mb-8 flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              {selectedCategory === 'All' ? 'Latest Travel Articles' : selectedCategory}
            </h3>
            <span className="text-xs text-charcoal-500 font-medium">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="skeuo-plate overflow-hidden flex flex-col justify-between border border-surface-border hover:border-gold/40 hover:shadow-skeuo-elevated transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-charcoal-800">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#1C1917]/85 text-gold-bright border border-gold/30 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-charcoal-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-charcoal group-hover:text-gold-dark transition-colors line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-surface-border/60">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-dark hover:text-charcoal transition pt-3"
                  >
                    <span>Read Complete Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

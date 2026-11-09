import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Compass } from 'lucide-react';
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
      <section className="bg-[#141210] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=80"
            alt="Travel Guide Blog at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-light text-xs uppercase font-semibold tracking-widest mb-3 border border-white/10">
            Travel Inspiration & Local Insights
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            Explore Bengaluru with SHIVANANDI VISTA
          </h1>
          <p className="text-obsidian-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Destination Guides, Airport Navigation Tips, and Local Travel Information in North Bengaluru.
          </p>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="py-4 bg-white border-b border-stone-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${selectedCategory === cat
                  ? 'bg-obsidian text-white'
                  : 'bg-stone-warm text-obsidian-600 border border-stone-200 hover:bg-stone-200/60'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Magazine Layout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

        {/* Featured Editorial Banner */}
        {selectedCategory === 'All' && featuredPost && (
          <div className="minimal-card overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-stone-100">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-obsidian text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Featured Guide
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-gold-dark bg-gold-pale px-2.5 py-0.5 rounded-md">
                    {featuredPost.category}
                  </span>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian leading-snug group-hover:text-gold transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-obsidian-600 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-obsidian-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{featuredPost.date}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="minimal-btn-gold px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Cards Grid */}
        <div>
          <div className="border-b border-stone-200 pb-3 mb-8 flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-obsidian">
              {selectedCategory === 'All' ? 'Latest Travel Articles' : selectedCategory}
            </h3>
            <span className="text-xs text-obsidian-500 font-medium">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="minimal-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 text-obsidian text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-obsidian-500">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-obsidian group-hover:text-gold transition-colors line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-obsidian-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark hover:text-obsidian transition pt-3"
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

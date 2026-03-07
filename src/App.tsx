import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  Menu, 
  X, 
  Instagram, 
  Twitter, 
  Facebook,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import { GoogleGenAI } from "@google/genai";
import { Post, Category } from './types';
import { cn } from './utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const generateAiInsight = async (post: Post) => {
    setIsGeneratingInsight(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `As a travel expert for SRZ Tourism, provide a 2-sentence unique travel insight or "pro-tip" related to this topic: ${post.title}. Content: ${post.excerpt}`,
      });
      setAiInsight(response.text || "No insight available.");
    } catch (error) {
      console.error('AI Error:', error);
      setAiInsight("Unable to generate AI insight at this time.");
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setAiInsight(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-brand-paper/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedPost(null)}>
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                <Compass className="text-brand-accent w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">SRZ <span className="text-brand-accent">Tourism</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Destinations', 'Stories', 'About', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-sm font-medium hover:text-brand-accent transition-colors uppercase tracking-widest">
                  {item}
                </a>
              ))}
              <button className="bg-brand-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-brand-primary/90 transition-all">
                Book a Trip
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brand-paper border-b border-black/5 px-4 py-6 space-y-4"
          >
            {['Destinations', 'Stories', 'About', 'Contact'].map((item) => (
              <a key={item} href="#" className="block text-lg font-serif">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="relative h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://picsum.photos/seed/travel-hero/1920/1080?blur=2" 
                    className="w-full h-full object-cover brightness-50"
                    alt="Travel Hero"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block text-brand-accent font-mono text-sm uppercase tracking-[0.3em] mb-4">
                      Explore the Unseen
                    </span>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-6">
                      Your Journey <br /> Starts <span className="italic">Here.</span>
                    </h1>
                    <p className="text-xl max-w-2xl text-white/80 mb-8 font-light leading-relaxed">
                      Discover hidden gems, cultural wonders, and breathtaking landscapes with SRZ Tourism. We curate experiences that linger in your memory forever.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-brand-accent text-brand-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                        Start Exploring <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Categories & Search */}
              <section className="py-12 bg-white border-b border-black/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                      {(['All', 'Culture', 'Adventure', 'Tips'] as Category[]).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                            activeCategory === cat 
                              ? "bg-brand-primary text-white" 
                              : "bg-black/5 text-brand-primary hover:bg-black/10"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search stories..." 
                        className="w-full pl-10 pr-4 py-2 bg-black/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Blog Grid */}
              <section className="py-20 bg-brand-paper">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {loading ? (
                      Array(6).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="bg-black/10 aspect-[4/3] rounded-2xl mb-4"></div>
                          <div className="h-4 bg-black/10 w-1/4 mb-2"></div>
                          <div className="h-8 bg-black/10 w-3/4"></div>
                        </div>
                      ))
                    ) : (
                      filteredPosts.map((post, idx) => (
                        <motion.article
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group cursor-pointer"
                          onClick={() => handlePostClick(post)}
                        >
                          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                            <img 
                              src={post.image_url} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-4 text-xs text-black/40 font-medium">
                              <span className="flex items-center gap-1"><Calendar size={12} /> {format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                              <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold group-hover:text-brand-accent transition-colors leading-tight">
                              {post.title}
                            </h3>
                            <p className="text-black/60 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                            <div className="pt-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                              Read Story <ChevronRight size={16} />
                            </div>
                          </div>
                        </motion.article>
                      ))
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="post"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white"
            >
              {/* Post Header */}
              <div className="relative h-[60vh] w-full">
                <img 
                  src={selectedPost.image_url} 
                  className="w-full h-full object-cover"
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                  <div className="max-w-4xl mx-auto px-4 pb-12 w-full text-white">
                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors"
                    >
                      <ArrowRight className="rotate-180" size={16} /> Back to Stories
                    </button>
                    <span className="bg-brand-accent text-brand-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                      {selectedPost.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                      {selectedPost.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm font-medium text-white/80">
                      <span className="flex items-center gap-2"><User size={16} /> By {selectedPost.author}</span>
                      <span className="flex items-center gap-2"><Calendar size={16} /> {format(new Date(selectedPost.created_at), 'MMMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-grow">
                    <div className="markdown-body">
                      <Markdown>{selectedPost.content}</Markdown>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <aside className="lg:w-80 flex-shrink-0">
                    <div className="sticky top-32 space-y-8">
                      {/* AI Insight Widget */}
                      <div className="bg-brand-paper p-6 rounded-3xl border border-brand-accent/20 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-brand-accent">
                          <Sparkles size={20} />
                          <span className="text-xs font-bold uppercase tracking-widest">SRZ AI Insight</span>
                        </div>
                        {aiInsight ? (
                          <p className="text-sm italic text-brand-primary/80 leading-relaxed">
                            "{aiInsight}"
                          </p>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-xs text-black/60">Get a unique travel pro-tip for this destination generated by our AI.</p>
                            <button 
                              onClick={() => generateAiInsight(selectedPost)}
                              disabled={isGeneratingInsight}
                              className="w-full bg-brand-primary text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                              {isGeneratingInsight ? "Generating..." : "Generate Pro-Tip"}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="p-6 rounded-3xl bg-black text-white">
                        <h4 className="text-xl font-serif mb-4">Ready to visit?</h4>
                        <p className="text-sm text-white/60 mb-6">Let SRZ Tourism handle the details. We offer custom itineraries for this location.</p>
                        <button className="w-full bg-brand-accent text-brand-primary py-3 rounded-2xl text-xs font-bold uppercase tracking-widest">
                          Inquire Now
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Compass className="text-brand-accent w-8 h-8" />
                <span className="text-3xl font-serif font-bold tracking-tight">SRZ <span className="text-brand-accent">Tourism</span></span>
              </div>
              <p className="text-white/60 max-w-md leading-relaxed mb-8">
                We are a boutique travel agency and storytelling platform dedicated to uncovering the world's most authentic experiences. Join our community of explorers.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-brand-primary transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-6">Quick Links</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li><a href="#" className="hover:text-brand-accent transition-colors">Our Destinations</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Travel Guides</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-6">Newsletter</h4>
              <p className="text-xs text-white/60 mb-4 uppercase tracking-widest">Get travel inspiration in your inbox</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm flex-grow focus:outline-none focus:border-brand-accent"
                />
                <button className="bg-brand-accent text-brand-primary px-4 py-2 rounded-full text-xs font-bold uppercase">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 uppercase tracking-[0.2em]">
            <span>© 2026 SRZ Tourism. All rights reserved.</span>
            <div className="flex gap-8">
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

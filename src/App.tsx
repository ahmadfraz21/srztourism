import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
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
  Sparkles,
  MapPin,
  Wind,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import { GoogleGenAI } from '@google/genai';
import { Post, Category } from './types';
import { cn } from './utils';
import { trackPageLoad, trackEvent } from './tracker';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

// ─── Seed data – shown when /api/posts is unavailable ────────────────────────
const SEED_POSTS: Post[] = [
  {
    id: 1,
    title: 'Chasing Aurora in Finnish Lapland',
    excerpt: 'A glass igloo, -20 °C nights, and the sky on fire — the Aurora Borealis is nature\'s greatest show.',
    content: `## Into the Arctic Night\n\nThe hunt begins at 10 pm. You step out of your heated glass igloo into a silence so complete you can hear your own heartbeat.\n\n### Best Months\n\nSeptember through March gives the darkest skies. Peak activity clusters around the equinoxes in September and March.\n\n### Where to Stay\n\n**Kakslauttanen Arctic Resort** remains the benchmark — thermal glass igloos let you watch the lights from your bed. Book 12 months ahead.\n\n### Practical Tips\n\n- Layer merino base, fleece mid, and a -40 °C outer shell\n- Rent snowshoes and venture 2 km from any light source for the best views\n- Keep camera batteries warm inside your jacket — cold drains them in minutes`,
    category: 'Adventure',
    image_url: 'https://picsum.photos/seed/aurora-lapland/800/600',
    author: 'Mia Colton',
    created_at: '2025-11-03T21:00:00Z',
  },
  {
    id: 2,
    title: 'The Last Fishing Villages of the Algarve',
    excerpt: 'Before the resorts arrived, the Algarve coast was dotted with whitewashed fishing villages — a few still survive.',
    content: `## Ferragudo & Cacela Velha\n\nWhile the Algarve\'s main strip pulses with sun-seekers, two villages remain remarkably unchanged.\n\n### Ferragudo\n\nSitting directly across the Arade estuary from Portimão, Ferragudo\'s cobbled lanes climb from a working harbour to a 16th-century castle. No chains, no souvenir shops — just family tavernas and nets drying in the sun.\n\n### Cacela Velha\n\nA hamlet of fewer than 30 permanent residents perched above a lagoon. The 18th-century fort is unlocked on weekday mornings. You reach the beach by asking a fisherman to row you across.\n\n### Getting There\n\nRent a car — public transport skips both villages entirely.`,
    category: 'Destinations',
    image_url: 'https://picsum.photos/seed/algarve-village/800/600',
    author: 'Tomás Veira',
    created_at: '2025-12-14T09:30:00Z',
  },
  {
    id: 3,
    title: 'Street Food Masterclass: Oaxaca, Mexico',
    excerpt: 'Mole negro, tlayudas, and chapulines — Oaxaca\'s street food scene rewards the curious and the fearless.',
    content: `## The World\'s Best Food City (No, Really)\n\nBold claim, but Oaxaca makes a strong case. The city has both a thriving indigenous food culture and a new generation of chefs reimagining it.\n\n### Where to Eat\n\n**Mercado 20 de Noviembre** — the corridor of smoky grills called *los pasillos* is the city\'s beating heart. Point at whatever looks best.\n\n**Itanoní** — a tortilla bar that sources heritage corn varieties. Life-changing.\n\n### What to Try\n\n- *Tlayuda*: large crisp tortilla layered with black beans, asiento, and chapulines (grasshoppers)\n- *Mole negro*: the sauce that takes three days to make — order it over chicken\n- *Mezcal*: skip the tourist bars; ask your host for their village producer`,
    category: 'Culture',
    image_url: 'https://picsum.photos/seed/oaxaca-food/800/600',
    author: 'Mia Colton',
    created_at: '2026-01-08T12:00:00Z',
  },
  {
    id: 4,
    title: 'Island-Hopping the Azores on a Budget',
    excerpt: 'Nine volcanic islands, zero crowds, and flights cheaper than most city breaks — the Azores are Europe\'s best-kept secret.',
    content: `## Mid-Atlantic Magic\n\nThe Azores archipelago sits 1,500 km off the coast of Portugal — technically Europe, atmospherically somewhere else entirely.\n\n### The Island Order\n\n1. **São Miguel** — start here; Sete Cidades crater lake and thermal pools at Furnas\n2. **Faial** — the volcano that erupted in 1957 and added a peninsula overnight\n3. **Pico** — climb Portugal\'s highest mountain at 2,351 m before sunset\n\n### Budget Notes\n\n- Ryanair and SATA run affordable connections from Lisbon\n- Inter-island ferries cost €15–30 and are scenic\n- Most natural highlights are free or under €5\n\n### Best Season\n\nMay–June: wildflowers, mild temperatures, before peak prices.`,
    category: 'Tips',
    image_url: 'https://picsum.photos/seed/azores-islands/800/600',
    author: 'Tomás Veira',
    created_at: '2026-01-25T08:00:00Z',
  },
  {
    id: 5,
    title: 'Desert Silence: A Week in Wadi Rum',
    excerpt: 'Lawrence of Arabia called it "vast, echoing and Godlike" — a night under Wadi Rum\'s stars proves him right.',
    content: `## The Valley of the Moon\n\nWadi Rum is 720 km² of protected desert in southern Jordan. The sandstone and granite formations have starred in more sci-fi films than any other location on Earth.\n\n### Getting There\n\nFly into Aqaba (45 min from Wadi Rum village) or take the scenic 4-hour bus from Amman.\n\n### How to Explore\n\nBook a Bedouin guide for a full-day 4WD tour (around JD50). They know spots no map shows.\n\n### Sleeping Under the Stars\n\nMultiple camps offer open-air Bedouin tents with mattresses and wool blankets. The silence at 3 am is extraordinary — no light pollution, no sound.\n\n### What to Pack\n\n- Warm layer even in summer (desert nights drop sharply)\n- Head torch and extra batteries\n- A book — the evenings are slow and wonderful`,
    category: 'Adventure',
    image_url: 'https://picsum.photos/seed/wadi-rum/800/600',
    author: 'Mia Colton',
    created_at: '2026-02-10T07:00:00Z',
  },
  {
    id: 6,
    title: 'Slow Train Through the Swiss Alps',
    excerpt: 'The Glacier Express isn\'t the fastest way from Zermatt to St. Moritz — it\'s the most beautiful 8 hours you\'ll ever spend.',
    content: `## Europe\'s Most Scenic Railway\n\nThe Glacier Express crawls at an average 35 km/h through 91 tunnels and across 291 bridges. This is by design.\n\n### The Route\n\nZermatt → Andermatt → Disentis → Chur → St. Moritz. Eight hours of high Alpine meadows, gorges, and viaducts.\n\n### Booking Tips\n\n- Reserve panorama car seats on the right side (Zermatt → St. Moritz) for Landwasser Viaduct views\n- Book 60 days ahead in summer; walk-ons possible November–March\n- The Excellence Class dining car is worth the splurge for one direction\n\n### Combining With\n\nStay one night in Andermatt — a ski village that has stayed authentic despite new investment — before continuing east.`,
    category: 'Destinations',
    image_url: 'https://picsum.photos/seed/swiss-alps-train/800/600',
    author: 'Tomás Veira',
    created_at: '2026-02-28T10:00:00Z',
  },
];

const STATS = [
  { value: '140+', label: 'Countries' },
  { value: '12K+', label: 'Travellers' },
  { value: '98%', label: 'Satisfaction' },
  { value: '8 Yrs', label: 'Experience' },
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  useEffect(() => {
    trackPageLoad();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('unavailable');
      const data = await response.json();
      setPosts(data);
    } catch {
      setPosts(SEED_POSTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const generateAiInsight = async (post: Post) => {
    setIsGeneratingInsight(true);
    trackEvent('ai_insight_requested', { post_id: post.id, post_title: post.title });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `As a travel expert for Nomad Atlas, provide a 2-sentence unique travel insight or "pro-tip" related to: ${post.title}. Context: ${post.excerpt}`,
      });
      setAiInsight(response.text || 'No insight available.');
    } catch {
      setAiInsight('Unable to generate insight right now.');
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setAiInsight(null);
    trackEvent('post_opened', { post_id: post.id, post_title: post.title, category: post.category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories: Category[] = ['All', 'Destinations', 'Culture', 'Adventure', 'Tips'];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: '#f8f5f0' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        :root {
          --ink: #1c1917; --sand: #f8f5f0; --rust: #c2522a;
          --rust-light: #e8835e; --muted: #78716c; --border: #e7e3dc;
        }
        .display { font-family: 'Cormorant Garamond', serif; }
        .tag { display:inline-block; padding:2px 12px; border-radius:999px; font-size:10px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; background:var(--rust); color:white; }
        .btn-rust { background:var(--rust); color:white; padding:13px 28px; border-radius:999px; font-weight:600; font-size:13px; display:inline-flex; align-items:center; gap:8px; transition:transform 0.2s; cursor:pointer; border:none; font-family:'DM Sans',sans-serif; }
        .btn-rust:hover { transform:translateY(-2px); }
        .btn-outline { background:transparent; padding:11px 28px; border-radius:999px; font-weight:600; font-size:13px; border:1.5px solid rgba(255,255,255,0.4); color:white; transition:all 0.2s; cursor:pointer; font-family:'DM Sans',sans-serif; }
        .btn-outline:hover { background:white; color:var(--ink); border-color:white; }
        .card { background:white; border-radius:20px; overflow:hidden; border:1px solid var(--border); cursor:pointer; transition:box-shadow 0.3s, transform 0.3s; }
        .card:hover { box-shadow:0 20px 60px rgba(0,0,0,0.1); transform:translateY(-4px); }
        .card-img { position:relative; aspect-ratio:16/10; overflow:hidden; }
        .card-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s; }
        .card:hover .card-img img { transform:scale(1.06); }
        .filter-btn { padding:8px 20px; border-radius:999px; font-size:13px; font-weight:500; border:1.5px solid var(--border); background:white; color:var(--muted); cursor:pointer; transition:all 0.2s; white-space:nowrap; font-family:'DM Sans',sans-serif; }
        .filter-btn:hover { border-color:var(--ink); color:var(--ink); }
        .filter-btn.active { background:var(--ink); color:white; border-color:var(--ink); }
        .search-wrap { position:relative; }
        .search-wrap svg { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--muted); pointer-events:none; }
        .search-wrap input { width:100%; padding:10px 16px 10px 42px; border-radius:999px; border:1.5px solid var(--border); background:white; font-size:13px; outline:none; transition:border-color 0.2s; font-family:'DM Sans',sans-serif; box-sizing:border-box; }
        .search-wrap input:focus { border-color:var(--rust); }
        .skeleton { background:linear-gradient(90deg,#ede8e0 25%,#f5f0e8 50%,#ede8e0 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:12px; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .prose-travel p { color:#57534e; line-height:1.8; margin-bottom:1rem; font-size:17px; }
        .prose-travel h2 { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; margin:2.5rem 0 1rem; color:var(--ink); }
        .prose-travel h3 { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:600; margin:2rem 0 0.75rem; color:var(--ink); }
        .prose-travel ul { padding-left:1.5rem; margin-bottom:1rem; }
        .prose-travel li { color:#57534e; line-height:1.8; margin-bottom:0.4rem; }
        .prose-travel strong { color:var(--ink); }
        .prose-travel ol { padding-left:1.5rem; margin-bottom:1rem; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:'sticky', top:0, zIndex:50, background:'rgba(248,245,240,0.88)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:70 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}
            onClick={() => { setSelectedPost(null); trackEvent('logo_clicked'); }}>
            <div style={{ width:38, height:38, background:'var(--rust)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Globe size={20} color="white" />
            </div>
            <span className="display" style={{ fontSize:24, fontWeight:700 }}>
              Nomad <span style={{ color:'var(--rust)' }}>Atlas</span>
            </span>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:28 }} className="hidden md:flex">
            {['Destinations', 'Stories', 'About', 'Contact'].map(item => (
              <a key={item} href="#" onClick={() => trackEvent('nav_clicked', { item })}
                style={{ fontSize:12, fontWeight:600, color:'var(--muted)', textDecoration:'none', letterSpacing:'0.1em', textTransform:'uppercase', transition:'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {item}
              </a>
            ))}
            <button className="btn-rust" style={{ padding:'10px 22px', fontSize:12 }} onClick={() => trackEvent('plan_trip_clicked')}>
              Plan a Trip
            </button>
          </div>

          <button style={{ background:'none', border:'none', cursor:'pointer', padding:8, display:'none' }}
            className="md:hidden"
            onClick={() => { setIsMenuOpen(!isMenuOpen); trackEvent('mobile_menu_toggled', { open: !isMenuOpen }); }}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            style={{ background:'white', borderBottom:'1px solid var(--border)', padding:'24px', display:'flex', flexDirection:'column', gap:20 }}>
            {['Destinations', 'Stories', 'About', 'Contact'].map(item => (
              <a key={item} href="#" onClick={() => trackEvent('nav_clicked', { item })}
                className="display" style={{ fontSize:22, fontWeight:600, color:'var(--ink)', textDecoration:'none' }}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ flex:1 }}>
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div key="home" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>

              {/* ── HERO ── */}
              <section style={{ position:'relative', minHeight:'88vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                  <img src="https://picsum.photos/seed/desert-dunes-hero/1920/1080"
                    style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.42)' }}
                    alt="Hero" referrerPolicy="no-referrer" />
                </div>

                <div style={{ position:'relative', zIndex:1, maxWidth:1280, margin:'0 auto', padding:'80px 24px 160px', width:'100%' }}>
                  <motion.div initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.15, duration:0.7 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
                      <Wind size={14} color="#e8835e" />
                      <span style={{ color:'#e8835e', fontWeight:600, fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase' }}>
                        The World is Waiting
                      </span>
                    </div>
                    <h1 className="display" style={{ fontSize:'clamp(52px, 8vw, 100px)', fontWeight:700, color:'white', lineHeight:1.0, marginBottom:28 }}>
                      Travel Far,<br /><em style={{ color:'#e8835e' }}>Live Deep.</em>
                    </h1>
                    <p style={{ maxWidth:500, color:'rgba(255,255,255,0.72)', fontSize:18, lineHeight:1.7, marginBottom:40, fontWeight:300 }}>
                      Nomad Atlas curates journeys off the tourist trail — slow travel, authentic encounters, and landscapes that change how you see the world.
                    </p>
                    <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                      <button className="btn-rust" onClick={() => trackEvent('hero_explore_clicked')}>
                        Explore Stories <ArrowRight size={17} />
                      </button>
                      <button className="btn-outline" onClick={() => trackEvent('hero_plan_clicked')}>
                        Plan a Trip
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Stats bar */}
                <motion.div initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.5 }}
                  style={{ position:'absolute', bottom:0, left:0, right:0, background:'rgba(28,25,23,0.72)', backdropFilter:'blur(12px)', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px 24px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                    {STATS.map(s => (
                      <div key={s.label} style={{ textAlign:'center' }}>
                        <div className="display" style={{ fontSize:28, fontWeight:700, color:'#e8835e', lineHeight:1 }}>{s.value}</div>
                        <div style={{ fontSize:11, color:'rgba(255,255,255,0.45)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* ── PHILOSOPHY STRIP ── */}
              <section style={{ background:'white', padding:'64px 24px', borderBottom:'1px solid var(--border)' }}>
                <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:40 }}>
                  <div style={{ maxWidth:520 }}>
                    <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--rust)', marginBottom:12 }}>Our Philosophy</p>
                    <h2 className="display" style={{ fontSize:42, fontWeight:700, lineHeight:1.15, color:'var(--ink)', marginBottom:16 }}>
                      Slow down.<br />Go deeper.
                    </h2>
                    <p style={{ color:'var(--muted)', lineHeight:1.8, fontSize:16 }}>
                      Mass tourism turns places into backdrops. We help you arrive as a guest, not a spectator — through expert-written guides, local insight, and journeys designed around meaning rather than itinerary density.
                    </p>
                  </div>
                  <div style={{ display:'flex', gap:40, flexWrap:'wrap' }}>
                    {[
                      { icon:<MapPin size={22} color="var(--rust)" />, title:'Local Experts', desc:'Every guide is written by someone who has lived there' },
                      { icon:<Globe size={22} color="var(--rust)" />, title:'Off the Beaten Path', desc:'We skip the crowds and find what\'s worth the detour' },
                    ].map(f => (
                      <div key={f.title} style={{ maxWidth:200 }}>
                        <div style={{ marginBottom:12 }}>{f.icon}</div>
                        <div style={{ fontWeight:600, fontSize:15, marginBottom:6, color:'var(--ink)' }}>{f.title}</div>
                        <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6 }}>{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── FILTER & SEARCH ── */}
              <section style={{ background:'var(--sand)', padding:'36px 24px 0', borderBottom:'1px solid var(--border)' }}>
                <div style={{ maxWidth:1280, margin:'0 auto' }}>
                  <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16, paddingBottom:28 }}>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      {categories.map(cat => (
                        <button key={cat}
                          className={cn('filter-btn', activeCategory === cat && 'active')}
                          onClick={() => { setActiveCategory(cat); trackEvent('category_filter', { category: cat }); }}>
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="search-wrap" style={{ width:240 }}>
                      <Search size={15} />
                      <input type="text" placeholder="Search stories…" value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => trackEvent('search_focused')} />
                    </div>
                  </div>
                </div>
              </section>

              {/* ── POSTS GRID ── */}
              <section style={{ padding:'52px 24px 88px', background:'var(--sand)' }}>
                <div style={{ maxWidth:1280, margin:'0 auto' }}>
                  {!loading && filteredPosts.length === 0 && (
                    <div style={{ textAlign:'center', padding:'80px 0', color:'var(--muted)' }}>
                      <Globe size={40} style={{ opacity:0.25, margin:'0 auto 16px', display:'block' }} />
                      <p className="display" style={{ fontSize:22 }}>No stories found</p>
                      <p style={{ fontSize:14, marginTop:8 }}>Try a different search or category.</p>
                    </div>
                  )}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:28 }}>
                    {loading
                      ? Array(6).fill(0).map((_, i) => (
                          <div key={i}>
                            <div className="skeleton" style={{ aspectRatio:'16/10', marginBottom:16 }} />
                            <div className="skeleton" style={{ height:13, width:'40%', marginBottom:10 }} />
                            <div className="skeleton" style={{ height:22, width:'80%', marginBottom:8 }} />
                            <div className="skeleton" style={{ height:13, width:'60%' }} />
                          </div>
                        ))
                      : filteredPosts.map((post, idx) => (
                          <motion.div key={post.id} className="card"
                            initial={{ opacity:0, y:24 }}
                            animate={{ opacity:1, y:0 }}
                            transition={{ delay: idx * 0.07 }}
                            onClick={() => handlePostClick(post)}>
                            <div className="card-img">
                              <img src={post.image_url} alt={post.title} referrerPolicy="no-referrer" />
                              <div style={{ position:'absolute', top:14, left:14 }}>
                                <span className="tag">{post.category}</span>
                              </div>
                            </div>
                            <div style={{ padding:'22px 24px 28px' }}>
                              <div style={{ display:'flex', gap:14, fontSize:12, color:'var(--muted)', marginBottom:10, alignItems:'center' }}>
                                <span style={{ display:'flex', alignItems:'center', gap:4 }}>
                                  <Calendar size={11} /> {format(new Date(post.created_at), 'MMM d, yyyy')}
                                </span>
                                <span style={{ display:'flex', alignItems:'center', gap:4 }}>
                                  <User size={11} /> {post.author}
                                </span>
                              </div>
                              <h3 className="display" style={{ fontSize:22, fontWeight:700, color:'var(--ink)', lineHeight:1.25, marginBottom:10 }}>
                                {post.title}
                              </h3>
                              <p style={{ fontSize:14, color:'var(--muted)', lineHeight:1.65, marginBottom:18, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                                {post.excerpt}
                              </p>
                              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--rust)' }}>
                                Read Story <ChevronRight size={14} />
                              </div>
                            </div>
                          </motion.div>
                        ))
                    }
                  </div>
                </div>
              </section>

            </motion.div>
          ) : (

            /* ── POST DETAIL ── */
            <motion.div key="post" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} style={{ background:'white' }}>

              <div style={{ position:'relative', height:'62vh', minHeight:380 }}>
                <img src={selectedPost.image_url} alt={selectedPost.title}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }} referrerPolicy="no-referrer" />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(28,25,23,0.88) 0%, rgba(28,25,23,0.2) 55%, transparent 100%)' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0 }}>
                  <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px 48px' }}>
                    <button onClick={() => { setSelectedPost(null); trackEvent('back_to_stories'); }}
                      style={{ background:'none', border:'none', color:'rgba(255,255,255,0.65)', cursor:'pointer', display:'flex', alignItems:'center', gap:8, fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:20, padding:0, fontFamily:'DM Sans,sans-serif' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#e8835e')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                      <ArrowRight style={{ transform:'rotate(180deg)' }} size={13} /> Back to Stories
                    </button>
                    <span className="tag" style={{ marginBottom:14, display:'inline-block' }}>{selectedPost.category}</span>
                    <h1 className="display" style={{ fontSize:'clamp(30px, 5vw, 62px)', fontWeight:700, color:'white', lineHeight:1.1, marginTop:10, marginBottom:20 }}>
                      {selectedPost.title}
                    </h1>
                    <div style={{ display:'flex', gap:24, fontSize:13, color:'rgba(255,255,255,0.6)', flexWrap:'wrap' }}>
                      <span style={{ display:'flex', alignItems:'center', gap:6 }}><User size={13} /> By {selectedPost.author}</span>
                      <span style={{ display:'flex', alignItems:'center', gap:6 }}><Calendar size={13} /> {format(new Date(selectedPost.created_at), 'MMMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ maxWidth:1100, margin:'0 auto', padding:'60px 24px 96px' }}>
                <div style={{ display:'flex', flexWrap:'wrap', gap:48, alignItems:'flex-start' }}>

                  <div style={{ flex:'1 1 480px' }} className="prose-travel">
                    <Markdown>{selectedPost.content}</Markdown>
                  </div>

                  <aside style={{ flex:'0 0 260px', position:'sticky', top:96 }}>
                    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

                      {/* AI card */}
                      <div style={{ background:'var(--sand)', border:'1px solid var(--border)', borderRadius:20, padding:24 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, color:'var(--rust)' }}>
                          <Sparkles size={17} />
                          <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>Atlas AI Tip</span>
                        </div>
                        {aiInsight ? (
                          <p style={{ fontSize:14, fontStyle:'italic', color:'#57534e', lineHeight:1.7 }}>"{aiInsight}"</p>
                        ) : (
                          <>
                            <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6, marginBottom:16 }}>
                              Get a tailored insider tip for this destination from our AI travel expert.
                            </p>
                            <button onClick={() => generateAiInsight(selectedPost)} disabled={isGeneratingInsight}
                              style={{ width:'100%', background:'var(--ink)', color:'white', border:'none', borderRadius:12, padding:'12px 0', fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', cursor: isGeneratingInsight ? 'wait' : 'pointer', opacity: isGeneratingInsight ? 0.7 : 1, fontFamily:'DM Sans,sans-serif' }}>
                              {isGeneratingInsight ? 'Thinking…' : 'Generate Tip'}
                            </button>
                          </>
                        )}
                      </div>

                      {/* CTA card */}
                      <div style={{ background:'var(--ink)', borderRadius:20, padding:24, color:'white' }}>
                        <div style={{ width:36, height:2, background:'var(--rust)', marginBottom:16 }} />
                        <h4 className="display" style={{ fontSize:22, fontWeight:700, marginBottom:10 }}>Ready to go?</h4>
                        <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:20 }}>
                          We build custom itineraries around destinations like this one. Tell us your dates.
                        </p>
                        <button style={{ width:'100%', background:'var(--rust)', color:'white', border:'none', borderRadius:12, padding:'13px 0', fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}
                          onClick={() => trackEvent('inquire_now_clicked', { post_id: selectedPost.id, post_title: selectedPost.title })}>
                          Enquire Now
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

      {/* ── FOOTER ── */}
      <footer style={{ background:'var(--ink)', color:'white', padding:'72px 24px 40px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:48, marginBottom:52 }}>

            <div style={{ gridColumn:'span 2' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
                <div style={{ width:36, height:36, background:'var(--rust)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Globe size={18} color="white" />
                </div>
                <span className="display" style={{ fontSize:24, fontWeight:700 }}>
                  Nomad <span style={{ color:'var(--rust)' }}>Atlas</span>
                </span>
              </div>
              <p style={{ color:'rgba(255,255,255,0.45)', maxWidth:340, lineHeight:1.75, fontSize:14, marginBottom:28 }}>
                A boutique travel platform for slow, meaningful journeys. Our writers live in the places they write about.
              </p>
              <div style={{ display:'flex', gap:10 }}>
                {[{ Icon: Instagram, name:'Instagram' }, { Icon: Twitter, name:'Twitter' }, { Icon: Facebook, name:'Facebook' }].map(({ Icon, name }) => (
                  <a key={name} href="#" onClick={() => trackEvent('social_clicked', { platform: name })}
                    style={{ width:36, height:36, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', textDecoration:'none', color:'white' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--rust)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--rust)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="display" style={{ fontSize:18, fontWeight:600, marginBottom:20 }}>Explore</h4>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
                {['Our Destinations', 'Travel Guides', 'Community Stories', 'Privacy Policy'].map(link => (
                  <li key={link}>
                    <a href="#" onClick={() => trackEvent('footer_link_clicked', { link })}
                      style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:14, transition:'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--rust-light)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="display" style={{ fontSize:18, fontWeight:600, marginBottom:8 }}>Newsletter</h4>
              <p style={{ fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:16 }}>
                Stories in your inbox
              </p>
              <div style={{ display:'flex', gap:8 }}>
                <input id="nl-email" type="email" placeholder="you@email.com"
                  style={{ flex:1, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:999, padding:'10px 14px', fontSize:13, color:'white', outline:'none', fontFamily:'DM Sans,sans-serif', minWidth:0 }} />
                <button onClick={() => { const e = (document.getElementById('nl-email') as HTMLInputElement)?.value; trackEvent('newsletter_join', { email: e }); }}
                  style={{ background:'var(--rust)', color:'white', border:'none', borderRadius:999, padding:'10px 16px', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap' }}>
                  Join
                </button>
              </div>
            </div>
          </div>

          <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:28, display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:16, fontSize:11, color:'rgba(255,255,255,0.28)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
            <span>© 2026 Nomad Atlas. All rights reserved.</span>
            <div style={{ display:'flex', gap:24 }}>
              {['Terms', 'Cookies', 'Sitemap'].map(link => (
                <a key={link} href="#" onClick={() => trackEvent('footer_link_clicked', { link })}
                  style={{ color:'rgba(255,255,255,0.28)', textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

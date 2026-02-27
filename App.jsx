import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const MOCK_POSTS = [
  {
    id: 1,
    title: "The Hidden Gems of Kyoto",
    excerpt: "Discover the quiet temples and secret gardens that most tourists miss in Japan's ancient capital.",
    content: `# The Hidden Gems of Kyoto\n\nKyoto is known for its stunning temples and traditional tea houses. But beyond the famous Kinkaku-ji and Fushimi Inari, there lies a world of quiet beauty waiting to be discovered by those willing to stray from the well-worn tourist trails.\n\n## 1. Gio-ji Temple\n\nA small, moss-covered temple tucked deep in the Arashiyama bamboo district. The entire garden floor is blanketed in a rich, emerald moss that seems to glow after rainfall. Unlike the crowds at Tenryu-ji nearby, Gio-ji receives only a trickle of visitors — making it a perfect sanctuary for quiet reflection.\n\n## 2. Fushimi Momoyama Castle\n\nWhile most tourists head straight for the Inari shrine, the castle ruins just a few kilometers away are hauntingly beautiful. The stone walls and weathered gates tell a story of feudal Japan that no museum can replicate.\n\n## 3. Philosopher's Path in Winter\n\nEveryone visits in cherry blossom season. But the canal-side walkway in January — dusted with snow, nearly empty — is where you truly understand why this city has inspired poets for centuries.`,
    category: "Culture",
    image_url: "https://picsum.photos/seed/kyoto/1200/800",
    thumb_url: "https://picsum.photos/seed/kyoto/800/600",
    author: "Sarah Jenkins",
    read_time: "5 min read",
    created_at: "2025-11-15T09:00:00Z",
  },
  {
    id: 2,
    title: "Backpacking Through Patagonia",
    excerpt: "A comprehensive guide to trekking the W Circuit and exploring the wild landscapes of Chile and Argentina.",
    content: `# Backpacking Through Patagonia\n\nPatagonia is a land of extremes. From the jagged granite spires of Torres del Paine to the vast blue expanse of the Perito Moreno Glacier, every single step here feels like a privilege.\n\n## The W Circuit\n\nThe classic 5-day trek covers approximately 80 kilometers of some of the most dramatic terrain on earth. You'll traverse hanging valleys, cross suspension bridges over glacial rivers, and camp beneath peaks that seem to pierce the clouds.\n\n**Best time to go:** November through March. Outside of this window, the weather becomes dangerously unpredictable.\n\n## The Glacier\n\nPerito Moreno on the Argentine side is the world's only growing glacier. Watching a wall of ice the size of a city block calve into Lake Argentino with a thunderous boom is a moment you will carry for a lifetime.`,
    category: "Adventure",
    image_url: "https://picsum.photos/seed/patagonia/1200/800",
    thumb_url: "https://picsum.photos/seed/patagonia/800/600",
    author: "Marc Rivera",
    read_time: "7 min read",
    created_at: "2025-10-22T08:30:00Z",
  },
  {
    id: 3,
    title: "A Foodie's Guide to the Amalfi Coast",
    excerpt: "From fresh seafood to the world's best lemons, here's what you must eat while visiting Italy's most beautiful coastline.",
    content: `# A Foodie's Guide to the Amalfi Coast\n\nItalian cuisine is legendary worldwide, but the Amalfi Coast has flavors that exist nowhere else on Earth. The volcanic soil and salt air create ingredients of extraordinary intensity.\n\n## The Lemons\n\nThe sfusato amalfitano — a local lemon variety — are the size of softballs and sweet enough to eat like an orange. The limoncello made from their zest in Ravello's tiny distilleries bears no resemblance to the mass-produced bottles you find elsewhere.\n\n## Where to Eat\n\nAvoid the tourist traps on the main promenade. Instead, climb the stairs to the villages above — Praiano, Furore, Conca dei Marini — where locals still eat at family-run trattorie with no English menu and no reservations system.`,
    category: "Tips",
    image_url: "https://picsum.photos/seed/amalfi/1200/800",
    thumb_url: "https://picsum.photos/seed/amalfi/800/600",
    author: "Elena Rossi",
    read_time: "6 min read",
    created_at: "2025-09-08T11:00:00Z",
  },
  {
    id: 4,
    title: "Exploring the Sahara at Sunrise",
    excerpt: "How to experience the world's largest desert beyond the tourist camps — on camelback at dawn.",
    content: `# Exploring the Sahara at Sunrise\n\nMost visitors to the Sahara see it from the window of a 4x4 or from the safety of a glamping tent. To truly understand the desert, you have to meet it on its own terms: on foot, at first light, in the silence before the world wakes up.\n\n## Merzouga, Morocco\n\nThe Erg Chebbi dunes near Merzouga rise over 150 meters — sculpted overnight by winds that have been shaping this landscape for millennia. Climbing to the summit as the sun crests the horizon, watching the shadow lines shift across the ridges below, is a meditation you didn't know you needed.\n\n## The Stars\n\nAt 2 AM, when the camp fires die and the last generator falls silent, the Sahara sky becomes something else entirely. With zero light pollution for hundreds of kilometers, the Milky Way is not a faint smear but a solid, structural band across the sky.`,
    category: "Destinations",
    image_url: "https://picsum.photos/seed/sahara/1200/800",
    thumb_url: "https://picsum.photos/seed/sahara/800/600",
    author: "Karim Mansour",
    read_time: "8 min read",
    created_at: "2025-08-03T07:45:00Z",
  },
  {
    id: 5,
    title: "Iceland's Ring Road: A Two-Week Itinerary",
    excerpt: "Everything you need to plan the ultimate drive around Iceland — waterfalls, glaciers, and the northern lights.",
    content: `# Iceland's Ring Road: A Two-Week Itinerary\n\nRoute 1 — the Ring Road — circles the entire island of Iceland over 1,332 kilometers. Two weeks is just enough time to do it justice.\n\n## Day 1–3: The Golden Circle and South Coast\n\nStart in Reykjavik, then curve east through Þingvellir National Park — the only place on Earth where you can snorkel between two tectonic plates. Continue to Seljalandsfoss waterfall, where you can walk behind the falling water in late evening golden light.\n\n## The Northern Lights\n\nOctober through March gives the best chance. Turn off the car, kill the headlights, and lie on the road. No other posture does them justice.`,
    category: "Adventure",
    image_url: "https://picsum.photos/seed/iceland/1200/800",
    thumb_url: "https://picsum.photos/seed/iceland/800/600",
    author: "Astrid Bjornsson",
    read_time: "10 min read",
    created_at: "2025-07-19T14:20:00Z",
  },
  {
    id: 6,
    title: "Packing Light: The 10-Item Carry-On System",
    excerpt: "The art of traveling with nothing but a carry-on for trips of any length — tested on 6 continents.",
    content: `# Packing Light: The 10-Item Carry-On System\n\nAfter a decade of travel across 60+ countries, I've distilled my packing list to 10 core items that handle every climate, every dress code, and every adventure.\n\n## The Philosophy\n\nEvery item must earn its place by serving at least three different purposes. A merino wool sweater that functions as a pillow, a jacket liner, and elegant dinner attire is worth carrying. A dedicated "beach cover-up" is not.\n\n## The Result\n\nNo checked bag fees. No 45-minute baggage claim. You walk off the plane and keep moving. That is the entire point of travel — movement.`,
    category: "Tips",
    image_url: "https://picsum.photos/seed/packing/1200/800",
    thumb_url: "https://picsum.photos/seed/packing/800/600",
    author: "James Whitfield",
    read_time: "4 min read",
    created_at: "2025-06-11T10:00:00Z",
  },
  {
    id: 7,
    title: "Bali's Spiritual Soul: Beyond the Beaches",
    excerpt: "Discover the sacred temples, rice terraces, and daily rituals that give Bali its unique energy.",
    content: `# Bali's Spiritual Soul: Beyond the Beaches\n\nMost visitors come to Bali for the beaches and rice terraces. The spiritually curious come for something else entirely — a living culture where the divine is woven into the fabric of everyday life.\n\n## Tirta Empul Temple\n\nAt dawn, before the tour buses arrive, Balinese Hindus wade into the sacred spring pools of Tirta Empul for ritual purification. Each carved stone fountain spout has a specific blessing. To witness — and with respect, to participate in — this ceremony is to understand that spirituality here is not performance. It is simply life.\n\n## Sidemen Valley\n\nWhile Ubud has become a wellness resort, the Sidemen Valley remains largely untouched. Walking between rice paddies at golden hour, Mount Agung looming behind you, you feel you've slipped back into an older Bali.`,
    category: "Culture",
    image_url: "https://picsum.photos/seed/bali/1200/800",
    thumb_url: "https://picsum.photos/seed/bali/800/600",
    author: "Priya Sharma",
    read_time: "6 min read",
    created_at: "2025-05-20T09:30:00Z",
  },
  {
    id: 8,
    title: "The Scottish Highlands: Where Time Stands Still",
    excerpt: "A road trip through mist-covered mountains, ancient castles, and the world's most dramatic coastline.",
    content: `# The Scottish Highlands: Where Time Stands Still\n\nThe Scottish Highlands is one of the last truly wild places in Europe. A landscape that has been shaped by glaciers, storms, and millennia of human history — but has never quite been tamed.\n\n## The North Coast 500\n\nScotland's answer to Route 66, the NC500 loops 516 miles around the northern tip of the country. Single-track roads lead to beaches of white sand and turquoise water that look more Caribbean than Scottish — until the wind reminds you exactly where you are.\n\n## Glencoe\n\nNo valley in Scotland carries more weight than Glencoe. The site of the 1692 massacre, the towering peaks seem to absorb the memory of tragedy, creating an atmosphere that is simultaneously beautiful and melancholy.`,
    category: "Destinations",
    image_url: "https://picsum.photos/seed/scotland/1200/800",
    thumb_url: "https://picsum.photos/seed/scotland/800/600",
    author: "Hamish MacGregor",
    read_time: "9 min read",
    created_at: "2025-04-15T11:00:00Z",
  },
  {
    id: 9,
    title: "Tokyo After Midnight: A Night Owl's Guide",
    excerpt: "The Tokyo that reveals itself only after the last train — jazz bars, ramen counters, and 3 AM vending machines.",
    content: `# Tokyo After Midnight: A Night Owl's Guide\n\nTokyo is extraordinary by day. After midnight, it becomes something else entirely — a city that never truly sleeps, where the most interesting characters emerge when the salarymen have finally gone home.\n\n## Golden Gai\n\nThis warren of 200 tiny bars in Shinjuku, each seating maybe eight people, is the beating heart of Tokyo's late-night culture. Push open a door at random, squeeze onto a stool, and you might find yourself next to a novelist, a film director, or a retired sumo wrestler.\n\n## 3 AM Ramen\n\nThe best ramen in Tokyo is not found at the famous spots with the long daytime queues. It's found at the counter stools of unmarked shops near train maintenance yards, where the chefs have been perfecting their broth for thirty years.`,
    category: "Destinations",
    image_url: "https://picsum.photos/seed/tokyo/1200/800",
    thumb_url: "https://picsum.photos/seed/tokyo/800/600",
    author: "Yuki Tanaka",
    read_time: "7 min read",
    created_at: "2025-03-08T08:00:00Z",
  },
];

const CATEGORIES = ["All", "Culture", "Adventure", "Tips", "Destinations"];

const TOUR_PACKAGES = [
  {
    id: 1,
    title: "Japan Discovery",
    subtitle: "14 Days · Tokyo, Kyoto, Osaka",
    price: "$3,299",
    image: "https://picsum.photos/seed/japan-tour/800/600",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    title: "Patagonia Expedition",
    subtitle: "10 Days · Chile & Argentina",
    price: "$4,199",
    image: "https://picsum.photos/seed/patagonia-tour/800/600",
    badge: "Adventure",
    rating: 4.8,
    reviews: 94,
  },
  {
    id: 3,
    title: "Sahara & Marrakech",
    subtitle: "8 Days · Morocco",
    price: "$2,499",
    image: "https://picsum.photos/seed/morocco-tour/800/600",
    badge: "Cultural",
    rating: 4.9,
    reviews: 76,
  },
  {
    id: 4,
    title: "Northern Lights Iceland",
    subtitle: "7 Days · Ring Road Drive",
    price: "$3,799",
    image: "https://picsum.photos/seed/iceland-tour/800/600",
    badge: "Seasonal",
    rating: 5.0,
    reviews: 52,
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Amelia Carter",
    location: "New York, USA",
    text: "SRZ Tourism didn't just plan a trip — they curated an experience that changed how I see the world. The Kyoto itinerary was flawless.",
    rating: 5,
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    trip: "Japan Discovery Tour",
  },
  {
    id: 2,
    name: "Luca Moretti",
    location: "Milan, Italy",
    text: "The Patagonia expedition was the adventure of a lifetime. Every detail was handled with such care — from the campsite selection to the trail guides.",
    rating: 5,
    avatar: "https://picsum.photos/seed/avatar2/100/100",
    trip: "Patagonia Expedition",
  },
  {
    id: 3,
    name: "Zara Ahmed",
    location: "Dubai, UAE",
    text: "I've traveled with many agencies. SRZ is different — they understand that the best moments are the unplanned ones, and they build space for that.",
    rating: 5,
    avatar: "https://picsum.photos/seed/avatar3/100/100",
    trip: "Sahara & Marrakech",
  },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────
function formatDate(dateStr, full = false) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: full ? "long" : "short",
    day: "numeric",
    year: "numeric",
  });
}

function SimpleMarkdown({ content }) {
  const lines = content.split("\n");
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="md-h1">{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="md-h2">{line.slice(3)}</h2>);
    } else if (line.trim() !== "") {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part);
      elements.push(<p key={i} className="md-p">{rendered}</p>);
    }
    i++;
  }
  return <div className="markdown-body">{elements}</div>;
}

// ─── ICONS ─────────────────────────────────────────────────────────────────
const IconCompass = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const IconArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconStar = ({ filled = true }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconMap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconAward = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.88 5.76L20 10l-6.12 1.24L12 17l-1.88-5.76L4 10l6.12-1.24z"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

// ─── CSS ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0f0e;
    --gold: #c5973a;
    --gold-light: #e8d5a3;
    --gold-dim: rgba(197,151,58,0.15);
    --cream: #faf8f4;
    --cream-alt: #f3f0ea;
    --smoke: rgba(15,15,14,0.55);
    --smoke-lt: rgba(15,15,14,0.07);
    --border: rgba(15,15,14,0.09);
    --r-sm: 12px;
    --r-md: 20px;
    --r-lg: 28px;
    --shadow-sm: 0 2px 12px rgba(0,0,0,0.07);
    --shadow-md: 0 8px 32px rgba(0,0,0,0.12);
    --shadow-lg: 0 20px 60px rgba(0,0,0,0.18);
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Outfit', system-ui, sans-serif;
    --mono: 'DM Mono', monospace;
    --transition: 0.28s cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--cream);
    color: var(--ink);
    font-family: var(--sans);
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--cream-alt); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 999px; }

  /* ── UTILITY ── */
  .serif { font-family: var(--serif); }
  .mono { font-family: var(--mono); }
  .page-wrap { max-width: 1300px; margin: 0 auto; padding: 0 clamp(1rem, 4vw, 2.5rem); }
  .fade-in { animation: fadeUp 0.5s ease both; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes heroZoom { from { transform:scale(1.07); } to { transform:scale(1); } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes dotBounce { 0%,80%,100% { transform:scale(0.6); opacity:0.4; } 40% { transform:scale(1); opacity:1; } }
  @keyframes shimmer { 0%,100% { opacity:0.5; } 50% { opacity:1; } }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(250,248,244,0.88);
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    border-bottom: 1px solid var(--border);
    transition: box-shadow var(--transition);
  }
  .nav.scrolled { box-shadow: var(--shadow-sm); }
  .nav-inner {
    max-width: 1300px; margin: 0 auto;
    padding: 0 clamp(1rem,4vw,2.5rem);
    height: 76px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 0.65rem;
    cursor: pointer; text-decoration: none;
    transition: opacity var(--transition);
  }
  .nav-logo:hover { opacity: 0.8; }
  .nav-logo-icon {
    width: 42px; height: 42px;
    background: var(--ink); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); flex-shrink: 0;
  }
  .nav-logo-text { font-family: var(--serif); font-size: 1.55rem; font-weight: 700; letter-spacing: -0.01em; }
  .nav-logo-text em { color: var(--gold); font-style: normal; }
  .nav-links { display: flex; align-items: center; gap: 2.25rem; }
  .nav-link {
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink); text-decoration: none;
    transition: color var(--transition);
    position: relative;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1.5px; background: var(--gold);
    transform: scaleX(0); transform-origin: left;
    transition: transform var(--transition);
  }
  .nav-link:hover { color: var(--gold); }
  .nav-link:hover::after { transform: scaleX(1); }
  .nav-link.active { color: var(--gold); }
  .nav-link.active::after { transform: scaleX(1); }
  .btn-book {
    background: var(--ink); color: #fff;
    border: none; cursor: pointer;
    padding: 0.6rem 1.5rem; border-radius: 999px;
    font-size: 0.75rem; font-weight: 600;
    font-family: var(--sans); letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: background var(--transition), transform var(--transition);
  }
  .btn-book:hover { background: var(--gold); color: var(--ink); transform: scale(1.04); }
  .nav-mobile-btn {
    display: none; background: none; border: none;
    cursor: pointer; color: var(--ink); padding: 0.4rem;
    border-radius: 8px; transition: background var(--transition);
  }
  .nav-mobile-btn:hover { background: var(--smoke-lt); }
  @media (max-width: 900px) { .nav-links { display: none; } .nav-mobile-btn { display: flex; } }
  .mobile-menu {
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    padding: 1.75rem clamp(1rem,4vw,2.5rem) 2.25rem;
    display: flex; flex-direction: column; gap: 0;
    animation: slideDown 0.2s ease;
  }
  .mobile-menu-link {
    font-family: var(--serif); font-size: 1.5rem; font-weight: 600;
    color: var(--ink); text-decoration: none;
    padding: 0.65rem 0; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; background: none; border-left: none; border-right: none; border-top: none; width: 100%;
    font-family: var(--serif); text-align: left;
    transition: color var(--transition);
  }
  .mobile-menu-link:last-child { border-bottom: none; }
  .mobile-menu-link:hover { color: var(--gold); }
  .mobile-menu-cta {
    margin-top: 1.5rem; background: var(--ink); color: #fff;
    border: none; cursor: pointer; border-radius: 999px;
    padding: 0.85rem 2rem; font-size: 0.85rem; font-weight: 600;
    font-family: var(--sans); width: 100%; letter-spacing: 0.06em;
    text-transform: uppercase; transition: background var(--transition);
  }
  .mobile-menu-cta:hover { background: var(--gold); color: var(--ink); }

  /* ── HERO ── */
  .hero {
    position: relative; min-height: 92vh;
    display: flex; flex-direction: column; justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(0.42) saturate(1.1);
    animation: heroZoom 16s ease-out forwards;
  }
  .hero-grain {
    position: absolute; inset: 0; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.6;
  }
  .hero-overlay {
    position: absolute; inset: 0; z-index: 2;
    background: linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 65%, transparent 100%),
                linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%);
  }
  .hero-content {
    position: relative; z-index: 3;
    max-width: 1300px; margin: 0 auto;
    padding: clamp(4rem,10vh,8rem) clamp(1rem,4vw,2.5rem) 12rem;
    color: #fff;
    animation: fadeUp 0.9s 0.1s ease both;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--mono); font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem;
  }
  .hero-badge-line { width: 36px; height: 1px; background: var(--gold); }
  .hero-title {
    font-family: var(--serif);
    font-size: clamp(3.5rem, 9vw, 7.5rem);
    font-weight: 700; line-height: 0.95;
    letter-spacing: -0.02em; margin-bottom: 1.75rem;
  }
  .hero-title em { font-style: italic; color: var(--gold-light); }
  .hero-subtitle {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    font-weight: 300; line-height: 1.8;
    color: rgba(255,255,255,0.75);
    max-width: 500px; margin-bottom: 3rem;
  }
  .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.7rem;
    background: var(--gold); color: var(--ink);
    border: none; cursor: pointer;
    padding: 1rem 2.25rem; border-radius: 999px;
    font-size: 0.85rem; font-weight: 700;
    font-family: var(--sans); letter-spacing: 0.08em; text-transform: uppercase;
    transition: transform var(--transition), box-shadow var(--transition);
    box-shadow: 0 4px 24px rgba(197,151,58,0.4);
  }
  .btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 32px rgba(197,151,58,0.5); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 0.7rem;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(8px); color: #fff;
    border: 1.5px solid rgba(255,255,255,0.3);
    cursor: pointer; padding: 1rem 2.25rem; border-radius: 999px;
    font-size: 0.85rem; font-weight: 600;
    font-family: var(--sans); letter-spacing: 0.06em; text-transform: uppercase;
    transition: background var(--transition), border-color var(--transition);
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.5); }

  /* hero scroll indicator */
  .hero-scroll {
    position: absolute; bottom: 8rem; left: 50%; transform: translateX(-50%);
    z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: rgba(255,255,255,0.5); font-size: 0.65rem; font-family: var(--mono);
    letter-spacing: 0.2em; text-transform: uppercase;
    animation: shimmer 2.5s ease-in-out infinite;
  }
  .hero-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5)); }

  /* hero stats bar */
  .stats-bar {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
    background: rgba(250,248,244,0.97); backdrop-filter: blur(12px);
    border-top: 1px solid var(--border);
  }
  .stats-bar-inner {
    max-width: 1300px; margin: 0 auto;
    padding: 1.35rem clamp(1rem,4vw,2.5rem);
    display: flex; align-items: center; gap: 0; overflow-x: auto;
  }
  .stat { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; min-width: 100px; }
  .stat + .stat { border-left: 1px solid var(--border); padding-left: 2rem; margin-left: 2rem; }
  .stat-num {
    font-family: var(--serif); font-size: 1.6rem;
    font-weight: 700; line-height: 1; color: var(--ink);
  }
  .stat-label {
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--smoke);
  }

  /* ── SECTION HEADER ── */
  .section-header { margin-bottom: 3.5rem; }
  .section-eyebrow {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--mono); font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.75rem;
  }
  .section-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--gold); }
  .section-title {
    font-family: var(--serif); font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-subtitle {
    font-size: 1rem; color: var(--smoke); line-height: 1.7;
    max-width: 560px; margin-top: 0.75rem;
  }

  /* ── CATEGORIES BAR ── */
  .categories-bar {
    background: #fff; border-bottom: 1px solid var(--border);
    padding: 0; position: sticky; top: 76px; z-index: 100;
    box-shadow: var(--shadow-sm);
  }
  .categories-inner {
    max-width: 1300px; margin: 0 auto;
    padding: 1rem clamp(1rem,4vw,2.5rem);
    display: flex; justify-content: space-between;
    align-items: center; gap: 1.25rem; flex-wrap: wrap;
  }
  .cat-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .cat-pill {
    padding: 0.45rem 1.15rem; border-radius: 999px;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; border: 1.5px solid transparent;
    font-family: var(--sans); transition: all var(--transition); white-space: nowrap;
  }
  .cat-pill-active { background: var(--ink); color: #fff; border-color: var(--ink); }
  .cat-pill-inactive { background: transparent; color: var(--smoke); border-color: var(--border); }
  .cat-pill-inactive:hover { border-color: var(--ink); color: var(--ink); background: var(--smoke-lt); }
  .search-wrap { position: relative; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--smoke); pointer-events: none; }
  .search-input {
    padding: 0.5rem 1rem 0.5rem 2.4rem;
    border-radius: 999px; border: 1.5px solid var(--border);
    background: var(--cream); font-size: 0.84rem;
    font-family: var(--sans); color: var(--ink); outline: none;
    width: 240px; transition: border-color var(--transition), width var(--transition);
  }
  .search-input:focus { border-color: var(--gold); width: 280px; }
  .search-input::placeholder { color: var(--smoke); }

  /* ── BLOG GRID ── */
  .blog-section { padding: 5rem 0 7rem; background: var(--cream); }
  .blog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3.5rem 2.5rem; }
  @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }

  .post-card { cursor: pointer; transition: transform var(--transition); }
  .post-card:hover { transform: translateY(-5px); }
  .post-card-img-wrap {
    position: relative; aspect-ratio: 4/3;
    border-radius: var(--r-lg); overflow: hidden;
    margin-bottom: 1.5rem; box-shadow: var(--shadow-sm);
    transition: box-shadow var(--transition);
  }
  .post-card:hover .post-card-img-wrap { box-shadow: var(--shadow-lg); }
  .post-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .post-card:hover .post-card-img { transform: scale(1.07); }
  .post-card-badge {
    position: absolute; top: 14px; left: 14px;
    background: rgba(250,248,244,0.95); backdrop-filter: blur(8px);
    padding: 0.28rem 0.75rem; border-radius: 999px;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--ink);
  }
  .post-card-read-time {
    position: absolute; top: 14px; right: 14px;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(8px);
    padding: 0.25rem 0.65rem; border-radius: 999px;
    font-size: 0.6rem; font-weight: 500; letter-spacing: 0.08em;
    color: rgba(255,255,255,0.9); display: flex; align-items: center; gap: 4px;
  }
  .post-meta { display: flex; gap: 1rem; font-size: 0.7rem; color: var(--smoke); margin-bottom: 0.65rem; align-items: center; }
  .post-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--smoke); }
  .post-title {
    font-family: var(--serif); font-size: 1.45rem; font-weight: 700;
    line-height: 1.25; margin-bottom: 0.65rem;
    transition: color var(--transition);
  }
  .post-card:hover .post-title { color: var(--gold); }
  .post-excerpt {
    font-size: 0.88rem; line-height: 1.7; color: var(--smoke);
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 1.1rem;
  }
  .post-read-more {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--ink);
    transition: gap var(--transition), color var(--transition);
  }
  .post-card:hover .post-read-more { gap: 0.75rem; color: var(--gold); }

  /* ── FEATURED POST (first post) ── */
  .featured-post {
    grid-column: 1 / -1;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 3rem; align-items: center;
    background: #fff; border-radius: var(--r-lg);
    overflow: hidden; box-shadow: var(--shadow-md);
    cursor: pointer; transition: box-shadow var(--transition), transform var(--transition);
  }
  .featured-post:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
  .featured-post-img-wrap { aspect-ratio: 16/10; overflow: hidden; }
  .featured-post-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
  .featured-post:hover .featured-post-img { transform: scale(1.06); }
  .featured-post-body { padding: 2.5rem; }
  .featured-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--gold-dim); color: var(--gold);
    padding: 0.28rem 0.75rem; border-radius: 999px;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; margin-bottom: 1rem; border: 1px solid rgba(197,151,58,0.25);
  }
  .featured-title {
    font-family: var(--serif); font-size: clamp(1.6rem, 2.5vw, 2.2rem);
    font-weight: 700; line-height: 1.2; margin-bottom: 0.8rem;
    transition: color var(--transition);
  }
  .featured-post:hover .featured-title { color: var(--gold); }
  .featured-excerpt { font-size: 0.95rem; line-height: 1.75; color: var(--smoke); margin-bottom: 1.5rem; }
  @media (max-width: 768px) {
    .featured-post { grid-template-columns: 1fr; }
    .featured-post-img-wrap { aspect-ratio: 16/9; }
  }

  /* ── POST DETAIL ── */
  .post-hero {
    position: relative; height: 65vh; min-height: 440px;
    width: 100%; overflow: hidden;
  }
  .post-hero-img { width: 100%; height: 100%; object-fit: cover; }
  .post-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
    display: flex; align-items: flex-end;
  }
  .post-hero-body {
    max-width: 900px; margin: 0 auto;
    padding: 0 clamp(1rem,4vw,2.5rem) 3.5rem; width: 100%;
    color: #fff; animation: fadeUp 0.6s ease both;
  }
  .btn-back {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2); cursor: pointer;
    border-radius: 999px; padding: 0.5rem 1.1rem;
    margin-bottom: 2rem; font-family: var(--sans);
    transition: background var(--transition), color var(--transition);
  }
  .btn-back:hover { background: rgba(255,255,255,0.2); color: #fff; }
  .post-category-badge {
    display: inline-block; background: var(--gold);
    color: var(--ink); padding: 0.28rem 0.85rem; border-radius: 999px;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; margin-bottom: 1rem;
  }
  .post-hero-title {
    font-family: var(--serif);
    font-size: clamp(2rem, 4.5vw, 3.75rem);
    font-weight: 700; line-height: 1.08; margin-bottom: 1.5rem;
  }
  .post-hero-meta { display: flex; gap: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.65); flex-wrap: wrap; }
  .post-hero-meta-item { display: flex; align-items: center; gap: 0.4rem; }

  .post-body {
    max-width: 900px; margin: 0 auto;
    padding: 5rem clamp(1rem,4vw,2.5rem);
    display: flex; gap: 4.5rem; align-items: flex-start;
  }
  .post-content { flex: 1; min-width: 0; }
  .post-sidebar { width: 290px; flex-shrink: 0; }
  @media (max-width: 900px) { .post-body { flex-direction: column; gap: 2.5rem; } .post-sidebar { width: 100%; } }

  .markdown-body {}
  .md-h1 {
    font-family: var(--serif); font-size: 2.3rem; font-weight: 700;
    line-height: 1.2; margin-bottom: 1.1rem; margin-top: 1.5rem;
    color: var(--ink);
  }
  .md-h2 {
    font-family: var(--serif); font-size: 1.65rem; font-weight: 600;
    line-height: 1.3; margin-bottom: 0.85rem; margin-top: 2.5rem;
    color: var(--ink); padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }
  .md-p { font-size: 1.06rem; line-height: 1.9; margin-bottom: 1.2rem; color: #333; }

  .sidebar-card { border-radius: var(--r-md); padding: 1.65rem; margin-bottom: 1.5rem; }
  .sidebar-card-insight {
    background: var(--cream-alt);
    border: 1.5px solid rgba(197,151,58,0.22);
  }
  .sidebar-card-cta { background: var(--ink); color: #fff; }
  .sidebar-card-related { background: #fff; border: 1px solid var(--border); }

  .insight-header { display: flex; align-items: center; gap: 0.5rem; color: var(--gold); margin-bottom: 1rem; }
  .insight-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
  .insight-text { font-size: 0.88rem; font-style: italic; line-height: 1.75; color: var(--smoke); }
  .insight-hint { font-size: 0.8rem; color: var(--smoke); line-height: 1.65; margin-bottom: 1rem; }
  .btn-generate {
    width: 100%; background: var(--ink); color: #fff; border: none;
    cursor: pointer; border-radius: var(--r-sm); padding: 0.8rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; font-family: var(--sans);
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    transition: background var(--transition);
  }
  .btn-generate:hover:not(:disabled) { background: var(--gold); color: var(--ink); }
  .btn-generate:disabled { opacity: 0.65; cursor: not-allowed; }
  .dot-anim { display: inline-flex; gap: 3px; align-items: center; }
  .dot-anim span {
    width: 4px; height: 4px; border-radius: 50%; background: var(--gold-light);
    animation: dotBounce 1.2s infinite;
  }
  .dot-anim span:nth-child(2) { animation-delay: 0.2s; }
  .dot-anim span:nth-child(3) { animation-delay: 0.4s; }

  .cta-title { font-family: var(--serif); font-size: 1.3rem; font-weight: 600; margin-bottom: 0.6rem; }
  .cta-text { font-size: 0.83rem; color: rgba(255,255,255,0.6); line-height: 1.65; margin-bottom: 1.35rem; }
  .btn-inquire {
    width: 100%; background: var(--gold); color: var(--ink); border: none;
    cursor: pointer; border-radius: var(--r-sm); padding: 0.85rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; font-family: var(--sans);
    transition: opacity var(--transition), transform var(--transition);
  }
  .btn-inquire:hover { opacity: 0.9; transform: scale(1.02); }

  .related-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--smoke); margin-bottom: 1rem; }
  .related-item {
    display: flex; gap: 0.85rem; align-items: flex-start;
    cursor: pointer; padding: 0.6rem 0; border-bottom: 1px solid var(--border);
    transition: color var(--transition);
  }
  .related-item:last-child { border-bottom: none; }
  .related-item:hover { color: var(--gold); }
  .related-thumb { width: 52px; height: 42px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
  .related-title { font-family: var(--serif); font-size: 0.88rem; font-weight: 600; line-height: 1.3; }
  .related-cat { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.2rem; }

  /* ── TOURS PAGE ── */
  .tours-page { background: var(--cream); }
  .tours-hero {
    background: var(--ink); color: #fff;
    padding: 6rem clamp(1rem,4vw,2.5rem);
    text-align: center; position: relative; overflow: hidden;
  }
  .tours-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 120%, rgba(197,151,58,0.18) 0%, transparent 70%);
  }
  .tours-hero-content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
  .tours-section { padding: 6rem 0; }
  .tours-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 2.5rem; }
  @media (max-width: 768px) { .tours-grid { grid-template-columns: 1fr; } }

  .tour-card {
    background: #fff; border-radius: var(--r-lg); overflow: hidden;
    box-shadow: var(--shadow-sm); transition: transform var(--transition), box-shadow var(--transition);
    cursor: pointer;
  }
  .tour-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
  .tour-card-img-wrap { position: relative; aspect-ratio: 16/10; overflow: hidden; }
  .tour-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .tour-card:hover .tour-card-img { transform: scale(1.07); }
  .tour-card-badge {
    position: absolute; top: 16px; left: 16px;
    background: var(--gold); color: var(--ink);
    padding: 0.3rem 0.85rem; border-radius: 999px;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .tour-card-body { padding: 1.75rem; }
  .tour-card-title { font-family: var(--serif); font-size: 1.55rem; font-weight: 700; margin-bottom: 0.3rem; }
  .tour-card-subtitle { font-size: 0.82rem; color: var(--smoke); margin-bottom: 1.25rem; }
  .tour-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1.25rem; border-top: 1px solid var(--border); }
  .tour-price { font-family: var(--serif); font-size: 1.5rem; font-weight: 700; }
  .tour-price-label { font-size: 0.68rem; color: var(--smoke); font-weight: 400; }
  .tour-rating { display: flex; align-items: center; gap: 0.4rem; }
  .tour-rating-stars { display: flex; gap: 1px; color: var(--gold); }
  .tour-rating-text { font-size: 0.78rem; font-weight: 600; }
  .tour-rating-count { font-size: 0.72rem; color: var(--smoke); }
  .btn-book-tour {
    background: var(--ink); color: #fff; border: none; cursor: pointer;
    border-radius: 999px; padding: 0.65rem 1.5rem;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; font-family: var(--sans);
    transition: background var(--transition);
  }
  .btn-book-tour:hover { background: var(--gold); color: var(--ink); }

  /* ── ABOUT PAGE ── */
  .about-page { background: var(--cream); }
  .about-hero {
    min-height: 60vh; display: flex; align-items: center;
    background: var(--ink); color: #fff;
    padding: 6rem clamp(1rem,4vw,2.5rem);
    position: relative; overflow: hidden;
  }
  .about-hero::before {
    content: ''; position: absolute; top: -50%; right: -10%;
    width: 60vw; height: 160%;
    background: radial-gradient(ellipse, rgba(197,151,58,0.12) 0%, transparent 70%);
  }
  .about-hero-inner { max-width: 1300px; margin: 0 auto; width: 100%; position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  @media (max-width: 768px) { .about-hero-inner { grid-template-columns: 1fr; } }
  .about-hero-img { border-radius: var(--r-lg); width: 100%; aspect-ratio: 4/3; object-fit: cover; opacity: 0.85; }
  .about-values { padding: 6rem 0; }
  .values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
  @media (max-width: 768px) { .values-grid { grid-template-columns: 1fr; } }
  .value-card {
    background: #fff; border-radius: var(--r-md); padding: 2rem;
    border: 1px solid var(--border); transition: box-shadow var(--transition), transform var(--transition);
  }
  .value-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
  .value-icon {
    width: 48px; height: 48px; background: var(--gold-dim);
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    color: var(--gold); margin-bottom: 1.25rem;
  }
  .value-title { font-family: var(--serif); font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
  .value-text { font-size: 0.88rem; line-height: 1.7; color: var(--smoke); }

  /* ── TESTIMONIALS ── */
  .testimonials-section { background: var(--ink); color: #fff; padding: 7rem 0; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
  @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr; } }
  .testimonial-card {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--r-lg); padding: 2rem;
    transition: background var(--transition), border-color var(--transition);
  }
  .testimonial-card:hover { background: rgba(255,255,255,0.09); border-color: rgba(197,151,58,0.3); }
  .testimonial-stars { display: flex; gap: 2px; color: var(--gold); margin-bottom: 1rem; }
  .testimonial-text { font-family: var(--serif); font-size: 1.05rem; font-style: italic; line-height: 1.75; color: rgba(255,255,255,0.8); margin-bottom: 1.5rem; }
  .testimonial-author { display: flex; align-items: center; gap: 0.85rem; }
  .testimonial-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(197,151,58,0.3); }
  .testimonial-name { font-weight: 600; font-size: 0.9rem; }
  .testimonial-loc { font-size: 0.75rem; color: rgba(255,255,255,0.45); }
  .testimonial-trip { font-size: 0.68rem; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 0.2rem; }

  /* ── CONTACT PAGE ── */
  .contact-page { background: var(--cream); min-height: 100vh; }
  .contact-hero {
    background: var(--ink); color: #fff;
    padding: 5rem clamp(1rem,4vw,2.5rem) 4rem;
    text-align: center;
  }
  .contact-layout {
    max-width: 1100px; margin: 0 auto;
    padding: 5rem clamp(1rem,4vw,2.5rem);
    display: grid; grid-template-columns: 1fr 1.6fr; gap: 4rem;
    align-items: start;
  }
  @media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; } }
  .contact-info-item {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1.25rem 0; border-bottom: 1px solid var(--border);
  }
  .contact-info-item:last-child { border-bottom: none; }
  .contact-icon {
    width: 42px; height: 42px; background: var(--gold-dim);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    color: var(--gold); flex-shrink: 0;
  }
  .contact-info-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--smoke); margin-bottom: 0.3rem; }
  .contact-info-val { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; }

  .contact-form-card {
    background: #fff; border-radius: var(--r-lg);
    padding: 2.5rem; box-shadow: var(--shadow-md);
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
  .form-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--smoke); }
  .form-input, .form-textarea, .form-select {
    padding: 0.75rem 1rem; border-radius: var(--r-sm);
    border: 1.5px solid var(--border); background: var(--cream);
    font-size: 0.9rem; font-family: var(--sans); color: var(--ink); outline: none;
    transition: border-color var(--transition);
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--gold); }
  .form-textarea { resize: vertical; min-height: 120px; }
  .btn-submit {
    width: 100%; background: var(--ink); color: #fff; border: none; cursor: pointer;
    border-radius: 999px; padding: 1rem; font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; font-family: var(--sans);
    display: flex; align-items: center; justify-content: center; gap: 0.6rem;
    transition: background var(--transition), transform var(--transition);
  }
  .btn-submit:hover { background: var(--gold); color: var(--ink); transform: scale(1.02); }
  .form-success {
    text-align: center; padding: 2rem;
    color: var(--gold); font-family: var(--serif); font-size: 1.3rem; font-weight: 600;
  }
  .form-success p { font-family: var(--sans); font-size: 0.88rem; color: var(--smoke); margin-top: 0.5rem; font-style: normal; }

  /* ── BOOK TRIP MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem; animation: fadeUp 0.25s ease both;
  }
  .modal {
    background: #fff; border-radius: var(--r-lg);
    width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto;
    padding: 2.5rem; position: relative; box-shadow: var(--shadow-lg);
  }
  .modal-close {
    position: absolute; top: 1.25rem; right: 1.25rem;
    background: var(--smoke-lt); border: none; cursor: pointer;
    border-radius: 50%; width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    color: var(--ink); transition: background var(--transition);
  }
  .modal-close:hover { background: var(--cream-alt); }
  .modal-title { font-family: var(--serif); font-size: 1.8rem; font-weight: 700; margin-bottom: 0.4rem; }
  .modal-subtitle { font-size: 0.85rem; color: var(--smoke); margin-bottom: 2rem; }

  /* ── NEWSLETTER BANNER ── */
  .newsletter-section {
    background: var(--gold);
    padding: 5rem clamp(1rem,4vw,2.5rem);
    position: relative; overflow: hidden;
  }
  .newsletter-section::before {
    content: ''; position: absolute; top: -60%; right: -5%;
    width: 50vw; height: 220%;
    background: radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .newsletter-inner { max-width: 680px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
  .newsletter-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: var(--ink); margin-bottom: 0.75rem; }
  .newsletter-subtitle { font-size: 1rem; color: rgba(15,15,14,0.65); margin-bottom: 2rem; line-height: 1.65; }
  .newsletter-form { display: flex; gap: 0.6rem; max-width: 460px; margin: 0 auto; }
  .newsletter-input {
    flex: 1; padding: 0.85rem 1.25rem; border-radius: 999px;
    border: none; background: rgba(255,255,255,0.9);
    font-size: 0.9rem; font-family: var(--sans); color: var(--ink); outline: none;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  .newsletter-input::placeholder { color: rgba(15,15,14,0.45); }
  .newsletter-btn {
    background: var(--ink); color: #fff; border: none; cursor: pointer;
    border-radius: 999px; padding: 0.85rem 1.75rem;
    font-size: 0.78rem; font-weight: 700; font-family: var(--sans);
    letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
    display: flex; align-items: center; gap: 0.5rem;
    transition: opacity var(--transition);
  }
  .newsletter-btn:hover { opacity: 0.85; }
  .newsletter-success { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; color: var(--ink); }
  @media (max-width: 480px) { .newsletter-form { flex-direction: column; } .newsletter-btn { text-align: center; justify-content: center; } }

  /* ── FOOTER ── */
  .footer { background: var(--ink); color: #fff; padding: 5.5rem 0 0; }
  .footer-grid {
    max-width: 1300px; margin: 0 auto;
    padding: 0 clamp(1rem,4vw,2.5rem);
    display: grid; grid-template-columns: 2.2fr 1fr 1fr 1.3fr;
    gap: 3rem; margin-bottom: 4rem;
  }
  @media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } }
  .footer-logo { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 1.35rem; }
  .footer-logo-text { font-family: var(--serif); font-size: 1.65rem; font-weight: 700; }
  .footer-logo-text em { color: var(--gold); font-style: normal; }
  .footer-desc { font-size: 0.86rem; line-height: 1.8; color: rgba(255,255,255,0.5); max-width: 300px; margin-bottom: 2rem; }
  .footer-socials { display: flex; gap: 0.6rem; }
  .social-btn {
    width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15); background: none;
    cursor: pointer; color: #fff;
    display: flex; align-items: center; justify-content: center;
    transition: background var(--transition), border-color var(--transition), color var(--transition);
    font-size: 0.75rem; font-weight: 700; font-family: var(--sans);
  }
  .social-btn:hover { background: var(--gold); border-color: var(--gold); color: var(--ink); }
  .footer-col-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; margin-bottom: 1.35rem; }
  .footer-links { display: flex; flex-direction: column; gap: 0.85rem; }
  .footer-link {
    font-size: 0.84rem; color: rgba(255,255,255,0.5);
    text-decoration: none; transition: color var(--transition);
    cursor: pointer; background: none; border: none; text-align: left;
    font-family: var(--sans);
  }
  .footer-link:hover { color: var(--gold); }
  .footer-nl-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.8rem; }
  .footer-nl-form { display: flex; gap: 0.5rem; }
  .footer-nl-input {
    flex: 1; background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12); border-radius: 999px;
    padding: 0.55rem 1rem; font-size: 0.8rem; font-family: var(--sans);
    color: #fff; outline: none; transition: border-color var(--transition);
  }
  .footer-nl-input::placeholder { color: rgba(255,255,255,0.3); }
  .footer-nl-input:focus { border-color: var(--gold); }
  .footer-nl-btn {
    background: var(--gold); color: var(--ink); border: none;
    cursor: pointer; border-radius: 999px; padding: 0.55rem 1rem;
    font-size: 0.68rem; font-weight: 700; font-family: var(--sans);
    letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
    transition: opacity var(--transition);
  }
  .footer-nl-btn:hover { opacity: 0.85; }
  .footer-bottom {
    max-width: 1300px; margin: 0 auto;
    padding: 1.5rem clamp(1rem,4vw,2.5rem);
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
    font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }
  .footer-bottom-links { display: flex; gap: 2rem; }
  .footer-bottom-link {
    color: rgba(255,255,255,0.28); text-decoration: none;
    transition: color var(--transition); cursor: pointer; background: none; border: none;
    font-family: var(--sans); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
  }
  .footer-bottom-link:hover { color: var(--gold); }

  .empty-state { text-align: center; padding: 5rem 2rem; color: var(--smoke); }
  .empty-state h3 { font-family: var(--serif); font-size: 1.7rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--ink); }
  .empty-state p { font-size: 0.9rem; }
`;

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home"); // home | stories | destinations | tours | about | contact
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");
  const [footerEmailDone, setFooterEmailDone] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookForm, setBookForm] = useState({ name: "", email: "", destination: "", dates: "", guests: "2", notes: "" });
  const [bookDone, setBookDone] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [contactDone, setContactDone] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const title = selectedPost
      ? `${selectedPost.title} — SRZ Tourism`
      : page === "home" ? "SRZ Tourism — Discover the World's Hidden Gems"
      : page === "tours" ? "Tour Packages — SRZ Tourism"
      : page === "about" ? "About Us — SRZ Tourism"
      : page === "contact" ? "Contact — SRZ Tourism"
      : "Stories — SRZ Tourism";
    document.title = title;
  }, [selectedPost, page]);

  useEffect(() => {
    const onScroll = () => setIsNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredPosts = MOCK_POSTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const scrollTop = () => setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

  const navigate = (newPage) => {
    setPage(newPage);
    setSelectedPost(null);
    setIsMenuOpen(false);
    scrollTop();
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setAiInsight(null);
    setIsMenuOpen(false);
    scrollTop();
  };

  const handleBackClick = () => {
    setSelectedPost(null);
    scrollTop();
  };

  const generateAiInsight = async (post) => {
    setIsGeneratingInsight(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 180,
          messages: [{ role: "user", content: `As a senior travel expert for SRZ Tourism, write a 2-sentence unique insider travel tip related to: "${post.title}". Context: ${post.excerpt}. Be specific and practical.` }]
        })
      });
      const data = await response.json();
      setAiInsight(data.content?.[0]?.text || "No insight available.");
    } catch {
      setAiInsight("Unable to generate AI insight at this time. Please try again.");
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (bookForm.name && bookForm.email && bookForm.destination) setBookDone(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) setContactDone(true);
  };

  const relatedPosts = (post) => MOCK_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <>
      <style>{CSS}</style>
      <div ref={topRef} />

      {/* ── NAVIGATION ── */}
      <nav className={`nav${isNavScrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => navigate("home")} aria-label="SRZ Tourism Home">
            <div className="nav-logo-icon"><IconCompass /></div>
            <span className="nav-logo-text">SRZ <em>Tourism</em></span>
          </div>
          <div className="nav-links">
            {[
              { label: "Destinations", id: "destinations" },
              { label: "Stories", id: "stories" },
              { label: "Tours", id: "tours" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }) => (
              <button key={id} onClick={() => navigate(id)}
                className={`nav-link${page === id ? " active" : ""}`}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)" }}>
                {label}
              </button>
            ))}
            <button className="btn-book" onClick={() => setShowBookModal(true)}>Book a Trip</button>
          </div>
          <button className="nav-mobile-btn" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu">
          {[
            { label: "Destinations", id: "destinations" },
            { label: "Stories", id: "stories" },
            { label: "Tours", id: "tours" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <button key={id} className="mobile-menu-link" onClick={() => navigate(id)}>
              {label} <IconArrowRight size={16} />
            </button>
          ))}
          <button className="mobile-menu-cta" onClick={() => { setShowBookModal(true); setIsMenuOpen(false); }}>
            Book a Trip
          </button>
        </div>
      )}

      <main>
        {/* ── POST DETAIL ── */}
        {selectedPost ? (
          <div className="fade-in" style={{ background: "#fff" }}>
            <div className="post-hero">
              <img src={selectedPost.image_url} alt={`${selectedPost.title} — SRZ Tourism`} className="post-hero-img" referrerPolicy="no-referrer" />
              <div className="post-hero-overlay">
                <div className="post-hero-body">
                  <button className="btn-back" onClick={handleBackClick}>← Back to Stories</button>
                  <span className="post-category-badge">{selectedPost.category}</span>
                  <h1 className="post-hero-title">{selectedPost.title}</h1>
                  <div className="post-hero-meta">
                    <span className="post-hero-meta-item">✍ By {selectedPost.author}</span>
                    <span className="post-hero-meta-item">📅 {formatDate(selectedPost.created_at, true)}</span>
                    <span className="post-hero-meta-item"><IconClock /> {selectedPost.read_time}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-body">
              <div className="post-content">
                <SimpleMarkdown content={selectedPost.content} />
              </div>
              <aside className="post-sidebar" style={{ position: "sticky", top: "100px" }}>
                {/* AI Insight */}
                <div className="sidebar-card sidebar-card-insight">
                  <div className="insight-header">
                    <IconSparkle />
                    <span className="insight-label">SRZ AI Insight</span>
                  </div>
                  {aiInsight ? (
                    <p className="insight-text">"{aiInsight}"</p>
                  ) : (
                    <>
                      <p className="insight-hint">Get a unique insider travel tip for this destination, powered by AI.</p>
                      <button className="btn-generate" onClick={() => generateAiInsight(selectedPost)} disabled={isGeneratingInsight}>
                        {isGeneratingInsight
                          ? <><span>Generating</span> <div className="dot-anim"><span /><span /><span /></div></>
                          : <><IconSparkle /> Generate Pro-Tip</>}
                      </button>
                    </>
                  )}
                </div>
                {/* CTA */}
                <div className="sidebar-card sidebar-card-cta">
                  <h4 className="cta-title">Ready to visit?</h4>
                  <p className="cta-text">Let SRZ Tourism handle every detail. We design custom itineraries tailored to you.</p>
                  <button className="btn-inquire" onClick={() => setShowBookModal(true)}>Inquire Now</button>
                </div>
                {/* Related */}
                {relatedPosts(selectedPost).length > 0 && (
                  <div className="sidebar-card sidebar-card-related">
                    <div className="related-label">Related Stories</div>
                    {relatedPosts(selectedPost).map(rp => (
                      <div key={rp.id} className="related-item" onClick={() => handlePostClick(rp)}>
                        <img src={rp.thumb_url} alt={rp.title} className="related-thumb" referrerPolicy="no-referrer" />
                        <div>
                          <div className="related-cat">{rp.category}</div>
                          <div className="related-title">{rp.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        ) : page === "home" ? (
          // ── HOME ──
          <div className="fade-in">
            {/* Hero */}
            <section className="hero">
              <img src="https://picsum.photos/seed/travel-hero-srz/1920/1080" className="hero-bg" alt="Breathtaking travel destination — SRZ Tourism" loading="eager" referrerPolicy="no-referrer" />
              <div className="hero-grain" />
              <div className="hero-overlay" />
              <div className="hero-content">
                <div className="hero-badge"><span className="hero-badge-line" />Explore the Unseen</div>
                <h1 className="hero-title">Your Journey<br />Starts <em>Here.</em></h1>
                <p className="hero-subtitle">Discover hidden gems, cultural wonders, and breathtaking landscapes. SRZ Tourism curates experiences that stay with you forever.</p>
                <div className="hero-cta">
                  <button className="btn-primary" onClick={() => { setPage("stories"); scrollTop(); }}>
                    Explore Stories <IconArrowRight />
                  </button>
                  <button className="btn-secondary" onClick={() => { setPage("tours"); scrollTop(); }}>
                    <IconMap /> View Tours
                  </button>
                </div>
              </div>
              <div className="hero-scroll">
                <div className="hero-scroll-line" />
                <span>Scroll</span>
              </div>
              <div className="stats-bar">
                <div className="stats-bar-inner">
                  {[{ num: "120+", label: "Destinations" }, { num: "4,800+", label: "Happy Travelers" }, { num: "6", label: "Continents" }, { num: "15 Yrs", label: "Experience" }].map((s) => (
                    <div key={s.label} className="stat">
                      <span className="stat-num">{s.num}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Latest Stories */}
            <section style={{ padding: "7rem 0 5rem", background: "var(--cream)" }}>
              <div className="page-wrap">
                <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <div className="section-eyebrow">Travel Stories</div>
                    <h2 className="section-title">Latest from the <em>Field</em></h2>
                  </div>
                  <button onClick={() => navigate("stories")} style={{ background: "none", border: "1.5px solid var(--border)", borderRadius: "999px", padding: "0.6rem 1.4rem", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--sans)", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem", transition: "all var(--transition)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--ink)"; }}>
                    All Stories <IconArrowRight size={14} />
                  </button>
                </div>
                <div className="blog-grid">
                  {MOCK_POSTS.slice(0, 6).map((post, idx) => (
                    <article key={post.id} className="post-card" onClick={() => handlePostClick(post)} style={{ animation: `fadeUp 0.5s ${idx * 0.08}s ease both` }}>
                      <div className="post-card-img-wrap">
                        <img src={post.thumb_url} alt={`${post.title} — ${post.category}`} className="post-card-img" loading="lazy" referrerPolicy="no-referrer" />
                        <span className="post-card-badge">{post.category}</span>
                        <span className="post-card-read-time"><IconClock /> {post.read_time}</span>
                      </div>
                      <div className="post-meta">
                        <span>{formatDate(post.created_at)}</span>
                        <span className="post-meta-dot" />
                        <span>{post.author}</span>
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">{post.excerpt}</p>
                      <div className="post-read-more">Read Story <IconArrowRight size={14} /></div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Tour Packages Teaser */}
            <section style={{ padding: "6rem 0", background: "#fff" }}>
              <div className="page-wrap">
                <div className="section-header">
                  <div className="section-eyebrow">Curated Experiences</div>
                  <h2 className="section-title">Featured <em>Tour Packages</em></h2>
                  <p className="section-subtitle">Hand-crafted itineraries that take you beyond the surface of every destination.</p>
                </div>
                <div className="tours-grid">
                  {TOUR_PACKAGES.slice(0, 2).map(pkg => (
                    <div key={pkg.id} className="tour-card" onClick={() => navigate("tours")}>
                      <div className="tour-card-img-wrap">
                        <img src={pkg.image} alt={pkg.title} className="tour-card-img" loading="lazy" referrerPolicy="no-referrer" />
                        <span className="tour-card-badge">{pkg.badge}</span>
                      </div>
                      <div className="tour-card-body">
                        <div className="tour-card-title">{pkg.title}</div>
                        <div className="tour-card-subtitle">{pkg.subtitle}</div>
                        <div className="tour-card-footer">
                          <div>
                            <div className="tour-price">{pkg.price} <span className="tour-price-label">/ person</span></div>
                            <div className="tour-rating" style={{ marginTop: "0.3rem" }}>
                              <div className="tour-rating-stars">{[1,2,3,4,5].map(s => <IconStar key={s} />)}</div>
                              <span className="tour-rating-text">{pkg.rating}</span>
                              <span className="tour-rating-count">({pkg.reviews})</span>
                            </div>
                          </div>
                          <button className="btn-book-tour" onClick={e => { e.stopPropagation(); setShowBookModal(true); }}>Book Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                  <button className="btn-primary" onClick={() => navigate("tours")}>
                    View All Tours <IconArrowRight />
                  </button>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
              <div className="page-wrap">
                <div className="section-header" style={{ color: "#fff" }}>
                  <div className="section-eyebrow" style={{ color: "var(--gold)" }}>Traveler Reviews</div>
                  <h2 className="section-title" style={{ color: "#fff" }}>What Our <em>Explorers</em> Say</h2>
                </div>
                <div className="testimonials-grid">
                  {TESTIMONIALS.map(t => (
                    <div key={t.id} className="testimonial-card">
                      <div className="testimonial-stars">{[1,2,3,4,5].map(s => <IconStar key={s} />)}</div>
                      <p className="testimonial-text">"{t.text}"</p>
                      <div className="testimonial-author">
                        <img src={t.avatar} alt={t.name} className="testimonial-avatar" referrerPolicy="no-referrer" />
                        <div>
                          <div className="testimonial-name">{t.name}</div>
                          <div className="testimonial-loc">{t.location}</div>
                          <div className="testimonial-trip">{t.trip}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Newsletter */}
            <NewsletterBanner newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} newsletterDone={newsletterDone} setNewsletterDone={setNewsletterDone} />
          </div>
        ) : page === "stories" || page === "destinations" ? (
          // ── STORIES / DESTINATIONS ──
          <div className="fade-in">
            <div id="stories" className="categories-bar">
              <div className="categories-inner">
                <div className="cat-pills">
                  {(page === "destinations"
                    ? ["All", "Destinations", "Culture"]
                    : CATEGORIES
                  ).map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`cat-pill ${activeCategory === cat ? "cat-pill-active" : "cat-pill-inactive"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="search-wrap">
                  <span className="search-icon"><IconSearch /></span>
                  <input type="search" placeholder="Search stories…" className="search-input"
                    aria-label="Search travel stories" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </div>

            <section className="blog-section">
              <div className="page-wrap">
                <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
                  <div>
                    <div className="section-eyebrow">{page === "destinations" ? "Destinations" : "Travel Stories"}</div>
                    <h1 className="section-title">{page === "destinations" ? <>World <em>Destinations</em></> : <>All <em>Stories</em></>}</h1>
                    <p style={{ color: "var(--smoke)", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                      {filteredPosts.length} {filteredPosts.length === 1 ? "story" : "stories"} found
                    </p>
                  </div>
                </div>
                {filteredPosts.length === 0 ? (
                  <div className="empty-state">
                    <h3>No stories found</h3>
                    <p>Try a different category or search term.</p>
                  </div>
                ) : (
                  <div className="blog-grid">
                    {filteredPosts.map((post, idx) => (
                      <article key={post.id} className="post-card" onClick={() => handlePostClick(post)} style={{ animation: `fadeUp 0.5s ${idx * 0.07}s ease both` }}>
                        <div className="post-card-img-wrap">
                          <img src={post.thumb_url} alt={`${post.title} — ${post.category} travel story`} className="post-card-img" loading="lazy" referrerPolicy="no-referrer" />
                          <span className="post-card-badge">{post.category}</span>
                          <span className="post-card-read-time"><IconClock /> {post.read_time}</span>
                        </div>
                        <div className="post-meta">
                          <span>{formatDate(post.created_at)}</span>
                          <span className="post-meta-dot" />
                          <span>{post.author}</span>
                        </div>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <div className="post-read-more">Read Story <IconArrowRight size={14} /></div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : page === "tours" ? (
          // ── TOURS ──
          <div className="tours-page fade-in">
            <div className="tours-hero">
              <div className="tours-hero-content">
                <div className="section-eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Curated Experiences</div>
                <h1 className="section-title" style={{ color: "#fff", textAlign: "center", fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                  Our <em style={{ color: "var(--gold-light)" }}>Tour Packages</em>
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: "520px", margin: "1rem auto 0", lineHeight: "1.7" }}>
                  Expertly crafted itineraries across the world's most extraordinary destinations. Every detail handled, every memory guaranteed.
                </p>
              </div>
            </div>
            <section className="tours-section">
              <div className="page-wrap">
                <div className="tours-grid">
                  {TOUR_PACKAGES.map((pkg, idx) => (
                    <div key={pkg.id} className="tour-card" style={{ animation: `fadeUp 0.5s ${idx * 0.1}s ease both` }}>
                      <div className="tour-card-img-wrap">
                        <img src={pkg.image} alt={`${pkg.title} tour — SRZ Tourism`} className="tour-card-img" loading="lazy" referrerPolicy="no-referrer" />
                        <span className="tour-card-badge">{pkg.badge}</span>
                      </div>
                      <div className="tour-card-body">
                        <h2 className="tour-card-title">{pkg.title}</h2>
                        <p className="tour-card-subtitle">{pkg.subtitle}</p>
                        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                          {["All-inclusive", "Expert guide", "Small groups"].map(f => (
                            <span key={f} style={{ background: "var(--cream-alt)", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.68rem", fontWeight: 600, color: "var(--smoke)", letterSpacing: "0.05em" }}>{f}</span>
                          ))}
                        </div>
                        <div className="tour-card-footer">
                          <div>
                            <div className="tour-price">{pkg.price} <span className="tour-price-label">/ person</span></div>
                            <div className="tour-rating" style={{ marginTop: "0.35rem" }}>
                              <div className="tour-rating-stars">{[1,2,3,4,5].map(s => <IconStar key={s} />)}</div>
                              <span className="tour-rating-text">{pkg.rating}</span>
                              <span className="tour-rating-count">({pkg.reviews} reviews)</span>
                            </div>
                          </div>
                          <button className="btn-book-tour" onClick={() => setShowBookModal(true)}>Book Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "4rem", background: "var(--ink)", borderRadius: "var(--r-lg)", padding: "3rem", display: "flex", gap: "2rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>Looking for a custom trip?</div>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", maxWidth: "480px", lineHeight: "1.65" }}>Tell us your dream destination and we'll craft a completely bespoke itinerary just for you.</p>
                  </div>
                  <button className="btn-primary" onClick={() => setShowBookModal(true)}>Plan My Trip <IconArrowRight /></button>
                </div>
              </div>
            </section>
            <NewsletterBanner newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} newsletterDone={newsletterDone} setNewsletterDone={setNewsletterDone} />
          </div>
        ) : page === "about" ? (
          // ── ABOUT ──
          <div className="about-page fade-in">
            <div className="about-hero">
              <div className="about-hero-inner">
                <div>
                  <div className="section-eyebrow" style={{ color: "var(--gold)" }}>Our Story</div>
                  <h1 className="section-title" style={{ color: "#fff", fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                    Travel is <em style={{ color: "var(--gold-light)" }}>Our Passion</em>
                  </h1>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.8", marginTop: "1rem", fontSize: "1rem", maxWidth: "480px" }}>
                    Founded in 2010, SRZ Tourism was born from a simple belief: that the best travel experiences are the ones that change how you see the world. We are storytellers, planners, and fellow explorers at heart.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.8", marginTop: "0.85rem", fontSize: "1rem", maxWidth: "480px" }}>
                    Over 15 years and 4,800+ travelers later, we still approach every itinerary with the same curiosity that sent our founders to 60 countries with nothing but a carry-on.
                  </p>
                  <button className="btn-primary" style={{ marginTop: "2rem" }} onClick={() => navigate("contact")}>
                    Get in Touch <IconArrowRight />
                  </button>
                </div>
                <img src="https://picsum.photos/seed/about-srz/900/700" alt="SRZ Tourism team on expedition" className="about-hero-img" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Values */}
            <section className="about-values">
              <div className="page-wrap">
                <div className="section-header" style={{ textAlign: "center" }}>
                  <div className="section-eyebrow" style={{ justifyContent: "center" }}>What We Stand For</div>
                  <h2 className="section-title">Our <em>Values</em></h2>
                </div>
                <div className="values-grid">
                  {[
                    { icon: <IconGlobe />, title: "Authentic Discovery", text: "We go beyond the guidebook. Every itinerary is crafted to reveal the real soul of a destination — the flavors, faces, and stories most visitors never encounter." },
                    { icon: <IconUsers />, title: "People First", text: "Small groups, personal service, genuine relationships. We limit every tour to ensure your experience is curated, not cattle-herded." },
                    { icon: <IconAward />, title: "Expert Curation", text: "Our team has collectively visited 140+ countries. We only recommend places we've personally experienced and would return to ourselves." },
                  ].map(v => (
                    <div key={v.title} className="value-card">
                      <div className="value-icon">{v.icon}</div>
                      <h3 className="value-title">{v.title}</h3>
                      <p className="value-text">{v.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Team stats */}
            <section style={{ padding: "5rem 0", background: "var(--cream-alt)" }}>
              <div className="page-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem", textAlign: "center" }}>
                {[{ num: "15+", label: "Years of Experience" }, { num: "140+", label: "Countries Visited" }, { num: "4,800+", label: "Travelers Served" }, { num: "98%", label: "5-Star Reviews" }].map(s => (
                  <div key={s.label} style={{ padding: "2rem", background: "#fff", borderRadius: "var(--r-md)", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--smoke)", marginTop: "0.5rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
              <div className="page-wrap">
                <div className="section-header" style={{ color: "#fff" }}>
                  <div className="section-eyebrow" style={{ color: "var(--gold)" }}>Traveler Reviews</div>
                  <h2 className="section-title" style={{ color: "#fff" }}>What Our <em>Explorers</em> Say</h2>
                </div>
                <div className="testimonials-grid">
                  {TESTIMONIALS.map(t => (
                    <div key={t.id} className="testimonial-card">
                      <div className="testimonial-stars">{[1,2,3,4,5].map(s => <IconStar key={s} />)}</div>
                      <p className="testimonial-text">"{t.text}"</p>
                      <div className="testimonial-author">
                        <img src={t.avatar} alt={t.name} className="testimonial-avatar" referrerPolicy="no-referrer" />
                        <div>
                          <div className="testimonial-name">{t.name}</div>
                          <div className="testimonial-loc">{t.location}</div>
                          <div className="testimonial-trip">{t.trip}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <NewsletterBanner newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} newsletterDone={newsletterDone} setNewsletterDone={setNewsletterDone} />
          </div>
        ) : page === "contact" ? (
          // ── CONTACT ──
          <div className="contact-page fade-in">
            <div className="contact-hero">
              <div className="section-eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Get In Touch</div>
              <h1 className="section-title" style={{ color: "#fff", textAlign: "center", fontSize: "clamp(2.5rem,5vw,4rem)", marginBottom: "1rem" }}>
                Let's Plan Your <em style={{ color: "var(--gold-light)" }}>Adventure</em>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: "500px", margin: "0 auto", lineHeight: "1.7" }}>
                Whether you're planning your first trip or your fiftieth, our team is here to help you create something unforgettable.
              </p>
            </div>
            <div className="contact-layout">
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.65rem", fontWeight: 700, marginBottom: "0.5rem" }}>Contact Information</h2>
                <p style={{ color: "var(--smoke)", fontSize: "0.88rem", marginBottom: "2rem", lineHeight: "1.65" }}>Reach us through any of the channels below. We respond within 24 hours.</p>
                {[
                  { icon: <IconPhone />, label: "Phone", val: "+923012432222" },
                  { icon: <IconMail />, label: "Email", val: "ahmadfraz009@gmail.com" },
                  { icon: <IconPin />, label: "Office", val: "G10 Markaz, Islamabad" },
                ].map(item => (
                  <div key={item.label} className="contact-info-item">
                    <div className="contact-icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-label">{item.label}</div>
                      <div className="contact-info-val">{item.val}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: "2rem" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--smoke)", marginBottom: "0.85rem" }}>Follow Us</div>
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    {["IG", "TW", "FB", "YT"].map(s => (
                      <button key={s} className="social-btn" aria-label={s} style={{ background: "var(--smoke-lt)", border: "1px solid var(--border)", color: "var(--ink)" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--ink)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "var(--smoke-lt)"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="contact-form-card">
                {contactDone ? (
                  <div className="form-success">
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌍</div>
                    <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem", fontStyle: "normal" }}>Message Sent!</p>
                    <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => { setContactDone(false); setContactForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Send a Message</h3>
                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Full Name *</label>
                        <input className="form-input" type="text" placeholder="Sarah Jenkins" required
                          value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Email *</label>
                        <input className="form-input" type="email" placeholder="hello@email.com" required
                          value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Phone</label>
                        <input className="form-input" type="tel" placeholder="+1 555 000 0000"
                          value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Subject *</label>
                        <select className="form-select"
                          value={contactForm.subject} onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))}>
                          <option value="">Select a topic</option>
                          <option>Trip Planning</option>
                          <option>Tour Packages</option>
                          <option>Custom Itinerary</option>
                          <option>General Inquiry</option>
                          <option>Partnership</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message *</label>
                      <textarea className="form-textarea" placeholder="Tell us about your dream trip…" required
                        value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} />
                    </div>
                    <button type="submit" className="btn-submit">
                      <IconSend /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* ── FOOTER ── */}
      {!selectedPost && (
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <div style={{ width: 36, height: 36, background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }}>
                  <IconCompass />
                </div>
                <span className="footer-logo-text">SRZ <em>Tourism</em></span>
              </div>
              <p className="footer-desc">Boutique travel agency and storytelling platform dedicated to uncovering the world's most authentic experiences. Join 4,800+ explorers.</p>
              <div className="footer-socials">
                {["IG", "TW", "FB", "YT"].map(s => (
                  <button key={s} className="social-btn" aria-label={`SRZ Tourism on ${s}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Explore</h4>
              <div className="footer-links">
                {[{ label: "Destinations", id: "destinations" }, { label: "Travel Stories", id: "stories" }, { label: "Tour Packages", id: "tours" }, { label: "About Us", id: "about" }].map(l => (
                  <button key={l.id} className="footer-link" onClick={() => navigate(l.id)}>{l.label}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Company</h4>
              <div className="footer-links">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Careers"].map(l => (
                  <a key={l} href="#" className="footer-link">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Newsletter</h4>
              <p className="footer-nl-label">Travel inspiration in your inbox</p>
              {footerEmailDone ? (
                <p style={{ fontSize: "0.85rem", color: "var(--gold)", fontWeight: 600 }}>✓ You're subscribed!</p>
              ) : (
                <form className="footer-nl-form" onSubmit={(e) => { e.preventDefault(); if (footerEmail) setFooterEmailDone(true); }}>
                  <input type="email" placeholder="Email address" className="footer-nl-input" value={footerEmail} onChange={e => setFooterEmail(e.target.value)} />
                  <button type="submit" className="footer-nl-btn">Join</button>
                </form>
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 SRZ Tourism. All rights reserved.</span>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Terms</a>
              <a href="#" className="footer-bottom-link">Cookies</a>
              <a href="#" className="footer-bottom-link">Sitemap</a>
            </div>
          </div>
        </footer>
      )}

      {/* ── BOOK TRIP MODAL ── */}
      {showBookModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) { setShowBookModal(false); setBookDone(false); } }}>
          <div className="modal">
            <button className="modal-close" onClick={() => { setShowBookModal(false); setBookDone(false); }}><IconX /></button>
            {bookDone ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✈️</div>
                <h3 className="modal-title">Booking Requested!</h3>
                <p style={{ color: "var(--smoke)", fontSize: "0.88rem", lineHeight: "1.65" }}>Thank you, {bookForm.name}! Our team will email you at {bookForm.email} within 24 hours to finalize your trip.</p>
                <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => { setShowBookModal(false); setBookDone(false); setBookForm({ name: "", email: "", destination: "", dates: "", guests: "2", notes: "" }); }}>
                  Done <IconArrowRight />
                </button>
              </div>
            ) : (
              <>
                <h3 className="modal-title">Book a Trip</h3>
                <p className="modal-subtitle">Tell us about your dream adventure and we'll get back to you within 24 hours.</p>
                <form onSubmit={handleBookSubmit}>
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" type="text" placeholder="Your name" required
                        value={bookForm.name} onChange={e => setBookForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="your@email.com" required
                        value={bookForm.email} onChange={e => setBookForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination *</label>
                    <select className="form-select" required value={bookForm.destination} onChange={e => setBookForm(f => ({ ...f, destination: e.target.value }))}>
                      <option value="">Select destination</option>
                      <option>Japan Discovery (14 days)</option>
                      <option>Patagonia Expedition (10 days)</option>
                      <option>Sahara & Marrakech (8 days)</option>
                      <option>Northern Lights Iceland (7 days)</option>
                      <option>Custom Itinerary</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Travel Dates</label>
                      <input className="form-input" type="date"
                        value={bookForm.dates} onChange={e => setBookForm(f => ({ ...f, dates: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Guests</label>
                      <select className="form-select" value={bookForm.guests} onChange={e => setBookForm(f => ({ ...f, guests: e.target.value }))}>
                        {["1","2","3","4","5","6","7","8+"].map(n => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Special Requests</label>
                    <textarea className="form-textarea" style={{ minHeight: "90px" }} placeholder="Any dietary requirements, accessibility needs, or special occasions?"
                      value={bookForm.notes} onChange={e => setBookForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn-submit">
                    <IconSend /> Submit Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── NEWSLETTER BANNER COMPONENT ──────────────────────────────────────────
function NewsletterBanner({ newsletterEmail, setNewsletterEmail, newsletterDone, setNewsletterDone }) {
  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="section-eyebrow" style={{ justifyContent: "center", color: "rgba(15,15,14,0.55)", marginBottom: "0.5rem" }}>Stay Inspired</div>
        <h2 className="newsletter-title">Never Miss a <em style={{ fontStyle: "italic" }}>Hidden Gem</em></h2>
        <p className="newsletter-subtitle">Join 12,000+ explorers who get our weekly travel stories, destination guides, and exclusive trip deals delivered to their inbox.</p>
        {newsletterDone ? (
          <div className="newsletter-success">🎉 Welcome to the SRZ Community!</div>
        ) : (
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) setNewsletterDone(true); }}>
            <input type="email" placeholder="Enter your email address" className="newsletter-input" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} required />
            <button type="submit" className="newsletter-btn"><IconSend /> Subscribe</button>
          </form>
        )}
        <p style={{ fontSize: "0.72rem", color: "rgba(15,15,14,0.45)", marginTop: "1rem" }}>No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

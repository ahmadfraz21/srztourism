import { useState, useEffect, useRef } from "react";

const MOCK_POSTS = [
  {
    id: 1,
    title: "The Hidden Gems of Kyoto",
    excerpt: "Discover the quiet temples and secret gardens that most tourists miss in Japan's ancient capital.",
    content: `# The Hidden Gems of Kyoto\n\nKyoto is known for its stunning temples and traditional tea houses. But beyond the famous Kinkaku-ji and Fushimi Inari, there lies a world of quiet beauty waiting to be discovered by those willing to stray from the well-worn tourist trails.\n\n## 1. Gio-ji Temple\n\nA small, moss-covered temple tucked deep in the Arashiyama bamboo district. The entire garden floor is blanketed in a rich, emerald moss that seems to glow after rainfall. Unlike the crowds at Tenryu-ji nearby, Gio-ji receives only a trickle of visitors — making it a perfect sanctuary for quiet reflection.\n\n## 2. Fushimi Momoyama Castle\n\nWhile most tourists head straight for the Inari shrine, the castle ruins just a few kilometers away are hauntingly beautiful. The stone walls and weathered gates tell a story of feudal Japan that no museum can replicate.\n\n## 3. Philosopher's Path in Winter\n\nEveryone visits in cherry blossom season. But the canal-side walkway in January — dusted with snow, nearly empty — is where you truly understand why this city has inspired poets for centuries.`,
    category: "Culture",
    image_url: "https://picsum.photos/seed/kyoto/1200/800",
    author: "Sarah Jenkins",
    created_at: "2025-11-15T09:00:00Z",
  },
  {
    id: 2,
    title: "Backpacking Through Patagonia",
    excerpt: "A comprehensive guide to trekking the W Circuit and exploring the wild landscapes of Chile and Argentina.",
    content: `# Backpacking Through Patagonia\n\nPatagonia is a land of extremes. From the jagged granite spires of Torres del Paine to the vast blue expanse of the Perito Moreno Glacier, every single step here feels like a privilege.\n\n## The W Circuit\n\nThe classic 5-day trek covers approximately 80 kilometers of some of the most dramatic terrain on earth. You'll traverse hanging valleys, cross suspension bridges over glacial rivers, and camp beneath peaks that seem to pierce the clouds.\n\n**Best time to go:** November through March. Outside of this window, the weather becomes dangerously unpredictable.\n\n## The Glacier\n\nPerito Moreno on the Argentine side is the world's only growing glacier. Watching a wall of ice the size of a city block calve into Lake Argentino with a thunderous boom is a moment you will carry for a lifetime.`,
    category: "Adventure",
    image_url: "https://picsum.photos/seed/patagonia/1200/800",
    author: "Marc Rivera",
    created_at: "2025-10-22T08:30:00Z",
  },
  {
    id: 3,
    title: "A Foodie's Guide to the Amalfi Coast",
    excerpt: "From fresh seafood to the world's best lemons, here's what you must eat while visiting Italy's most beautiful coastline.",
    content: `# A Foodie's Guide to the Amalfi Coast\n\nItalian cuisine is legendary worldwide, but the Amalfi Coast has flavors that exist nowhere else on Earth. The volcanic soil and salt air create ingredients of extraordinary intensity.\n\n## The Lemons\n\nThe sfusato amalfitano — a local lemon variety — are the size of softballs and sweet enough to eat like an orange. The limoncello made from their zest in Ravello's tiny distilleries bears no resemblance to the mass-produced bottles you find elsewhere.\n\n## Where to Eat\n\nAvoid the tourist traps on the main promenade. Instead, climb the stairs to the villages above — Praiano, Furore, Conca dei Marini — where locals still eat at family-run trattorie with no English menu and no reservations system.`,
    category: "Tips",
    image_url: "https://picsum.photos/seed/amalfi/1200/800",
    author: "Elena Rossi",
    created_at: "2025-09-08T11:00:00Z",
  },
  {
    id: 4,
    title: "Exploring the Sahara at Sunrise",
    excerpt: "How to experience the world's largest desert beyond the tourist camps — on camelback at dawn.",
    content: `# Exploring the Sahara at Sunrise\n\nMost visitors to the Sahara see it from the window of a 4x4 or from the safety of a glamping tent. To truly understand the desert, you have to meet it on its own terms: on foot, at first light, in the silence before the world wakes up.\n\n## Merzouga, Morocco\n\nThe Erg Chebbi dunes near Merzouga rise over 150 meters — sculpted overnight by winds that have been shaping this landscape for millennia. Climbing to the summit as the sun crests the horizon, watching the shadow lines shift across the ridges below, is a meditation you didn't know you needed.\n\n## The Stars\n\nAt 2 AM, when the camp fires die and the last generator falls silent, the Sahara sky becomes something else entirely. With zero light pollution for hundreds of kilometers, the Milky Way is not a faint smear but a solid, structural band across the sky.`,
    category: "Destinations",
    image_url: "https://picsum.photos/seed/sahara/1200/800",
    author: "Karim Mansour",
    created_at: "2025-08-03T07:45:00Z",
  },
  {
    id: 5,
    title: "Iceland's Ring Road: A Two-Week Itinerary",
    excerpt: "Everything you need to plan the ultimate drive around Iceland — waterfalls, glaciers, and the northern lights.",
    content: `# Iceland's Ring Road: A Two-Week Itinerary\n\nRoute 1 — the Ring Road — circles the entire island of Iceland over 1,332 kilometers. Two weeks is just enough time to do it justice.\n\n## Day 1–3: The Golden Circle and South Coast\n\nStart in Reykjavik, then curve east through Þingvellir National Park — the only place on Earth where you can snorkel between two tectonic plates. Continue to Seljalandsfoss waterfall, where you can walk behind the falling water in late evening golden light.\n\n## The Northern Lights\n\nOctober through March gives the best chance. Turn off the car, kill the headlights, and lie on the road. No other posture does them justice.`,
    category: "Adventure",
    image_url: "https://picsum.photos/seed/iceland/1200/800",
    author: "Astrid Bjornsson",
    created_at: "2025-07-19T14:20:00Z",
  },
  {
    id: 6,
    title: "Packing Light: The 10-Item Carry-On System",
    excerpt: "The art of traveling with nothing but a carry-on for trips of any length — tested on 6 continents.",
    content: `# Packing Light: The 10-Item Carry-On System\n\nAfter a decade of travel across 60+ countries, I've distilled my packing list to 10 core items that handle every climate, every dress code, and every adventure.\n\n## The Philosophy\n\nEvery item must earn its place by serving at least three different purposes. A merino wool sweater that functions as a pillow, a jacket liner, and elegant dinner attire is worth carrying. A dedicated "beach cover-up" is not.\n\n## The Result\n\nNo checked bag fees. No 45-minute baggage claim. You walk off the plane and keep moving. That is the entire point of travel — movement.`,
    category: "Tips",
    image_url: "https://picsum.photos/seed/packing/1200/800",
    author: "James Whitfield",
    created_at: "2025-06-11T10:00:00Z",
  },
];

const CATEGORIES = ["All", "Culture", "Adventure", "Tips", "Destinations"];

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
      elements.push(<h1 key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: "1rem", marginTop: "1.5rem", lineHeight: 1.2 }}>{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.75rem", marginTop: "2rem", lineHeight: 1.3 }}>{line.slice(3)}</h2>);
    } else if (line.trim() !== "") {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part);
      elements.push(<p key={i} style={{ fontSize: "1.05rem", lineHeight: 1.85, marginBottom: "1.1rem", color: "#374151" }}>{rendered}</p>);
    }
    i++;
  }
  return <div>{elements}</div>;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --primary: #1a1a1a;
    --accent: #c9a84c;
    --accent-light: #e8d5a3;
    --paper: #fdfcfb;
    --paper-alt: #f7f5f2;
    --muted: rgba(26,26,26,0.5);
    --border: rgba(26,26,26,0.08);
  }
  body { background: var(--paper); color: var(--primary); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  .serif { font-family: 'Playfair Display', serif; }
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(253,252,251,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
  .nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; height: 80px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; }
  .nav-logo-icon { width: 40px; height: 40px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent); }
  .nav-logo-text { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; }
  .nav-logo-text span { color: var(--accent); }
  .nav-links { display: flex; align-items: center; gap: 2.5rem; }
  .nav-link { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--primary); text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: var(--accent); }
  .btn-book { background: var(--primary); color: #fff; border: none; cursor: pointer; padding: 0.6rem 1.5rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
  .btn-book:hover { background: #333; }
  .nav-mobile-btn { display: none; background: none; border: none; cursor: pointer; color: var(--primary); padding: 0.5rem; }
  @media (max-width: 768px) { .nav-links { display: none; } .nav-mobile-btn { display: flex; } }
  .mobile-menu { background: var(--paper); border-bottom: 1px solid var(--border); padding: 1.5rem 2rem 2rem; display: flex; flex-direction: column; gap: 1.25rem; animation: slideDown 0.2s ease; }
  .mobile-menu a { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--primary); text-decoration: none; }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
  .hero { position: relative; height: 88vh; min-height: 600px; display: flex; align-items: center; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.45); animation: heroZoom 14s ease-out forwards; }
  @keyframes heroZoom { from { transform: scale(1.08); } to { transform: scale(1.00); } }
  .hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(135deg, rgba(0,0,0,0.35) 0%, transparent 60%), linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%); }
  .hero-content { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; padding: 0 2rem; color: #fff; animation: heroFadeUp 0.9s 0.2s ease both; }
  @keyframes heroFadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  .hero-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
  .hero-eyebrow::before { content: ''; width: 40px; height: 1px; background: var(--accent); }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 8vw, 6.5rem); font-weight: 700; line-height: 1.0; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
  .hero-title em { font-style: italic; color: var(--accent-light); }
  .hero-subtitle { font-size: 1.15rem; font-weight: 300; line-height: 1.75; color: rgba(255,255,255,0.78); max-width: 540px; margin-bottom: 2.5rem; }
  .btn-explore { display: inline-flex; align-items: center; gap: 0.75rem; background: var(--accent); color: var(--primary); border: none; cursor: pointer; padding: 1rem 2rem; border-radius: 999px; font-size: 0.9rem; font-weight: 700; font-family: 'DM Sans', sans-serif; letter-spacing: 0.05em; text-transform: uppercase; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(201,168,76,0.35); }
  .btn-explore:hover { transform: scale(1.04); }
  .hero-stats { position: absolute; bottom: 0; left: 0; right: 0; z-index: 3; background: rgba(253,252,251,0.96); backdrop-filter: blur(8px); border-top: 1px solid var(--border); }
  .hero-stats-inner { max-width: 1280px; margin: 0 auto; padding: 1.25rem 2rem; display: flex; align-items: center; gap: 3rem; overflow-x: auto; }
  .stat { display: flex; flex-direction: column; gap: 0.15rem; flex-shrink: 0; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; line-height: 1; }
  .stat-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .stat-divider { width: 1px; height: 36px; background: var(--border); flex-shrink: 0; }
  .section-wrap { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
  .categories-bar { padding: 3rem 0 2.5rem; background: #fff; border-bottom: 1px solid var(--border); }
  .categories-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.25rem; }
  .cat-pills { display: flex; gap: 0.6rem; flex-wrap: wrap; }
  .cat-pill { padding: 0.5rem 1.25rem; border-radius: 999px; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; white-space: nowrap; }
  .cat-pill-active { background: var(--primary); color: #fff; box-shadow: 0 2px 10px rgba(26,26,26,0.25); }
  .cat-pill-inactive { background: rgba(26,26,26,0.06); color: var(--primary); }
  .cat-pill-inactive:hover { background: rgba(26,26,26,0.12); }
  .search-wrap { position: relative; width: 260px; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; }
  .search-input { width: 100%; padding: 0.55rem 1rem 0.55rem 2.5rem; border-radius: 999px; border: 1.5px solid var(--border); background: rgba(26,26,26,0.04); font-size: 0.85rem; font-family: 'DM Sans', sans-serif; color: var(--primary); outline: none; transition: border-color 0.2s; }
  .search-input:focus { border-color: var(--accent); }
  .search-input::placeholder { color: var(--muted); }
  .blog-section { padding: 5rem 0 6rem; background: var(--paper); }
  .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem 2.5rem; }
  @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }
  .post-card { cursor: pointer; transition: transform 0.3s; }
  .post-card:hover { transform: translateY(-4px); }
  .post-card-img-wrap { position: relative; aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.08); transition: box-shadow 0.4s; }
  .post-card:hover .post-card-img-wrap { box-shadow: 0 12px 40px rgba(0,0,0,0.18); }
  .post-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .post-card:hover .post-card-img { transform: scale(1.08); }
  .post-card-badge { position: absolute; top: 14px; left: 14px; background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 0.3rem 0.75rem; border-radius: 999px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--primary); }
  .post-meta { display: flex; gap: 1.25rem; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.04em; color: var(--muted); margin-bottom: 0.6rem; }
  .post-meta-item { display: flex; align-items: center; gap: 4px; }
  .post-title { font-family: 'Playfair Display', serif; font-size: 1.35rem; font-weight: 700; line-height: 1.3; margin-bottom: 0.6rem; transition: color 0.2s; }
  .post-card:hover .post-title { color: var(--accent); }
  .post-excerpt { font-size: 0.9rem; line-height: 1.65; color: rgba(26,26,26,0.6); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 1rem; }
  .post-read-more { display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--primary); transition: gap 0.2s, color 0.2s; }
  .post-card:hover .post-read-more { gap: 0.7rem; color: var(--accent); }
  .post-hero { position: relative; height: 62vh; min-height: 420px; width: 100%; overflow: hidden; }
  .post-hero-img { width: 100%; height: 100%; object-fit: cover; }
  .post-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%); display: flex; align-items: flex-end; }
  .post-hero-body { max-width: 860px; margin: 0 auto; padding: 0 2rem 3rem; width: 100%; color: #fff; animation: heroFadeUp 0.6s ease both; }
  .btn-back { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #fff; background: none; border: none; cursor: pointer; margin-bottom: 2rem; transition: color 0.2s; font-family: 'DM Sans', sans-serif; }
  .btn-back:hover { color: var(--accent); }
  .post-category-badge { display: inline-block; background: var(--accent); color: var(--primary); padding: 0.28rem 0.85rem; border-radius: 999px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem; }
  .post-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem, 4vw, 3.5rem); font-weight: 700; line-height: 1.1; margin-bottom: 1.25rem; }
  .post-hero-meta { display: flex; gap: 1.75rem; font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.75); }
  .post-hero-meta-item { display: flex; align-items: center; gap: 0.5rem; }
  .post-body { max-width: 860px; margin: 0 auto; padding: 5rem 2rem; display: flex; gap: 4rem; align-items: flex-start; }
  .post-content { flex: 1; min-width: 0; }
  .post-sidebar { width: 280px; flex-shrink: 0; }
  @media (max-width: 900px) { .post-body { flex-direction: column; gap: 2.5rem; } .post-sidebar { width: 100%; } }
  .sidebar-card { border-radius: 20px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .sidebar-card-insight { background: var(--paper-alt); border: 1.5px solid rgba(201,168,76,0.25); }
  .sidebar-card-cta { background: var(--primary); color: #fff; }
  .insight-header { display: flex; align-items: center; gap: 0.5rem; color: var(--accent); margin-bottom: 1rem; }
  .insight-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
  .insight-text { font-size: 0.88rem; font-style: italic; line-height: 1.7; color: rgba(26,26,26,0.8); }
  .insight-hint { font-size: 0.78rem; color: var(--muted); line-height: 1.6; margin-bottom: 1rem; }
  .btn-generate { width: 100%; background: var(--primary); color: #fff; border: none; cursor: pointer; border-radius: 12px; padding: 0.75rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background 0.2s; }
  .btn-generate:hover:not(:disabled) { background: #333; }
  .btn-generate:disabled { opacity: 0.7; cursor: not-allowed; }
  .cta-title { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.6rem; }
  .cta-text { font-size: 0.82rem; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 1.25rem; }
  .btn-inquire { width: 100%; background: var(--accent); color: var(--primary); border: none; cursor: pointer; border-radius: 12px; padding: 0.8rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s; }
  .btn-inquire:hover { opacity: 0.88; }
  .footer { background: var(--primary); color: #fff; padding: 5rem 0 0; }
  .footer-grid { max-width: 1280px; margin: 0 auto; padding: 0 2rem; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 4rem; }
  @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } }
  .footer-brand-logo { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.25rem; }
  .footer-brand-logo-text { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; }
  .footer-brand-logo-text span { color: var(--accent); }
  .footer-desc { font-size: 0.88rem; line-height: 1.75; color: rgba(255,255,255,0.55); max-width: 320px; margin-bottom: 2rem; }
  .footer-socials { display: flex; gap: 0.75rem; }
  .social-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); background: none; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; transition: background 0.2s, border-color 0.2s, color 0.2s; }
  .social-btn:hover { background: var(--accent); border-color: var(--accent); color: var(--primary); }
  .footer-col-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 600; margin-bottom: 1.25rem; }
  .footer-links { display: flex; flex-direction: column; gap: 0.8rem; }
  .footer-link { font-size: 0.85rem; color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.2s; }
  .footer-link:hover { color: var(--accent); }
  .newsletter-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 0.75rem; }
  .newsletter-form { display: flex; gap: 0.5rem; }
  .newsletter-input { flex: 1; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 0.5rem 1rem; font-size: 0.82rem; font-family: 'DM Sans', sans-serif; color: #fff; outline: none; transition: border-color 0.2s; }
  .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }
  .newsletter-input:focus { border-color: var(--accent); }
  .newsletter-btn { background: var(--accent); color: var(--primary); border: none; cursor: pointer; border-radius: 999px; padding: 0.5rem 1rem; font-size: 0.72rem; font-weight: 700; font-family: 'DM Sans', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; }
  .footer-bottom { max-width: 1280px; margin: 0 auto; padding: 1.5rem 2rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
  .footer-bottom-links { display: flex; gap: 2rem; }
  .footer-bottom-links a { color: rgba(255,255,255,0.3); text-decoration: none; transition: color 0.2s; }
  .footer-bottom-links a:hover { color: var(--accent); }
  .empty-state { text-align: center; padding: 5rem 2rem; color: var(--muted); }
  .empty-state h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--primary); }
  .fade-in { animation: fadeInPage 0.5s ease both; }
  @keyframes fadeInPage { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .dot-anim { display: inline-flex; gap: 3px; align-items: center; }
  .dot-anim span { width: 4px; height: 4px; border-radius: 50%; background: var(--accent-light); animation: dotBounce 1.2s infinite; }
  .dot-anim span:nth-child(2) { animation-delay: 0.2s; }
  .dot-anim span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dotBounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
`;

export default function App() {
  const [posts] = useState(MOCK_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const title = selectedPost
      ? `${selectedPost.title} — SRZ Tourism`
      : "SRZ Tourism — Discover the World's Hidden Gems";
    document.title = title;
  }, [selectedPost]);

  const filteredPosts = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setAiInsight(null);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
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
          messages: [{ role: "user", content: `As a travel expert for SRZ Tourism, provide a 2-sentence unique travel insight or pro-tip related to: ${post.title}. Content: ${post.excerpt}` }]
        })
      });
      const data = await response.json();
      setAiInsight(data.content?.[0]?.text || "No insight available.");
    } catch {
      setAiInsight("Unable to generate AI insight at this time.");
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div ref={topRef} />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={handleBackClick}>
            <div className="nav-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </div>
            <span className="nav-logo-text">SRZ <span>Tourism</span></span>
          </div>
          <div className="nav-links">
            {["Destinations", "Stories", "About", "Contact"].map((item) => (
              <a key={item} href="#" className="nav-link">{item}</a>
            ))}
            <button className="btn-book">Book a Trip</button>
          </div>
          <button className="nav-mobile-btn" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen
              ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu">
          {["Destinations", "Stories", "About", "Contact"].map((item) => (
            <a key={item} href="#" onClick={() => setIsMenuOpen(false)}>{item}</a>
          ))}
        </div>
      )}

      <main>
        {!selectedPost ? (
          <div className="fade-in">
            {/* Hero */}
            <section className="hero">
              <img src="https://picsum.photos/seed/travel-hero/1920/1080" className="hero-bg" alt="Scenic travel destination — SRZ Tourism" loading="eager" referrerPolicy="no-referrer" />
              <div className="hero-overlay" />
              <div className="hero-content">
                <div className="hero-eyebrow">Explore the Unseen</div>
                <h1 className="hero-title">Your Journey <br />Starts <em>Here.</em></h1>
                <p className="hero-subtitle">Discover hidden gems, cultural wonders, and breathtaking landscapes with SRZ Tourism. We curate experiences that linger in your memory forever.</p>
                <button className="btn-explore" onClick={() => document.getElementById("stories").scrollIntoView({ behavior: "smooth" })}>
                  Start Exploring
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
              <div className="hero-stats">
                <div className="hero-stats-inner">
                  {[{ num: "120+", label: "Destinations" }, { num: "4,800", label: "Happy Travelers" }, { num: "6", label: "Continents" }, { num: "15 yrs", label: "Experience" }].map((s, i) => (
                    <>
                      {i > 0 && <div key={`d${i}`} className="stat-divider" />}
                      <div key={s.label} className="stat">
                        <span className="stat-num">{s.num}</span>
                        <span className="stat-label">{s.label}</span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </section>

            {/* Categories */}
            <div id="stories" className="categories-bar">
              <div className="categories-inner">
                <div className="cat-pills">
                  {CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-pill ${activeCategory === cat ? "cat-pill-active" : "cat-pill-inactive"}`}>{cat}</button>
                  ))}
                </div>
                <div className="search-wrap">
                  <span className="search-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
                  <input type="text" placeholder="Search stories..." className="search-input" aria-label="Search travel stories" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <section className="blog-section">
              <div className="section-wrap">
                {filteredPosts.length === 0 ? (
                  <div className="empty-state"><h3>No stories found</h3><p>Try a different category or search term.</p></div>
                ) : (
                  <div className="blog-grid">
                    {filteredPosts.map((post, idx) => (
                      <article key={post.id} className="post-card" onClick={() => handlePostClick(post)} style={{ animation: `fadeInPage 0.5s ${idx * 0.08}s ease both` }}>
                        <div className="post-card-img-wrap">
                          <img src={post.image_url} alt={`${post.title} — ${post.category} travel story`} className="post-card-img" loading="lazy" referrerPolicy="no-referrer" />
                          <span className="post-card-badge">{post.category}</span>
                        </div>
                        <div className="post-meta">
                          <span className="post-meta-item">📅 {formatDate(post.created_at)}</span>
                          <span className="post-meta-item">✍️ {post.author}</span>
                        </div>
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <div className="post-read-more">Read Story →</div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className="fade-in" style={{ background: "#fff" }}>
            <div className="post-hero">
              <img src={selectedPost.image_url} alt={`${selectedPost.title} — featured image`} className="post-hero-img" referrerPolicy="no-referrer" />
              <div className="post-hero-overlay">
                <div className="post-hero-body">
                  <button className="btn-back" onClick={handleBackClick}>← Back to Stories</button>
                  <span className="post-category-badge">{selectedPost.category}</span>
                  <h1 className="post-hero-title">{selectedPost.title}</h1>
                  <div className="post-hero-meta">
                    <span className="post-hero-meta-item">✍️ By {selectedPost.author}</span>
                    <span className="post-hero-meta-item">📅 {formatDate(selectedPost.created_at, true)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-body">
              <div className="post-content"><SimpleMarkdown content={selectedPost.content} /></div>
              <aside className="post-sidebar" style={{ position: "sticky", top: "100px" }}>
                <div className="sidebar-card sidebar-card-insight">
                  <div className="insight-header">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.88 5.76L20 10l-6.12 1.24L12 17l-1.88-5.76L4 10l6.12-1.24z"/></svg>
                    <span className="insight-label">SRZ AI Insight</span>
                  </div>
                  {aiInsight ? (
                    <p className="insight-text">"{aiInsight}"</p>
                  ) : (
                    <>
                      <p className="insight-hint">Get a unique travel pro-tip for this destination, powered by AI.</p>
                      <button className="btn-generate" onClick={() => generateAiInsight(selectedPost)} disabled={isGeneratingInsight}>
                        {isGeneratingInsight ? <>Generating <div className="dot-anim"><span /><span /><span /></div></> : "Generate Pro-Tip"}
                      </button>
                    </>
                  )}
                </div>
                <div className="sidebar-card sidebar-card-cta">
                  <h4 className="cta-title">Ready to visit?</h4>
                  <p className="cta-text">Let SRZ Tourism handle every detail. We design custom itineraries for this destination.</p>
                  <button className="btn-inquire">Inquire Now</button>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              <span className="footer-brand-logo-text">SRZ <span>Tourism</span></span>
            </div>
            <p className="footer-desc">We are a boutique travel agency and storytelling platform dedicated to uncovering the world's most authentic experiences. Join our community of explorers.</p>
            <div className="footer-socials">
              {["Instagram", "Twitter", "Facebook"].map((s) => (
                <button key={s} className="social-btn" aria-label={`SRZ Tourism on ${s}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="footer-col-title">Explore</h4>
            <div className="footer-links">
              {["Our Destinations", "Travel Guides", "Success Stories", "About Us"].map((l) => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="footer-col-title">Company</h4>
            <div className="footer-links">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us"].map((l) => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="footer-col-title">Newsletter</h4>
            <p className="newsletter-label">Travel inspiration in your inbox</p>
            {newsletterDone ? (
              <p style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>✓ You're subscribed!</p>
            ) : (
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) setNewsletterDone(true); }}>
                <input type="email" placeholder="Email address" className="newsletter-input" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} />
                <button type="submit" className="newsletter-btn">Join</button>
              </form>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SRZ Tourism. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </footer>
    </>
  );
}

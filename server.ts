import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("tourism.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT,
    image_url TEXT,
    author TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO posts (title, excerpt, content, category, image_url, author)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    "The Hidden Gems of Kyoto",
    "Discover the quiet temples and secret gardens that most tourists miss in Japan's ancient capital.",
    "# The Hidden Gems of Kyoto\n\nKyoto is known for its stunning temples and traditional tea houses. But beyond the famous Kinkaku-ji and Fushimi Inari, there lies a world of quiet beauty...\n\n## 1. Gio-ji Temple\nA small, moss-covered temple in Arashiyama that offers a peaceful escape from the crowds.",
    "Culture",
    "https://picsum.photos/seed/kyoto/1200/800",
    "Sarah Jenkins"
  );

  insert.run(
    "Backpacking Through Patagonia",
    "A comprehensive guide to trekking the W Circuit and exploring the wild landscapes of Chile and Argentina.",
    "# Backpacking Through Patagonia\n\nPatagonia is a land of extremes. From the jagged peaks of Torres del Paine to the massive Perito Moreno Glacier, every step is an adventure...",
    "Adventure",
    "https://picsum.photos/seed/patagonia/1200/800",
    "Marc Rivera"
  );

  insert.run(
    "A Foodie's Guide to Amalfi Coast",
    "From fresh seafood to the world's best lemons, here's what you must eat while visiting Italy's most beautiful coastline.",
    "# A Foodie's Guide to Amalfi Coast\n\nItalian cuisine is legendary, but the Amalfi Coast has its own unique flavors. The combination of volcanic soil and sea air creates ingredients like nowhere else...",
    "Tips",
    "https://picsum.photos/seed/amalfi/1200/800",
    "Elena Rossi"
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.json(posts);
  });

  app.get("/api/posts/:id", (req, res) => {
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
    if (post) {
      res.set("Cache-Control", "public, max-age=120, stale-while-revalidate=600");
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  });

  app.post("/api/posts", (req, res) => {
    const { title, excerpt, content, category, image_url, author } = req.body;
    const info = db.prepare(`
      INSERT INTO posts (title, excerpt, content, category, image_url, author)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, excerpt, content, category, image_url, author);
    
    res.json({ id: info.lastInsertRowid });
  });

  // ── SEO: robots.txt ──────────────────────────────────────────────
  app.get("/robots.txt", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(
      `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://srztourism.com/sitemap.xml`
    );
  });

  // ── SEO: sitemap.xml ─────────────────────────────────────────────
  app.get("/sitemap.xml", (req, res) => {
    const posts = db.prepare("SELECT id, title, created_at FROM posts ORDER BY created_at DESC").all() as {
      id: number; title: string; created_at: string;
    }[];

    const BASE = "https://srztourism.com";
    const today = new Date().toISOString().split("T")[0];

    const postEntries = posts.map((p) => {
      const lastmod = new Date(p.created_at).toISOString().split("T")[0];
      return `  <url>
    <loc>${BASE}/posts/${p.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${postEntries}
</urlset>`;

    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

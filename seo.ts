import { useEffect } from 'react';
import { Post } from './types';

const BASE_URL = 'https://srztourism.com';
const DEFAULT_IMAGE = 'https://picsum.photos/seed/srztourism-og/1200/630';

interface SEOProps {
  post?: Post | null;
}

/**
 * Dynamically updates <title> and all <meta> tags based on the current view.
 * Call this at the top of your App component and pass the currently selected post.
 *
 * Example:
 *   useSEO({ post: selectedPost });
 */
export function useSEO({ post }: SEOProps) {
  useEffect(() => {
    const isPost = !!post;

    const title = isPost
      ? `${post!.title} — SRZ Tourism`
      : 'SRZ Tourism — Discover the World\'s Hidden Gems';

    const description = isPost
      ? post!.excerpt
      : 'SRZ Tourism is a boutique travel agency and blog platform curating authentic destinations, cultural insights, and expert travel guides across 120+ countries.';

    const image = isPost ? post!.image_url : DEFAULT_IMAGE;
    const url   = isPost ? `${BASE_URL}/posts/${post!.id}` : `${BASE_URL}/`;

    // ── <title> ──────────────────────────────────────────────────────
    document.title = title;

    // ── Helper to set/create a <meta> tag ───────────────────────────
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // ── Standard meta ────────────────────────────────────────────────
    setMeta('meta[name="description"]',   'content', description);
    setMeta('link[rel="canonical"]',      'href',    url);

    // ── Open Graph ───────────────────────────────────────────────────
    setMeta('meta[property="og:title"]',       'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]',       'content', image);
    setMeta('meta[property="og:image:alt"]',   'content', isPost ? post!.title : 'SRZ Tourism destinations');
    setMeta('meta[property="og:url"]',         'content', url);
    setMeta('meta[property="og:type"]',        'content', isPost ? 'article' : 'website');

    if (isPost) {
      setMeta('meta[property="article:author"]',        'content', post!.author);
      setMeta('meta[property="article:published_time"]','content', post!.created_at);
      setMeta('meta[property="article:section"]',       'content', post!.category);
    }

    // ── Twitter Card ─────────────────────────────────────────────────
    setMeta('meta[name="twitter:title"]',       'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]',       'content', image);
    setMeta('meta[name="twitter:image:alt"]',   'content', isPost ? post!.title : 'SRZ Tourism destinations');

    // ── Structured data: BlogPosting (injected/removed per post) ─────
    const LD_ID = 'ld-json-post';
    let ldScript = document.getElementById(LD_ID) as HTMLScriptElement | null;

    if (isPost) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post!.title,
        description: post!.excerpt,
        image: post!.image_url,
        author: {
          '@type': 'Person',
          name: post!.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'SRZ Tourism',
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/favicon.svg`,
          },
        },
        datePublished: post!.created_at,
        dateModified:  post!.created_at,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        articleSection: post!.category,
        url,
      };

      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.id  = LD_ID;
        ldScript.type = 'application/ld+json';
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(schema);
    } else {
      // Remove post-specific schema when back on the home page
      ldScript?.remove();
    }
  }, [post]);
}

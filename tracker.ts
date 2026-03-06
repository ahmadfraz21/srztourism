const WEBHOOK_URL = 'https://n8n.srv1035178.hstgr.cloud/webhook/website_tracking';

async function collectData(trigger: string, extra?: Record<string, unknown>) {
  // IP + Geo — tries multiple providers with fallback
  let ipData: Record<string, unknown> = {};
  const ipProviders = [
    async () => {
      const r = await fetch('https://ipwho.is/');
      const d = await r.json();
      if (!d.success && d.success !== undefined) throw new Error('failed');
      return {
        ip: d.ip, city: d.city, region: d.region,
        country_name: d.country, country_code: d.country_code,
        postal: d.postal, latitude: d.latitude, longitude: d.longitude,
        org: d.connection?.org, timezone: d.timezone?.id,
      };
    },
    async () => {
      const r = await fetch('https://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,query');
      const d = await r.json();
      if (d.status === 'fail') throw new Error(d.message);
      return {
        ip: d.query, city: d.city, region: d.regionName,
        country_name: d.country, country_code: d.countryCode,
        postal: d.zip, latitude: d.lat, longitude: d.lon,
        org: d.isp, timezone: d.timezone,
      };
    },
    async () => {
      const r = await fetch('https://freeipapi.com/api/json');
      const d = await r.json();
      return {
        ip: d.ipAddress, city: d.cityName, region: d.regionName,
        country_name: d.countryName, country_code: d.countryCode,
        postal: d.zipCode, latitude: d.latitude, longitude: d.longitude,
        org: '', timezone: d.timeZone,
      };
    },
  ];
  for (const provider of ipProviders) {
    try { ipData = await provider(); break; } catch { /* try next */ }
  }

  const ua = navigator.userAgent;

  // Detect social app in-app browsers
  const socialApps: string[] = [];
  if (/Instagram/.test(ua)) socialApps.push('Instagram');
  if (/FBAN|FBAV/.test(ua)) socialApps.push('Facebook');
  if (/Twitter/.test(ua)) socialApps.push('Twitter/X');
  if (/WhatsApp/.test(ua)) socialApps.push('WhatsApp');
  if (/TikTok/.test(ua)) socialApps.push('TikTok');
  if (/Snapchat/.test(ua)) socialApps.push('Snapchat');
  if (/LinkedIn/.test(ua)) socialApps.push('LinkedIn');
  if (/Pinterest/.test(ua)) socialApps.push('Pinterest');
  if (/Telegram/.test(ua)) socialApps.push('Telegram');

  // Battery
  let battery: Record<string, unknown> = {};
  try {
    const b = await (navigator as Navigator & { getBattery?: () => Promise<{ level: number; charging: boolean }> }).getBattery?.();
    if (b) battery = { level: Math.round(b.level * 100) + '%', charging: b.charging };
  } catch { /* not supported */ }

  // Connection
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean } }).connection;

  // UTM params
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(k => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });

  // Installed fonts hint (limited but useful)
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let canvasFingerprint = '';
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('SRZ Tourism 🌍', 2, 2);
    canvasFingerprint = canvas.toDataURL().slice(-50);
  }

  const payload = {
    trigger,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    network: {
      ip: ipData.ip,
      city: ipData.city,
      region: ipData.region,
      country: ipData.country_name,
      country_code: ipData.country_code,
      postal: ipData.postal,
      latitude: ipData.latitude,
      longitude: ipData.longitude,
      isp: ipData.org,
      timezone: ipData.timezone,
    },
    device: {
      user_agent: ua,
      platform: getPlatform(ua),
      browser: getBrowser(ua),
      os: getOS(ua),
      is_mobile: /Mobi|Android|iPhone|iPad/.test(ua),
      is_iphone: /iPhone/.test(ua),
      is_ipad: /iPad/.test(ua),
      is_android: /Android/.test(ua),
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        available_width: window.screen.availWidth,
        available_height: window.screen.availHeight,
        color_depth: window.screen.colorDepth,
        pixel_ratio: window.devicePixelRatio,
        orientation: window.screen.orientation?.type ?? 'unknown',
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      touch_points: navigator.maxTouchPoints,
      cookies_enabled: navigator.cookieEnabled,
      java_enabled: false,
      do_not_track: navigator.doNotTrack,
      hardware_concurrency: navigator.hardwareConcurrency,
      device_memory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
      battery,
      canvas_fingerprint: canvasFingerprint,
    },
    connection: conn ? {
      effective_type: conn.effectiveType,
      downlink_mbps: conn.downlink,
      rtt_ms: conn.rtt,
      save_data: conn.saveData,
    } : {},
    source: {
      referrer: document.referrer || 'Direct',
      landing_page: window.location.href,
      page_title: document.title,
      detected_social_app: socialApps.length ? socialApps.join(', ') : 'None / Direct Browser',
      utm,
    },
    locale: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      languages: Array.from(navigator.languages || []).join(', '),
    },
    ...(extra ? { extra } : {}),
  };

  return payload;
}

function getSessionId(): string {
  let id = sessionStorage.getItem('srz_sid');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('srz_sid', id);
  }
  return id;
}

function getPlatform(ua: string): string {
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/iPad/.test(ua)) return 'iPad';
  if (/Android/.test(ua)) return 'Android';
  if (/Mac/.test(ua)) return 'Mac';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown';
}

function getBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\/|Opera/.test(ua)) return 'Opera';
  if (/Chrome/.test(ua)) return 'Chrome';
  if (/Firefox/.test(ua)) return 'Firefox';
  if (/Safari/.test(ua)) return 'Safari';
  return 'Other';
}

function getOS(ua: string): string {
  if (/iPhone OS ([\d_]+)/.test(ua)) return 'iOS ' + ua.match(/iPhone OS ([\d_]+)/)?.[1]?.replace(/_/g, '.');
  if (/iPad; CPU OS ([\d_]+)/.test(ua)) return 'iPadOS ' + ua.match(/iPad; CPU OS ([\d_]+)/)?.[1]?.replace(/_/g, '.');
  if (/Android ([\d.]+)/.test(ua)) return 'Android ' + ua.match(/Android ([\d.]+)/)?.[1];
  if (/Windows NT ([\d.]+)/.test(ua)) return 'Windows NT ' + ua.match(/Windows NT ([\d.]+)/)?.[1];
  if (/Mac OS X ([\d_]+)/.test(ua)) return 'macOS ' + ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.');
  return 'Unknown';
}

async function sendToWebhook(trigger: string, extra?: Record<string, unknown>, retries = 3) {
  try {
    const payload = await collectData(trigger, extra);
    const attempt = async () => {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
        keepalive: true,
      });
    };

    try {
      await attempt();
    } catch {
      // Retry logic
      for (let i = 1; i <= retries; i++) {
        await new Promise(r => setTimeout(r, 1000 * i));
        try { await attempt(); break; } catch { /* continue */ }
      }
    }
  } catch { /* silent fail — never break the UI */ }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Call once on app mount */
export function trackPageLoad() {
  sendToWebhook('page_load');
}

/** Wrap around any button/interaction */
export function trackEvent(eventName: string, details?: Record<string, unknown>) {
  sendToWebhook(eventName, details);
}

// Builders Day Club — CMS Content Loader
// Fetches homepage content from Supabase and applies it to the page.
// Falls back to hardcoded defaults if nothing is saved yet.
(async function () {
  const SUPABASE_URL  = 'https://sfmjxhctzpiuahitzhyt.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmbWp4aGN0enBpdWFoaXR6aHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NzY4MTIsImV4cCI6MjEwMDQ1MjgxMn0.4NAWH2BEmiJeCy-h9dPJQ8ESbxYLPPXQjO-quV9oRNw';

  try {
    const { createClient } = supabase;
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
    const { data } = await sb.from('settings').select('content').eq('id', 'homepage').single();
    const c = data?.content;
    if (!c) return;

    // ── Apply / CTA link (all "Apply to Join" buttons) ──
    if (c.apply_link) {
      document.querySelectorAll('a[href*="tally.so"]').forEach(a => a.href = c.apply_link);
    }

    // ── Hero ──
    if (c.hero_tag) {
      const el = document.querySelector('.hero-tag');
      if (el) el.textContent = c.hero_tag;
    }
    if (c.hero_em) {
      const el = document.querySelector('.hero-title em');
      if (el) el.textContent = c.hero_em;
    }
    if (c.hero_subtitle) {
      const el = document.querySelector('.hero-subtitle');
      if (el) el.textContent = c.hero_subtitle;
    }
    if (c.social_proof) {
      const el = document.querySelector('.social-proof-text');
      if (el) el.textContent = c.social_proof;
    }

    // ── Stats ──
    const stats = document.querySelectorAll('.stat-number');
    if (c.stat_1 && stats[0]) stats[0].textContent = c.stat_1;
    if (c.stat_2 && stats[1]) stats[1].textContent = c.stat_2;
    if (c.stat_3 && stats[2]) stats[2].textContent = c.stat_3;

    // ── Social links ──
    if (c.social_twitter)   { const el = document.querySelector('a[href*="twitter"]');   if (el) el.href = c.social_twitter; }
    if (c.social_instagram) { const el = document.querySelector('a[href*="instagram"]'); if (el) el.href = c.social_instagram; }
    if (c.social_linkedin)  { const el = document.querySelector('a[href*="linkedin"]');  if (el) el.href = c.social_linkedin; }
    if (c.social_email)     { const el = document.querySelector('a[href*="mailto"]');    if (el) el.href = 'mailto:' + c.social_email; }

    // ── Footer tagline ──
    if (c.footer_tagline) {
      const el = document.querySelector('.footer-tagline');
      if (el) el.textContent = c.footer_tagline;
    }

    // ── Inside the Club images ──
    const insideImgs = document.querySelectorAll('.inside-card img');
    if (c.inside_img_1 && insideImgs[0]) insideImgs[0].src = c.inside_img_1;
    if (c.inside_img_2 && insideImgs[1]) insideImgs[1].src = c.inside_img_2;
    if (c.inside_img_3 && insideImgs[2]) insideImgs[2].src = c.inside_img_3;
    if (c.inside_img_4 && insideImgs[3]) insideImgs[3].src = c.inside_img_4;

  } catch (e) {
    // Silent fail — page shows hardcoded defaults
  }
})();

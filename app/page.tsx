<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>zonuru — Earn from your audience, finally.</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #000;
    color: #fff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    min-height: 100vh;
  }

  a { text-decoration: none; color: inherit; }

  /* NAV */
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .logo {
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.04em;
  }

  .logo span { color: #C1FF1A; }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .nav-link {
    font-size: 14px;
    font-weight: 500;
    color: #71717a;
    transition: color 0.15s;
  }

  .nav-link:hover { color: #fff; }

  .nav-cta {
    background: #fff;
    color: #000;
    font-size: 13px;
    font-weight: 700;
    padding: 10px 20px;
    transition: background 0.15s;
    cursor: pointer;
  }

  .nav-cta:hover { background: #e5e5e5; }

  /* HERO */
  .hero {
    display: flex;
    align-items: center;
    gap: 64px;
    padding: 80px 24px 96px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .hero-left { flex: 1; }

  .hero-badge {
    display: inline-block;
    background: #0a0a0a;
    border: 1px solid #1a1a1a;
    padding: 6px 12px;
    font-size: 11px;
    font-weight: 700;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 32px;
  }

  .hero h1 {
    font-size: 68px;
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 24px;
  }

  .hero h1 span { color: #C1FF1A; }

  .hero-sub {
    font-size: 18px;
    color: #71717a;
    line-height: 1.6;
    max-width: 420px;
    margin-bottom: 40px;
  }

  .hero-btns {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
  }

  .btn-primary {
    background: #fff;
    color: #000;
    font-size: 13px;
    font-weight: 700;
    padding: 14px 32px;
    transition: background 0.15s;
    cursor: pointer;
  }

  .btn-primary:hover { background: #e5e5e5; }

  .btn-secondary {
    border: 1px solid #27272a;
    color: #71717a;
    font-size: 13px;
    font-weight: 700;
    padding: 14px 32px;
    transition: all 0.15s;
    cursor: pointer;
  }

  .btn-secondary:hover { border-color: #fff; color: #fff; }

  .hero-note {
    font-size: 12px;
    color: #3f3f46;
  }

  /* DASHBOARD MOCKUP */
  .hero-right { flex: 1; display: flex; justify-content: flex-end; }

  .dashboard-mock {
    background: #0a0a0a;
    border: 1px solid #1a1a1a;
    padding: 24px;
    width: 100%;
    max-width: 360px;
  }

  .mock-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .mock-label {
    font-size: 10px;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 4px;
  }

  .mock-balance {
    font-size: 38px;
    font-weight: 900;
    color: #C1FF1A;
    letter-spacing: -0.03em;
  }

  .mock-badge {
    background: #1a1a1a;
    color: #555;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
  }

  .mock-tx {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .mock-tx-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #111;
  }

  .mock-tx-label {
    font-size: 13px;
    color: #a1a1aa;
  }

  .mock-tx-amount {
    font-size: 13px;
    font-weight: 800;
    color: #C1FF1A;
  }

  .mock-btn {
    width: 100%;
    padding: 14px;
    background: #C1FF1A;
    color: #000;
    font-size: 13px;
    font-weight: 800;
    text-align: center;
    cursor: pointer;
  }

  /* STATS */
  .stats {
    border-top: 1px solid #111;
    border-bottom: 1px solid #111;
    padding: 48px 24px;
  }

  .stats-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    text-align: center;
  }

  .stat-number {
    font-size: 40px;
    font-weight: 900;
    color: #C1FF1A;
    letter-spacing: -0.03em;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 13px;
    color: #555;
  }

  /* FEATURES */
  .features {
    padding: 96px 24px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-eyebrow {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #555;
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 64px;
    max-width: 500px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .feature-card {
    background: #0a0a0a;
    border: 1px solid #1a1a1a;
    padding: 32px;
    transition: border-color 0.15s;
  }

  .feature-card:hover { border-color: #333; }

  .feature-icon { margin-bottom: 16px; }

  .feature-title {
    font-size: 17px;
    font-weight: 900;
    margin-bottom: 12px;
  }

  .feature-desc {
    font-size: 14px;
    color: #555;
    line-height: 1.6;
  }

  /* HOW IT WORKS */
  .how {
    border-top: 1px solid #111;
    padding: 96px 24px;
  }

  .how-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .how-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
    margin-top: 64px;
  }

  .how-step-num {
    font-size: 56px;
    font-weight: 900;
    color: #C1FF1A;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 16px;
  }

  .how-step-title {
    font-size: 17px;
    font-weight: 900;
    margin-bottom: 12px;
  }

  .how-step-desc {
    font-size: 14px;
    color: #555;
    line-height: 1.6;
  }

  /* QUOTE */
  .quote {
    border-top: 1px solid #111;
    padding: 96px 24px;
  }

  .quote-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .quote-card {
    background: #0a0a0a;
    border: 1px solid #1a1a1a;
    padding: 48px;
    max-width: 680px;
  }

  .quote-text {
    font-size: 24px;
    font-weight: 800;
    line-height: 1.4;
    margin-bottom: 32px;
  }

  .quote-text span { color: #C1FF1A; }

  .quote-author {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .quote-avatar {
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 900;
    color: #C1FF1A;
    flex-shrink: 0;
  }

  .quote-name {
    font-size: 15px;
    font-weight: 800;
    margin-bottom: 2px;
  }

  .quote-role {
    font-size: 13px;
    color: #555;
  }

  /* CTA */
  .cta {
    border-top: 1px solid #111;
    padding: 96px 24px;
    text-align: center;
  }

  .cta h2 {
    font-size: 56px;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 24px;
  }

  .cta h2 span { color: #C1FF1A; }

  .cta-sub {
    font-size: 18px;
    color: #555;
    margin-bottom: 40px;
  }

  .cta-note {
    font-size: 12px;
    color: #3f3f46;
    margin-top: 24px;
  }

  /* FOOTER */
  footer {
    border-top: 1px solid #111;
    padding: 32px 24px;
  }

  .footer-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-copy {
    font-size: 12px;
    color: #3f3f46;
  }

  .footer-links {
    display: flex;
    gap: 24px;
  }

  .footer-links a {
    font-size: 12px;
    color: #555;
    transition: color 0.15s;
  }

  .footer-links a:hover { color: #fff; }

  @media (max-width: 768px) {
    .hero { flex-direction: column; padding: 48px 24px; }
    .hero h1 { font-size: 44px; }
    .hero-right { width: 100%; justify-content: flex-start; }
    .dashboard-mock { max-width: 100%; }
    .stats-inner { grid-template-columns: 1fr; gap: 32px; }
    .features-grid { grid-template-columns: 1fr; }
    .how-grid { grid-template-columns: 1fr; gap: 40px; }
    .section-title { font-size: 36px; }
    .cta h2 { font-size: 36px; }
    .footer-inner { flex-direction: column; gap: 16px; text-align: center; }
  }
</style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <div class="logo"><span>z</span>onuru</div>
    <div class="nav-right">
      <a href="#" class="nav-link">Sign in</a>
      <a href="#" class="nav-cta">Start earning</a>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-left">
      <div class="hero-badge">Built for Africa. Starting in Ghana.</div>
      <h1>Get paid by<br>your audience.<br><span>Finally.</span></h1>
      <p class="hero-sub">Zonuru is the easiest way for African creators to sell digital products, accept subscriptions, and get paid straight to your Mobile Money or bank account.</p>
      <div class="hero-btns">
        <a href="#" class="btn-primary">Start earning free</a>
        <a href="#" class="btn-secondary">See how it works</a>
      </div>
      <p class="hero-note">Free to start. 5% only when you earn.</p>
    </div>

    <div class="hero-right">
      <div class="dashboard-mock">
        <div class="mock-header">
          <div>
            <div class="mock-label">Total balance</div>
            <div class="mock-balance">&#8373; 4,350</div>
          </div>
          <div class="mock-badge">This month</div>
        </div>
        <div class="mock-tx">
          <div class="mock-tx-row">
            <span class="mock-tx-label">Aaron subscribed</span>
            <span class="mock-tx-amount">+&#8373; 150</span>
          </div>
          <div class="mock-tx-row">
            <span class="mock-tx-label">Recipe eBook sold</span>
            <span class="mock-tx-amount">+&#8373; 80</span>
          </div>
          <div class="mock-tx-row">
            <span class="mock-tx-label">Gift received</span>
            <span class="mock-tx-amount">+&#8373; 50</span>
          </div>
          <div class="mock-tx-row">
            <span class="mock-tx-label">Session booked</span>
            <span class="mock-tx-amount">+&#8373; 300</span>
          </div>
        </div>
        <div class="mock-btn">Request payout</div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <div class="stats">
    <div class="stats-inner">
      <div>
        <div class="stat-number">5%</div>
        <div class="stat-label">Platform fee — only when you earn</div>
      </div>
      <div>
        <div class="stat-number">GHS 0</div>
        <div class="stat-label">To get started</div>
      </div>
      <div>
        <div class="stat-number">Direct</div>
        <div class="stat-label">Payouts to Mobile Money or bank</div>
      </div>
    </div>
  </div>

  <!-- FEATURES -->
  <section class="features">
    <p class="section-eyebrow">Everything you need</p>
    <h2 class="section-title">Four ways to earn.<br>One link to share.</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C1FF1A" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
        </div>
        <h3 class="feature-title">Digital Products</h3>
        <p class="feature-desc">Upload any file — PDF, audio, video, zip. Set a price. Share a link. Buyers pay and receive it automatically.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C1FF1A" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
        </div>
        <h3 class="feature-title">Subscriptions</h3>
        <p class="feature-desc">Set a monthly price. Share your access link. Subscribers pay every month and get access to your exclusive content.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C1FF1A" stroke-width="2"><path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
        </div>
        <h3 class="feature-title">Send Me a Gift</h3>
        <p class="feature-desc">Let your fans support you directly. Any amount, any time. Rename it to Give, Sow a Seed, Buy Me a Beat — whatever fits your world.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C1FF1A" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <h3 class="feature-title">Bookings</h3>
        <p class="feature-desc">Set your availability and price per session. Clients book and pay upfront. You just show up.</p>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="how">
    <div class="how-inner">
      <p class="section-eyebrow">Simple by design</p>
      <h2 class="section-title">Up and earning<br>in 3 minutes.</h2>
      <div class="how-grid">
        <div>
          <div class="how-step-num">01</div>
          <h3 class="how-step-title">Create your page</h3>
          <p class="how-step-desc">Sign up, add your bio and social links. Your page is live at zonuru.com/yourname.</p>
        </div>
        <div>
          <div class="how-step-num">02</div>
          <h3 class="how-step-title">Set up what you sell</h3>
          <p class="how-step-desc">Upload a product, set up a subscription, or activate Send Me a Gift. Takes 2 minutes.</p>
        </div>
        <div>
          <div class="how-step-num">03</div>
          <h3 class="how-step-title">Share and get paid</h3>
          <p class="how-step-desc">Share your link anywhere. Fans pay. Money goes straight to your Mobile Money or bank account.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta">
    <h2>Your audience is ready.<br><span>Are you?</span></h2>
    <p class="cta-sub">Join creators across Ghana earning from their audience on Zonuru.</p>
    <a href="#" class="btn-primary">Start earning free</a>
    <p class="cta-note">Free to start. 5% only when you earn. Paid to Mobile Money or bank.</p>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-inner">
      <div class="logo"><span>z</span>onuru</div>
      <p class="footer-copy">© 2026 Zonuru. Built for Africa.</p>
      <div class="footer-links">
        <a href="mailto:hello@zonuru.com">hello@zonuru.com</a>
        <a href="#">Get started</a>
        <a href="#">Sign in</a>
      </div>
    </div>
  </footer>

</body>
</html>

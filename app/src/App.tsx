import {
  FaApple,
  FaGooglePlay,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6'
import dottraMarkForBlue from './assets/dottra-symbol-dark.png'
import dottraMarkForWhite from './assets/dottra-symbol-light.png'

const googlePlayUrl =
  'https://play.google.com/store/apps/details?id=com.dottra.app'
const siteUrl = 'https://dottra.co'
const shareText = encodeURIComponent('Dottra is there when money runs thin.')
const shareUrl = encodeURIComponent(siteUrl)

const socialLinks = [
  {
    label: 'Share on X',
    icon: FaXTwitter,
    href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
  },
  {
    label: 'Share on WhatsApp',
    icon: FaWhatsapp,
    href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
  },
  {
    label: 'Share on LinkedIn',
    icon: FaLinkedinIn,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  },
]

const supportItems = [
  {
    title: 'Know what is available',
    body: 'Open the app and see your Dottra balance before you decide what to do.',
  },
  {
    title: 'Handle the tight moment',
    body: 'Use Dottra when transport, food, school, or family needs show up before money lands.',
  },
  {
    title: 'Stay clear on your account',
    body: 'View activity, dates, and account details in one place so nothing feels hidden.',
  },
]

function App() {
  return (
    <>
      <main className="site-shell">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <header className="site-header">
              <a className="brand" href="/" aria-label="Dottra home">
                <img src={dottraMarkForWhite} alt="" />
                <span>Dottra</span>
              </a>
            </header>

            <p className="eyebrow">Now on Google Play</p>
            <h1 id="hero-title">Dottra is there when money runs thin.</h1>
            <p className="lede">
              Download the Dottra app to keep support within reach before salary
              or sponsorship lands. Check what is available, use the app when
              you need help, and stay clear on what comes next.
            </p>

            <div className="cta-row">
              <div className="store-buttons">
                <a
                  className="store-button"
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download Dottra on Google Play"
                >
                  <FaGooglePlay aria-hidden="true" />
                  <span>
                    <small>Get it on</small>
                    <strong>Google Play</strong>
                  </span>
                </a>

                <span className="store-button store-button-disabled" aria-disabled="true">
                  <FaApple aria-hidden="true" />
                  <span>
                    <small>Coming soon on</small>
                    <strong>App Store</strong>
                  </span>
                </span>
              </div>
            </div>

            <div className="hero-share">
              <span>Share Dottra</span>
              <div className="social-links social-links-on-white" aria-label="Share Dottra">
                {socialLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="phone-frame" aria-label="Dottra app screenshot">
            <img
              src="/app-screenshot.png"
              alt="Dottra app home screen showing available balance, draw, pay, and recent transactions."
            />
          </div>
        </section>

        <section className="support-section" aria-labelledby="support-title">
          <div className="support-inner">
            <div className="support-copy">
              <p className="section-label">Built for the gap</p>
              <h2 id="support-title">
                When the month gets tight, open Dottra first.
              </h2>
              <p>
                Dottra is for salaried workers and sponsored students in Zambia
                who have money coming, but still need a steady place to turn
                before it arrives.
              </p>
            </div>

            <div className="support-list">
              {supportItems.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-block">
            <a className="footer-brand" href="/" aria-label="Dottra home">
              <img src={dottraMarkForBlue} alt="" />
              <span>Dottra</span>
            </a>
            <p>Support within reach before salary or sponsorship lands.</p>
          </div>

          <div className="footer-column">
            <h2>Download</h2>
            <div className="footer-store-links">
              <a href={googlePlayUrl} target="_blank" rel="noreferrer">
                Google Play
              </a>
              <span>App Store coming soon</span>
            </div>
            <span>Not yet available on the Apple App Store.</span>
          </div>

          <div className="footer-column">
            <h2>Share</h2>
            <div className="social-links" aria-label="Share Dottra">
              {socialLinks.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="footer-column">
            <h2>Legal</h2>
            <a href="/terms/">Terms</a>
            <a href="/privacy/">Privacy</a>
            <a href="/cookies/">Cookies</a>
          </div>

          <div className="footer-column">
            <h2>Company</h2>
            <a href="/about/">About</a>
            <a href="/support/">Support</a>
            <a href="/contact/">Contact</a>
            <span>Dottra Lending Services Limited</span>
            <span>Zambia</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Dottra Lending Services Limited.</span>
        </div>
      </footer>
    </>
  )
}

export default App

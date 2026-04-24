import { NAV_LINKS } from '../../data/mockData.js';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  function handleNavClick(href) {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="container">

        {/* Top row */}
        <div className="footer__top">
          {/* Brand col */}
          <div className="footer__brand">
            <img
              src="/images/Logo.png"
              alt="BiteLab"
              className="footer__logo-img"
            />
            <p className="footer__tagline">
              Nutrition-forward snacks crafted for the next generation of
              mindful eaters. Clean ingredients. Real flavour. No compromises.
            </p>
          </div>

          {/* Nav col */}
          <div className="footer__col">
            <p className="footer__col-title">Navigate</p>
            <ul className="footer__col-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info col */}
          <div className="footer__col">
            <p className="footer__col-title">Product</p>
            <ul className="footer__col-list">
              <li><a href="#product" onClick={(e) => { e.preventDefault(); handleNavClick('#product'); }}>Protein Bites</a></li>
              <li><a href="#product" onClick={(e) => e.preventDefault()}>Ingredients</a></li>
              <li><a href="#prodct" onClick={(e) => e.preventDefault()}>Nutrition Info</a></li>
              <li><a href="#product" onClick={(e) => e.preventDefault()}>Where to Buy</a></li>
            </ul>
          </div>

          {/* Contact col */}
          <div className="footer__col">
            <p className="footer__col-title">Get in Touch</p>
            <ul className="footer__col-list footer__col-list--contact">
              <li>
                <span className="footer__contact-label">Email</span>
                <a href="mailto:hello@bitelab.ph" onClick={(e) => e.preventDefault()}>
                  hello@bitelab.ph
                </a>
              </li>
              <li>
                <span className="footer__contact-label">Instagram</span>
                <a href="#" onClick={(e) => e.preventDefault()}>@bitelab.ph</a>
              </li>
              <li>
                <span className="footer__contact-label">Location</span>
                <span>Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" aria-hidden="true" />

        {/* Bottom row */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} BiteLab. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

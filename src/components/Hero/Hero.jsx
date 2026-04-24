import './Hero.css';

export default function Hero({ onLogin, onExplore }) {
  return (
    <section className="hero" id="home">
      {/* Full-bleed background image */}
      <div className="hero__bg" aria-hidden="true" />

      {/* Gradient overlay — keeps left copy readable, reveals image on right */}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__inner">
        {/* Copy — sits on the left over the gradient */}
        <div className="hero__copy">
          <div className="hero__eyebrow" data-reveal>
            <span className="hero__badge">Student-Led Venture</span>
            <span className="hero__badge hero__badge--gold">Now Available</span>
          </div>

          <h1 className="hero__headline" data-reveal data-delay="1">
            Snack smarter,<br />
            <em>live better.</em>
          </h1>

          <p className="hero__subline" data-reveal data-delay="2">
            BiteLab creates nutritious, student-friendly snacks that combine smart nutrition,
            creative food innovation, and sustainable purpose.
          </p>

          <div className="hero__cta-group" data-reveal data-delay="3">
            <button className="hero__btn hero__btn--primary" onClick={onExplore}>
              Our Product
            </button>
            <button className="hero__btn hero__btn--secondary" onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More
            </button>
          </div>

          <div className="hero__social-proof" data-reveal data-delay="4">
            <div className="hero__stars" aria-label="5 out of 5 stars">
              {'★'.repeat(5)}
            </div>
            <span className="hero__proof-text">
              Real Food. Real Impact. A Greener Tomorrow.
            </span>
          </div>
        </div>

        {/* Right spacer — the background image fills this space visually */}
        <div className="hero__visual-spacer" aria-hidden="true" />
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-track">
          <div className="hero__scroll-thumb" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

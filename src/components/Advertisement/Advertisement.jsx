import './Advertisement.css';

export default function Advertisement() {
  return (
    <section className="advert" id="campaign">
      <div className="advert__inner">

        {/* Left — copy */}
        <div className="advert__copy" data-reveal="left">
          <span className="section-label advert__label">Campaign</span>
          <h2 className="advert__headline">
            Fuel smarter<br />
            <em>with every bite.</em>
          </h2>
          <p className="advert__subline">
            Real food. Real impact. Banana Oat Bar is made with wholesome ingredients and a
            purpose — to create a healthier you and a healthier planet.
          </p>

          <ul className="advert__perks">
            {[
              { label: 'High in Fiber' },
              { label: 'Natural Energy' },
              { label: 'No Preservatives' },
              { label: 'With Seed Paper' },
            ].map((p) => (
              <li key={p.label} className="advert__perk">
                <span className="advert__perk-label">{p.label}</span>
              </li>
            ))}
          </ul>

          <div className="advert__footer-strip">
            <span>Better Food.</span>
            <span className="advert__dot" aria-hidden="true">·</span>
            <span>Sustainable Choices.</span>
            <span className="advert__dot" aria-hidden="true">·</span>
            <span>Student-Led. Purpose-Driven.</span>
          </div>
        </div>

        {/* Right — advertisement image */}
        <div className="advert__image-col" data-reveal="right" data-delay="1">
          <div className="advert__image-wrap">
            <img
              src="/images/Advertisement_Ken.png"
              alt="Fuel Smarter with BiteLab Banana Oat Bar — Real Food. Real Impact."
              className="advert__image"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
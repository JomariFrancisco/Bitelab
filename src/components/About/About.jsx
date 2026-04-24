import { ABOUT_HIGHLIGHTS, ABOUT_CONTENT } from '../../data/mockData.js';
import './About.css';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">

        {/* Section header */}
        <div className="about__header" data-reveal>
          <div className="about__header-copy">
            <span className="section-label">About BiteLab</span>
            <h2 className="about__headline">
              {ABOUT_CONTENT.tagline}
            </h2>
            <p className="about__intro">{ABOUT_CONTENT.intro}</p>
          </div>

          <div className="about__header-logo" aria-hidden="true">
            <img
              src="/images/Logo.png"
              alt="BiteLab logo"
              className="about__header-logo-img"
            />
          </div>
        </div>

        {/* Vision + Mission blocks */}
        <div className="about__vm-grid">
          <div className="about__vm-block about__vm-block--dark" data-reveal="left">
            <div className="about__vm-tag">Our Vision</div>
            <p className="about__vm-text">{ABOUT_CONTENT.vision}</p>
          </div>
          <div className="about__vm-block about__vm-block--light" data-reveal="right" data-delay="1">
            <div className="about__vm-tag about__vm-tag--green">Our Mission</div>
            <p className="about__vm-text about__vm-text--dark">{ABOUT_CONTENT.mission}</p>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="about__grid">
          {ABOUT_HIGHLIGHTS.map((item, i) => (
            <div className="about__card" key={item.id} data-reveal data-delay={String(i + 1)}>
              
              <h3 className="about__card-title">{item.title}</h3>
              <p className="about__card-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="about__stats" data-reveal data-delay="2">
          {[
            { value: '4', unit: '', label: 'Natural main ingredients' },
            { value: '0', unit: '', label: 'Artificial additives' },
            { value: '3', unit: '', label: 'Seed paper variants' },
            { value: '5', unit: '', label: 'Team members, one mission' },
          ].map((stat) => (
            <div className="about__stat" key={stat.label}>
              <div className="about__stat-value">
                {stat.value}<span className="about__stat-unit">{stat.unit}</span>
              </div>
              <div className="about__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
import { useMemo, useState } from 'react';
import { TEAM } from '../../data/mockData.js';
import './Team.css';

const TEAM_IMAGE_CANDIDATES = {
  joshua: ['/images/Joshua.png', '/images/joshua.png'],
  sherine: ['/images/Sherine.png', '/images/sherine.png'],
  kathleen: ['/images/Kathleen.png', '/images/kathleen.png'],
  reth: ['/images/Reth.png', '/images/reth.png'],

  james: ['/images/James.png', '/images/james.png'],
  'james-kenneth-alcala': ['/images/James.png', '/images/james.png'],
};

function normalize(value = '') {
  return String(value).trim().toLowerCase();
}

function getMemberKeys(member) {
  const idKey = normalize(member.id);
  const firstNameKey = normalize(member.name).split(' ')[0];
  const fullNameKey = normalize(member.name).replace(/\s+/g, '-');

  return [idKey, firstNameKey, fullNameKey].filter(Boolean);
}

function getImageCandidates(member) {
  const keys = getMemberKeys(member);
  const mapped = keys.flatMap((key) => TEAM_IMAGE_CANDIDATES[key] || []);
  const fromData = member.image ? [member.image] : [];

  return [...mapped, ...fromData].filter(
    (src, index, arr) => src && arr.indexOf(src) === index
  );
}

function TeamPhoto({ member }) {
  const candidates = useMemo(() => getImageCandidates(member), [member]);
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const currentSrc = candidates[srcIndex];
  const firstName = normalize(member.name).split(' ')[0];

  const handleError = () => {
    if (srcIndex < candidates.length - 1) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setFailed(true);
    }
  };

  if (!currentSrc || failed) {
    return (
      <div className="team-card__photo-placeholder" aria-hidden="true">
        <span className="team-card__initials">{member.initials}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={member.name}
      className={`team-card__photo team-card__photo--${firstName}`}
      loading="lazy"
      onError={handleError}
    />
  );
}

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="container team__container">
        <div className="team__header" data-reveal>
          <span className="section-label">Our Team</span>

          <h2 className="team__headline">
            The people behind <em>every bite.</em>
          </h2>

          <p className="team__subline">
            A small, driven group of students who believe that better food starts with
            better thinking. We combine food science, design, and pure stubbornness to build
            something worth sharing.
          </p>
        </div>

        <div className="team__grid">
          {TEAM.map((member, i) => (
            <article
              className="team-card"
              key={member.id}
              data-reveal="scale"
              data-delay={String((i % 5) + 1)}
            >
              <div className="team-card__photo-wrap">
                <TeamPhoto member={member} />
                <div className="team-card__photo-overlay" aria-hidden="true" />
              </div>

              <div className="team-card__body">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__desc">{member.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="team__note">
          <div className="team__note-line" aria-hidden="true" />
          <p className="team__note-text">
            Built with passion at the intersection of food science and entrepreneurship.
          </p>
          <div className="team__note-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
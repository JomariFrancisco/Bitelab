import { useState, useEffect } from 'react';
import { loadFeedback, appendFeedback } from '../../utils/storage.js';
import './Feedback.css';

const MODERN_FILIPINO_NAMES = [
  'Mika Santos',
  'Enzo Reyes',
  'Althea Cruz',
  'Joaquin Mendoza',
  'Sophia Dela Cruz',
  'Andrei Bautista',
  'Lia Villanueva',
  'Miguel Ramos',
  'Ysabel Garcia',
  'Gabriel Navarro',
];

const USER_FEEDBACK_NAMES_KEY = 'bitelab-user-feedback-names';

function makeFeedbackKey(entry) {
  return (
    entry?.id ||
    `${entry?.date || 'no-date'}-${entry?.username || 'no-user'}-${entry?.comment || 'no-comment'}`
  );
}

function loadUserFeedbackNames() {
  try {
    const stored = localStorage.getItem(USER_FEEDBACK_NAMES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveUserFeedbackName(entry, displayName) {
  if (!entry || !displayName) return {};

  const current = loadUserFeedbackNames();
  const key = makeFeedbackKey(entry);

  const updated = {
    ...current,
    [key]: displayName,
  };

  localStorage.setItem(USER_FEEDBACK_NAMES_KEY, JSON.stringify(updated));
  return updated;
}

function StarRating({ value, onChange, readOnly = false }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div
      className={`star-rating ${readOnly ? 'star-rating--readonly' : ''}`}
      role={readOnly ? 'img' : 'group'}
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          className={`star-rating__star ${n <= display ? 'star-rating__star--filled' : ''}`}
          onClick={() => !readOnly && onChange && onChange(n)}
          onMouseEnter={() => !readOnly && setHovered(n)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          aria-label={`${n} star${n !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function FeedbackCard({ entry, index, userFeedbackNames }) {
  const feedbackKey = makeFeedbackKey(entry);
  const savedUserName = userFeedbackNames[feedbackKey];

  const displayName = savedUserName
    ? savedUserName
    : MODERN_FILIPINO_NAMES[index % MODERN_FILIPINO_NAMES.length];

  return (
    <article className="feedback-card">
      <div className="feedback-card__header">
        <div className="feedback-card__avatar" aria-hidden="true">
          {displayName.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="feedback-card__name">{displayName}</p>
          <time className="feedback-card__date" dateTime={entry.date}>
            {new Date(entry.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>

      <StarRating value={entry.rating} readOnly />
      <p className="feedback-card__comment">{entry.comment}</p>
    </article>
  );
}

export default function Feedback({ user, onLogin }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [userFeedbackNames, setUserFeedbackNames] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFeedbackList(loadFeedback());
    setUserFeedbackNames(loadUserFeedbackNames());
  }, []);

  useEffect(() => {
    if (!user?.displayName || feedbackList.length === 0) return;

    let updatedNames = loadUserFeedbackNames();
    let hasChanges = false;

    feedbackList.forEach((entry) => {
      const entryName = entry.username || entry.displayName || '';
      const isSameUser =
        entryName.trim().toLowerCase() === user.displayName.trim().toLowerCase();

      if (isSameUser) {
        const key = makeFeedbackKey(entry);

        if (!updatedNames[key]) {
          updatedNames = {
            ...updatedNames,
            [key]: user.displayName,
          };

          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      localStorage.setItem(USER_FEEDBACK_NAMES_KEY, JSON.stringify(updatedNames));
      setUserFeedbackNames(updatedNames);
    }
  }, [user?.displayName, feedbackList]);

  function validate() {
    const e = {};

    if (rating === 0) e.rating = 'Please select a rating.';

    if (comment.trim().length < 10) {
      e.comment = 'Comment must be at least 10 characters.';
    }

    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const submittedName = user.displayName.trim();
    const submittedComment = comment.trim();

    const updated = appendFeedback({
      username: submittedName,
      displayName: submittedName,
      isUserPost: true,
      rating,
      comment: submittedComment,
    });

    const newEntry =
      updated.find((entry) => {
        const entryName = entry.username || entry.displayName || '';

        return (
          entryName.trim().toLowerCase() === submittedName.toLowerCase() &&
          entry.comment === submittedComment &&
          Number(entry.rating) === Number(rating)
        );
      }) || updated[0];

    if (newEntry) {
      const updatedNameMap = saveUserFeedbackName(newEntry, submittedName);
      setUserFeedbackNames(updatedNameMap);
    }

    setFeedbackList(updated);
    setRating(0);
    setComment('');
    setErrors({});
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 4000);
  }

  const avgRating = feedbackList.length
    ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1)
    : '—';

  return (
    <section className="feedback" id="feedback">
      <div className="container">

        {/* Header */}
        <div className="feedback__header" data-reveal>
          <span className="section-label">Feedback</span>
          <h2 className="feedback__headline">
            What people are <em>saying.</em>
          </h2>
          <p className="feedback__subline">
            Real experiences from our early community — unfiltered and genuine.
          </p>
        </div>

        {/* Summary strip */}
        <div className="feedback__summary" data-reveal data-delay="1">
          <div className="feedback__summary-rating">
            <span className="feedback__summary-avg">{avgRating}</span>

            <div>
              <StarRating value={Math.round(parseFloat(avgRating)) || 0} readOnly />
              <p className="feedback__summary-count">
                Based on {feedbackList.length} review{feedbackList.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="feedback__summary-divider" aria-hidden="true" />

          <p className="feedback__summary-note">
            Every review is submitted by a real user of this prototype.
            Feedback is stored locally on your device.
          </p>
        </div>

        <div className="feedback__body">
          {/* Cards column */}
          <div className="feedback__list">
            {feedbackList.map((entry, index) => (
              <FeedbackCard
                key={makeFeedbackKey(entry)}
                entry={entry}
                index={index}
                userFeedbackNames={userFeedbackNames}
              />
            ))}
          </div>

          {/* Form column */}
          <div className="feedback__form-col" data-reveal="right" data-delay="2">
            <div className="feedback__form-card">
              <h3 className="feedback__form-title">Share your experience</h3>

              {!user ? (
                <div className="feedback__locked">
                  <h4 className="feedback__locked-title">
                    Log in to leave your feedback
                  </h4>

                  <p className="feedback__locked-text">
                    Reviews are available to signed-in users only. Create an account or
                    log in to share your thoughts about BiteLab and help improve the experience.
                  </p>

                  <div className="feedback__locked-features">
                    <span className="feedback__locked-chip">Verified reviews</span>
                    <span className="feedback__locked-chip">Quick access</span>
                    <span className="feedback__locked-chip">Takes 30 seconds</span>
                  </div>

                  <button className="feedback__login-btn" onClick={onLogin}>
                    Log in to continue
                  </button>

                  <p className="feedback__locked-sub">
                    Don&apos;t have an account yet? Create one to post your review.
                  </p>
                </div>
              ) : (
                <form className="feedback__form" onSubmit={handleSubmit} noValidate>
                  <div className="feedback__form-user">
                    <div className="feedback__form-avatar">
                      {user.displayName.charAt(0)}
                    </div>

                    <div>
                      <p className="feedback__form-username">{user.displayName}</p>
                      <p className="feedback__form-usernote">Posting as you</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="feedback__field">
                    <label className="feedback__label">Your Rating</label>
                    <StarRating value={rating} onChange={setRating} />

                    {errors.rating && (
                      <span className="feedback__error" role="alert">
                        {errors.rating}
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="feedback__field">
                    <label className="feedback__label" htmlFor="feedback-comment">
                      Your Comment
                    </label>

                    <textarea
                      id="feedback-comment"
                      className={`feedback__textarea ${errors.comment ? 'feedback__textarea--error' : ''}`}
                      rows={5}
                      placeholder="Tell us what you think about BiteLab Protein Bites..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      maxLength={600}
                    />

                    <div className="feedback__char-row">
                      {errors.comment && (
                        <span className="feedback__error" role="alert">
                          {errors.comment}
                        </span>
                      )}

                      <span className="feedback__char-count">
                        {comment.length}/600
                      </span>
                    </div>
                  </div>

                  {submitted && (
                    <div className="feedback__success" role="status">
                      ✓ Thank you! Your feedback has been posted.
                    </div>
                  )}

                  <button className="feedback__submit-btn" type="submit">
                    Submit Feedback
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
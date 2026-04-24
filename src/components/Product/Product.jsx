import { useEffect, useState } from 'react';
import { PRODUCT } from '../../data/mockData.js';
import './Product.css';

export default function Product() {
  const [activeVariant, setActiveVariant] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'packaging', label: 'Packaging' },
    { id: 'benefits', label: 'Benefits' },
  ];

  const productImages = [
    {
      src: '/images/PRODUCT.png',
      alt: 'Banana Oat Bar product pack',
    },
    {
      src: '/images/PRODUCT2.png',
      alt: 'Banana Oat Bar sunflower seed pack',
    },
    {
      src: '/images/PRODUCT3.png',
      alt: 'Banana Oat Bar mind seed pack',
    },
  ];

  const variant = PRODUCT.variants[activeVariant] || PRODUCT.variants[0];
  const currentImage = productImages[activeVariant] || productImages[0];
  const autoSlideDelay = 5000;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveVariant((prev) => (prev + 1) % productImages.length);
    }, autoSlideDelay);

    return () => window.clearInterval(intervalId);
  }, [productImages.length]);

  const normalizeProductCopy = (value = '') =>
    String(value)
      .replace(/\bBanaBar\b/gi, 'Banana Oat Bar')
      .replace(/\bBanabar\b/gi, 'Banana Oat Bar');

  const normalizedTagline = normalizeProductCopy(PRODUCT.tagline);
  const normalizedOverview = normalizeProductCopy(PRODUCT.overview);
  const normalizedDescription = normalizeProductCopy(PRODUCT.description);
  const normalizedWhyDifferent = PRODUCT.whyDifferent.map((item) => normalizeProductCopy(item));
  const normalizedProcess = PRODUCT.process.map((step) => normalizeProductCopy(step));
  const normalizedBenefits = PRODUCT.benefits.map((item) => normalizeProductCopy(item));
  const normalizedPackagingDescription = normalizeProductCopy(PRODUCT.packaging.description);
  const normalizedPackagingSteps = PRODUCT.packaging.steps.map((step) =>
    normalizeProductCopy(step)
  );

  const getIngredientHoverImage = (ingredientName = '', ingredientNote = '') => {
    const name = ingredientName.toLowerCase();
    const note = ingredientNote.toLowerCase();
    const text = `${name} ${note}`;

    if (text.includes('hibiscus')) {
      return '/images/HisbiscusPetal.png';
    }

    if (text.includes('banana')) {
      return '/images/Banana.png';
    }

    if (text.includes('oat') || text.includes('oats')) {
      return '/images/Oat.png';
    }

    if (text.includes('nut') || text.includes('nuts')) {
      return '/images/Nuts.png';
    }

    return null;
  };

  const handleVariantClick = (index) => {
    setActiveVariant(index);
  };

  return (
    <section className="product" id="product">
      <div className="container">
        <div className="product__header" data-reveal>
          <span className="section-label">Featured Product</span>
          <h2 className="product__headline">
            One product. <em>Crafted with purpose.</em>
          </h2>
        </div>

        <div className="product__layout">
          <div className="product__image-col" data-reveal="left" data-delay="1">
            <div className="product__image-wrap">
              <img
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                className="product__image product__image--animated"
              />

              <div className="product__image-badge">
                <span
                  className={`product__avail product__avail--${
                    PRODUCT.availability === 'In Stock' ? 'green' : 'red'
                  }`}
                >
                  {PRODUCT.availability}
                </span>
              </div>
            </div>

            <div className="product__variants">
              <p className="product__variants-label">Choose a seed paper variant</p>
              <div className="product__variant-list">
                {PRODUCT.variants.map((v, i) => (
                  <button
                    key={v.name}
                    type="button"
                    className={`product__variant-btn ${
                      activeVariant === i ? 'product__variant-btn--active' : ''
                    }`}
                    onClick={() => handleVariantClick(i)}
                  >
                    <span className="product__variant-name">{normalizeProductCopy(v.name)}</span>
                    <span className="product__variant-size">{v.size}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product__info-col" data-reveal="right" data-delay="2">
            <div className="product__title-row">
              <div>
                <h3 className="product__name">Banana Oat Bar</h3>
                <p className="product__tagline">{normalizedTagline}</p>
              </div>
              <div className="product__price-block">
                <span className="product__price">{variant.price}</span>
                <span className="product__price-note">{PRODUCT.priceNote}</span>
              </div>
            </div>

            <div className="product__tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`product__tab ${activeTab === tab.id ? 'product__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="product__tab-content">
              {activeTab === 'overview' && (
                <div className="product__overview">
                  <p className="product__overview-text">{normalizedOverview}</p>
                  <p className="product__overview-desc">{normalizedDescription}</p>

                  <div className="product__overview-panels">
                    <div className="product__benefits">
                      <p className="product__benefits-title">Why it&apos;s different</p>
                      <ul className="product__benefits-list">
                        {normalizedWhyDifferent.map((b) => (
                          <li key={b}>
                            <span className="product__check">✓</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="product__process">
                      <p className="product__benefits-title">How we craft it</p>
                      <ol className="product__process-list">
                        {normalizedProcess.map((step, i) => (
                          <li key={step}>
                            <span className="product__process-num">{i + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="product__ingredients">
                  <p className="product__tab-intro">
                    Every ingredient in Banana Oat Bar is real, recognisable, and chosen with
                    nutritional purpose. No mystery fillers, no artificial anything.
                  </p>

                  <div className="product__ingredient-cards">
                    {PRODUCT.ingredients.map((ing) => {
                      const hoverImage = getIngredientHoverImage(ing.item, ing.note);

                      return (
                        <div
                          className={`product__ingredient-card ${
                            hoverImage ? 'product__ingredient-card--has-hover' : ''
                          }`}
                          key={ing.item}
                        >
                          {hoverImage && (
                            <div className="product__ingredient-hoverbox" aria-hidden="true">
                              <img
                                src={hoverImage}
                                alt={ing.item}
                                className="product__ingredient-hoverimg"
                              />
                            </div>
                          )}

                          <span className="product__ingredient-name">{ing.item}</span>
                          <span className="product__ingredient-note">{ing.note}</span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="product__allergen">
                    Contains: Oats (gluten), Nuts, Banana. May contain traces of other tree nuts.
                    Please check with us if you have specific dietary concerns.
                  </p>
                </div>
              )}

              {activeTab === 'packaging' && (
                <div className="product__packaging">
                  <p className="product__tab-intro">{normalizedPackagingDescription}</p>

                  <p className="product__benefits-title">How to plant it</p>
                  <ol className="product__process-list">
                    {normalizedPackagingSteps.map((step, i) => (
                      <li key={step}>
                        <span className="product__process-num">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="product__seed-options">
                    <p className="product__benefits-title">Available seed options</p>
                    <div className="product__seed-chips">
                      {PRODUCT.packaging.seedOptions.map((seed) => (
                        <span className="product__seed-chip" key={seed}>
                          🌱 {seed}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div className="product__benefits-tab">
                  <p className="product__tab-intro">
                    Banana Oat Bar believes snacks can do more than satisfy hunger — they can
                    support wellness, inspire smarter choices, and promote sustainability in
                    everyday life.
                  </p>
                  <ul className="product__benefits-list product__benefits-list--large">
                    {normalizedBenefits.map((b) => (
                      <li key={b}>
                        <span className="product__check">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="product__mission-note">
                    <p>
                      <strong>Why BiteLab created this —</strong> BiteLab believes snacks can do
                      more than satisfy hunger. They can support wellness, inspire smarter choices,
                      and promote sustainability in everyday life.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="product__cta">
              <button type="button" className="product__order-btn">
                Order — {variant.price}
                <span className="product__order-sub">{normalizeProductCopy(variant.name)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
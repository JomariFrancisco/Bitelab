// Mock accounts seeded for demo purposes
export const SEED_ACCOUNTS = [
  {
    id: 'user_001',
    username: 'alex_rivera',
    email: 'alex@example.com',
    password: 'demo1234',
    displayName: 'Alex Rivera',
  },
  {
    id: 'user_002',
    username: 'jamie_chen',
    email: 'jamie@example.com',
    password: 'demo1234',
    displayName: 'Jamie Chen',
  },
];

export const PRODUCT = {
  id: 'bl-pro-001',
  name: 'Banana Oat Bar',
  tagline: 'Nutritious, antioxidant-rich, and sustainably packed for smarter snacking.',
  price: '₱18',
  priceNote: 'per bar',
  availability: 'In Stock',
  image: null, // replace with real image path
  overview:
    "BiteLab's Banana Oat Bar combines banana, oats, and nuts with a hibiscus-based filling derived from dried hibiscus petals. It is designed to offer a more nutritious snack option while promoting sustainability through plantable seed paper packaging.",
  description:
    'Banana Oat Bar is more than a snack — it is a statement. Every bar is crafted with practical, natural ingredients and finished in eco-friendly seed paper packaging that you can plant after eating. Snack with purpose, grow with intention.',
  ingredients: [
    { item: 'Banana', note: 'natural sweetness and energy' },
    { item: 'Oats', note: 'fiber and texture' },
    { item: 'Nuts', note: 'crunch and nourishment' },
    { item: 'Hibiscus Filling', note: 'antioxidant-rich center derived from dried hibiscus petals' },
  ],
  whyDifferent: [
    'Antioxidant-rich hibiscus filling',
    'Made from practical, natural ingredients',
    'Eco-friendly plantable seed paper packaging',
    'Student-led innovation with a social mission',
  ],
  process: [
    'Ingredients are carefully prepared',
    'Banana oat base is mixed to consistency',
    'Hibiscus filling is added to the center',
    'Bars are formed and finished by hand',
    'Product is packed with plantable seed paper',
  ],
  packaging: {
    description:
      'Our packaging is made from plantable seed paper — a sustainable material embedded with real seeds. Instead of throwing it away, you plant it. Every wrapper becomes a small step toward greener living.',
    steps: [
      'Soak the seed paper in water for a few hours.',
      'Plant it about 1/4 inch under the soil.',
      'Water daily and place it under sunlight.',
      'Wait for it to germinate and grow.',
    ],
    seedOptions: ['Basil', 'Sunflower', 'Mint'],
  },
  benefits: [
    'Better snack choice for everyday consumers',
    'Supports responsible consumption',
    'Encourages sustainability through plantable packaging',
    'Designed for students and on-the-go lifestyles',
  ],
  variants: [
    { name: 'Basil Seed Pack', size: 'Single Bar', price: '₱18' },
    { name: 'Sunflower Seed Pack', size: 'Single Bar', price: '₱18' },
    { name: 'Mint Seed Pack', size: 'Single Bar', price: '₱18' },
  ],
};

export const INITIAL_FEEDBACK = [
  {
    id: 'fb_001',
    username: 'Sofia Mendez',
    rating: 5,
    comment: 'Soft, chewy, and naturally satisfying. I love that it uses real ingredients and the hibiscus filling gives it a unique twist.',
    date: '2026-03-14',
  },
  {
    id: 'fb_002',
    username: 'Marcus Tan',
    rating: 4,
    comment: 'A creative snack idea with a sustainability twist. The seed paper packaging is such a thoughtful concept — I actually planted mine.',
    date: '2026-03-21',
  },
  {
    id: 'fb_003',
    username: 'Jamie Chen',
    rating: 5,
    comment: "Student-friendly and purpose-driven. You can tell this was made with real intention. It doesn't just taste good — it means something.",
    date: '2026-04-02',
  },
];

export const TEAM = [
  {
    id: 'tm_001',
    name: 'Sherine Jannatul',
    role: 'Venture Head',
    description:
      'Leads the venture, oversees planning and decision-making, coordinates team members, and ensures that BiteLab\'s goals, mission, and operations stay on track.',
    image: null,
    initials: 'SJ',
  },
  {
    id: 'tm_002',
    name: 'Reth Monnerey Torres',
    role: 'Head of Product Innovation',
    description:
      'Responsible for recipe formulation, product testing, quality improvement, and maintaining the consistency of the BiteLab product.',
    image: null,
    initials: 'RT',
  },
  {
    id: 'tm_003',
    name: 'Kathleen Joy Omatang',
    role: 'Head of Marketing & Creative Media',
    description:
      'Manages promotions, branding, and the creation of visually appealing marketing materials that communicate the BiteLab story.',
    image: null,
    initials: 'KO',
  },
  {
    id: 'tm_004',
    name: 'Joshua Gumapac',
    role: 'Head of Finance & Operations',
    description:
      'Handles budgeting, pricing, inventory, and daily business operations to keep BiteLab running efficiently and sustainably.',
    image: null,
    initials: 'JG',
  },
  {
    id: 'tm_005',
    name: 'James Kenneth Alcala',
    role: 'Head of Sustainability & Packaging',
    description:
      "Focuses on eco-friendly packaging solutions and sustainability practices that support BiteLab's mission of responsible consumption.",
    image: null,
    initials: 'JA',
  },
];

export const ABOUT_HIGHLIGHTS = [
  {
    id: 'ah_01',
    icon: '◈',
    title: 'Natural Ingredients',
    description:
      'Every Banana Oat Bar is crafted from banana, oats, nuts, and a hibiscus-based filling — real ingredients with real nutritional purpose.',
  },
  {
    id: 'ah_02',
    icon: '◉',
    title: 'Eco-Friendly Packaging',
    description:
      'Our seed paper packaging is plantable after use — reducing waste and turning every snack into a small act of sustainability.',
  },
  {
    id: 'ah_03',
    icon: '◎',
    title: 'Student-Led Innovation',
    description:
      'BiteLab was built from the ground up by students who believe that snacks can be purposeful, nutritious, and socially meaningful.',
  },
  {
    id: 'ah_04',
    icon: '◍',
    title: 'Responsible Consumption',
    description:
      'We design for wellness and sustainability — encouraging smarter food choices for everyday consumers and the modern generation.',
  },
];

export const ABOUT_CONTENT = {
  tagline: 'Snack smarter, live better.',
  intro:
    'BiteLab is a student-led venture that creates healthy, nutritious snacks for people seeking better food choices. Driven by the need for sustainable and nourishing products, BiteLab combines natural ingredients, practical nutrition, and eco-friendly innovations such as seed paper packaging. Our goal is to make snacking enjoyable, accessible, and meaningful while promoting wellness, sustainability, and responsible consumption in everyday life.',
  vision:
    'To be a trusted next-generation snack brand recognized for promoting health, sustainability, and responsible consumption. BiteLab aspires to create innovative and accessible snack products that encourage smarter food choices and support a more balanced lifestyle for the modern generation.',
  mission:
    'To provide nutritious, well-crafted, and sustainable snack products that encourage healthier lifestyles and responsible consumption. BiteLab is dedicated to combining natural ingredients, practical nutrition, and environmentally conscious packaging solutions to deliver food choices that are both enjoyable and socially meaningful.',
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Product', href: '#product' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Team', href: '#team' },
];

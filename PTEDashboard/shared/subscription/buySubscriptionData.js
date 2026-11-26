export const PLAN_INCLUDED_FEATURES = [
  'Premium Access',
  'Web & App Support',
  'Unlimited Practice',
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'sub-10',
    badge: '10 Days',
    whole: '2195',
    cents: '.00',
    theme: 'teal',
    popular: false,
    ctaLabel: 'Choose Plan',
    features: PLAN_INCLUDED_FEATURES,
  },
  {
    id: 'sub-30',
    badge: '30 Days',
    whole: '4395',
    cents: '.00',
    theme: 'indigo',
    popular: false,
    ctaLabel: 'Choose Plan',
    features: PLAN_INCLUDED_FEATURES,
  },
  {
    id: 'sub-60',
    badge: '60 Days',
    whole: '6595',
    cents: '.00',
    theme: 'navy',
    popular: true,
    popularLabel: 'Most Popular',
    ctaLabel: 'Choose Plan',
    features: PLAN_INCLUDED_FEATURES,
  },
  {
    id: 'sub-90',
    badge: '90 Days',
    whole: '8795',
    cents: '.00',
    theme: 'magenta',
    popular: false,
    ctaLabel: 'Choose Plan',
    features: PLAN_INCLUDED_FEATURES,
  },
];

export const MOCK_TEST_PACKS = [
  {
    id: 'mock-1',
    badge: '1 Mock Test',
    whole: '695',
    cents: '.00',
    theme: 'teal',
    popular: false,
    ctaLabel: 'Choose Pack',
    features: ['Full AI Score Report', 'Web & App Support', 'No Expiry Validity'],
  },
  {
    id: 'mock-3',
    badge: '3 Mock Tests',
    whole: '1695',
    cents: '.00',
    theme: 'navy',
    popular: true,
    popularLabel: 'Most Popular',
    ctaLabel: 'Choose Pack',
    features: ['Full AI Score Report', 'Web & App Support', 'No Expiry Validity'],
  },
  {
    id: 'mock-5',
    badge: '5 Mock Tests',
    whole: '2495',
    cents: '.00',
    theme: 'magenta',
    popular: false,
    ctaLabel: 'Choose Pack',
    features: ['Full AI Score Report', 'Web & App Support', 'No Expiry Validity'],
  },
];

export const PREMIUM_FEATURES_LEFT = [
  {
    id: 'ai-clicks',
    icon: 'sparkles',
    title: 'AI Clicks',
    desc: 'Unlimited AI Clicks for scoring in all the Speaking & Writing questions',
  },
  {
    id: 'score-checks',
    icon: 'score',
    title: 'Score Checks',
    desc: 'Unlimited Score Checks to know exactly how the PTE marks are distributed across various modules, for all questions',
  },
  {
    id: 'full-mock',
    icon: 'award',
    title: 'Full Mock Test',
    desc: 'Unlimited access to simulated Scored Mock Tests with a similar to 95% real exam scoring report & detailed analytics',
  },
  {
    id: 'sectional-mock',
    icon: 'checklist',
    title: 'Sectional Mock Test',
    desc: "Unlimited access to our 'first of its kind' feature that will give you an accurate module-wise picture of your performance",
  },
];

export const PREMIUM_FEATURES_RIGHT = [
  {
    id: 'cyo-mock',
    icon: 'plus',
    title: 'Create Your Own - Mock Test',
    desc: "Another 'first of its kind' feature that allows you to create mock tests based on your choice of questions & pattern",
  },
  {
    id: 'prediction-files',
    icon: 'file',
    title: 'Latest Prediction Files',
    desc: 'Two of our latest version of our weekly prediction files will be available',
  },
  {
    id: 'templates',
    icon: 'doc',
    title: 'Templates',
    desc: 'Access templates for questions like Respond to a Situation, Write Email & Summarize Spoken Text',
  },
  {
    id: 'study-plan',
    icon: 'target',
    title: 'Target wise Study-Plan',
    desc: "A tailor-made plan that has been designed in accordance with a student's required score to provide an effective learning path",
  },
];

export const BUY_SUBSCRIPTION_FAQS = [
  {
    q: 'How do I make the payment?',
    a: 'Select your preferred duration plan (10, 30, 60, or 90 days) or Mock Test pack, click Choose Plan, and complete checkout using Stripe cards, local wallets, or a redeemed voucher code.',
  },
  {
    q: 'Where can I see my purchase history?',
    a: 'All completed transactions appear in the Payment History section below on this page as well as in Profile > Payment History, where you can click any entry to open its itemized Stripe receipt.',
  },
  {
    q: 'How many mock tests will I get when I upgrade to a Premium plan?',
    a: 'Every active Premium subscription unlocks unlimited attempts across Full Mock Tests, Sectional Mock Tests, Timed Sectional tests, and Create Your Own Mock Tests during your active plan window.',
  },
  {
    q: 'What happens after my Premium subscription expires?',
    a: 'Your saved practice history, scores, bookmarks, and analytics remain preserved on your account. You retain free tier access until you renew or apply a new plan duration.',
  },
  {
    q: 'Why am I unable to make the payment?',
    a: 'Please confirm international or online e-commerce transactions are enabled on your card, verify your billing postal/ZIP details, or use the Raise A Ticket button above for instant support.',
  },
  {
    q: 'How can I purchase only the mock tests?',
    a: 'Switch to the Mock Tests tab directly above the plan cards to purchase standalone 1x, 3x, or 5x mock test unit packs with no expiry date.',
  },
  {
    q: 'If I make the payment on the website, will I still be able to use my subscription on the mobile app?',
    a: 'Yes. Your Premium subscription syncs automatically across both the NinetyPTE web portal and the mobile app under the same registered student account.',
  },
  {
    q: 'I have made the payment successfully, but I did not get the access.',
    a: 'Refresh your dashboard or check Payment History to verify transaction confirmation. If your access does not activate within 2 minutes, click Raise A Ticket with your Transaction ID for immediate activation.',
  },
];

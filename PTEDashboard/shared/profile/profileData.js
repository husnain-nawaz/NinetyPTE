export const PROFILE_USER_DEFAULTS = {
  studentId: '#002087161',
  rawId: '002087161',
  planName: 'PREMIUM',
  expiryDate: '28/11/2026',
  daysRemaining: '3 Days',
  loginType: 'Google',
  countryCode: '+92',
  phoneNumber: '3099694194',
  address: '',
};

export const COUNTRY_DIAL_CODES = ['+92', '+91', '+61', '+44', '+1', '+971', '+65'];

export const PREMIUM_PLAN_FEATURES = [
  { key: 'practice', label: 'Practice Test : All Questions', icon: 'file' },
  { key: 'ai', label: 'AI Clicks : Unlimited', icon: 'sparkles' },
  { key: 'score', label: 'Score Checks : Unlimited', icon: 'chart' },
  { key: 'templates', label: 'Templates : All', icon: 'grid' },
  { key: 'videos', label: 'Strategy Videos : Yes', icon: 'video' },
  { key: 'fullMock', label: 'Full Mock Test :', highlight: '148 x', suffix: ' Unlimited', icon: 'doc' },
  { key: 'studyPlan', label: 'Study Plan : Yes', icon: 'calendar' },
  { key: 'sectionalMock', label: 'Sectional Mock Test :', highlight: '473 x', suffix: ' Unlimited', icon: 'layout' },
  { key: 'cyoMock', label: 'CYO Mock Tests : Yes', icon: 'pen' },
  { key: 'timedMock', label: 'Timed Sectional Mock Test :', highlight: '80 x', suffix: ' Unlimited', icon: 'clock' },
];

export const FREE_PLAN_FEATURES = [
  { key: 'practice', label: 'Practice Test : All Questions', icon: 'file' },
  { key: 'ai', label: 'AI Clicks : Limited', icon: 'sparkles' },
  { key: 'score', label: 'Score Checks : Limited', icon: 'chart' },
  { key: 'templates', label: 'Templates : Limited', icon: 'grid' },
  { key: 'videos', label: 'Strategy Videos : Yes', icon: 'video' },
  { key: 'fullMock', label: 'Full Mock Test :', boldValue: '1 x', suffix: ' Once', icon: 'doc' },
  { key: 'studyPlan', label: 'Study Plan : No', icon: 'calendar' },
  { key: 'sectionalMock', label: 'Sectional Mock Test :', boldValue: '4 x', suffix: ' Once', icon: 'layout' },
  { key: 'cyoMock', label: 'CYO Mock Tests : No', icon: 'pen' },
  { key: 'timedMock', label: 'Timed Sectional Mock Test :', boldValue: '4 x', suffix: ' Once', icon: 'clock' },
];

export const PAYMENT_HISTORY_RECORDS = [
  {
    id: 'pi_3UAD3lBWCQDFz2Rf16JcLxwz',
    displayId: 'PI_3UAD3LBWCQDFZ2RF16JCLXWZ',
    item: 'Subscription - 90',
    status: 'Success',
    amountDisplay: 'PKR 5596.00',
    date: '30/08/2026',
    orderId: '754586',
    couponCode: 'NP58066PT43N',
    couponValue: '20.00%',
    couponAmount: '1399.00',
    grossAmount: '6995.00',
    grandTotal: '5596.00',
  },
];

export const REFERRAL_CODE = '33FIF8X5';
export const REFERRAL_LINK = `https://ninetypte.com/r/${REFERRAL_CODE}`;

export const SHARE_EARN_TIERS = [
  { label: 'Subscription in 10 days', points: '4 Points' },
  { label: 'Subscription in 30 days', points: '6 Points' },
  { label: 'Subscription in 60 days', points: '9 Points' },
  { label: 'Subscription in 90 days', points: '12 Points' },
];

export const SHARE_EARN_FAQS = [
  {
    q: 'What is Share & Earn?',
    a: 'Share & Earn is NinetyPTE’s student reward program that lets you earn FREE Credit Points whenever your invited friends subscribe to a paid plan or when you renew your own subscription.',
  },
  {
    q: 'Where can I find my referral link or code?',
    a: 'Your unique referral URL and referral code are displayed at the top of the Share and Earn page inside your NinetyPTE profile.',
  },
  {
    q: 'How can I share my referral link?',
    a: 'Click the copy button beside the referral URL or click Share Referral Link to copy and send it via WhatsApp, email, or messaging apps.',
  },
  {
    q: 'What does a new referred user receive?',
    a: 'New learners who sign up using your referral link automatically qualify for referral bonus benefits when subscribing to their first NinetyPTE plan.',
  },
  {
    q: 'When does the referrer earn points?',
    a: 'Credit points are credited immediately once a referred friend completes payment for any 10, 30, 60, or 90-day NinetyPTE plan.',
  },
  {
    q: 'How do I earn credit points?',
    a: 'Earn 4 to 12 points either by inviting friends via your referral link or through self-purchase rewards when subscribing directly on NinetyPTE.',
  },
  {
    q: 'How much are my credit points worth?',
    a: 'Accumulated points can be redeemed toward subscription renewals, extension days, and practice pack upgrades inside Redeem Now.',
  },
  {
    q: 'How many points can I redeem?',
    a: 'Once you have available points, you can apply up to your full earned balance toward eligible subscription renewals.',
  },
  {
    q: 'Can I use my points together with another offer or discount?',
    a: 'Point redemption applies as plan credit and cannot usually be stacked with promotional coupon codes on the same order.',
  },
  {
    q: 'Where can I check my points?',
    a: 'You can track Available Points, Used Points, Total Points, and every transaction row anytime inside Share and Earn > Point History.',
  },
];

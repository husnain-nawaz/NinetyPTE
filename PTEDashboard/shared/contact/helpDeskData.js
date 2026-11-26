export const HELP_DESK_CHANNELS = [
  {
    id: 'chat',
    title: 'Chat with Us',
    desc: 'Get in touch and let us know how we can help.',
    buttonLabel: 'Chat Now',
    href: 'https://wa.me/61470260221',
    cardClass: 'border-[#f3daf0] bg-gradient-to-br from-[#fcf4f9] to-white',
    iconClass: 'bg-[#fae6f7] text-[#d936c7]',
    titleClass: 'text-[#d936c7]',
    btnClass: 'bg-[#d936c7] hover:bg-[#c026b0] text-white',
    icon: 'chat',
  },
  {
    id: 'message',
    title: 'Leave a Message',
    desc: "Feel free to send us your queries or leave a message, and we'll get back to you.",
    buttonLabel: 'Get Support',
    cardClass: 'border-[#d6e4f2] bg-gradient-to-br from-[#f2f6fb] to-white',
    iconClass: 'bg-[#e4edf7] text-[#0b4a7b]',
    titleClass: 'text-[#0b4a7b]',
    btnClass: 'bg-[#0b4a7b] hover:bg-[#08385f] text-white',
    icon: 'mail',
  },
  {
    id: 'sales',
    title: 'Institute Software Sales',
    desc: 'Are you an institute interested in our white-labelled software? Get in touch with our sales team today.',
    buttonLabel: 'Contact Sales',
    cardClass: 'border-[#ddd7fa] bg-gradient-to-br from-[#f5f3fe] to-white',
    iconClass: 'bg-[#ede9fe] text-[#7c3aed]',
    titleClass: 'text-[#7c3aed]',
    btnClass: 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white',
    icon: 'monitor',
  },
];

export const DIRECT_CONTACT_DETAILS = {
  phone: '+61 470 260 221',
  phoneHref: 'tel:+61470260221',
  whatsappHref: 'https://wa.me/61470260221',
  whatsappChannelHref: 'https://whatsapp.com/channel/ninetypte',
  email: 'help@ninetypte.com',
  emailHref: 'mailto:help@ninetypte.com',
};

export const HELP_DESK_FAQ_TABS = ['Practice', 'Mock Test', 'Subscription'];

export const HELP_DESK_FAQS = {
  Practice: [
    {
      q: 'What is Vocab-Bank? How will it help me in my preparation?',
      a: 'Vocabulary is an important aspect of any language & a good vocabulary improves all areas of communication — be it Listening, Speaking, Reading, or Writing.',
      linkLabel: 'Learn More',
      linkType: 'vocab',
    },
    {
      q: 'How to check if the correct microphone is selected in Chrome?',
      a: 'Open Chrome Settings > Privacy and security > Site settings > Microphone and confirm your external headset or boom mic is selected as the default input device.',
    },
    {
      q: 'How to get an accurate score in Speaking while practicing on NinetyPTE?',
      a: 'Use a wired headset with a boom mic placed roughly two fingers below your lips, maintain steady natural pace, and avoid long pauses exceeding two seconds.',
    },
    {
      q: 'How to delete my data or user profile?',
      a: 'Open Profile > Reset Profile to clear practice history, or visit Profile > Delete Profile once any active subscription period ends.',
    },
    {
      q: "How to enable microphone on my computer's browser?",
      a: 'Click the lock or permissions icon beside the address bar in your browser, toggle Microphone to Allow, and reload the practice workspace.',
    },
    {
      q: 'I am unable to submit my recordings / responses / answers.',
      a: 'Check that microphone permission is enabled and your internet connection is stable, then click Redo to capture a fresh response and press Submit.',
    },
    {
      q: 'Can I use the website on my phone? How can I download the app?',
      a: 'Yes. The NinetyPTE web portal works on mobile browsers, and you can also install the companion mobile app from the Mobile App page in your profile menu.',
    },
    {
      q: 'Why am I not able to record my answer in the speaking module?',
      a: 'Ensure no other calling or recording application is locking your microphone hardware and grant browser mic access when prompted.',
    },
    {
      q: 'I am unable to hear anything on the portal.',
      a: 'Verify system volume, unmute browser tab audio, and test playback output using the Listening Test widget inside your dashboard Home rail.',
    },
    {
      q: 'Where can I start my PTE practice from?',
      a: 'Start with Today’s Task on your portal Home dashboard or open the Practice mega-menu to train high-weightage tasks like Read Aloud, Repeat Sentence, R&W Blanks, and Write from Dictation.',
    },
    {
      q: 'I think my Speaking scores are not accurate. There seems to be some issue.',
      a: 'Run a quick Pitch Analyzer check on your Home dashboard to avoid clipping or breath noise, and raise a ticket above if audio distortion persists.',
    },
    {
      q: 'How accurate is the AI scoring on the portal when compared to PTE?',
      a: 'NinetyPTE automated scoring models closely mirror Pearson trait weights for content, oral fluency, pronunciation, form, grammar, and spelling.',
    },
    {
      q: 'How can I check my AI scores?',
      a: 'Immediately after clicking Submit on any practice item, your AI breakdown appears in the My Score tab below the question and inside Performance Progress.',
    },
    {
      q: "How can I practice only those questions which I haven't practiced yet?",
      a: 'Open the slide-out Question Bank drawer on any practice task and tick the Not Practiced checkbox at the top filter bar.',
    },
    {
      q: "What is 'Practice Progress' on the dashboard?",
      a: 'Practice Progress tracks completed counts across every Speaking, Writing, Reading, and Listening task bank and lets you resume straight into any module.',
    },
    {
      q: 'What are the chances of the Prediction questions repeating in the actual exam and how to practice them?',
      a: 'Prediction items highlight high-frequency recurring topics from recent exams; filter by Prediction in any question drawer or download weekly Prediction PDFs under Study Tools.',
    },
    {
      q: 'Is the material on the portal updated? How can I practice the latest questions?',
      a: 'Yes, weekly updates add newly reported items tagged with New and New Prediction badges at the top of each New-to-old question list.',
    },
  ],
  'Mock Test': [
    {
      q: 'How can I access Mock Tests?',
      a: 'You need to click on Mock Test from the Dashboard & it will take you to a list of available mock tests.',
      linkLabel: 'Learn More',
      linkType: 'mock-tests',
    },
    {
      q: 'Are the mock tests available for free?',
      a: 'A free sample mock test is available so you can experience the exam interface. Full access to all Scored Full Mock Tests, Sectional Mock Tests, Timed Sectional tests, and Create Your Own Mock Tests requires an active Premium subscription.',
    },
    {
      q: 'How can I view scores for the previously attempted mock tests?',
      a: 'Open Mock Tests from the top portal navigation bar and check your completed attempts or Scorecards view to review detailed AI scoring and skill breakdowns.',
    },
    {
      q: 'Do I need to complete the mock test in one-go?',
      a: 'Standard practice mock sessions allow saving progress and returning later, whereas Timed Mock Tests follow real Pearson exam timing and are best completed in one sitting.',
    },
    {
      q: 'Will I be able to continue my previously saved mock test?',
      a: 'Yes, any previously saved or in-progress mock test displays a Resume option in your Mock Tests list so you can continue right where you left off.',
    },
    {
      q: 'How can I purchase the mock test?',
      a: 'Mock tests are included with every NinetyPTE Premium plan rather than sold individually. Visit the Buy Subscription page to choose a 10, 30, 60, or 90-day plan or redeem an access voucher.',
    },
  ],
  Subscription: [
    {
      q: 'How can I upgrade my account?',
      a: 'You will need to purchase a Premium subscription which will give you unlimited access to all the features that are restricted for a free user.',
      linkLabel: 'Learn More',
      linkType: 'subscription',
    },
    {
      q: "Why can't I access some of the features like AI scoring?",
      a: 'AI scoring, detailed diagnostics, and unlimited mock tests are unlocked exclusively for active Premium subscribers. Free accounts have limited trial access.',
    },
    {
      q: 'How do I make the payment?',
      a: 'Click Buy in the top portal navigation bar, select your preferred plan duration, and complete checkout securely using your card or redeem a valid NinetyPTE voucher code.',
    },
    {
      q: 'What happens after my Premium access expires?',
      a: 'Your account reverts to the free tier once the plan ends, while all of your saved practice history, Vocab-Bank entries, and past mock test scorecards remain safely preserved until you renew.',
    },
    {
      q: 'Where can I see my purchase history?',
      a: 'Open the Buy Subscription page and click Payment History to view your past plan activations, transaction IDs, and downloadable receipts.',
    },
    {
      q: 'Is the Premium access transferable?',
      a: 'No. Premium subscriptions are licensed strictly to a single student account and cannot be transferred or shared across multiple accounts.',
    },
    {
      q: 'How many mock tests will I get when I upgrade to a Premium plan?',
      a: 'Upgrading to a Premium plan grants unlimited access to Full Mock Tests, Sectional Mock Tests, Timed Sectional tests, and Create Your Own Mock Tests across your active subscription period.',
    },
    {
      q: 'I am unable to make the payment. Why?',
      a: 'Payment failures commonly occur due to international online transactions being disabled on the card, insufficient funds, 3D Secure timeouts, or browser pop-up blockers. Try enabling online payments with your bank or contact our support team via Raise A Ticket or Live Chat.',
    },
  ],
};

// All marketing copy in one file. Stephen will replace the Lorem-Ipsum body copy
// Thursday morning. Headings and structure are real.

export const home = {
  eyebrow: 'TownConnect Schools',
  headlineLead: 'Your school,',
  headlineAccent: 'on WhatsApp.',
  subhead:
    'Parents, teachers and learners get correct, instant answers to every routine school question — without an app, without a login, without a password reset.',
  ctaPrimary: 'Try the demo',
  ctaSecondary: 'How it works',
  pillars: [
    {
      kicker: 'Zero friction',
      title: 'No app. No login.',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parents already have WhatsApp open. That is the whole product.',
    },
    {
      kicker: 'Instant answers',
      title: 'Term dates, fixtures, teachers, notices.',
      body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bot reads from the school’s spreadsheet and answers in plain English.',
    },
    {
      kicker: 'One source of truth',
      title: 'School updates the sheet, the bot updates everyone.',
      body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
};

export const howItWorks = {
  eyebrow: 'How it works',
  headline: 'Three steps. That is the whole thing.',
  steps: [
    {
      number: '01',
      title: 'School sends us their data',
      body: 'Term calendar, sports fixtures, teacher contacts, notices, general info. One Google Sheet. Lorem ipsum dolor sit amet.',
    },
    {
      number: '02',
      title: 'We give the school a WhatsApp number',
      body: 'Print it on every newsletter, slip and noticeboard. Parents save it once. Lorem ipsum dolor sit amet.',
    },
    {
      number: '03',
      title: 'Parents ask. The bot answers.',
      body: '"When does term 2 end?" "Who teaches Grade 7 maths?" Instant, correct, in plain English. Lorem ipsum dolor sit amet.',
    },
  ],
  conversation: [
    { from: 'parent', text: 'When is the U13A rugby match this Saturday?' },
    { from: 'bot', text: 'Saturday 9 May, 09:30 vs St Andrews at home.' },
    { from: 'parent', text: 'How do I reach Mrs Botha?' },
    { from: 'bot', text: 'Mrs Botha teaches Grade 7 Mathematics — botha@highveld.demo, ext. 102.' },
  ],
};

export const tryDemo = {
  eyebrow: 'Live demo',
  headline: 'Message the Highveld Academy bot.',
  subhead:
    'Highveld Academy is a fictional school we built so you can try the product without us needing a real school first. Tap the button and ask anything below.',
  sampleQuestions: [
    'When does term 2 end?',
    'Is there school on Friday?',
    'When is the next U13A rugby match?',
    'Who teaches Grade 7 maths?',
    'How do I reach Mrs Botha?',
    'Any notices today?',
    'What time does school start?',
    'When are the next exams?',
  ],
  notice:
    'The live WhatsApp number activates Thursday evening. Until then, the demo button takes you to a placeholder.',
};

export const forSchools = {
  eyebrow: 'For schools',
  headline: 'What you give us. What you get back.',
  give: {
    title: 'You give us',
    items: [
      'A Google Sheet (we provide the template)',
      'Term dates, sports fixtures, teacher contacts, notices, general info',
      'A name and a logo',
      'About 90 minutes of admin time per week to keep the sheet current',
    ],
  },
  get: {
    title: 'You get',
    items: [
      'A dedicated WhatsApp number for your school',
      'A bot that answers parent and learner questions instantly, 24/7',
      'A simple admin form to broadcast urgent notices to opted-in parents',
      'A weekly digest of unanswered questions so you know what parents actually want to know',
    ],
  },
  pricing: {
    label: 'Pricing',
    headline: 'From R3,000 / month',
    body:
      'One simple price, includes the WhatsApp number, the bot, the broadcast feature, and ongoing support. No setup fee for the first ten schools.',
  },
};

export const contact = {
  eyebrow: 'Contact',
  headline: 'Get a demo for your school.',
  subhead:
    'Tell us about your school and we will send you a 10-minute walkthrough video and a link to try the live bot. We respond within one working day.',
  successMessage:
    'Thank you. We will be in touch within one working day with a walkthrough video and a link to the live demo.',
};

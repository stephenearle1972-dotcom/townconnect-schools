// Marketing copy for every page. One file = one source of truth.

export const home = {
  hero: {
    headline: "Your school's WhatsApp assistant. Always on. Always accurate.",
    subhead:
      'Parents ask questions. Your admin team answers the same ones every day. TownConnect Schools gives every parent instant access to term dates, sport fixtures, teacher contacts, fees, and notices — through the app they already use.',
    ctaPrimary: 'See how it works',
    ctaSecondary: 'Try the live demo',
  },
  problem: {
    heading: 'The school admin problem nobody talks about',
    body:
      'Every school office knows the drill. The phone rings. When do exams start? Who teaches my child maths? What time is the rugby on Saturday? Good questions. But when your admin team answers the same 50 questions 200 times a term, that is time that should go to running the school. Parents are not the problem. The channel is. Email gets buried. Apps get ignored. PDFs get lost. But WhatsApp? Every parent in South Africa opens WhatsApp every single day.',
  },
  solution: {
    heading: 'One WhatsApp number. Every answer. Instantly.',
    body:
      'TownConnect Schools gives your school a dedicated WhatsApp number powered by AI. Parents send a question in plain language — English, Afrikaans, isiZulu, or Sepedi — and get an accurate, up-to-date answer in seconds. No app to download. No login to remember. No training required.',
  },
  features: [
    { title: 'Term Calendar', body: 'When is the next public holiday? When do Grade 10 exams start? Your full term calendar, always current.' },
    { title: 'Sport Fixtures', body: 'Is there hockey this Saturday? When does 1st XV play? Fixtures, times, opponents, venues — all searchable.' },
    { title: 'Teacher Directory', body: 'Who teaches Grade 8 science? Staff names, subjects, email addresses, and extensions.' },
    { title: 'School Notices', body: 'Any new notices this week? Every notice available instantly, no digging through emails.' },
    { title: 'Fees & General Info', body: 'What are Grade 4 fees? Fees, bus routes, uniform rules, office hours — all in one place.' },
    { title: 'Broadcast Notices', body: 'Send urgent notices to all parents instantly via WhatsApp. Higher open rates than email or any school app.' },
  ],
  multilingual: {
    heading: 'One bot. Four languages.',
    subtext:
      'Parents ask in their language. The bot answers in the same language. No settings, no switching — it just works.',
    cards: [
      {
        label: 'English',
        question: 'When do exams start?',
        answer:
          'Grade 8-9 mid-term tests run 12-16 May. Grade 10-12 mid-year exams run 19-30 May.',
      },
      {
        label: 'Afrikaans',
        question: 'Wat is die skoolgeld vir Graad 7?',
        answer:
          'Die skoolgeld vir Graad 7 is R58,500 per jaar, of R5,850 per maand oor 10 maande.',
      },
      {
        label: 'isiZulu',
        question: 'Izivivinyo ziqala nini?',
        answer:
          'Izivivinyo zephakathi nonyaka ze-Grade 8-9 ziqala ngoMeyi 12-16. Ze-Grade 10-12 ziqala ngoMeyi 19-30.',
      },
      {
        label: 'Sepedi',
        question: 'Diexamo di thoma neng?',
        answer:
          'Diteko tša Grade 8-9 di thoma ka 12 May go fihla ka 16 May. Diexamo tša Grade 10-12 di thoma ka 19 May go fihla ka 30 May.',
      },
    ],
    footer: 'English. Afrikaans. isiZulu. Sepedi. More languages coming soon.',
  },
  trust: {
    heading: "Built by TownConnect — South Africa's hyperlocal platform",
    body:
      'TownConnect Schools is built by the same team behind TownConnect, the hyperlocal business directory powering 21 town websites and 13 WhatsApp bots across South Africa.',
  },
  cta: {
    heading: 'See it in action',
    body:
      "We built a working demo for Highveld Academy. Try the bot yourself — ask about exams, sport fixtures, fees, or teachers. Then imagine it answering your parents' questions.",
    button: 'Try the demo now',
  },
};

export const howItWorks = {
  heading: 'How TownConnect Schools works',
  subheading: 'From signup to live bot in under two weeks.',
  steps: [
    {
      number: '01',
      title: "We set up your school's WhatsApp number",
      body: 'Your school gets a dedicated WhatsApp Business number with your school name and logo.',
    },
    {
      number: '02',
      title: 'You share your school data',
      body: 'Term dates, sport fixtures, teacher list, notices, fees, uniform policy. Update any time through a simple web form or shared spreadsheet.',
    },
    {
      number: '03',
      title: 'We train your bot',
      body: "Our AI assistant learns your school's information and answers in English, Afrikaans, isiZulu, and Sepedi.",
    },
    {
      number: '04',
      title: 'Parents start asking questions',
      body: 'Share the WhatsApp number. From that moment, any parent can get instant answers, 24/7.',
    },
    {
      number: '05',
      title: 'You send broadcast notices',
      body: 'School closure, safety alert, event reminder — broadcast to your entire parent body via WhatsApp in under a minute.',
    },
  ],
};

export const forSchools = {
  heading: 'Give your parents the communication channel they actually use',
  subheading: 'Email open rates at schools average 30%. WhatsApp open rates exceed 95%.',
  features: [
    { title: 'Reduce admin load', body: 'Your office staff answer the same questions hundreds of times per term. The bot handles routine queries instantly.' },
    { title: 'Four languages, one bot', body: 'English, Afrikaans, isiZulu, and Sepedi built in. Parents communicate in the language they are most comfortable with.' },
    { title: 'Reach every parent', body: 'Not every parent checks email. Not every parent downloads apps. But every parent uses WhatsApp.' },
    { title: 'Broadcast when it matters', body: 'School closed? Safety incident? Broadcast to your entire parent body via WhatsApp in under a minute.' },
    { title: 'No app fatigue', body: 'Works inside WhatsApp. Nothing to download, nothing to learn, nothing to forget.' },
    { title: 'Stay current automatically', body: 'Update a fixture or notice and it is live immediately. No waiting for the next newsletter.' },
  ],
  pricing: {
    tiers: [
      {
        name: 'Essentials',
        price: 'R1,950',
        period: '/month',
        features: [
          'WhatsApp number',
          'Calendar, fixtures, teachers, notices',
          'English + Afrikaans',
          'Web dashboard',
          'Email support',
        ],
      },
      {
        name: 'Professional',
        price: 'R2,950',
        period: '/month',
        highlight: true,
        features: [
          'Everything in Essentials',
          'Broadcast (500 parents)',
          'Sepedi added',
          'Priority WhatsApp support',
          'Monthly report',
        ],
      },
      {
        name: 'Premium',
        price: 'R4,950',
        period: '/month',
        features: [
          'Everything in Professional',
          'Broadcast (2,000 parents)',
          'Custom branding',
          'Dedicated onboarding',
          'Quarterly review',
        ],
      },
      {
        name: 'Enterprise',
        price: 'From R9,500',
        period: '/month',
        features: [
          'Multi-campus',
          'Unlimited broadcasts',
          'Custom integrations',
          'SLA',
          'On-site training',
        ],
      },
    ],
    note: 'No setup fee during launch. Month-to-month. Annual billing at 10% discount.',
  },
};

export const tryDemo = {
  heading: 'Try it yourself — meet Highveld Academy',
  subheading:
    'Highveld Academy is a fictional sports school in Centurion. Its WhatsApp bot is live right now. Ask it anything.',
  sampleQuestions: [
    'When do exams start?',
    'Is there rugby this Saturday?',
    'Who teaches Grade 11 maths?',
    'What are the school fees?',
    'Wanneer begin die eksamen?',
    'Skoolgeld ke bokae?',
  ],
};

export const contact = {
  heading: "Let's talk about your school",
  subheading:
    'Tell us about your school and we will send you a 10-minute walkthrough video and a link to try the live bot. We respond within one working day.',
  cards: {
    family:
      'TownConnect Schools is a product of TownConnect (Pty) Ltd — the hyperlocal platform powering 21 South African town sites. Reg: 2026/106250/07.',
  },
  successMessage:
    'Thank you. We will be in touch within one working day with a walkthrough video and a link to the live demo.',
};

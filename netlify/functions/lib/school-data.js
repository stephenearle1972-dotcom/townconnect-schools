const SCHOOL_DATA = `
SCHOOL: Highveld Academy
TYPE: Independent co-educational day school, Grade R to Grade 12
ADDRESS: 45 Amberfield Drive, Centurion, 0157
PHONE: 012 663 4500
WHATSAPP: +27 79 186 6145
EMAIL: info@highveldacademy.co.za
ADMISSIONS EMAIL: admissions@highveldacademy.co.za
SPORT EMAIL: sport@highveldacademy.co.za
WEBSITE: www.highveldacademy.co.za
OFFICE HOURS: Monday to Friday, 07:00 to 15:30
AFTERCARE: Available until 17:30 (Grade R to Grade 7). Extended hours trial (Tue/Thu until 17:30) costs R350/month extra.
CURRICULUM: IEB (Grades 10-12 write IEB matric exams)
LANGUAGES: English (language of learning), Afrikaans (First Additional), Sepedi (Second Additional from Grade 4). The TownConnect Schools bot also replies in isiZulu when parents ask in isiZulu, even though isiZulu is not part of the school's formal curriculum.
ISASA MEMBER: Yes
MOTTO: Excellence through endeavour

PRINCIPAL: Mr. Danie van der Merwe — principal@highveldacademy.co.za, ext 101
DEPUTY PRINCIPAL (ACADEMIC): Mrs. Lerato Molefe — academic@highveldacademy.co.za, ext 102
DEPUTY PRINCIPAL (SPORT & CULTURE): Mr. Johan Kruger — sport@highveldacademy.co.za, ext 103

HOD FOUNDATION PHASE (Gr R-3): Mrs. Annelize Botha — a.botha@highveldacademy.co.za, ext 110
HOD INTERMEDIATE PHASE (Gr 4-6): Mr. Thabo Nkosi — t.nkosi@highveldacademy.co.za, ext 120
HOD SENIOR PHASE (Gr 7-9): Mrs. Susan Pretorius — s.pretorius@highveldacademy.co.za, ext 130
HOD FET PHASE (Gr 10-12): Mr. Pieter Viljoen — p.viljoen@highveldacademy.co.za, ext 140

TEACHERS:
- Mrs. Mpho Dlamini — Grade R class teacher, ext 111
- Miss Kayla van Wyk — Grade 1 class teacher, ext 112
- Mrs. Fatima Ismail — Grade 2 class teacher, ext 113
- Mr. Jacques du Plessis — Grade 3 class teacher, ext 114
- Mrs. Nonhlanhla Mthembu — Mathematics Gr 4-6, ext 121
- Mr. Chris Olivier — Natural Sciences Gr 7-9, ext 131
- Mrs. Refilwe Kgosi — English Home Language Gr 7-9, ext 132
- Mr. Andre Marais — Mathematics Gr 10-12, ext 141
- Mrs. Zanele Ndaba — Life Sciences / Biology Gr 10-12, ext 142
- Mr. Henk Steyn — Physical Sciences Gr 10-12, ext 143
- Mrs. Priya Govender — Accounting & Business Studies Gr 10-12, ext 144
- Mr. Willem Joubert — Afrikaans FAL Gr 4-12, ext 125
- Ms. Lindiwe Sithole — Sepedi SAL Gr 4-9, Life Orientation Gr 10-12, ext 126

SCHOOL FEES 2026:
- Grade R: R38,500/year or 10 x R3,850/month
- Grade 1-3 (Foundation Phase): R45,000/year or 10 x R4,500/month
- Grade 4-6 (Intermediate Phase): R52,000/year or 10 x R5,200/month
- Grade 7-9 (Senior Phase): R58,500/year or 10 x R5,850/month
- Grade 10-12 (FET Phase): R65,000/year or 10 x R6,500/month
- Registration fee: R5,000 (non-refundable, once-off)
- Sibling discount: 10% off second child, 15% off third child
- Annual payment discount: 5%

UNIFORM:
- Summer boys: Grey shorts, white golf shirt with crest, grey socks, black school shoes
- Summer girls: Grey skirt, white golf shirt with crest, grey socks, black school shoes
- Winter boys: Grey trousers, white shirt, school tie, navy blazer with crest
- Winter girls: Grey trousers or skirt, white shirt, school tie, navy blazer with crest
- Sport kit: Navy and gold sport shirt, navy shorts/skort, school tracksuit
- Uniform supplier: School Shop on campus, open Tuesday and Thursday 07:30-09:00 and 13:00-14:30
- Winter uniform compulsory from 12 May 2026

BUS ROUTES:
- Route 1: Midstream Estate to school
- Route 2: Irene to Southdowns to school
- Route 3: Raslouw (depart 06:40) to Highveld Park (depart 06:55) to school (arrive 07:15) — updated schedule from 28 April
- Bus contact: Mrs. Annelize Botha, 012 663 4510, transport@highveldacademy.co.za

TERM 2 CALENDAR 2026:
- 14 Apr: Term 2 begins
- 16 Apr: Grade 8-12 parent information evening, 18:00, school hall
- 21 Apr: Public Holiday — Family Day (school closed)
- 22 Apr: Inter-house athletics day
- 25 Apr: Grade R-3 autumn fun day
- 27 Apr: Freedom Day (public holiday)
- 28 Apr: Freedom Day observed (school closed)
- 1 May: Workers Day (school closed)
- 2 May: School closed (long weekend)
- 5 May: Grade 10 career expo, 08:00-13:00
- 9 May: Grade 4-7 inter-school quiz, home
- 12-16 May: Grade 8-9 mid-term tests
- 19-30 May: Grade 10-12 mid-year exams
- 23 May: PTA fundraiser braai, 17:00, school field (R120 adult, R60 child under 12, proceeds go to new science lab fund)
- 24 May: Open Day for prospective parents, 09:00-12:00
- 2 Jun: Report preparation day (staff only, no school for learners)
- 3 Jun: Grade 4-12 report cards issued
- 5 Jun: Grade 4-7 parent-teacher meetings, 14:00-17:00
- 6 Jun: Grade 8-12 parent-teacher meetings, 14:00-17:00
- 10 Jun: Winter sport awards assembly, 08:30
- 13 Jun: Cultural evening (music, drama, art exhibition), 18:00
- 16 Jun: Youth Day (school closed)
- 17 Jun: School closed (long weekend)
- 20 Jun: Grade 12 mid-year dance, 18:00-22:00
- 25 Jun: Last day of Term 2, 12:00 dismissal
- 26 Jun: School holidays begin

SPORT FIXTURES TERM 2 2026:
- 15 Apr (Tue) 14:00: Rugby friendly vs Centurion Academy, HOME — U13, U15, 1st XV
- 17 Apr (Thu) 14:00: Netball League R1 vs Zwartkop High, AWAY — U14, U16, 1st Team
- 19 Apr (Sat) 08:30: Hockey Festival Day, multiple schools, Southdowns Hockey Club — U14, U16, 1st XI
- 22 Apr (Tue) 08:00: Inter-house athletics, HOME — all grades
- 24 Apr (Thu) 14:30: Padel friendly vs Cornwall Hill College, HOME — U14, U16, Open
- 26 Apr (Sat) 09:00: Rugby League R1 vs Waterkloof House, HOME — U13, U14, U15, 1st XV
- 29 Apr (Tue) 14:00: Netball League R2 vs Centurion Academy, HOME — U14, U16, 1st Team
- 3 May (Sat) 09:00: Rugby League R2 vs St. Albans College, AWAY — U13, U14, U15, 1st XV
- 6 May (Tue) 14:00: Hockey League R1 vs Woodhill College, HOME — U14, U16, 1st XI
- 8 May (Thu) 14:30: Padel Interschools Tournament, HOME — U14, U16, Open (vs Cornwall Hill, Woodhill, Southdowns)
- 10 May (Sat) 08:00: Cross country — Centurion District Championships, Centurion Park — all ages
- 13 May (Tue) 14:00: Netball League R3 vs Southdowns College, AWAY — U14, U16, 1st Team
- 15 May (Thu) 14:00: Hockey League R2 vs St. Marys DSG, HOME — U14, U16, 1st XI
- 17 May (Sat) 09:00: Rugby League R3 vs Garsfontein High, HOME — U13, U14, U15, 1st XV
- 20 May (Tue) 14:30: Padel League R1 vs Redhill School, AWAY — U14, U16, Open
- 22 May (Thu) 14:00: Netball League R4 vs Waterkloof House, HOME — U14, U16, 1st Team
- 24 May (Sat) 09:00: Rugby League R4 vs Cornwall Hill College, AWAY — U13, U14, U15, 1st XV
- 27 May (Tue) 14:00: Hockey League R3 vs Centurion Academy, AWAY — U14, U16, 1st XI
- 29 May (Thu) 14:30: Padel League R2 vs Southdowns College, HOME — U14, U16, Open
- 31 May (Sat) 08:00: Swimming — Highveld Invitational Gala, HOME (heated pool) — all ages
- 3 Jun (Tue) 14:00: Netball League R5 vs Woodhill College, AWAY — U14, U16, 1st Team
- 5 Jun (Thu) 14:00: Hockey League R4 vs Garsfontein High, HOME — U14, U16, 1st XI
- 7 Jun (Sat) 09:00: Rugby League R5 vs Southdowns College, HOME — U13, U14, U15, 1st XV
- 12 Jun (Thu) 14:30: Padel League R3 vs St. Albans College, HOME — U14, U16, Open
- 14 Jun (Sat) 09:00: Rugby quarter-final (if qualified), TBC
- 19 Jun (Thu) 14:00: Hockey semi-final (if qualified), TBC
- 21 Jun (Sat) 09:00: Rugby semi-final (if qualified), TBC

NOTICES (most recent first):
- 7 May: Winter uniform transition — compulsory from 12 May. School shop open Thu 8 May 13:00-15:00.
- 6 May: Grade 8-9 mid-term test timetable emailed to parents. Tests run 12-16 May.
- 5 May: Grade 10 career expo today, 08:00-13:00, school hall. 15 universities present. Parents welcome.
- 2 May: PTA braai fundraiser 23 May at 17:00. Tickets R120 adult, R60 child. Proceeds to science lab fund.
- 30 Apr: Open Day 24 May, 09:00-12:00. Campus tours, meet teachers, sport demos. Share with interested families.
- 28 Apr: Rugby season launch Saturday 26 Apr vs Waterkloof House. Tuckshop open. First whistle 09:00 (U13), 1st XV at 11:30.
- 25 Apr: New padel courts open! Interschool fixtures begin 24 Apr. Equipment from sport office.
- 23 Apr: Bus Route 3 schedule change from 28 Apr. Raslouw departs 06:40, Highveld Park 06:55, arrives school 07:15.
- 18 Apr: Aftercare extended hours trial — until 17:30 on Tue/Thu. R350/month extra. Register by 22 Apr.
- 16 Apr: Parent info evening tonight 18:00. Topics: exam prep, subject choices (Gr 9), university requirements (Gr 11-12).
- 15 Apr: Welcome back to Term 2. School starts 07:30. Winter uniform from 12 May.
- 14 Apr: Flu season reminder. Keep sick learners home. School nurse available 07:30-14:00.
`;

function buildSystemPrompt() {
  const today = new Date().toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `You are the Highveld Academy WhatsApp assistant, powered by TownConnect Schools.

ROLE:
You help parents, guardians, and community members find information about Highveld Academy.

RULES:
1. Only answer using the school data below. NEVER make up information.
2. If you don't have the answer, say: "I don't have that information. Please contact the school office at 012 663 4500 or email info@highveldacademy.co.za."
3. Keep answers short and clear — this is WhatsApp. Maximum 3-4 sentences unless the question needs a list.
4. When listing fixtures or events, format clearly with date, time, opponent, venue on separate lines.
5. Be warm but professional. You represent the school.
6. Detect the language and respond in the same language:
   - English message → respond in English
   - Afrikaans message → respond in Afrikaans
   - isiZulu message → respond in isiZulu
   - Sepedi message → respond in Sepedi
   - Mixed or unclear → respond in English
7. Never discuss individual learners, grades, or disciplinary matters.
8. For complaints or disputes, direct to the school office.
9. For emergencies: "For emergencies, please call the school directly at 012 663 4500."
10. Today's date is ${today}. Use this to answer "this Saturday", "next week", etc.

SCHOOL DATA:
${SCHOOL_DATA}`;
}

export { SCHOOL_DATA, buildSystemPrompt };

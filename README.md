# TownConnect Schools

WhatsApp-first school communication platform — a sister product to [TownConnect](https://www.townconnect.co.za).

The MVP demo is **Highveld Academy**, a fictional school used to prove the concept end-to-end without needing a real school in the loop.

## Stack

- React 19 + Vite 8
- Tailwind CSS 3
- React Router (BrowserRouter)
- Netlify (static hosting + Functions + Forms)
- Gemini Flash (Thursday onwards)
- WhatsApp Cloud API (Thursday onwards)

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # builds to ./dist
npm run preview  # serves the production build locally
```

## Deployment

Pushed automatically to https://townconnect-schools.netlify.app on every push to `main`.

Once DNS is configured, the site lives at **https://schools.townconnect.co.za**.

## Project layout

```
src/
  App.jsx              router
  main.jsx             React entry
  index.css            Tailwind + design tokens
  components/          Header, Footer, Hero, DemoCTA, ContactForm, ...
  pages/               Home, HowItWorks, TryDemo, ForSchools, Contact
  data/content.js      All marketing copy
  config/school.js     Highveld Academy config + brand vars
netlify/
  functions/           (Thursday) WhatsApp webhook + broadcast endpoint
```

## Environment variables

See `.env.example`. Never commit `.env`.

## Architectural rules

- **Fully isolated from the existing TownConnect bot fleet.** New repo, new Netlify site, new Google Cloud project for Gemini, new WhatsApp number.
- Site uses the `schools.townconnect.co.za` subdomain only — no new domain.
- Visual language matches the TownConnect family (forest / clay / sand on cream, Inter + Lora).

## Status

| Milestone | Status |
| --- | --- |
| Repo + Vite scaffold | done — Wed 6 May 2026 |
| 5 marketing pages | done — Wed 6 May 2026 |
| Netlify deploy | done — Wed 6 May 2026 |
| Custom subdomain | pending — Thursday |
| WhatsApp bot + Gemini | pending — Thursday |
| Broadcast endpoint | pending — Thursday |
| Pitch | target — Sunday 10 May 2026 |

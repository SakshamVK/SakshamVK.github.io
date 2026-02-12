# Saksham Khare Portfolio

Personal portfolio built with Next.js. Highlights featured projects, work experience, and a contact form with EmailJS integration.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- GSAP
- EmailJS

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment Variables

Create a `.env.local` file (or copy from `.env.local.example`) and set:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

EmailJS template variables expected by the form:

- `from_name`
- `reply_to`
- `message`
- `to_email`

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - start production server
- `npm run lint` - run linting

## Deployment

Deploy on Vercel or any platform that supports Next.js.

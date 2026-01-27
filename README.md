# TenderAI 🏛️

**AI-powered government tender response generator for Australian businesses.**

Win more government contracts by generating professional, compliant tender responses in seconds.

## Features

- 🤖 AI-powered tender response generation
- 📋 Addresses selection criteria directly
- 🇦🇺 Trained on Australian government tender conventions
- ⚡ Generate professional drafts in seconds
- 📝 Customizable with your company information

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Copy `.env.local` and add your OpenRouter API key:

```bash
OPENROUTER_API_KEY=your_key_here
```

Get a key at https://openrouter.ai/keys

### 3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS
- Vercel AI SDK
- OpenRouter (Claude Sonnet 4)

## Pricing Model

- **Free**: 5 responses/month
- **Pro**: $99/month - 100 responses
- **Enterprise**: $299/month - Unlimited

## Roadmap

- [ ] User authentication (Clerk/NextAuth)
- [ ] Usage tracking & limits
- [ ] Stripe payment integration
- [ ] RAG with AusTender data (155K contracts)
- [ ] Document upload (analyze tender PDFs)
- [ ] Response templates library
- [ ] Export to Word/PDF
- [ ] Team collaboration

## License

MIT

---

Built with 🪶 by Magpie + Jaya

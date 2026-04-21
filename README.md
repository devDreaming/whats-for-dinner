# What's for Dinner

A meal recommendation app that uses Claude AI to suggest dinner ideas based on your preferences and available ingredients.

Live demo: https://whats-for-dinner.up.railway.app/

## How it works

Answer a short questionnaire about your dietary restrictions, cuisine preferences, cooking time, available ingredients, and mood — then get a personalized meal recommendation powered by Claude.

You can save recommendations to revisit later.

## Tech stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI**: Anthropic Claude (`@anthropic-ai/sdk`)
- **Deployment**: Railway (monorepo)

## Project structure

```
whats-for-dinner/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/
│       ├── hooks/
│       └── pages/
└── server/          # Express backend
    └── src/
        ├── routes/
        └── services/
```

## Getting started

### Prerequisites

- Node.js >= 18
- An [Anthropic API key](https://console.anthropic.com/)

### Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the `server/` directory:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

3. Start the development servers:
   ```bash
   npm run dev
   ```

   The client runs on `http://localhost:5173` and the server on `http://localhost:3000`.

### Build

```bash
npm run build
```

### Deploy

This project is configured for deployment on [Railway](https://railway.app/) via `railway.json`.

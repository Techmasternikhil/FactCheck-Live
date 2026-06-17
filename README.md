# 🕵️ FactCheck Live — Keyless Local Edition

A real-time **fake news detector** that fetches live headlines from Google News and uses a **local heuristic algorithm** to score each headline's credibility. Built as part of the **5-Day AI Agents Intensive Vibe Coding Course with Google**.

---

## ✨ Features

- 🔍 **Per-headline Fact Check** — Click "Check" on any card to analyze it locally
- ⚡ **Check All** — Fact-check every headline in the feed at once
- 📊 **Credibility Score (0–100)** — Animated score bar with color coding
- 🏷️ **Verdict Badge** — ✅ Likely Real / ⚠️ Uncertain / ❌ Likely Fake
- 🤖 **Local Engine** — 1-2 sentence reason + red flag tags generated locally (No API key needed!)
- 📈 **Live Stats Bar** — Feed-wide average score and real/uncertain/fake breakdown
- 🌐 **No API key for news** — Powered by Google News RSS feeds

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the server
```bash
node server.js
```
Then open **http://localhost:3000** in your browser.

---

## 🗂️ Project Structure

```
├── index.js          # CLI tool (commander + chalk)
├── server.js         # Express server + /api/news + /api/fact-check
├── public/
│   └── index.html    # Web UI — FactCheck Live dashboard
├── .env              # Your API key (never commit this!)
├── .env.example      # Example env file to share
├── demo_bad_code.py  # Python demo for AI code review
├── package.json
└── .gitignore
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| `rss-parser` | Parse Google News RSS feeds |
| `express` | Local web server & REST API |
| `commander` | CLI argument parsing |
| `chalk` | Terminal color output |

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/news` | GET | Fetch headlines (`?search=topic&limit=10`) |
| `/api/fact-check` | POST | Fact-check a headline via local heuristics |

### `/api/fact-check` example
```json
POST /api/fact-check
{ "title": "Scientists discover cure for all diseases", "source": "Unknown Blog" }

Response:
{
  "score": 12,
  "verdict": "Likely Fake",
  "reason": "Headline is highly sensationalist with no credible source. Such broad medical claims are extremely unlikely.",
  "flags": ["Sensationalist language", "No credible source", "Unverifiable claim"]
}
```

---

## 📚 Course Context

This project is part of the **5-Day AI Agents Intensive Vibe Coding Course with Google**, exploring:
- Building CLI tools with Node.js
- Wrapping tools in a web UI
- **Extending with AI agents (Gemini API)** ← You are here

---

## ⚠️ Disclaimer

Verdicts are **probabilistic estimates**, not absolute truths. The local algorithm analyzes headline language, tone, and sources using basic heuristics. Always cross-check with multiple reputable sources.

---

## 📄 License

ISC

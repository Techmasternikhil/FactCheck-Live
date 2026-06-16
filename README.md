# 📡 GNews — Live News Dashboard

A sleek CLI + Web UI tool that fetches live headlines from Google News RSS feeds. Built as part of the **5-Day AI Agents Intensive Vibe Coding Course with Google**.

---

## ✨ Features

- 🌐 **Web UI** — Beautiful dark-mode news dashboard
- 💻 **CLI** — Terminal-based news fetcher
- 🔍 **Search** — Find news on any topic
- ⚡ **Fast** — No API key needed, powered by Google News RSS
- 🎨 **Animated cards** with source, timestamps & links

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the Web UI
```bash
node server.js
```
Then open **http://localhost:3000** in your browser.

### 3. Or use the CLI
```bash
# Top 10 headlines
node index.js

# Search a topic
node index.js --search "Artificial Intelligence"

# Limit results
node index.js -s "crypto" -n 5
```

---

## 🗂️ Project Structure

```
├── index.js          # CLI tool (commander + chalk)
├── server.js         # Express web server + API
├── public/
│   └── index.html    # Web UI (dark-mode dashboard)
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

## 📚 Course Context

This project is part of the **5-Day AI Agents Intensive Vibe Coding Course with Google**, exploring:
- Building CLI tools with Node.js
- Wrapping tools in a web UI
- Extending with AI agents (Gemini API)

---

## 📄 License

ISC

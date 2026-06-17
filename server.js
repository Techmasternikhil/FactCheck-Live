import express from 'express';
import Parser from 'rss-parser';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const parser = new Parser();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ─── News Feed API ───────────────────────────────────────────────────────────
app.get('/api/news', async (req, res) => {
  try {
    const { search, limit = 10 } = req.query;

    let feedUrl = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';
    if (search && search.trim()) {
      const query = encodeURIComponent(search.trim());
      feedUrl = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
    }

    const feed = await parser.parseURL(feedUrl);
    const items = feed.items.slice(0, parseInt(limit, 10)).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: item.source?.title || extractSource(item.title),
    }));

    res.json({ title: feed.title, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Local Heuristic Fact Check API ──────────────────────────────────────────
const reputableSources = [
  'bbc', 'reuters', 'associated press', 'ap news', 'npr', 'pbs', 'wsj',
  'the new york times', 'nytimes', 'the washington post', 'bloomberg',
  'the guardian', 'financial times', 'the verge', 'techcrunch', 'wired'
];

const clickbaitKeywords = [
  'shocking', 'miracle', "you won't believe", 'secret', 'mind-blowing',
  'insane', 'destroy', 'banned', 'genius', 'unbelievable', 'exposed', 'truth about'
];

app.post('/api/fact-check', (req, res) => {
  try {
    const { title, source } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    let score = 50; // Base score
    const flags = [];
    const lowerTitle = title.toLowerCase();
    const lowerSource = (source || '').toLowerCase();

    // 1. Source check
    const isReputable = reputableSources.some(s => lowerSource.includes(s));
    if (isReputable) {
      score += 25;
      flags.push('Reputable Source');
    } else {
      score -= 5;
      flags.push('Unknown Source');
    }

    // 2. Sensationalist language check
    const usedClickbait = clickbaitKeywords.filter(k => lowerTitle.includes(k));
    if (usedClickbait.length > 0) {
      score -= (15 * usedClickbait.length);
      flags.push('Sensationalist Language');
    }

    // 3. Punctuation check (excessive exclamation/question marks)
    if ((title.match(/[!?]{2,}/) || []).length > 0) {
      score -= 10;
      flags.push('Excessive Punctuation');
    }

    // 4. ALL CAPS check (more than 30% of characters are uppercase)
    const upperCount = (title.match(/[A-Z]/g) || []).length;
    const alphaCount = (title.match(/[a-zA-Z]/g) || []).length;
    if (alphaCount > 10 && (upperCount / alphaCount) > 0.3) {
      score -= 15;
      flags.push('Excessive Capitalization');
    }

    // Cap score between 0 and 100
    score = Math.max(0, Math.min(100, score));

    // Determine verdict and reason
    let verdict;
    let reason;

    if (score >= 70) {
      verdict = 'Likely Real';
      reason = 'Headline uses factual tone and originates from a recognizable or reputable source.';
    } else if (score >= 40) {
      verdict = 'Uncertain';
      reason = 'Some signs of sensationalism or unverified source origin. Cross-check recommended.';
    } else {
      verdict = 'Likely Fake';
      reason = 'High indicators of clickbait, sensationalist language, or very low source credibility.';
    }

    // Add some artificial delay to simulate checking
    setTimeout(() => {
      res.json({ score, verdict, reason, flags: flags.slice(0, 3) });
    }, 800);

  } catch (err) {
    console.error('Fact-check error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function extractSource(title) {
  const match = title?.match(/ - ([^-]+)$/);
  return match ? match[1].trim() : 'Google News';
}

app.listen(PORT, () => {
  console.log(`\n🚀 GNews Fact Checker (Local Engine) running at http://localhost:${PORT}\n`);
});

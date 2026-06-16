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

function extractSource(title) {
  const match = title?.match(/ - ([^-]+)$/);
  return match ? match[1].trim() : 'Google News';
}

app.listen(PORT, () => {
  console.log(`\n🚀 GNews UI running at http://localhost:${PORT}\n`);
});

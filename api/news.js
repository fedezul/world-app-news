export default async function handler(req, res) {
  try {
    const { category, query } = req.query;
    const API_KEY = process.env.GNEWS_API_KEY;

    let url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=it`;

    if (category) url += `&category=${category}`;
    if (query) url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${API_KEY}&lang=it`;

    const response = await fetch(url, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Errore dalla API GNews' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
}

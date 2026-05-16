export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { path, ...params } = req.query;
    const query = new URLSearchParams(params).toString();
    const url = https://api-football-v1.p.rapidapi.com/v3/${path}${query ? "?" + query : ""};

    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": "fcd8d80d34msh5262affbb668a07p1760a3jsne36b5e920dfb",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

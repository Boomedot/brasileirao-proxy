const https = require("https");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { path, ...params } = req.query;
  const query = new URLSearchParams(params).toString();
  const url = https://api-football-v1.p.rapidapi.com/v3/${path}${query ? "?" + query : ""};

  const options = {
    hostname: "api-football-v1.p.rapidapi.com",
    path: /v3/${path}${query ? "?" + query : ""},
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fcd8d80d34msh5262affbb668a07p1760a3jsne36b5e920dfb",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  return new Promise((resolve) => {
    const request = https.get(options, (response) => {
      let data = "";
      response.on("data", chunk => data += chunk);
      response.on("end", () => {
        try {
          res.status(200).json(JSON.parse(data));
        } catch {
          res.status(500).json({ error: "Failed to parse response" });
        }
        resolve();
      });
    });
    request.on("error", (err) => {
      res.status(500).json({ error: err.message });
      resolve();
    });
  });
}

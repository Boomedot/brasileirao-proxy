export const config = { runtime: "edge" };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  searchParams.delete("path");

  const query = searchParams.toString();
  const url = https://api-football-v1.p.rapidapi.com/v3/${path}${query ? "?" + query : ""};

  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": "fcd8d80d34msh5262affbb668a07p1760a3jsne36b5e920dfb",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

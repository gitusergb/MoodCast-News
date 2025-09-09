// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;
const NEWS_API_KEY = "9b3e696ded6b0d99a137d111b0c421eb";

app.get("/news", async (req, res) => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`
  );
  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => console.log(`Proxy running at http://localhost:${PORT}`));

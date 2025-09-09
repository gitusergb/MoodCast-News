
const GNEWS_API_KEY = "9b3e696ded6b0d99a137d111b0c421eb";
const BASE_URL = `https://gnews.io/api/v4`;

export async function getTopHeadlines(category: string = "general") {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?category=general&lang=en&country=in&max=10&apikey=${GNEWS_API_KEY}`
    );
    const data = await response.json();

    // Debug log
    // console.log("News API response:", data);

    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

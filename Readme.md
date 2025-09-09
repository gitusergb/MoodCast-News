# MoodCast News 🌤️📰

## Overview

This project is a **mobile application built using React-Native and TypeScript** that provides users with current weather information **and news headlines filtered based on the weather**. The app features an intuitive interface, supports dark and light themes, and allows users to customize temperature units and news categories.

A unique feature of this app is **weather-based news filtering**: the news mood adapts depending on the current weather — cold, hot, or cool.

---

## Features

* **Weather Information:** Shows current location, temperature, weather conditions, and a 5-day forecast.
* **News Headlines:** Displays the latest news with brief descriptions and links to full articles.
* **Weather-Based News Filtering:**

  * Cold → depressing news
  * Hot → fear-related news
  * Cool → happy/winning news
* **User Preferences:**

  * Toggle between Celsius (°C) and Fahrenheit (°F)
  * Select preferred news categories
  * Dark/Light mode toggle
* **Responsive & Modern UI:** Works well on various screen sizes and devices.
* **Logo & Branding:** Custom logo displayed at the top of the app.

---

## Screenshots

![App](https://i.ibb.co/RT4F6FTf/6197099211095393777.jpg)
![Weather App Light Mode](https://i.ibb.co/SXmkTvH1/6197099211095393775.jpg)
![Weather App Dark Mode](https://i.ibb.co/BVtHZjgn/6197099211095393776.jpg)

---

## Technologies Used

* **Frontend:** React-Native, TypeScript
* **State Management:** Provider (or Riverpod)
* **Weather API:** [OpenWeatherMap API](https://openweathermap.org/api)
* **News API:** [NewsAPI](https://gnews.org)
* **Version Control:** Git

---

## Getting Started

### Prerequisites

* Node.js installed
* Expo CLI installed
* Android Studio / Xcode for mobile simulators
* API keys for:

  * **OpenWeatherMap API**
  * **gnews**

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/gitusergb/
```

2. Navigate to the project folder:

```bash
cd weather-news-app
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Create a `config.ts` file in `src` and add your API keys:

```ts
export const WEATHER_API_KEY = "your_openweather_api_key";
export const NEWS_API_KEY = "your_newsapi_key";
```

---

### Running the Application

1. Start the Expo server:

```bash
npx expo start
```

2. Open the app on an emulator or real device using the Expo Go app.

---

## Approach and Design

* **React-Native & TypeScript:** For building a modern, type-safe mobile app.
* **Weather API Integration:** Fetches real-time weather and 5-day forecast.
* **News API Integration:** Fetches latest headlines from user-selected categories.
* **Weather-Based Filtering Logic:** Filters news articles depending on weather mood.
* **Context & State Management:** Uses React Context (Provider) to handle theme, units, and category preferences.
* **Dark/Light Mode:** Dynamically updates colors for the entire app, including text, cards, switches, and background.
* **Custom Logo & Modern UI:** Visually appealing design with responsive layouts and user-friendly interface.

---

## Known Issues / Limitations

* **API Rate Limits:** Excessive requests may lead to temporary blocking.
* **Geolocation Accuracy:** Location-based weather may vary depending on device.
* **Cross-Platform Differences:** Minor UI differences may occur between iOS and Android.

---

## Live Demo

* **Netlify / Expo Web:** [Try the App Online]()

---

## Repository

* **GitHub:** [https://github.com/gitusergb/](https://github.com/gitusergb/)

---

## Contact

Feel free to reach out for questions or feedback:
 <a href="mailto:g4ur131@gmail.com"> <img align="left" alt="Gmail" width="26px" src="https://www.vectorlogo.zone/logos/gmail/gmail-icon.svg" /> </a>

Thank you!


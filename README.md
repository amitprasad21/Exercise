# 🏋️‍♂️ Gym Exercises App - 100% Free Architecture

![React](https://img.shields.io/badge/React-18-blue.svg)
![Material-UI](https://img.shields.io/badge/Material--UI-v5-blue.svg)
![Status](https://img.shields.io/badge/Status-Fully%20Functional-brightgreen.svg)
![APIs](https://img.shields.io/badge/APIs-100%25%20Free-success.svg)

A modern, completely free React fitness application that helps users discover exercises, filter by body part, view targeted muscle groups, exercise details, and watch related tutorial videos.

## 🚀 Project Overview

This app was originally built to rely on paid subscription tiers via RapidAPI (ExerciseDB & YouTube Search). However, **this repository has been completely refactored to use a 100% free architecture**. 

You no longer need to worry about rate limits, 403 Forbidden errors, or paying for API keys. 

### How it Works (The Free Architecture)
1. **Exercise Data**: The app fetches over 870+ detailed exercises dynamically from a public-domain, static GitHub JSON repository (`free-exercise-db`). It perfectly mocks the original database natively in the client.
2. **Video Integration**: Instead of the locked YouTube RapidAPI, this app now natively integrates the **Dailymotion Public Search API**. It fetches live, real exercise tutorial clips dynamically based on your search queries—completely free and without requiring any authentication keys.
3. **Graceful Fallbacks**: The application infrastructure is highly defensive. Should any external requests fail, the app gracefully falls back to intelligent mock data rather than breaking or endlessly loading.

---

## ✨ Features

- **Responsive Design**: Fluidly snapping grid layouts and scaled typography ensures the app looks stunning on Ultra-Wide monitors and small smartphones alike.
- **Search Functionality**: Instantly search by exercise name, target muscle, equipment, or body part using the dynamic client-side filtering engine.
- **Category Scroller**: A smooth horizontal scrollbar allowing you to filter cleanly by specific targeted categories (e.g., strength, cardio, back, chest).
- **Exercise Details**: Comprehensive, dedicated detail pages explaining exactly how to perform the movement.
- **Dynamic Videos**: Integrated live Dailymotion streaming cards that provide video instructions for the exact exercise you clicked on.
- **Similar Exercises**: Smart suggestions linking you exclusively to exercises that use the same equipment or target the same primary muscle group.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Routing**: React Router DOM v6
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Data Fetching**: Native Javascript `Fetch` API
- **Free Exercise DB**: `yuhonas/free-exercise-db` (Public Domain JSON)
- **Free Video API**: Dailymotion Open REST API

---

## 💻 Setup Instructions

Because the application has been untethered from paid API constraints, getting it running locally is incredibly fast and simple!

### 1. Clone & Install
Open your terminal in the project root and install the dependencies:
```bash
npm install
```

### 2. Environment Variables (Optional)
The original `REACT_APP_RAPID_API_KEY` is completely **optional** now. 
- If you have a RapidAPI YouTube Search key, the app will gracefully detect it and use it. 
- If you *don't* have an API key, the app seamlessly ignores it and uses the Dailymotion integration and local caching instead.

### 3. Start the Server
```bash
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser. The app will immediately load without rate limits.

---

## 📂 Folder Structure

```
├── src/
│   ├── assets/         # Local icons and static graphic assets
│   ├── components/     # Reusable UI features (Search, Cards, Detail UI)
│   ├── pages/          # Full page views (Home, ExerciseDetail)
│   ├── utils/          # Core network logic (fetchData.js handles the Free API routing)
│   ├── App.js          # App shell and standard routing
│   └── App.css         # Responsive styling instructions
```

## 🤝 Future Improvements

- Fully transition legacy API structures out of the codebase for cleaner static data mapping.
- Add user-authentication to save "Favorite" exercises to a personal dashboard.
- Create custom playlists of daily workout routines.

Enjoy building and exploring!

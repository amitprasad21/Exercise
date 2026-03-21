# Exercise App

A React fitness application that helps users discover exercises, filter by body part, view exercise details, and watch related YouTube videos.

## Project Overview

This app uses the ExerciseDB RapidAPI service for exercise data and YouTube Search and Download RapidAPI service for video results.

Main user flow:

1. Open home page.
2. Search or filter exercises by body part.
3. Open an exercise detail page.
4. View target/equipment related exercises and videos.

## Features

- Exercise list with pagination.
- Search by exercise name, target muscle, equipment, and body part.
- Horizontal body-part scroller.
- Exercise detail page.
- Related YouTube exercise videos.
- Similar exercises by target muscle and equipment.
- Infinity loader with status messages.
- Defensive API handling for non-array/error responses.

## Tech Stack

- React 18
- React Router v6
- Material UI (MUI)
- react-horizontal-scrolling-menu
- react-loader-spinner
- RapidAPI services:
	- exercisedb.p.rapidapi.com
	- youtube-search-and-download.p.rapidapi.com

## Folder Structure

Top-level structure:

- src/components: reusable UI and feature components
- src/pages: route pages
- src/utils/fetchData.js: API base URLs, endpoint builders, request helpers
- src/assets: icons and images

Important files:

- src/App.js: app shell and routes
- src/pages/Home.js: home page
- src/pages/ExerciseDetail.js: detail page
- src/components/Exercises.js: list, pagination, loading/error states
- src/components/SearchExercises.js: body-part list and text search
- src/utils/fetchData.js: RapidAPI request layer and endpoint map

## Setup Instructions

### 1. Clone and install

Run in project root:

```bash
npm install
```

### 2. Configure environment variables

Create a file named .env in the project root and add:

```env
REACT_APP_RAPID_API_KEY=your_rapidapi_key_here
```

Notes:

- The app reads the key from process.env.REACT_APP_RAPID_API_KEY.
- Restart the dev server after changing .env.
- Never commit your real API key.

### 3. Start development server

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Available Scripts

- npm start: run in development mode
- npm run build: build production bundle
- npm test: run tests

## API Notes

Current endpoint patterns used:

- /exercises
- /exercises/bodyPartList
- /exercises/bodyPart/{bodyPart}
- /exercises/exercise/{id}
- /exercises/target/{target}
- /exercises/equipment/{equipment}
- /image?exerciseId={id}&resolution={size}

Do not use placeholder paths like:

- /exercises/exercise/%7Bid%7D
- /exercises/bodyPart/%7BbodyPart%7D

Replace placeholders with real values, for example:

- /exercises/exercise/0001
- /exercises/bodyPart/back

## Troubleshooting

### Continuous loading

Possible cause:

- API errors or invalid response shape.

What to check:

1. .env contains REACT_APP_RAPID_API_KEY.
2. Dev server restarted after .env change.
3. Browser console/network for 403 or 429 responses.

### HTTP 429 (Too Many Requests)

Cause:

- RapidAPI rate limit exceeded.

What to do:

1. Wait for quota reset.
2. Upgrade/adjust RapidAPI plan if needed.
3. Add retries or caching if you extend this project.

### HTTP 403 (Forbidden)

Cause:

- Invalid, expired, or unauthorized API key.

What to do:

1. Regenerate key in RapidAPI dashboard.
2. Update .env value.
3. Restart app.

## Build and Deployment

Build for production:

```bash
npm run build
```

Output is generated in the build folder and can be deployed to any static hosting provider.

## Future Improvements

- Add retry button for failed requests.
- Add request throttling/caching.
- Add unit tests for API helpers and list filtering.
- Add centralized error boundary for route-level failure handling.

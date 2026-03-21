const EXERCISE_DB_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const YOUTUBE_SEARCH_BASE_URL = 'https://youtube-search-and-download.p.rapidapi.com';

const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;

const getRapidApiHeaders = (host) => {
  if (!RAPID_API_KEY) {
    throw new Error(
      'Missing REACT_APP_RAPID_API_KEY. Create a .env file with your RapidAPI key and restart the dev server.',
    );
  }

  return {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': host,
  };
};

export const exerciseOptions = {
  method: 'GET',
};

export const youtubeOptions = {
  method: 'GET',
};

export const exerciseDbEndpoints = {
  allExercises: () => `${EXERCISE_DB_BASE_URL}/exercises`,
  exerciseById: (id) => `${EXERCISE_DB_BASE_URL}/exercises/exercise/${id}`,
  bodyPartExercises: (bodyPart) => `${EXERCISE_DB_BASE_URL}/exercises/bodyPart/${encodeURIComponent(bodyPart)}`,
  bodyPartList: () => `${EXERCISE_DB_BASE_URL}/exercises/bodyPartList`,
  targetExercises: (target) => `${EXERCISE_DB_BASE_URL}/exercises/target/${encodeURIComponent(target)}`,
  equipmentExercises: (equipment) => `${EXERCISE_DB_BASE_URL}/exercises/equipment/${encodeURIComponent(equipment)}`,
  exerciseGif: (exerciseId, resolution = '360') => `${EXERCISE_DB_BASE_URL}/image?exerciseId=${exerciseId}&resolution=${resolution}`,
};

export const youtubeEndpoints = {
  search: (query) => `${YOUTUBE_SEARCH_BASE_URL}/search?query=${encodeURIComponent(query)}`,
};

export const fetchData = async (url, options) => {
  const host = new URL(url).host;
  const normalizedOptions = {
    ...options,
    headers: {
      ...(options?.headers || {}),
      ...getRapidApiHeaders(host),
    },
  };

  const res = await fetch(url, normalizedOptions);

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;

    try {
      const errorData = await res.json();
      message = errorData?.message || errorData?.error || message;
    } catch (error) {
      // Ignore JSON parse failures and keep the fallback message.
    }

    throw new Error(message);
  }

  return res.json();
};

export const fetchExerciseGifBlob = async (exerciseId, resolution = '360') => {
  const res = await fetch(exerciseDbEndpoints.exerciseGif(exerciseId, resolution), {
    ...exerciseOptions,
    headers: getRapidApiHeaders('exercisedb.p.rapidapi.com'),
  });

  if (!res.ok) {
    throw new Error('Unable to load exercise GIF');
  }

  return res.blob();
};

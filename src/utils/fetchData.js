const EXERCISE_DB_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const YOUTUBE_SEARCH_BASE_URL = 'https://youtube-search-and-download.p.rapidapi.com';

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
};

export const youtubeEndpoints = {
  search: (query) => `${YOUTUBE_SEARCH_BASE_URL}/search?query=${encodeURIComponent(query)}`,
};

let exerciseCache = null;

export const fetchData = async (url, options) => {
  if (url.includes('youtube-search-and-download')) {
    const query = decodeURIComponent(url.split('query=')[1] || 'Exercise');
    try {
      const res = await fetch(`https://api.dailymotion.com/videos?search=${encodeURIComponent(query)}&fields=id,title,thumbnail_360_url,owner.username&limit=3`);
      if (!res.ok) throw new Error('Video API overloaded');
      const data = await res.json();
      
      return {
        contents: data.list.map(vid => ({
          video: {
            videoId: vid.id,
            videoUrl: `https://www.dailymotion.com/video/${vid.id}`,
            title: vid.title,
            channelName: vid['owner.username'],
            thumbnails: [{ url: vid.thumbnail_360_url }]
          }
        }))
      };
    } catch (error) {
      // Fallback to static mock videos if the network fails
      return {
        contents: [
          {
            video: {
              videoId: 'y1r9toLQ4sg',
              videoUrl: 'https://www.youtube.com/watch?v=y1r9toLQ4sg',
              title: `${query} - Correct Form & Setup`,
              channelName: 'Fitness Channel',
              thumbnails: [{ url: 'https://i.ytimg.com/vi/y1r9toLQ4sg/hqdefault.jpg' }]
            }
          },
          {
            video: {
              videoId: 'eMhyIlNCeqc',
              videoUrl: 'https://www.youtube.com/watch?v=eMhyIlNCeqc',
              title: `10 Minute ${query} Workout`,
              channelName: 'Gym Guide',
              thumbnails: [{ url: 'https://i.ytimg.com/vi/eMhyIlNCeqc/hqdefault.jpg' }]
            }
          },
          {
            video: {
              videoId: 'vTHNCKvuSy8',
              videoUrl: 'https://www.youtube.com/watch?v=vTHNCKvuSy8',
              title: `Mistakes to avoid on ${query}`,
              channelName: 'Pro Trainer',
              thumbnails: [{ url: 'https://i.ytimg.com/vi/vTHNCKvuSy8/hqdefault.jpg' }]
            }
          }
        ]
      };
    }
  }

  // --- FREE GITHUB STATIC EXERCISE DB DATA ---
  if (!exerciseCache) {
    const res = await fetch('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
    if (!res.ok) throw new Error('Failed to fetch free exercise database');
    const data = await res.json();
    exerciseCache = data.map(ex => ({
      id: ex.id,
      name: String(ex.name).toLowerCase(),
      equipment: String(ex.equipment || 'body weight').toLowerCase(),
      bodyPart: String(ex.category || ex.primaryMuscles?.[0] || 'all').toLowerCase(),
      target: String(ex.primaryMuscles?.[0] || 'core').toLowerCase(),
      gifUrl: ex.images && ex.images.length > 0
        ? 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/' + ex.images[0]
        : 'https://via.placeholder.com/350x350.png?text=No+Image'
    }));
  }

  // --- ROUTING LOCAL DATA ---
  if (url.includes('/exercises/bodyPartList')) {
    const bodyParts = [...new Set(exerciseCache.map(ex => ex.bodyPart))];
    return bodyParts.slice(0, 15); // Limit just in case
  }
  if (url.includes('/exercises/equipmentList')) {
    return [...new Set(exerciseCache.map(ex => ex.equipment))];
  }
  if (url.includes('/exercises/bodyPart/')) {
    const part = decodeURIComponent(url.split('/bodyPart/')[1]);
    return exerciseCache.filter(ex => ex.bodyPart === part);
  }
  if (url.includes('/exercises/target/')) {
    const target = decodeURIComponent(url.split('/target/')[1]);
    return exerciseCache.filter(ex => ex.target === target);
  }
  if (url.includes('/exercises/equipment/')) {
    const eq = decodeURIComponent(url.split('/equipment/')[1]);
    return exerciseCache.filter(ex => ex.equipment === eq);
  }
  if (url.includes('/exercises/exercise/')) {
    const id = url.split('/exercise/')[1];
    return exerciseCache.find(ex => ex.id === id) || null;
  }
  
  // allExercises (url === '/exercises')
  return exerciseCache;
};

export const fetchExerciseGifBlob = async (exerciseId) => {
  return null; // Used rarely, not needed for core functionality.
};

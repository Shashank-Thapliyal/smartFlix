import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getMovieRecommendations(userQuery) {
  const prompt = `
    Based on the user's request: "${userQuery}"

    Please recommend 6-8 movies that match their criteria. Consider:
    - Genre preferences
    - Actor/actress mentions
    - Mood (comedy, drama, action, etc.)
    - Language/region preferences
    - Time period if mentioned

    Respond with ONLY a JSON array of movie titles. Each title should be the exact, official movie name that would be found on TMDB.

    Example format:
    ["Movie Title 1", "Movie Title 2", "Movie Title 3"]

    Do not include any other text, explanations, or formatting - just the JSON array.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const generatedText = response.text;

    try {
      const cleanedText = generatedText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      const movieTitles = JSON.parse(cleanedText);
      return movieTitles;
    } catch (err) {
      // console.error("Error parsing the response:", err);
      // return extractMovieTitlesFromText(generatedText);
    }
  } catch (error) {
    // console.error("Error calling Gemini API:", error);
    throw error;
  }
}

// Helper function to extract movie titles from text if JSON parsing fails


export async function getMoviesDetails(movieTitles) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const moviePromises = movieTitles.map((title) => searchMovie(title));

  const movies = await Promise.all(moviePromises);

  const validMovies = [];

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    if (movie !== null) {
      const movieWithImages = {
        ...movie,
        poster_url: movie.poster_path
          ? `${imageBaseUrl}${movie.poster_path}`
          : "/placeholder-movie.jpg",
        backdrop_url: movie.backdrop_path
          ? `${imageBaseUrl}${movie.backdrop_path}`
          : null,
      };
      validMovies.push(movieWithImages);
    }
  }

  return validMovies;
}

// TMDB API configuration
const getApiOptions = () => {
  try {
    return JSON.parse(import.meta.env.VITE_API_OPTIONS);
  } catch (error) {
    // console.error("Error parsing VITE_API_OPTIONS:", error);
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2RkMjZjNjZhNTkyMjkwN2I3ZmQ1MWVjMWIzN2Q0ZiIsIm5iZiI6MTczNDU0NDg2Ni44MzcsInN1YiI6IjY3NjMwZGUyNmU1MmVkZDE2MDRhMzdkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HSfsLuywPvPRbNJU6riUksifbV9zSR59n3qJnfKt4B8",
      },
    };
  }
};

// Search for a movie by title
export async function searchMovie(title) {
  const baseUrl = "https://api.themoviedb.org/3/search/movie";
  const apiOptions = getApiOptions();

  try {
    const response = await fetch(
      `${baseUrl}?query=${encodeURIComponent(title)}&language=en-US&page=1`,
      apiOptions
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    // Return the first result if found, null otherwise
    return data.results && data.results.length > 0 ? data.results[0] : null;
  } catch (error) {
    // console.error(`Error searching for movie "${title}":`, error);
    return null;
  }
}

// Get detailed movie information by ID
export async function getMovieDetails(movieId) {
  const baseUrl = import.meta.env.VITE_MAIN_MOVIE_URL;
  const apiOptions = getApiOptions();

  try {
    const response = await fetch(
      `${baseUrl}${movieId}?language=en-US`,
      apiOptions
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error(`Error getting movie details for ID ${movieId}:`, error);
    return null;
  }
}

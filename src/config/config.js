// services/aiMovieService.js
import config from '../config/config.js';

// Get movie recommendations from Gemini AI
export async function getMovieRecommendations(userQuery) {
  const apiKey = config.GEMINI_API_KEY;
  const baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

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
    const response = await fetch(`${baseUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    try {
      const movieTitles = JSON.parse(generatedText.trim());
      return movieTitles;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return extractMovieTitlesFromText(generatedText);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

function extractMovieTitlesFromText(text) {
  const lines = text.split('\n');
  const titles = [];

  for (const line of lines) {
    const match = line.match(/^[\d\-\*\•]\s*(.+)$/);
    if (match) titles.push(match[1].trim().replace(/"/g, ''));
  }

  return titles.length > 0
    ? titles
    : [];
}


export async function searchMovie(movieTitle) {
  const apiKey = config.TMDB_API_KEY;
  const baseUrl = config.TMDB_BASE_URL;

  try {
    const response = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error(`Error searching for movie "${movieTitle}":`, error);
    return null;
  }
}

export async function getMoviesDetails(movieTitles) {
  const imageBaseUrl = config.TMDB_IMAGE_BASE_URL;

  const moviePromises = movieTitles.map(title => searchMovie(title));
  const movies = await Promise.all(moviePromises);

  return movies
    .filter(movie => movie !== null)
    .map(movie => ({
      ...movie,
      poster_url: movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '/placeholder-movie.jpg',
      backdrop_url: movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : null
    }));
}

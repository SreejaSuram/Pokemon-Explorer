import.meta.env;

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonPage = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error - fetchPokemonPage:", error);
    throw error;
  }
};

export const fetchPokemonDetails = async (idOrName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for ${idOrName}: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error - fetchPokemonDetails:", error);
    throw error;
  }
};

export const extractIdFromUrl = (url) => {
  // URLs look like: "https://pokeapi.co/api/v2/pokemon/1/"
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

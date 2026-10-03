import { useState, useEffect } from 'react';
import { fetchPokemonDetails } from '../services/pokemonApi';

export const usePokemonDetails = (id) => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadDetails = async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);
            const data = await fetchPokemonDetails(id);
            setPokemon(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDetails();
    }, [id]);

    return {
        pokemon,
        loading,
        error,
        retry: loadDetails
    };
};

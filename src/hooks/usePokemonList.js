import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPokemonPage, extractIdFromUrl } from '../services/pokemonApi';

export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const offsetRef = useRef(0);
    const isFetchingRef = useRef(false);

    const LIMIT = 20;

    const loadInitialPokemon = async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        try {
            setLoading(true);
            setError(null);

            const currentOffset = 0;
            const data = await fetchPokemonPage(LIMIT, currentOffset);

            const formattedResults = data.results.map(p => ({
                ...p,
                id: extractIdFromUrl(p.url)
            }));

            setPokemonList(formattedResults);

            offsetRef.current = currentOffset + LIMIT;
            setHasMore(data.next !== null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    useEffect(() => {
        loadInitialPokemon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMore = useCallback(async () => {
        if (isFetchingRef.current || !hasMore) return;

        isFetchingRef.current = true;
        setLoadingMore(true);
        setError(null);

        try {
            const currentOffset = offsetRef.current;
            const data = await fetchPokemonPage(LIMIT, currentOffset);

            const formattedResults = data.results.map(p => ({
                ...p,
                id: extractIdFromUrl(p.url)
            }));

            setPokemonList(prev => {
                const map = new Map(prev.map(p => [p.id, p]));
                formattedResults.forEach(p => map.set(p.id, p));
                return Array.from(map.values());
            });

            offsetRef.current = currentOffset + LIMIT;
            setHasMore(data.next !== null);
        } catch (err) {
            setError(err);
        } finally {
            setLoadingMore(false);
            isFetchingRef.current = false;
        }
    }, [hasMore]);

    return {
        pokemonList,
        loading,
        loadingMore,
        error,
        hasMore,
        loadMore,
        retry: loadInitialPokemon
    };
};

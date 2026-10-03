import React, { useRef, useEffect, useCallback } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import PokemonCard from '../components/PokemonCard';
import { LoadingGrid, LoadingMoreIndicator } from '../components/LoadingStates';
import ErrorMessage from '../components/ErrorMessage';

const PokemonList = () => {
    const { pokemonList, loading, loadingMore, error, hasMore, loadMore, retry } = usePokemonList();
    const loadMoreCallbackRef = useRef(() => { });

    // Always keep it updated with the latest states/functions securely
    useEffect(() => {
        loadMoreCallbackRef.current = () => {
            if (hasMore && !loadingMore && !loading && !error) {
                loadMore();
            }
        };
    }, [hasMore, loadingMore, loading, error, loadMore]);

    const observer = useRef(null);

    const sentinelRef = useCallback((node) => {
        if (loading) return; // Don't observe yet during initial load when everything is null

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMoreCallbackRef.current();
            }
        }, {
            root: null,
            rootMargin: "50px",
            threshold: 0
        });

        if (node) {
            observer.current.observe(node);
        }
    }, [loading]);

    if (loading && pokemonList.length === 0) {
        return (
            <div className="pokemon-list-page">
                <LoadingGrid count={20} />
            </div>
        );
    }

    if (error && pokemonList.length === 0) {
        return (
            <div className="pokemon-list-page centered-full">
                <ErrorMessage message={error.message} onRetry={retry} />
            </div>
        );
    }

    return (
        <div className="pokemon-list-page">
            <div className="pokemon-grid">
                {pokemonList.map((p) => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
            </div>

            {loadingMore && <LoadingMoreIndicator />}

            {error && pokemonList.length > 0 && (
                <div className="pagination-error">
                    <ErrorMessage message="Failed to load more Pokémon." onRetry={retry} />
                </div>
            )}

            {!hasMore && !loading && (
                <div className="loading-more">
                    <p>You've seen all Pokémon!</p>
                </div>
            )}

            {/* The sentinel remains mounted as long as there's more to avoid observer getting disrupted by unmount/mounts */}
            {hasMore && !error && !loading && (
                <div ref={sentinelRef} className="scroll-sentinel" />
            )}
        </div>
    );
};

export default PokemonList;

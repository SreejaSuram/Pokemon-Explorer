import React from 'react';

export const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
        </div>
    );
};

export const LoadingCard = () => {
    return (
        <div className="pokemon-card skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-image"></div>
            <div className="skeleton-title"></div>
        </div>
    );
};

export const LoadingGrid = ({ count = 20 }) => {
    return (
        <div className="pokemon-grid">
            {Array.from({ length: count }).map((_, i) => (
                <LoadingCard key={i} />
            ))}
        </div>
    );
};

export const LoadingMoreIndicator = () => {
    return (
        <div className="loading-more">
            <div className="loading-spinner small"></div>
            <span>Loading more Pokémon...</span>
        </div>
    );
};

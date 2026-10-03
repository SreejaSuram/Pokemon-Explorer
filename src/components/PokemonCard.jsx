import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
    const [imgError, setImgError] = useState(false);
    const { name, id } = pokemon;

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    const formatId = (id) => {
        return `#${String(id).padStart(3, '0')}`;
    };

    const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <Link to={`/pokemon/${id}`} className="pokemon-card">
            <div className="pokemon-card-header">
                <span className="pokemon-id">{formatId(id)}</span>
            </div>
            <div className="pokemon-image-container">
                {!imgError ? (
                    <img
                        src={imageUrl}
                        alt={`${name} official artwork`}
                        className="pokemon-image"
                        onError={(e) => {
                            if (e.target.src !== fallbackUrl) {
                                e.target.src = fallbackUrl;
                            } else {
                                setImgError(true);
                            }
                        }}
                        loading="lazy"
                    />
                ) : (
                    <div className="pokemon-image-fallback">
                        ?
                    </div>
                )}
            </div>
            <div className="pokemon-card-info">
                <h2 className="pokemon-name">{capitalize(name)}</h2>
            </div>
        </Link>
    );
};

export default PokemonCard;

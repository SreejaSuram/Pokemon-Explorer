import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft } from 'lucide-react';

const PokemonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pokemon, loading, error, retry } = usePokemonDetails(id);

    if (loading) {
        return (
            <div className="details-container skeleton-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                <div className="skeleton-title" style={{ height: '35px', width: '200px' }}></div>
                <div className="skeleton-image" style={{ width: '300px', height: '300px', marginTop: '1rem' }}></div>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="details-container">
                <ErrorMessage message={error?.message || "Pokémon not found"} onRetry={retry} showBack />
            </div>
        );
    }

    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    const formatId = (id) => `#${String(id).padStart(3, '0')}`;

    const getStatPercent = (baseStat) => {
        return Math.min(100, Math.max(0, (baseStat / 150) * 100));
    };

    const getStatLabel = (statName) => {
        const labels = {
            'hp': 'HP',
            'attack': 'Attack',
            'defense': 'Defense',
            'special-attack': 'Sp. Atk',
            'special-defense': 'Sp. Def',
            'speed': 'Speed'
        };
        return labels[statName] || statName.toUpperCase();
    };

    const artwork = pokemon.sprites?.other?.['official-artwork']?.front_default ||
        pokemon.sprites?.front_default;

    return (
        <div className="details-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} />
                <span>Back to Pokémon</span>
            </button>

            <div className="details-card">
                <div className="details-header">
                    <span className="details-id">{formatId(pokemon.id)}</span>
                    <h1 className="details-name">{capitalize(pokemon.name)}</h1>
                </div>

                <div className="details-layout">
                    <div className="details-image-col">
                        <div className="details-image-wrapper">
                            {artwork ? (
                                <img src={artwork} alt={pokemon.name} className="details-image" />
                            ) : (
                                <div style={{ fontSize: '4rem', color: '#ccc' }}>?</div>
                            )}
                        </div>

                        <div className="details-types">
                            {pokemon.types.map((t) => (
                                <span
                                    key={t.type.name}
                                    className={`type-badge type-${t.type.name}`}
                                >
                                    {capitalize(t.type.name)}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="details-info-col">
                        <section className="info-section">
                            <h2>Basic Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Height</span>
                                    <span className="info-value">{pokemon.height / 10} m</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Weight</span>
                                    <span className="info-value">{pokemon.weight / 10} kg</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Base EXP</span>
                                    <span className="info-value">{pokemon.base_experience}</span>
                                </div>
                            </div>
                        </section>

                        <section className="info-section">
                            <h2>Abilities</h2>
                            <div className="abilities-list">
                                {pokemon.abilities.map(a => (
                                    <span key={a.ability.name} className="ability-badge">
                                        {capitalize(a.ability.name)}
                                        {a.is_hidden && <span className="hidden-ability"> (Hidden)</span>}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="info-section">
                            <h2>Base Stats</h2>
                            <div className="stats-list">
                                {pokemon.stats.map(s => (
                                    <div key={s.stat.name} className="stat-row">
                                        <span className="stat-label">{getStatLabel(s.stat.name)}</span>
                                        <span className="stat-value">{s.base_stat}</span>
                                        <div className="stat-bar-bg">
                                            <div
                                                className={`stat-bar-fill type-${pokemon.types[0].type.name}`}
                                                style={{ width: `${getStatPercent(s.base_stat)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;

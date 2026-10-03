import React from 'react';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="header-branding">
                    <Compass className="header-icon" />
                    <span>PokéExplorer</span>
                </Link>
                <p className="header-tagline">"Explore Pokémon, one card at a time."</p>
            </div>
        </header>
    );
};

export default Header;

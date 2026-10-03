import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PokemonList from './pages/PokemonList';
import PokemonDetails from './pages/PokemonDetails';

function App() {
    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/pokemon/:id" element={<PokemonDetails />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;

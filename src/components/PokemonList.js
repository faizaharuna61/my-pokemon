
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1010');  // Fetch all Pokémon
        const results = response.data.results;

        // Fetch details for each Pokémon (including image)
        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: pokemonData.data.sprites.front_default,
            };
          })
        );
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching the Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter Pokémon based on the search term
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search Pokémon..." 
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <Link to={`/pokemon/${pokemon.name}`}>
              <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
              <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;


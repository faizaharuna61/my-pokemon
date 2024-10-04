import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css'; // Add a CSS file for styling

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details-container">
      <div className="pokemon-details-content">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
        <h1>{pokemon.name}</h1>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base experience: {pokemon.base_experience}</p>
      </div>
      {/* Using an arrow for the back button */}
      <Link to="/" className="back-link">
        <span className="arrow">&#8592;</span> Back to Pokémon List
      </Link>
    </div>
  );
};

export default PokemonDetails;

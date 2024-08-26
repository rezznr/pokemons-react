import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chosen from '../components/Chosen.jsx';
import PokemonList from '../components/PokemonList.jsx';
import { ContainerBody, PokemonOthers, Image, NameP } from '../components/Others.jsx';

const Pages = () => {
  // Retrieve stored Pokémon data from localStorage on component mount
  const storedPokemon = JSON.parse(localStorage.getItem('my-pokemon')) || {};
  const [name, setName] = useState(storedPokemon.name || 'Pokemon Name');
  const [img, setImg] = useState(storedPokemon.image || '/images/wheresPokemon.png');
  const [data, setData] = useState([]);
  const token = localStorage.getItem('myToken');
  const navigate = useNavigate();

  const pokemonFetch = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();
      const urls = data.results.map((el) => el.url);

      const fetchPokemon = async (url) => {
        const response = await fetch(url);
        return await response.json();
      };
      const pokemonData = await Promise.all(urls.map(fetchPokemon));
      const pokemons = pokemonData.map((el) => ({
        name: el.name,
        imageUrl: el.sprites.other.dream_world.front_default,
      }));
      setData(pokemons);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  useEffect(() => {
    pokemonFetch();
  }, []);

  const handleChange = (name, img) => {
    if (token) {
      setName(name);
      setImg(img);
      localStorage.setItem('my-pokemon', JSON.stringify({ name, image: img }));
    } else {
      alert('You need to Login First');
      navigate('/login');
    }
  };

  return (
    <ContainerBody>
      <div className="flex flex-col gap-10 md:flex-row">
        <Chosen>
          <h2 className="mb-2 text-xl font-bold text-center">
            Sang Terpilih
          </h2>
          <Image src={img} alt={name} />
          <NameP nama={name} />
        </Chosen>
        {data.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          <PokemonList>
            {data.map((poke, idx) => (
              <PokemonOthers
                onClick={() => handleChange(poke.name, poke.imageUrl)}
                key={idx}
              >
                <NameP nama={poke.name} />
                <Image src={poke.imageUrl} alt={poke.name} />
              </PokemonOthers>
            ))}
          </PokemonList>
        )}
      </div>
    </ContainerBody>
  );
};

export default Pages;

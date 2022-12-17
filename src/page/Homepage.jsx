import Chosen from "../component/Chosen.jsx";
import PokemonList from "../component/PokemonList";
import { ContainerBody, PokemonOthers, Button, Image, NameP, ButtonToLocation } from "../component/Others"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Pages = () => {
  const [nama, setNama] = useState("Nama")
  const [img, setImg] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg")
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const pokemonFetch = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon")
    const data = await response.json()
    const urls = data.results.map(el => el.url)

    const fetchPokemon = async (url) => {
      const responseAbility = await fetch(url)
      const resultAbility = await responseAbility.json()
      return resultAbility
    }
    const fetchArray = urls.map(fetchPokemon)
    const pokemonData = await Promise.all(fetchArray)
    const pokemons = pokemonData.map(el => ({
      name: el.name,
      imageUrl: el.sprites.other.dream_world.front_default
    }))
    setData(pokemons)
  }

  useEffect(() => {
    pokemonFetch()
  }, [])

  const changes = (nama, img) => {
    setNama(nama)
    setImg(img)
    localStorage.setItem("my-pokemon", JSON.stringify({
      name: nama,
      image: img
    }));
  }

  return (
    <ContainerBody>
      <Chosen>
        <h2 className="font-bold text-xl mb-2 text-center">Sang Terpilih</h2>
        <Image size="big" src={img} />
        <NameP nama={nama} />
      </Chosen>
      <ButtonToLocation onClick={() => navigate("/location")} />
      <PokemonList>
        {data.map((poke, idx) => {
          return (
            <PokemonOthers key={idx}>
              <NameP nama={poke.name} />
              <Image src={poke.imageUrl} />
              <Button onClick={() => changes(poke.name, poke.imageUrl)} />
            </PokemonOthers>
          )
        })}
      </PokemonList>
    </ContainerBody>
  );
};

export default Pages;
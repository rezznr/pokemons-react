import Chosen from "./component/Chosen.jsx";
import PokemonList from "./component/PokemonList";
import { ContainerBody, PokemonOthers, Button, Image, NameP } from "./component/Others"
import { useState, useEffect } from 'react';

const Pages = () => {
  const [nama, setNama] = useState("bulbasaur")
  const [img, setImg] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg")
  const [data, setData] = useState([])

  const fetchPokemon = async (url) => {
    const responseAbility = await fetch(url)
    const resultAbility = await responseAbility.json()
    return resultAbility
  }
  
  const PokemonFetch = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon")
    const data = await response.json()
    const urls = data.results.map(el => el.url)
    const fetchArray = urls.map(fetchPokemon)
    const pokemonData = await Promise.all(fetchArray)
    const pokemons = pokemonData.map(el =>({
      name : el.name,
      imageUrl : el.sprites.other.dream_world.front_default
    }))
    setData(pokemons)
  }

  useEffect(() => {
    PokemonFetch()
  }, [])
  // console.log(data)

  const changes = (nama, img) => {
    setNama(nama)
    setImg(img)
  }

  return (
    <ContainerBody>
      <Chosen>
        <h2 className="font-bold text-xl mb-2 text-center">Sang Terpilih</h2>
        <Image size="big" src={img} />
        <NameP nama={nama} />
      </Chosen>
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
import Chosen from "../component/Chosen.jsx";
import PokemonList from "../component/PokemonList";
import { ContainerBody, PokemonOthers, Image, NameP } from "../component/Others"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Pages = () => {
  const [nama, setNama] = useState("Pokemon Name")
  const [img, setImg] = useState("/images/wheresPokemon.png")
  const [data, setData] = useState([])
  const token = localStorage.getItem('myToken')
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
    if (token) {
      setNama(nama)
      setImg(img)
      localStorage.setItem("my-pokemon", JSON.stringify({
        name: nama,
        image: img
      }));
    }
    if (!token) {
      alert('You need to Login First')
      navigate('/login')
    }
  }

  return (
    <ContainerBody>
      <div className="flex">
        <div>
          <Chosen>
            <h2 className="font-bold text-xl mb-2 text-center">Sang Terpilih</h2>
            <Image size="big" src={img} />
            <NameP nama={nama} />
          </Chosen>
        </div>
        {data === 0 ? <h2>Loading...</h2> :
          <PokemonList>
            {data.map((poke, idx) => {
              return (
                <PokemonOthers onClick={() => changes(poke.name, poke.imageUrl)} key={idx}>
                  <NameP nama={poke.name} />
                  <Image src={poke.imageUrl} />
                </PokemonOthers>
              )
            })}
          </PokemonList>
        }
      </div>
    </ContainerBody>
  );
};

export default Pages;
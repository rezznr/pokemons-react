import Chosen from "../components/Chosen.jsx";
import PokemonList from "../components/PokemonList.jsx";
import {
  ContainerBody,
  PokemonOthers,
  Image,
  NameP,
} from "../components/Others.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AreaPokemons = () => {
  const storedPokemon = JSON.parse(localStorage.getItem('enemy-pokemon')) || {};
  const [nama, setNama] = useState(storedPokemon.name || 'Enemy Pokemon');
  const [img, setImg] = useState(storedPokemon.image || '/images/wheresPokemon.png');
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchPokemon = async (url) => {
    const imageFetch = async (url) => {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    };
    const response = await fetch(url);
    const result = await response.json();
    const urls = result.pokemon_encounters.map((el) => el.pokemon.url);

    const image = urls.map(imageFetch);
    const resultImage = await Promise.all(image);
    const pokemons = resultImage.map((el) => ({
      name: el.name,
      imageUrl: el.sprites.other.dream_world.front_default,
    }));
    setData(pokemons);
  };

  useEffect(() => {
    fetchPokemon(`https://pokeapi.co/api/v2/location-area/${id}`);
  }, [id]);

  const changes = (nama, img) => {
    setNama(nama);
    setImg(img);
    localStorage.setItem(
      "enemy-pokemon",
      JSON.stringify({
        name: nama,
        image: img,
      })
    );
  };

  return (
    <ContainerBody>
      <div className="flex gap-10">
        <Chosen>
          <h2 className="mb-2 text-xl font-bold text-center">Sang Terpilih</h2>
          <Image size="big" src={img} />
          <NameP nama={nama} />
        </Chosen>
        <PokemonList>
          {data.map((poke, idx) => {
            return (
              <PokemonOthers
                onClick={() => changes(poke.name, poke.imageUrl)}
                key={idx}
              >
                <NameP nama={poke.name} />
                <Image src={poke.imageUrl} />
              </PokemonOthers>
            );
          })}
        </PokemonList>
      </div>
    </ContainerBody>
  );
};

export default AreaPokemons;

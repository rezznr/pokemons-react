import Chosen from "../component/Chosen.jsx";
import PokemonList from "../component/PokemonList";
import { ContainerBody, PokemonOthers, Image, NameP } from "../component/Others"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Heading, Center } from '@chakra-ui/react';

const AreaPokemons = () => {
    const [nama, setNama] = useState("Enemy Pokemon")
    const [img, setImg] = useState("/images/wheresPokemon.png")
    const [data, setData] = useState([])
    const { id } = useParams()

    const fetchPokemon = async (url) => {
        const imageFetch = async (url) => {
            const response = await fetch(url)
            const result = await response.json()
            return result
        }
        const response = await fetch(url)
        const result = await response.json()
        const urls = result.pokemon_encounters.map(el => el.pokemon.url)


        const image = urls.map(imageFetch)
        const resultImage = await Promise.all(image)
        const pokemons = resultImage.map(el => ({
            name: el.name,
            imageUrl: el.sprites.other.dream_world.front_default
        }))
        setData(pokemons)
    }

    useEffect(() => {
        fetchPokemon(`https://pokeapi.co/api/v2/location-area/${id}`)
    }, [id])

    const changes = (nama, img) => {
        setNama(nama)
        setImg(img)
        localStorage.setItem("enemy-pokemon", JSON.stringify({
            name: nama,
            image: img
        }));
    }

    return (
        <ContainerBody>
            <Center>
                <Heading className="mb-10" as="h1">Enemy</Heading>
            </Center>
            <Chosen>
                <h2 className="font-bold text-xl mb-2 text-center">Sang Terpilih</h2>
                <Image size="big" src={img} />
                <NameP nama={nama} />
            </Chosen>
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
        </ContainerBody>
    )
}

export default AreaPokemons
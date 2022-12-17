import Chosen from "../component/Chosen.jsx";
import PokemonList from "../component/PokemonList";
import { ContainerBody, PokemonOthers, Button, Image, NameP } from "../component/Others"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Heading, Center } from '@chakra-ui/react';

const AreaPokemons = () => {
    const [nama, setNama] = useState("bulbasaur")
    const [img, setImg] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg")
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
    }

    return (
        <>
            <ContainerBody>
                <Center>
                    <Heading as="h1">nama location</Heading>
                </Center>
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
        </>
    )
}

export default AreaPokemons
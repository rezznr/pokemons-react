import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokemonList from "../component/PokemonList";
import { ContainerBody, PokemonOthers, ButtonLocation, NameP } from "../component/Others"
import { Heading, Center } from "@chakra-ui/react";

const Location = () => {
    const [data, setData] = useState([])


    const fetchLocation = async (url) => {
        const responseAbility = await fetch(url)
        const resultAbility = await responseAbility.json()
        return resultAbility
    }

    const loc = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        const urls = data.results.map(el => el.url)
        const fetchArray = urls.map(fetchLocation)
        const locationData = await Promise.all(fetchArray)

        const location = locationData.map(el => ({
            name: el.name,
            location: el.location
        }))

        setData(location)
    }

    useEffect(() => {
        loc(`https://pokeapi.co/api/v2/location-area`);
    }, [])

    return (
        <ContainerBody>
            <Center>
                <Heading>All Location Areas</Heading>
            </Center>
            <PokemonList>
                {data.map((el, idx) => {
                    return (
                        <PokemonOthers key={idx}>
                            <NameP nama={el.name} />
                            <Link to={"/location/" + (idx + 1)}><ButtonLocation /></Link>
                        </PokemonOthers>
                    )
                })}
            </PokemonList>
        </ContainerBody>
    );

};


export default Location;
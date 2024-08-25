import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import PokemonList from "../components/PokemonList";
import {
  ContainerBody,
  PokemonOthers,
  ButtonLocation,
  NameP,
} from "../components/Others";
import { Heading, Center } from "@chakra-ui/react";

const Location = () => {
  const [data, setData] = useState([]);

  // Fetch function that doesn't need to be in a callback
  const fetchLocationData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching location data:", error);
      return null; // handle the error appropriately
    }
  };

  // Memoized fetchLocations function
  const fetchLocations = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }
      const data = await response.json();
      const urls = data.results.map((el) => el.url);

      // Fetch all location data concurrently
      const fetchArray = urls.map(fetchLocationData);
      const locationData = await Promise.all(fetchArray);

      // Filter out any null responses due to errors
      const validLocations = locationData.filter((el) => el !== null);

      const locations = validLocations.map((el) => ({
        name: el.name,
      }));

      setData(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchLocations(`https://pokeapi.co/api/v2/location-area`);
  }, [fetchLocations]); // Now, fetchLocations is included in the dependency array

  return (
    <ContainerBody>
      <Center>
        <Heading>All Location Areas</Heading>
      </Center>
      <PokemonList>
        {data.map((el, idx) => (
          <PokemonOthers key={idx}>
            <NameP nama={el.name} />
            <Link to={`/location/${idx + 1}`}>
              <ButtonLocation />
            </Link>
          </PokemonOthers>
        ))}
      </PokemonList>
    </ContainerBody>
  );
};

export default Location;

const PokemonList = ({ children }) => {
    return (
        <div id="pokemon-list" className="grid grid-cols-4 gap-4">
            {children}
        </div>
    )
}

export default PokemonList;

            {/* {Pokemon.map((poke) => {
                return (
                    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
                        <p className="font-bold text-xl mb-2 text-center">{poke.name}</p>
                        <img src={poke.sprites.other.dream_world.front_default} className="my-4 mx-auto h-32" />
                        <button className="rounded bg-indigo-500 text-white p-4 w-full">Pilih Pokemon</button>
                    </div>
                )
            })} */}
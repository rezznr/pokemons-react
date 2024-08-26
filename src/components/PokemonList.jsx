const PokemonList = ({ children }) => {
    return (
        <div id="pokemon-list" className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {children}
        </div>
    )
}

export default PokemonList;
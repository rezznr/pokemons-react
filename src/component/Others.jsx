import NavBar from "./Navbar";

export const ButtonToLocation = ({ onClick }) => {
  return (
    <button className="rounded bg-indigo-500 text-white p-4" onClick={onClick}>
      Location
    </button>
  );
};

export const ButtonLocation = ({ onClick }) => {
  return (
    <button className="rounded bg-indigo-500 text-white p-4 w-full" onClick={onClick}>
      Pilih Area
    </button>
  );
};

export const Image = ({ src, size }) => {
  return (
    <img src={src} alt="img" className={`my-4 mx-auto ${size === 'big' ? 'h-64' : 'h-32'}`} />
  );
}

export const NameP = ({ nama }) => {
  return <p className="font-bold text-xl mb-2 text-center capitalize font-mono">{nama}</p>;
};

export const PokemonOthers = ({ children, onClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 scale-100 hover:scale-110 ease-in-out duration-500" onClick={onClick}>
      {children}
    </div>
  )
}

export const ContainerBody = ({ children }) => {
  return (
    <div className="p-6 bg-gradient-to-l from-blue-50 to-green-100">
      <NavBar />
      {children}
    </div>
  )
}
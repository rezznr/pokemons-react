import NavBar from "./Navbar";

export const ButtonToLocation = ({ onClick }) => {
  return (
    <button className="p-4 text-white bg-indigo-500 rounded" onClick={onClick}>
      Location
    </button>
  );
};

export const ButtonLocation = ({ onClick }) => {
  return (
    <button
      className="w-full p-4 text-white bg-indigo-500 rounded"
      onClick={onClick}
    >
      Pilih Area
    </button>
  );
};

export const Image = ({ src, size }) => {
  return (
    <img
      src={src}
      alt="img"
      className={`my-4 mx-auto hover:scale-125 ${
        size === "big" ? "h-32" : "h-32"
      }`}
    />
  );
};

export const NameP = ({ nama }) => {
  return (
    <p className="mb-2 font-mono text-xl font-bold text-center capitalize">
      {nama}
    </p>
  );
};

export const PokemonOthers = ({ children, onClick }) => {
  return (
    <div
      className="max-w-sm p-4 overflow-hidden duration-500 ease-in-out scale-100 rounded shadow-lg hover:scale-110"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const ContainerBody = ({ children }) => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-l from-blue-50 to-green-100">
      <NavBar />
      {children}
    </div>
  );
};

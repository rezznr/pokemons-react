import { useState, useEffect } from "react";
import { ContainerBody, NameP, Image } from "../components/Others";

const Fight = () => {
  const [myPokemon, setMyPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [myPokemonHP, setMyPokemonHP] = useState(100);
  const [enemyPokemonHP, setEnemyPokemonHP] = useState(100);
  const [battleMessage, setBattleMessage] = useState("");

  // Mendapatkan Pokemon dari localStorage
  const getMyPokemon = () => {
    const item = localStorage.getItem("my-pokemon");
    setMyPokemon(JSON.parse(item));
  };

  const getEnemyPokemon = () => {
    const item = localStorage.getItem("enemy-pokemon");
    setEnemyPokemon(JSON.parse(item));
  };

  // Pertarungan Pokemon
  const fight = () => {
    const myDamage = Math.floor(Math.random() * 11) + 5;
    const enemyDamage = Math.floor(Math.random() * 11) + 5;

    setMyPokemonHP((prevHP) => Math.max(prevHP - enemyDamage, 0));
    setEnemyPokemonHP((prevHP) => Math.max(prevHP - myDamage, 0));

    setBattleMessage(`Kamu menerima ${myDamage} damage. pokemon musuh menerima ${enemyDamage} damage.`);
  };

  // Fungsi Reset Pertarungan
  const resetBattle = () => {
    setMyPokemonHP(100);
    setEnemyPokemonHP(100);
    setBattleMessage("");
  };

  // Cek kondisi menang/kalah
  useEffect(() => {
    if (myPokemonHP <= 0) {
      setBattleMessage("Kamu Kalah! 😓");
    } else if (enemyPokemonHP <= 0) {
      setBattleMessage("Kamu menang! 🎉");
    }
  }, [myPokemonHP, enemyPokemonHP]);

  useEffect(() => {
    getEnemyPokemon();
    getMyPokemon();
  }, []);

  return (
    <ContainerBody flex="col">
      <h1 className="mb-8 text-4xl font-bold text-center">Pokemon Battle</h1>
      {/* Pesan Pertarungan */}
      {battleMessage && (
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold text-yellow-600">{battleMessage}</p>
        </div>
      )}
      <div className="flex flex-col justify-between gap-5 mx-20 space-x-4 md:flex-row">
        {/* Pokemon Pemain */}
        {myPokemon && (
          <div className="flex flex-col items-center justify-center text-center">
            <Image src={myPokemon.image} alt="Your Pokemon" />
            <NameP nama={myPokemon.name} />
            <p className="text-lg font-bold text-red-500">HP: {myPokemonHP}</p>
          </div>
        )}

        {/* Simbol Pertarungan */}
        <div className="flex flex-col items-center justify-center">
          {myPokemon && enemyPokemon && (
            <img
              className={`w-[35%] transition-transform duration-300 transform ${myPokemonHP > 0 && enemyPokemonHP > 0 && "hover:scale-110 active:scale-95 cursor-pointer"}`}
              onClick={myPokemonHP > 0 && enemyPokemonHP > 0 ? fight : null}
              src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"
              alt="Pokeball"
            />
          )}
        </div>

        {/* Pokemon Lawan */}
        {enemyPokemon && (
          <div className="flex flex-col items-center justify-center text-center">
            <Image src={enemyPokemon.image} alt="Enemy Pokemon" />
            <NameP nama={enemyPokemon.name} />
            <p className="text-lg font-bold text-red-500">HP: {enemyPokemonHP}</p>
          </div>
        )}
      </div>
      {/* Tombol Reset */}
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={resetBattle}
          className="px-6 py-3 text-white transition-all duration-300 bg-red-500 rounded-full hover:bg-red-600 hover:scale-105 active:scale-100"
        >
          Reset Battle
        </button>
      </div>
    </ContainerBody>
  );
};

export default Fight;

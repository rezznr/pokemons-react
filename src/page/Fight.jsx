import { useState, useEffect } from "react";
import { ContainerBody, NameP, Image } from "../component/Others";


const Fight = () => {
    const [myPokemon, setMyPokemon] = useState(null)
    const [enemyPokemon, setEnemyPokemon] = useState(null)

    const getMyPokemon = () => {
        const item = localStorage.getItem("my-pokemon")
        setMyPokemon(JSON.parse(item))
    }
    const getEnemyPokemon = () => {
        const item = localStorage.getItem("enemy-pokemon")
        setEnemyPokemon(JSON.parse(item))
    }

    useEffect(() => {
        getEnemyPokemon()
        getMyPokemon()
    }, [])

    return (
        <ContainerBody>
            <div className="flex justify-between my-32 mx-20">
                {myPokemon ?
                    <div>
                        <Image src={myPokemon.image} size="big" alt="Your Pokemon" />
                        <NameP nama={myPokemon.name} />
                    </div>
                    : null}

                <Image src={"https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"} size="big" />

                {enemyPokemon ?
                    <div>
                        <Image src={enemyPokemon.image} size="big" alt="Enemy Pokemon" />
                        <NameP nama={enemyPokemon.name} />
                    </div>
                    : null
                }
            </div>
        </ContainerBody>
    )


}







// import { ContainerBody } from "../component/Others";
// import { Link } from "react-router-dom";
// import { Image } from './../component/Others';

// const Fight = () => {
//     const [selectedHealth, setSelectedHealth] = useState(100);
//     const [enemyHealth, setEnemyHealth] = useState(100);
//     const [selectedDamage, setSelectedDamage] = useState(0);
//     const [enemyDamage, setEnemyDamage] = useState(0);
//     const [char1Image, setChar1Image] = useState("");
//     const [char2Image, setChar2Image] = useState("");
//     const [visible, setVisible] = useState(false);
//     const [winner, setWinner] = useState("");
//     const character1 = localStorage.getItem("my-pokemon");
//     const character2 = localStorage.getItem("enemy-pokemon");
//     const player = localStorage.getItem("username");
//     const token = localStorage.getItem("token");
//     console.log(winner);

//     const handleFight = () => {
//         const damage = Math.floor(Math.random() * 10) + 1;
//         const random = Math.floor(Math.random() * 2) + 1;

//         if (random === 1) {
//             setSelectedHealth(selectedHealth - damage);
//             setSelectedDamage(damage);
//         }
//         if (random === 2) {
//             setEnemyHealth(enemyHealth - damage);
//             setEnemyDamage(damage);
//         }
//         if (selectedHealth - damage < 0) {
//             setSelectedHealth(0);
//             alert("You lose");
//             setSelectedHealth(100);
//             setEnemyHealth(100);
//         }
//         if (enemyHealth - damage < 0) {
//             setEnemyHealth(0);
//             alert("You win");
//             setSelectedHealth(100);
//             setEnemyHealth(100);
//         }

//         setVisible(true);
//         setTimeout(() => {
//             setVisible(false);
//         }, 1500);

//         setTimeout(() => {
//             setSelectedDamage(0);
//             setEnemyDamage(0);
//         }, 1500);
//     };
//     const handlesFight = () => {
//         fetch("https://kobarsept.com/api/fight", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 character1: character1,
//                 character2: character2,
//                 player: player,
//             }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 setWinner(data.winner);

//                 if (data.winner === character1) {
//                     setSelectedHealth(selectedHealth - 10);
//                 } else if (data.winner === character2) {
//                     setEnemyHealth(enemyHealth - 10);
//                 }

//                 if (selectedHealth - 10 <= 0) {
//                     setSelectedHealth(0);
//                     alert("You lose");
//                     setSelectedHealth(100);
//                     setEnemyHealth(100);
//                 } else if (enemyHealth - 10 <= 0) {
//                     setEnemyHealth(0);
//                     alert("You win");
//                     setSelectedHealth(100);
//                     setEnemyHealth(100);
//                 }

//                 setVisible(true);
//                 setTimeout(() => {
//                     setVisible(false);
//                 }, 1500);
//             });
//     };

//     const handleReset = () => {
//         setSelectedHealth(100);
//         setEnemyHealth(100);
//         setSelectedDamage(0);
//         setEnemyDamage(0);
//     };

//     useEffect(() => {
//         fetch(
//             `https://pokeapi.co/api/v2/pokemon/${character1?.toLowerCase() || ""}`
//         )
//             .then((res) => res.json())
//             .then((data) => {
//                 setChar1Image(data?.sprites?.other.home.front_default);
//             });

//         fetch(
//             `https://pokeapi.co/api/v2/pokemon/${character2?.toLowerCase() || ""}`
//         )
//             .then((res) => res.json())
//             .then((data) => {
//                 setChar2Image(data?.sprites?.other.home.front_default);
//             });
//     }, [character1, character2]);

//     const DamageModal = ({ forSelected, forEnemies }) => {
//         return (
//             <div
//                 className=
//                 "absolute top-24 left-0 w-full h-full flex flex-col items-center justify-start">
//                 {forSelected && selectedDamage > 0 && (
//                     <p className="font-press text-4xl text-red-500">-{selectedDamage}</p>
//                 )}
//                 {forEnemies && enemyDamage > 0 && (
//                     <p className="font-press text-4xl text-red-500">-{enemyDamage}</p>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <ContainerBody>
//             <div className="flex items-center gap-20">
//                 <div className="flex flex-1 flex-col items-center gap-4 relative">
//                     <div className="text-center">
//                         <p className="text-lg font-bold text-blue-500 mb-2">You</p>
//                         <p className="font-bold font-press text-2xl">{character1.name}</p>
//                     </div>
//                     {char1Image && <img src={char1Image} alt="character1" />}
//                     <div className="healtbar rounded-full bg-blue-100 w-full">
//                         <div
//                             className="health rounded-full bg-blue-400 text-center font-bold text-white py-2"
//                             style={{ width: `${selectedHealth}%` }}
//                         >
//                             {selectedHealth}
//                         </div>
//                     </div>
//                     <DamageModal forSelected />
//                 </div>
//                 <div className="btn-group flex flex-col gap-6">
//                     <button
//                         type={character1 && character2 ? "blue" : "disabled"}
//                         className="w-48 rounded-full"
//                         onClick={character1 && character2 ? () => handleFight() : null}
//                     >
//                         <img
//                             src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"
//                             alt="pokeball"
//                             className="w-100"
//                         />
//                         <div className="text-lg uppercase font-bold">Fight</div>
//                     </button>
//                     <button
//                         type="orange"
//                         className="w-48 rounded-full"
//                         onClick={() => handleReset()}
//                     >
//                         Reset
//                     </button>
//                     <Link
//                         to="/"
//                         className="text-center font-semibold text-blue-600 hover:underline"
//                     >
//                         Back to home
//                     </Link>
//                 </div>
//                 <div className="flex flex-1 flex-col items-center gap-4 relative">
//                     <div className="text-center">
//                         <p className="text-lg font-bold text-red-500 mb-2">Enemies</p>
//                         <p className="font-bold font-press text-2xl">{character2.name}</p>
//                     </div>
//                     {char2Image && <img src={char2Image} alt="character2" />}
//                     <div className="healtbar rounded-full bg-red-100 w-full">
//                         <div
//                             className="health bg-red-400 rounded-full text-center font-bold text-white py-2"
//                             style={{ width: `${enemyHealth}%` }}
//                         >
//                             {enemyHealth}
//                         </div>
//                     </div>
//                     <DamageModal forEnemies />
//                 </div>
//             </div>
//         </ContainerBody>
//     );
// };

// // export default Fight;


// // const Fight = () => {
// //     const myPokemon = localStorage.getItem("my-pokemon")
// //     const enemyPokemon = localStorage.getItem("enemy-pokemon")


// //     return (
// //         <>
// //             <ContainerBody>
// //                 <p>{myPokemon.name}</p>
// //                 <p>{enemyPokemon.name}</p>
// //             </ContainerBody>
// //         </>
// //     )
// // }

export default Fight;
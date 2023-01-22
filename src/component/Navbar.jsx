import { useNavigate, Link } from "react-router-dom"

const list = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Location",
        path: "/location"
    },
    {
        name: "Fight",
        path: "/fight"
    }
]

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>
            <nav className="flex align-items-center">
                <ul className="flex mb-10 w-full">
                    <li className="flex gap-6">
                        {list.map((list, index) => (
                            <Link
                                key={index}
                                to={list.path}
                                className="relative inline-block text-xl text-transparent bg-clip-text font-bold bg-gradient-to-r from-blue-400 to-green-400 scale-100 hover:scale-110 active:text-blue-400">
                                {list.name}
                            </Link>
                        ))}
                    </li>
                </ul>
                <form>
                    <div className="flex">
                        <input type="text" placeholder="Search..." name="search" className="w-full p-2 mr-8" />
                        <button type="submit" className="rounded bg-blue-300 hover:bg-blue-400 text-white font-bold p-2">Search</button>
                    </div>
                </form>
            </nav>
        </>
    )
}

export default NavBar
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleUsername = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }
    const handlePassword = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(username)
        console.log(password)
        const data = {
            username: username,
            password: password,
        }
        fetch("https://kobarsept.com/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const token = data.token
                localStorage.setItem("myToken", token)
                navigate('/')
            })
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-zinc-50 to-neutral-100">
            <div className="w-97 border p-20 shadow-xl rounded-lg bg-white">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center text-black text-4xl font-bold mb-7">Login</h1>
                    <input className="mb-7 shadow-md p-4 rounded-md bg-slate-50" placeholder="Username" type="text" id="fname" name="fname" onChange={handleUsername} value={username} /><br />
                    <input className="mb-7 shadow-md p-4 rounded-md bg-slate-50" placeholder="Password" type="password" id="lname" name="lname" onChange={handlePassword} value={password} /><br />
                    <input className="w-full border-2 bg-gradient-to-r from-blue-400 to-blue-300 p-2 rounded-md scale-100 hover:scale-105 ease-in-out duration-500" type="submit" id="fsubmit" name="fsubmit" />
                </form>
            </div >
        </div>
    )
}

export default Login
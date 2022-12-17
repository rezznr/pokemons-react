import { useState } from "react"
import { Box } from "@chakra-ui/react"
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
        const url = "https://kobarsept.com/api/login";
        const data = {
            username,
            password,
        }
        fetch(url, {
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
        <Box p={4} bg={"blue.400"} maxW='sm' borderRadius={'lg'} borderWidth='1px' alignItems="center" >
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">Usename : </label>
                <input type="text" id="fname" name="fname" onChange={handleUsername} value={username} /><br /><br />
                <label htmlFor="lname">Password : </label>
                <input type="password" id="lname" name="lname" onChange={handlePassword} value={password} /><br /><br />
                <input className="border-solid border-2 border-black hover:border-dotted" type="submit" id="fsubmit" name="fsubmit" />
            </form>
        </Box >
    )
}

export default Login
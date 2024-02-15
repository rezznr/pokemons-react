import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    const data = {
      username: username,
      password: password,
    };
    fetch("https://kobarsept.com/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const token = data.token;
        localStorage.setItem("myToken", token);
        localStorage.setItem("username", username);
        navigate("/");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-cyan-100">
      <div className="p-20 border rounded-lg shadow-xl w-97 bg-indigo-50">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center text-black mb-7">
            Login
          </h1>
          <input
            className="p-4 rounded-md shadow-md mb-7 bg-slate-50"
            placeholder="Username"
            type="text"
            id="fname"
            name="fname"
            onChange={handleUsername}
            value={username}
            autoComplete="off"
          />
          <br />
          <input
            className="p-4 rounded-md shadow-md mb-7 bg-slate-50"
            placeholder="Password"
            type="password"
            id="lname"
            name="lname"
            onChange={handlePassword}
            value={password}
          />
          <br />
          <input
            className="submit-btn"
            type="submit"
            id="fsubmit"
            name="fsubmit"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

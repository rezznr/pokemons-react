import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("myToken", user.accessToken);
        localStorage.setItem("username", user.email);
        navigate("/");
      })
      .catch((error) => {
        setError("Failed to log in. Please check your credentials.");
      });
  };

  // Function to handle Google Login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("myToken", user.accessToken);
        localStorage.setItem("username", user.displayName);
        navigate("/");
      })
      .catch((error) => {
        setError("Failed to log in with Google. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-cyan-100">
      <div className="flex flex-col items-center justify-center p-20 border rounded-lg shadow-xl w-97 bg-indigo-50">
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <h1 className="mb-5 text-4xl font-bold text-center text-black">
            Login
          </h1>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          <input
            className="p-4 rounded-md shadow-md bg-slate-50"
            placeholder="Email"
            type="email"
            onChange={handleEmail}
            value={email}
          />
          <br />
          <input
            className="p-4 rounded-md shadow-md bg-slate-50"
            placeholder="Password"
            type="password"
            onChange={handlePassword}
            value={password}
          />
          <br />
          <input
            className="submit-btn"
            type="submit"
            value="Masuk"
          />
        </form>
        <div className="mt-8 text-center">
          <p>----------- or -----------</p>
          <button
            className="flex items-center justify-center gap-4 px-4 py-5 mt-4 font-bold transition duration-75 transform rounded-lg shadow-md bg-slate-200 hover:scale-105 active:scale-100"
            onClick={handleGoogleLogin}
          >
            Login with Google
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

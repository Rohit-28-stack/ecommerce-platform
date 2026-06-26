import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function Login() {

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post(
        "/users/login",
        {
          email,
          password
        }
      );

      login(res.data.token);

      alert("Login Successful");

    } catch (err) {

      alert(
        err.response?.data?.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
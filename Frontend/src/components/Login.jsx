import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const Login = () => {
  const [usuario, setUsuario] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        usuario
      );
      localStorage.setItem("token", data.token);
      navigate("/welcome");
    } catch (error) {
      console.error(error);
      alert("Error en login. Revisa tus credenciales.");
    }
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={usuario.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={usuario.password}
          onChange={handleChange}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;

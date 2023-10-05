import React, { useState } from "react";
import serverAPI from "../api/serverAPI";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const startLogin = async (email, password) => {
    try {
      const resp = await serverAPI.post("/auth/login", {
        email,
        password,
      });

      window.location.href = "/Main";

      console.log(resp);
      setError(resp.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí van las validaciones
    if (email === "" || password === "") {
      return console.log("todos los campos son obligatorios");
    }

    startLogin(email, password);
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            name="emailInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="emailInput">Correo Electronico</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="passwordInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="passwordInput">Contraseña</label>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Recordarme
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Iniciar sesión
        </button>

        {error && (
          <p className="text-danger mt-3">Usuario o contraseña incorrectos.</p>
        )}
      </form>
    </main>
  );
};

export default LoginForm;

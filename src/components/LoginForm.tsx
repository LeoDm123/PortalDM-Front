import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function LoginForm() {
  const [loginError, setLoginError] = useState(false);
  const location = useLocation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("emailInput") as string;
    const password = formData.get("passwordInput") as string;

    // Retrieve the user information from local storage
    const storedUserString = localStorage.getItem("user");

    if (storedUserString !== null) {
      const storedUser = JSON.parse(storedUserString);

      // Check if the stored user exists and the credentials match
      if (storedUser.email === email && storedUser.password === password) {
        // Login successful, navigate to the main page
        setLoginError(false);
        window.location.href = "/Main"; // Redirect to the main page (adjust the path as needed)
      } else {
        // Login failed, display an error message
        setLoginError(true);
      }
    } else {
      // Handle the case when the user is not found in local storage
      setLoginError(true);
    }
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
          />
          <label htmlFor="emailInput">Correo Electronico</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="passwordInput"
            placeholder="Password"
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

        {loginError && (
          <p className="text-danger mt-3">Usuario o contraseña incorrectos.</p>
        )}
      </form>
    </main>
  );
}

export default LoginForm;

import React from "react";
import { useLocation } from "react-router-dom";

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the form values using the "name" attribute
    const userName = event.currentTarget.elements.namedItem("userInput").value;
    const email = event.currentTarget.elements.namedItem("emailInput").value;
    const password =
      event.currentTarget.elements.namedItem("passwordInput").value;
    const passwordConfirmation = event.currentTarget.elements.namedItem(
      "passwordConfirmationInput"
    ).value;

    // Create a user object to save in local storage
    const user = {
      userName,
      email,
      password,
      passwordConfirmation,
    };

    // Save the user object to local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Clear the form after submission (optional)
    event.currentTarget.reset();
    // window.location.href = "/";
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form id="registerForm" onSubmit={handleSubmit}>
        <img className="mb-4" src="" alt="Your Image Source" />
        <h1 className="h3 mb-4 fw-normal">Registrar Usuario</h1>
        <p></p>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="userInput" // Use "name" attribute to access the input in the event target
            placeholder="name@example.com"
          />
          <label htmlFor="userInput">Usuario</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            name="emailInput" // Use "name" attribute to access the input in the event target
            placeholder="name@example.com"
          />
          <label htmlFor="emailInput">Dirección de Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="passwordInput" // Use "name" attribute to access the input in the event target
            placeholder="Password"
          />
          <label htmlFor="passwordInput">Contraseña</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="passwordConfirmationInput" // Use "name" attribute to access the input in the event target
            placeholder="Password"
          />
          <label htmlFor="passwordConfirmationInput">
            Confirmar Contraseña
          </label>
        </div>

        <button className="btn btn-primary w-100 py-2 mt-4" type="submit">
          Registrarse
        </button>
      </form>
    </main>
  );
}

export default Register;

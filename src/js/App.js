import { useLocation } from "react-router-dom";

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
  window.location.href = "/";
};

export default handleSubmit;

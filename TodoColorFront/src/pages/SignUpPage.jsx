import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "./../assets/logo.png";
import "./LogInPage.css";

export const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [firstAndLastValue, setFirstAndLastNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const navigate = useNavigate();
  function splitName(firstAndLastValue) {
    const parts = firstAndLastValue.split(" ");

    if (parts.length > 4) {
      console.error(
        "El campo firstAndLastValue debe contener un máximo de dos nombres y dos apellidos."
      );
      return;
    }

    let firstName, secondName, firstLastName, secondLastName;

    if (parts.length === 1) {
      firstName = parts[0];
    } else if (parts.length === 2) {
      firstName = parts[0];
      firstLastName = parts[1];
    } else if (parts.length === 3) {
      firstName = parts[0];
      secondName = parts[1];
      firstLastName = parts[2];
    } else if (parts.length === 4) {
      firstName = parts[0];
      secondName = parts[1];
      firstLastName = parts[2];
      secondLastName = parts[3];
    }

    // Ahora puedes usar las variables 'firstName', 'secondName', 'firstLastName' y 'secondLastName' en tu código
    return { firstName, secondName, firstLastName, secondLastName };
  }

  const onSignUpClicked = async (email, firstAndLastName, psw) => {
    try {
      const { firstName, secondName, firstLastName, secondLastName } =
        splitName(firstAndLastName);
      const body = JSON.stringify({
        names: secondName ? `${firstName} ${secondName}` : firstName,
        lastNames: secondLastName
          ? `${firstLastName} ${secondLastName}`
          : firstLastName,
        email: email,
        password: psw,
      });
      console.log("body", body);
      const response = await fetch(
        "http://localhost:9098/V1/api/users/createUser",
        {
          method: "POST",
          body: body,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        navigate("/");
      } else {
        setErrorMessage("Error al crear el usuario");
      }
    } catch (error) {
      setErrorMessage("Error al crear el usuario");
    }
  };

  return (
    <div className="body-content">
      <div className="content-container">
        <img
          className="img-logo"
          src={logoImage}
          alt="Logo de Iniciar Sesión"
        />
        <h1 className="fr-form-title">Registro</h1>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <input
          className="fr-big-input fr-input-border"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Email:"
        />
        <input
          className="fr-big-input fr-input-border"
          value={firstAndLastValue}
          onChange={(e) => setFirstAndLastNameValue(e.target.value)}
          placeholder="Nombres y Apellidos:"
        />
        <input
          className="fr-big-input fr-input-border"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          placeholder="Contraseña:"
        />
        <input
          className="fr-big-input fr-input-border"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
          type="password"
          placeholder="Confirmar contraseña:"
        />
        <hr className="fr-line" />
        <button
          className="fr-big-button"
          disabled={
            !emailValue ||
            !passwordValue ||
            passwordValue !== confirmPasswordValue
          }
          onClick={() =>
            onSignUpClicked(emailValue, firstAndLastValue, passwordValue)
          }
        >
          Registrarse
        </button>
        <button onClick={() => navigate("/")} className="small-button">
          Ya tienes cuenta? Inicia sesion
        </button>
      </div>
    </div>
  );
};

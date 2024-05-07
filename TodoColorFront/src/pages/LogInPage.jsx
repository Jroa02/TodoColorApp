import logoImage from "./../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogInPage.css";
export const LogInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const onLogInClicked = async (user, psw) => {
    try {
      const validateUser = await fetch(
        `http://localhost:9098/V1/api/users/validatePassword/${user}/${psw}`,
        { mode: "cors" }
      );

      if (validateUser.status != 200) {
        throw new Error("INVALID USER");
      }
      navigate("/mainpage", { state: { user } });
    } catch (error) {
      setErrorMessage("Usuario o contraseña incorrectos");
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
        <h1 className="fr-form-title">Iniciar sesión</h1>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <input
          className="fr-big-input fr-input-border"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Email:"
          type="email"
        />
        <input
          className="fr-big-input fr-input-border"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          placeholder="Contraseña:"
        />
        <hr className="fr-line" />
        <button
          className="fr-big-button"
          disabled={!emailValue || !passwordValue}
          onClick={() => onLogInClicked(emailValue, passwordValue)}
        >
          Iniciar sesión
        </button>
        <button onClick={() => navigate("/")} className="small-button">
          Olvidaste tu contraseña?
        </button>
        <button onClick={() => navigate("/signup")} className="small-button">
          No tienes cuenta? Registrate
        </button>
      </div>
    </div>
  );
};

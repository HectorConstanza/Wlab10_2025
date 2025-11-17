import React from "react";
import API from "../utils/api";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Bienvenido {user?.username}</h1>
      <p>Has iniciado sesión correctamente.</p>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //1. Memoria: Donde se guardan los datos al venir del servidor
  const [entretenimiento, setEntretenimiento] = useState([]);
  const [cargando, setCargando] = useState(true);

  //2. Efecto: Se ejecuta una sola vez al iniciar la página.
  useEffect(() => {
    fetch("https://localhost:7215/api/entretenimiento")
      .then((respuesta) => respuesta.json()) // Se convierten los datos a json
      .then((datos) => {
        setEntretenimiento(datos); //Guardamos los datos en memoria
        setCargando(false); // Se terminan de cargar
      })
      .catch((error) => {
        console.error("Error conectando", error);
        setCargando(false);
      });
  }, []); // El array vacío significa que solo tiene que hacer una vez al inicio.
  return (
    <>
      <div style={{padding: '20px', fontFamily: 'Arial'}}>
      <h1>Mi diario de entretenimiento</h1>


      </div>
    </>
  );
}

export default App;

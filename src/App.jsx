import { useState, useEffect } from "react";
import "./App.css";
import Formulario from "./Formulario";

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
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Mi diario de entretenimiento</h1>
        <Formulario />
        {cargando ? (
          <p>Cargando datos...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {entretenimiento.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                {item.imagenURL && (
                  <img
                    src={item.imagenURL}
                    alt={item.titulo}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                )}

                <h2 style={{ fontSize: "1.2rem", margin: "10px 0" }}>
                  {item.titulo}
                </h2>
                <span
                  style={{
                    background: "#eee",
                    padding: "5px",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  {item.tipo}
                </span>
                <p>
                  <strong>Nota:</strong>
                  {item.calificacion}/10
                </p>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>
                  {item.comentario}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

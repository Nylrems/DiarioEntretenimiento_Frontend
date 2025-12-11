import React, { useState } from "react";

function Formulario({ alAgregar }) {
  //* Aquí se guardan los datos del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "Videojuego",
    estado: "Pendiente",
    calificacion: 5,
    imagenURL: "",
    comentario: "",
  });

  // Cada vez que se escriba, actualizamos el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, //* Mantenemos los demás datos iguales
      [name]: value, //* Se actualizan los campos que tuvieron algún cambio.
    });
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); //* Evita que la página se recargue.

    fetch("https://localhost:7215/api/entretenimiento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Guardado con éxito!");
          //* Se avisa al comente padre (app.jsx) que recargue la lista
          if (alAgregar) alAgregar();
          //* Se limpia el formulario
          setFormData({
            titulo: "",
            tipo: "Videojuego",
            estado: "Pendiente",
            calificacion: 5,
            imagenURL: "",
            comentario: "",
          });
        } else {
          alert("error al guardar");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>Agregar nuevo Item</h3>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            style={{ padding: "8px", flex: 1 }}
          >
            <option value={"Videojuego"}>Videojuego</option>
            <option value={"Libro"}>Libro</option>
            <option value={"Anime"}>Anime</option>
            <option value={"Serie"}>Serie</option>
          </select>

          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            style={{ padding: "8px", flex: 1 }}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Abandonado">Abandonado</option>
          </select>
          <input
            type="number"
            name="calificacion"
            min="0"
            max="10"
            value={formData.calificacion}
            onChange={handleChange}
            style={{ padding: "8px", width: "60px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type=""
            name="imagenURL"
            placeholder="URL de la imagen (Opcional)"
            value={formData.imagenURL}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="comentario"
            placeholder="Opinión personal..."
            value={formData.comentario}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              height: "60px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Guardar
        </button>
      </form>
    </>
  );
}

export default Formulario;

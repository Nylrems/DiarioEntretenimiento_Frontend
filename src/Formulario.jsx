import React from "react";

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

  
}

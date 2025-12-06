const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Registrar usuario (usa /registro, no /register)
export async function registrarUsuario(datos: {
  correo: string;
  apodo: string;
  contrasenia: string;
}) {
  const respuesta = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    // Puedes ajustar esto según lo que devuelva tu backend
    const error = await respuesta.json().catch(() => ({}));
    throw new Error(error.msg || "Error al registrar usuario");
  }

  return respuesta.json();
}

// Login (ajusta la ruta si tu backend usa otro nombre)
export async function loginUsuario(datos: {
  correo: string;
  contrasenia: string;
}) {
  const respuesta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}));
    throw new Error(error.msg || "Credenciales incorrectas");
  }

  return respuesta.json();
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Registrar al usuario
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
    const error = await respuesta.json().catch(() => ({}));
    throw new Error(error.msg || "Error al registrar usuario");
  }

  return respuesta.json();
}

//Login
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

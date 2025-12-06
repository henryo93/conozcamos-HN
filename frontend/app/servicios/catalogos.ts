const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function obtenerDificultades() {
  const res = await fetch(`${API_URL}/dificultades`);
  const data = await res.json();
  return data;
}

export async function obtenerModalidades() {
  const res = await fetch(`${API_URL}/modalidades`);
  const data = await res.json();
  return data;
}

export async function obtenerTrivias() {
  const res = await fetch(`${API_URL}/trivias`);
  const data = await res.json();
  return data;
}

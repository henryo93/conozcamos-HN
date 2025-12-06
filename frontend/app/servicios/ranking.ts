const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Guardar un resultado de juego
export async function guardarRanking({
  idTrivia,
  idDificultad,
  idModalidad,
  tiempoInicio,
  tiempoFin,
  totalPuntos,
  idUsuario,
}: any) {
  const res = await fetch(`${API_URL}/ranking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idTrivia,
      idDificultad,
      idModalidad,
      tiempoInicio,
      tiempoFin,
      totalPuntos,
      idUsuario,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.msg || "Error al guardar ranking");

  return data;
}

// Obtener ranking filtrado
export async function obtenerRanking({
  idTrivia,
  idDificultad,
  idModalidad,
}: {
  idTrivia: number;
  idDificultad: number;
  idModalidad: number;
}) {
  const url = `${API_URL}/rankings?idTrivia=${idTrivia}&idDificultad=${idDificultad}&idModalidad=${idModalidad}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error("Error al obtener ranking");

  return data;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Obtener preguntas segun los filtros
export async function obtenerPreguntas({
  idTrivia,
  idDificultad,
  idModalidad,
}: {
  idTrivia: number;
  idDificultad: number;
  idModalidad: number;
}) {
  const url = `${API_URL}/preguntas?idTrivia=${idTrivia}&idDificultad=${idDificultad}&idModalidad=${idModalidad}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error("Error al obtener preguntas");
  return data;
}

//Obtener respuestas de una pregunta
export async function obtenerRespuestas(idPregunta: number) {
  const res = await fetch(`${API_URL}/respuestas/${idPregunta}`);
  const data = await res.json();

  if (!res.ok) throw new Error("Error al obtener respuestas");
  return data;
}

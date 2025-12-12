const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

import { PreguntaParams } from "../modelos/Pregunta";
// Obtener preguntas segun filtros
export async function obtenerPreguntas(preguntaParams: PreguntaParams) {
  const url = `${API_URL}/preguntas?idTrivia=${preguntaParams.idTrivia}&idDificultad=${preguntaParams.idDificultad}&idModalidad=${preguntaParams.idModalidad}`;

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

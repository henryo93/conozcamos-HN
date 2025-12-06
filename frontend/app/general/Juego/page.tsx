"use client";

import { useEffect, useState } from "react";
import { obtenerPreguntas, obtenerRespuestas } from "@/servicios/preguntas";
import { guardarRanking } from "@/servicios/ranking";

type PreguntaConRespuestas = {
  idPregunta: number;
  nombre: string;
  respuestas: any[];
};

export default function JuegoPage({ searchParams }: any) {
  const idTrivia = Number(searchParams.idTrivia);
  const idDificultad = Number(searchParams.idDificultad);
  const idModalidad = Number(searchParams.idModalidad);

  const [preguntas, setPreguntas] = useState<PreguntaConRespuestas[]>([]);
  const [indice, setIndice] = useState(0);
  const [totalPuntos, setTotalPuntos] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completado, setCompletado] = useState(false);
  const [tiempoInicio, setTiempoInicio] = useState<string | null>(null);

  useEffect(() => {
    async function cargarJuego() {
      try {
        setCargando(true);
        const datos = await obtenerPreguntas({ idTrivia, idDificultad, idModalidad });

        // Para cada pregunta obtener respuestas
        const preguntasConResp: PreguntaConRespuestas[] = await Promise.all(
          datos.map(async (p: any) => {
            const resp = await obtenerRespuestas(p.idPregunta);
            return { idPregunta: p.idPregunta, nombre: p.nombre, respuestas: resp };
          })
        );

        setPreguntas(preguntasConResp);
        setIndice(0);
        setTotalPuntos(0);
        setTiempoInicio(new Date().toISOString());
      } catch (err: any) {
        setError(err.message || "Error al cargar preguntas");
      } finally {
        setCargando(false);
      }
    }

    cargarJuego();
  }, [idTrivia, idDificultad, idModalidad]);

  const seleccionarRespuesta = (puntos: number) => {
    setTotalPuntos((t) => t + (puntos || 0));

    if (indice + 1 >= preguntas.length) {
      terminar();
    } else {
      setIndice((i) => i + 1);
    }
  };

  const terminar = async () => {
    const fin = new Date().toISOString();
    const usuario = typeof window !== 'undefined' ? localStorage.getItem('usuario') : null;
    let idUsuario = null;
    try {
      if (usuario) {
        const parsed = JSON.parse(usuario);
        idUsuario = parsed.idUsuario || null;
      }
    } catch (e) {
      idUsuario = null;
    }

    try {
      await guardarRanking({
        idTrivia,
        idDificultad,
        idModalidad,
        tiempoInicio,
        tiempoFin: fin,
        totalPuntos,
        idUsuario,
      });
    } catch (err) {
      // no bloquear si falla guardar ranking
      console.error("Error guardando ranking", err);
    }

    setCompletado(true);
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">Cargando...</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-red-600">{error}</p>
        <a href="/general/trivias" className="mt-4 text-blue-600 hover:underline">Volver a Trivias</a>
      </div>
    );
  }

  if (completado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Juego terminado</h1>
        <p className="mb-4">Has obtenido <strong>{totalPuntos}</strong> puntos.</p>
        <a href={`/general/ranking?idTrivia=${idTrivia}&idDificultad=${idDificultad}&idModalidad=${idModalidad}`} className="text-blue-600 hover:underline">Ver Ranking</a>
        <a href="/general/trivias" className="mt-4 text-blue-600 hover:underline">Volver a Trivias</a>
      </div>
    );
  }

  const pregunta = preguntas[indice];

  return (
    <div className="min-h-screen p-6 bg-blue-100 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pregunta {indice + 1} de {preguntas.length}</h2>
          <div>Puntos: {totalPuntos}</div>
        </div>

        <h3 className="text-lg mb-6">{pregunta?.nombre}</h3>

        <div className="grid gap-3">
          {pregunta?.respuestas?.map((r: any) => (
            <button
              key={r.id}
              onClick={() => seleccionarRespuesta(r.puntos)}
              className="text-left p-3 border rounded hover:bg-gray-100"
            >
              {r.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

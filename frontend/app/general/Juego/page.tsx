"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { obtenerPreguntas, obtenerRespuestas } from "../../servicios/preguntas";
import { guardarRanking } from "../../servicios/ranking";

export default function JuegoPage() {
  const searchParams = useSearchParams();

  const idTrivia = Number(searchParams.get("idTrivia"));
  const idDificultad = Number(searchParams.get("idDificultad"));
  const idModalidad = Number(searchParams.get("idModalidad"));

  // ✅ Validación fuerte
  if (!idTrivia || !idDificultad || !idModalidad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-red-600">
          ❌ Parámetros inválidos del juego
        </p>
      </div>
    );
  }

  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<any[]>([]);
  const [pos, setPos] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);

  // ⏱️ Tiempo: Básico 5 min – Experto 3 min
  const tiempoInicial = idDificultad === 2 ? 180 : 300;
  const [tiempo, setTiempo] = useState(tiempoInicial);

  const usuario =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("usuario") || "null")
      : null;

  /* =========================
     CARGAR PREGUNTAS
  ========================= */
  useEffect(() => {
    async function cargar() {
      const preg = await obtenerPreguntas({
        idTrivia,
        idDificultad,
        idModalidad,
      });

      setPreguntas(preg);

      if (preg.length > 0) {
        const resp = await obtenerRespuestas(preg[0].idPregunta);
        setRespuestas(resp);
      }
    }

    cargar();
  }, [idTrivia, idDificultad, idModalidad]);

  /* =========================
     TIMER GLOBAL
  ========================= */
  useEffect(() => {
    if (tiempo <= 0) {
      finalizarPorTiempo();
      return;
    }

    const intervalo = setInterval(() => {
      setTiempo((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempo]);

  /* =========================
     FINALIZAR JUEGO
  ========================= */
  async function finalizarPorTiempo() {
    try {
      await guardarRanking({
        idTrivia,
        idDificultad,
        idModalidad,
        idUsuario: usuario?.idUsuario ?? 1,
        tiempoInicio: new Date().toISOString(),
        tiempoFin: new Date().toISOString(),
        totalPuntos: puntos,
      });
    } catch (err: any) {
      // Mostrar error al usuario y registrar en consola
      console.error("Error guardando ranking:", err);
      // Aviso amable al usuario; redirigimos igualmente a la pantalla de ranking
      alert("No se pudo guardar el ranking en este momento. Serás redirigido al ranking.");
    }

    window.location.href = `/general/ranking?idTrivia=${idTrivia}&idDificultad=${idDificultad}&idModalidad=${idModalidad}`;
  }

  /* =========================
     RESPONDER
  ========================= */
  const responder = (idRespuesta: number) => {
    if (respondido) return;

    setSeleccion(idRespuesta);
    setRespondido(true);

    // ✅ CORRECTO según tu BD
    const correctaId = respuestas.find(
      (r) => Number(r.puntos) === 1
    )?.id;

    if (idRespuesta === correctaId) {
      setPuntos((p) => p + 1);
    }
  };

  /* =========================
     SIGUIENTE PREGUNTA
  ========================= */
  const siguiente = async () => {
    const siguienteIndex = pos + 1;

    if (siguienteIndex >= preguntas.length) {
      await finalizarPorTiempo();
      return;
    }

    setPos(siguienteIndex);
    setSeleccion(null);
    setRespondido(false);

    const resp = await obtenerRespuestas(
      preguntas[siguienteIndex].idPregunta
    );
    setRespuestas(resp);
  };

  // LOADING
  if (preguntas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        🎲 Cargando preguntas...
      </div>
    );
  }

  const actual = preguntas[pos];
  const correcta = respuestas.find(
    (r) => Number(r.puntos) === 1
  )?.id;

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg text-center">

        {/* TIMER */}
        <div className="mb-4">
          <p className="font-bold">⏱️ Tiempo restante</p>
          <p className="text-red-600 text-2xl font-extrabold">
            {Math.floor(tiempo / 60)}:{String(tiempo % 60).padStart(2, "0")}
          </p>
        </div>

        <h2 className="text-lg font-bold mb-2">
          Pregunta {pos + 1} / {preguntas.length}
        </h2>

        {/* ✅ IMPORTANTE: TU BD USA `nombre` */}
        <p className="font-semibold mb-4">{actual.nombre}</p>

        {/* RESPUESTAS */}
        <div className="flex flex-col gap-3">
          {respuestas.map((r: any) => {
            const isCorrect = r.id === correcta;
            const isSelected = r.id === seleccion;

            let clase = "py-3 rounded-lg font-semibold bg-indigo-500 text-white";

            if (respondido && isCorrect) clase = "py-3 rounded-lg font-semibold bg-green-500 text-white";
            if (respondido && isSelected && !isCorrect) clase = "py-3 rounded-lg font-semibold bg-red-500 text-white";
            if (respondido && !isSelected && !isCorrect) clase = "py-3 rounded-lg font-semibold bg-gray-300 text-gray-700";

            return (
              <button
                key={r.id} // ✅ CLAVE ÚNICA REAL
                disabled={respondido}
                onClick={() => responder(r.id)}
                className={clase}
              >
                {r.nombre}
              </button>
            );
          })}
        </div>

        {respondido && (
          <button
            onClick={siguiente}
            className="mt-6 bg-yellow-400 text-black py-2 px-6 rounded-lg font-bold hover:bg-yellow-500"
          >
            👉 Siguiente
          </button>
        )}

        <p className="mt-4 font-bold">⭐ Puntos: {puntos}</p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { obtenerDificultades, obtenerModalidades } from "@/servicios/catalogos";

export default function ConfiguracionPage({ searchParams }: any) {
  const idTrivia = Number(searchParams.idTrivia);

  const [dificultades, setDificultades] = useState<any[]>([]);
  const [modalidades, setModalidades] = useState<any[]>([]);

  const [idDificultad, setIdDificultad] = useState<number | null>(null);
  const [idModalidad, setIdModalidad] = useState<number | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      const dif = await obtenerDificultades();
      const mod = await obtenerModalidades();

      setDificultades(dif);
      setModalidades(mod);
    }
    cargarDatos();
  }, []);

  const iniciar = () => {
    if (!idDificultad || !idModalidad) return alert("Selecciona dificultad y modalidad");

    window.location.href = `/general/juego?idTrivia=${idTrivia}&idDificultad=${idDificultad}&idModalidad=${idModalidad}`;
  };

  return (
    <div className="min-h-screen p-6 bg-blue-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Configuración de Juego</h1>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <div>
          <label className="font-semibold">Dificultad</label>
          <select
            className="w-full p-3 rounded-lg border"
            onChange={(e) => setIdDificultad(Number(e.target.value))}
          >
            <option value="">-- Seleccionar --</option>
            {dificultades.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Modalidad</label>
          <select
            className="w-full p-3 rounded-lg border"
            onChange={(e) => setIdModalidad(Number(e.target.value))}
          >
            <option value="">-- Seleccionar --</option>
            {modalidades.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={iniciar}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Iniciar Trivia
        </button>

        <a href="/general/trivias" className="text-center text-blue-600 hover:underline mt-4">
          Volver
        </a>
      </div>
    </div>
  );
}

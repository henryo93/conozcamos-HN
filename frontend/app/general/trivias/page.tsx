"use client";

import { useEffect, useState } from "react";
import { obtenerTrivias } from "@/servicios/catalogos";

export default function TriviasPage() {
  const [trivias, setTrivias] = useState<any[]>([]);

  useEffect(() => {
    async function cargar() {
      const data = await obtenerTrivias();
      setTrivias(data);
    }
    cargar();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-blue-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Selecciona una Trivia</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {trivias.map((t) => (
          <a
            key={t.id}
            href={`/general/configuracion?idTrivia=${t.id}`}
            className="bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition"
          >
            {t.nombre}
          </a>
        ))}

        <a href="/general/inicio" className="text-center text-blue-600 hover:underline mt-4">
          Ir al Inicio
        </a>
      </div>
    </div>
  );
}

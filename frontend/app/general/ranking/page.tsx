"use client";

import { useEffect, useState } from "react";
import { obtenerRanking } from "@/servicios/ranking";

export default function RankingPage({ searchParams }: any) {
  const idTrivia = Number(searchParams?.idTrivia || 0);
  const idDificultad = Number(searchParams?.idDificultad || 0);
  const idModalidad = Number(searchParams?.idModalidad || 0);

  const [ranking, setRanking] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        setCargando(true);
        const data = await obtenerRanking({ idTrivia, idDificultad, idModalidad });
        setRanking(data || []);
      } catch (e) {
        setRanking([]);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, [idTrivia, idDificultad, idModalidad]);

  return (
    <div className="min-h-screen p-6 bg-blue-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Ranking</h1>

      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow">
        {cargando && <p className="text-center">Cargando...</p>}
        {!cargando && ranking.length === 0 && <p className="text-center">Sin resultados aún</p>}

        {ranking.map((r: any, i: number) => (
          <div key={r.id || i} className="flex justify-between border-b py-2">
            <span>#{i + 1}</span>
            <span>{r.idUsuario ?? r.apodo ?? "Anon"}</span>
            <span>{r.totalPuntos} pts</span>
          </div>
        ))}
      </div>

      <a href="/general/trivias" className="mt-6 text-blue-700 hover:underline">Ir a Trivias</a>
    </div>
  );
}

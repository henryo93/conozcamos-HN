"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { obtenerRanking } from "../../servicios/ranking";

export default function RankingPage() {
  const searchParams = useSearchParams();

  const idTrivia = Number(searchParams.get("idTrivia"));
  const idDificultad = Number(searchParams.get("idDificultad"));
  const idModalidad = Number(searchParams.get("idModalidad"));

  // ✅ Validación fuerte
  if (!idTrivia || !idDificultad || !idModalidad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-red-600">
          ❌ Parámetros inválidos para ranking
        </p>
      </div>
    );
  }

  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     CARGAR RANKING
  ========================= */
  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerRanking({
          idTrivia,
          idDificultad,
          idModalidad,
        });
        setRanking(data);
      } catch (error) {
        console.error("Error ranking:", error);
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, [idTrivia, idDificultad, idModalidad]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        📊 Cargando ranking...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-6">
      <div className="card" style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, textAlign: "center", marginBottom: 12 }}>🏆 Ranking</h1>

        {ranking.length === 0 ? (
          <div style={{ textAlign: "center", padding: 24 }}>
            <p className="text-center text-gray-500">No hay resultados aún</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e6e6e6" }}>
                  <th style={{ textAlign: "left", padding: "8px 6px" }}>#</th>
                  <th style={{ textAlign: "left", padding: "8px 6px" }}>Usuario</th>
                  <th style={{ textAlign: "right", padding: "8px 6px" }}>Puntos</th>
                </tr>
              </thead>

              <tbody>
                {ranking.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "10px 6px" }}>{i + 1}</td>
                    <td style={{ padding: "10px 6px" }}>{r.apodo || "Jugador"}</td>
                    <td style={{ padding: "10px 6px", textAlign: "right", fontWeight: 800 }}>{r.totalPuntos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: 18, textAlign: "center" }}>
          <a href="/general/trivia" className="primary-btn" style={{ display: "inline-block" }}>
            🔁 Jugar otra vez
          </a>
        </div>
      </div>
    </div>
  );
}

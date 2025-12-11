"use client";

import { useEffect, useState } from "react";
import { obtenerRanking } from "../../servicios/ranking";
import { obtenerTrivia, obtenerModalidades, obtenerDificultades } from "../../servicios/catalogos";


export default function RankingsPage() {
  const [trivias, setTrivias] = useState<any[]>([]);
  const [modalidades, setModalidades] = useState<any[]>([]);
  const [dificultades, setDificultades] = useState<any[]>([]);

  const [idTrivia, setIdTrivia] = useState<number>(0);
  const [idModalidad, setIdModalidad] = useState<number>(0);
  const [idDificultad, setIdDificultad] = useState<number>(0);


  const [ranking, setRanking] = useState<any[]>([]);
  
 //cargar los rankings
  useEffect(() => {

    async function cargarOpciones() {

      const triviasData = await obtenerTrivia();
      const modalidadesData = await obtenerModalidades();
      const dificultadesData = await obtenerDificultades();
      setTrivias(triviasData);
      setModalidades(modalidadesData);
      setDificultades(dificultadesData);

    }
    cargarOpciones();
  }, []);

  useEffect(() => {
    if (!idTrivia || !idModalidad || !idDificultad) return;
    
    async function cargarRanking() {
      try {
        const data = await obtenerRanking({ idTrivia, idModalidad, idDificultad });
        setRanking(data.filas);
        
      } catch (error) {
        console.error("Error ranking:", error);
      } 
    }
    cargarRanking();
  }, [idTrivia, idModalidad, idDificultad]);

 

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card" style={{ maxWidth: 720 }}>
        <h1 className="text-[22px] font-black text-center mb-3">🏆 Ranking</h1>
        {/* Selectores */}
        <div className="mb-5 justify-center flex gap-4">
          <div>
            <label className="font-bold">Trivia:</label>
            <select value={idTrivia} onChange={e => setIdTrivia(Number(e.target.value))} style={{ marginRight: 8 }}>
              <option value={0}>-- Selecciona --</option>
              {trivias.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="font-bold">Modalidad:</label>
            <select value={idModalidad} onChange={e => setIdModalidad(Number(e.target.value))} style={{ marginRight: 8 }}>
              <option value={0}>-- Selecciona --</option>
              {modalidades.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="font-bold">Dificultad:</label>
            <select value={idDificultad} onChange={e => setIdDificultad(Number(e.target.value))}>
              <option value={0}>-- Selecciona --</option>
              {dificultades.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
            </select>
          </div>
        </div>
       
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
                  <th style={{ textAlign: "right", padding: "8px 6px" }}>Tiempo</th>
                </tr>
              </thead>

              <tbody>
                {ranking.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "10px 6px" }}>{i + 1}</td>
                    <td style={{ padding: "10px 6px" }}>{r.usuario.apodo || "Jugador"}</td>
                    <td style={{ padding: "10px 6px", textAlign: "right", fontWeight: 800 }}>{r.totalPuntos}</td>
                    <td style={{ padding: "10px 6px", textAlign: "right", fontWeight: 800 }}>{r.tiempo}</td>
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

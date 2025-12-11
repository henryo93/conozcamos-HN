const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
//ranking
interface GuardarRankingDTO {
  idTrivia: number;
  idDificultad: number;
  idModalidad: number;
  idUsuario: number;
  totalPuntos: number;
  fecha: string; // iso string es lo que me sirvio
  tiempo: string;    // tiempo en formato string
}

interface ObtenerRankingParams {
  idTrivia?: number;
  idDificultad?: number;
  idModalidad?: number;
}

//Guardar rankings.

export async function guardarRanking(datos: GuardarRankingDTO) {
  const res = await fetch(`${API_URL}/ranking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  let data: any = null;
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    console.error("❌ Error backend guardar ranking:", data);
    const mensaje =
      (data && data.msg) ||
      (typeof data === "string" && data) ||
      `Error ${res.status}`;
    throw new Error(mensaje);
  }

  return data;
}

//obtener rankings
export async function obtenerRanking(params: ObtenerRankingParams = {}) {
  const query = new URLSearchParams();

  if (params.idTrivia !== undefined)
    query.append("idTrivia", params.idTrivia.toString());
  if (params.idDificultad !== undefined)
    query.append("idDificultad", params.idDificultad.toString());
  if (params.idModalidad !== undefined)
    query.append("idModalidad", params.idModalidad.toString());

  const res = await fetch(`${API_URL}/ranking?${query.toString()}`);

  let data: any = null;
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    console.error("Error backend obtener ranking:", data);
    const mensaje =
      (data && data.msg) ||
      (typeof data === "string" && data) ||
      `Error ${res.status}`;
    throw new Error(mensaje);
  }

  return data;
}

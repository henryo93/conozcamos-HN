export interface Ranking {
  idTrivia: number;
  idDificultad: number;
  idModalidad: number;
  idUsuario: number;
  totalPuntos: number;
  fecha: string; // iso string es lo que me sirvio
  tiempo: string;    // tiempo en formato string
}


export interface RankingParams {
  idTrivia?: number;
  idDificultad?: number;
  idModalidad?: number;
}
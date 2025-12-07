export default function InicioPage() {
  return (
    <div>
      <div className="card" style={{ maxWidth: 640, margin: "2rem auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>¡Bienvenido a Conozcamos Honduras!</h1>

        <p style={{ marginTop: 8, color: "#f3f4f6" }}>Juega, aprende y compite con tus amigos</p>

        <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
          <a href="/general/trivia" className="primary-btn" style={{ textAlign: "center" }}>
            Trivias
          </a>

          <a href="/general/ranking" className="primary-btn" style={{ textAlign: "center", background: "linear-gradient(90deg,#10b981,#7c3aed)" }}>
            Ranking
          </a>

          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <a href="/general/login" className="secondary-link">Iniciar Sesión</a>
            <a href="/general/registro" className="secondary-link">Registrarme</a>
          </div>
        </div>
      </div>
    </div>
  );
}

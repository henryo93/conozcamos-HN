export default function InicioPage() {
  return (
    <div>
      <div className="card max-w-xl mx-auto mt-8 text-center">
        <h1 className="text-2xl font-extrabold">¡Bienvenido a Conozcamos Honduras!</h1>

        <p className="mt-2 text-indigo-600">Juega, aprende y compite con tus amigos</p>

        <div className="grid gap-3 mt-4">
          <a href="/general/trivia" className="primary-btn text-center" >
            Trivias
          </a>

          <a href="/general/rankings" className="primary-btn" style={{ background: "linear-gradient(90deg,#10b981,#7c3aed)" }}>
            Ranking
          </a>

        </div>
      </div>
    </div>
  );
}

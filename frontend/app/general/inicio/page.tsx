export default function InicioPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-blue-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">¡Bienvenido a Conozcamos Honduras!</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <a href="/general/trivias" className="bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700">
          Trivias
        </a>

        <a href="/general/ranking" className="bg-green-600 text-white py-3 rounded-lg text-center hover:bg-green-700">
          Ranking
        </a>
      </div>
    </div>
  );
}

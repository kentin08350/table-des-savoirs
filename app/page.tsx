export default function TableDesSavoirsDashboard() {
  const joueurs = [
    {
      nom: "Lucas",
      score: 7.8,
      bonus: 1.9,
      parties: 24,
      meilleur: 10,
    },
    {
      nom: "Max",
      score: 7.1,
      bonus: 1.4,
      parties: 19,
      meilleur: 9,
    },
    {
      nom: "Tom",
      score: 6.5,
      bonus: 1.2,
      parties: 21,
      meilleur: 8,
    },
  ];

  const top = [...joueurs].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              La Table des Savoirs
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">
              Classement live • Statistiques • Historique
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl px-6 py-4 shadow-2xl">
            <p className="text-zinc-400 text-sm">Dernière mise à jour</p>
            <p className="text-2xl font-bold">11 mai 2026</p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <p className="text-zinc-400 text-sm">Leader actuel</p>
            <h2 className="text-3xl font-bold mt-2">{top[0].nom}</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <p className="text-zinc-400 text-sm">Score moyen max</p>
            <h2 className="text-3xl font-bold mt-2">{top[0].score}/10</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <p className="text-zinc-400 text-sm">Nombre total de parties</p>
            <h2 className="text-3xl font-bold mt-2">
              {joueurs.reduce((a, b) => a + b.parties, 0)}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <p className="text-zinc-400 text-sm">Meilleur score</p>
            <h2 className="text-3xl font-bold mt-2">10/10</h2>
          </div>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Classement Général</h2>

            <div className="bg-zinc-800 rounded-2xl px-4 py-2 text-sm text-zinc-300">
              Saison 1
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="pb-4">#</th>
                  <th className="pb-4">Joueur</th>
                  <th className="pb-4">Score moyen</th>
                  <th className="pb-4">Bonus moyen</th>
                  <th className="pb-4">Parties</th>
                  <th className="pb-4">Meilleur score</th>
                </tr>
              </thead>

              <tbody>
                {top.map((joueur, index) => (
                  <tr
                    key={joueur.nom}
                    className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                  >
                    <td className="py-5 text-2xl font-bold">
                      {index === 0 && "🥇"}
                      {index === 1 && "🥈"}
                      {index === 2 && "🥉"}
                    </td>

                    <td className="py-5 text-xl font-semibold">
                      {joueur.nom}
                    </td>

                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-zinc-800 rounded-full h-3">
                          <div
                            className="bg-white h-3 rounded-full"
                            style={{ width: `${joueur.score * 10}%` }}
                          />
                        </div>

                        <span className="font-bold min-w-[60px]">
                          {joueur.score}/10
                        </span>
                      </div>
                    </td>

                    <td className="py-5 font-semibold">
                      {joueur.bonus}/3
                    </td>

                    <td className="py-5">{joueur.parties}</td>

                    <td className="py-5">{joueur.meilleur}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Derniers résultats</h2>

            <div className="space-y-4">
              {[
                {
                  quiz: "Quiz Abordable",
                  joueur: "Lucas",
                  score: "8/10",
                  bonus: "2/3",
                },
                {
                  quiz: "Culture Générale",
                  joueur: "Max",
                  score: "7/10",
                  bonus: "1/3",
                },
                {
                  quiz: "Cinéma",
                  joueur: "Tom",
                  score: "6/10",
                  bonus: "1/3",
                },
              ].map((resultat, i) => (
                <div
                  key={i}
                  className="bg-zinc-800 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-lg">{resultat.quiz}</p>
                    <p className="text-zinc-400">{resultat.joueur}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl">{resultat.score}</p>
                    <p className="text-zinc-400">Bonus {resultat.bonus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Hall of Fame</h2>

            <div className="space-y-5">
              <div className="bg-zinc-800 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Plus haut score</p>
                <h3 className="text-3xl font-black mt-2">Lucas — 10/10</h3>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Meilleur bonus</p>
                <h3 className="text-3xl font-black mt-2">Max — 3/3</h3>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Joueur le plus régulier</p>
                <h3 className="text-3xl font-black mt-2">Tom</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

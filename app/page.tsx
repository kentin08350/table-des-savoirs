async function getScores() {
  const response = await fetch(
    "https://opensheet.elk.sh/1SUS5bdqapXtLbpHmh93q1l8MIHfDro2AhIMsfnDVjJA/Scores",
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export default async function TableDesSavoirsDashboard() {

  const scores = await getScores();

  const joueursMap: any = {};

  const moisActuel = new Date().toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const moisCapitalized =
    moisActuel.charAt(0).toUpperCase() + moisActuel.slice(1);

  scores.forEach((entry: any) => {

    const joueur = entry.Joueur;

    if (!joueursMap[joueur]) {

      joueursMap[joueur] = {
        nom: joueur,
        totalScore: 0,
        parties: 0,
        meilleur: 0,
        totalMois: 0,
      };

    }

    const score = Number(entry["Score"] || 0);

    joueursMap[joueur].totalScore += score;
    joueursMap[joueur].parties += 1;

    if (score > joueursMap[joueur].meilleur) {
      joueursMap[joueur].meilleur = score;
    }

    // Calcul du total du mois actuel

    const dateEntry = entry["Date"];

    if (dateEntry) {

      const dateTexte = new Date(dateEntry);

      const maintenant = new Date();

      if (
        dateTexte.getMonth() === maintenant.getMonth() &&
        dateTexte.getFullYear() === maintenant.getFullYear()
      ) {

        joueursMap[joueur].totalMois += score;

      }

    }

  });

  const joueurs = Object.values(joueursMap).map((j: any) => ({

    nom: j.nom,

    score: (j.totalScore / j.parties).toFixed(1),

    parties: j.parties,

    meilleur: j.meilleur,

    totalMois: j.totalMois,

  }));

  const classement = [...joueurs].sort(
    (a: any, b: any) => b.totalMois - a.totalMois
  );

  const totalParties = joueurs.reduce(
    (acc: number, j: any) => acc + j.parties,
    0
  );

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

            <p className="text-zinc-400 text-sm">
              Saison actuelle
            </p>

            <p className="text-2xl font-bold">
              {moisCapitalized}
            </p>

          </div>

        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">

            <p className="text-zinc-400 text-sm">
              Leader actuel
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {classement[0]?.nom || "-"}
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">

            <p className="text-zinc-400 text-sm">
              Meilleur score moyen
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {classement[0]?.score || 0}/10
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">

            <p className="text-zinc-400 text-sm">
              Parties jouées
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalParties}
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">

            <p className="text-zinc-400 text-sm">
              Nombre de joueurs
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {joueurs.length}
            </h2>

          </div>

        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold">
              Classement Mensuel
            </h2>

            <div className="bg-zinc-800 rounded-2xl px-4 py-2 text-sm text-zinc-300">
              {moisCapitalized}
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-zinc-800 text-zinc-400">

                  <th className="pb-4">#</th>
                  <th className="pb-4">Joueur</th>
                  <th className="pb-4">Score moyen</th>
                  <th className="pb-4">Total du mois</th>
                  <th className="pb-4">Parties</th>
                  <th className="pb-4">Meilleur score</th>

                </tr>

              </thead>

              <tbody>

                {classement.map((joueur: any, index: number) => (

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
                            style={{
                              width: `${Number(joueur.score) * 10}%`,
                            }}
                          />

                        </div>

                        <span className="font-bold min-w-[60px]">
                          {joueur.score}/10
                        </span>

                      </div>

                    </td>

                    <td className="py-5 font-bold text-xl">
                      {joueur.totalMois}
                    </td>

                    <td className="py-5">
                      {joueur.parties}
                    </td>

                    <td className="py-5">
                      {joueur.meilleur}/10
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </div>

  );

}
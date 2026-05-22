"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const nomsJoueurs: Record<string, string> = {
  kentin08350: "Quentin",
  baptiste_phaleina_b: "Batou",
  jetrokzz: "Romain",
  wagram92: "David",
  fus: "Fus",
  valrad_03dm: "Valentin",
  desturion: "Destu",
  papy2542: "Papy",
  gd172005: "Junior",
};

  const [scores, setScores] = useState<any[]>([]);

  const [stats, setStats] = useState({
  meilleurJoueur: "",
  meilleurScore: 0,
  totalParties: 0,
  totalPoints: 0,
});

  useEffect(() => {

    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQDn1mPMT3p_x1h0tJXh_y9bApI3_7M3SiO1iPuxC2t7BLK3mqURhmx7yC6tSsp8XjcLle08WUWL7f3/pub?gid=415154897&single=true&output=csv")
  .then((res) => res.text())
  .then((csv) => {

    const lignes = csv.split("\n").slice(1);

    const joueursMap: any = {};

    lignes.forEach((ligne) => {

      const colonnes = ligne.split(",");

      const joueur = String(
        colonnes[1] || ""
      ).trim();

      const score = Number(
        colonnes[4] || 0
      );

      const bonus = Number(
        colonnes[5] || 0
      );

      const dateTexte = String(
        colonnes[0] || ""
      ).toLowerCase();

      const moisActuel = new Date()
        .toLocaleDateString(
          "fr-FR",
          {
            month: "long",
            year: "numeric",
          }
        )
        .toLowerCase();

      if (!joueursMap[joueur]) {

        joueursMap[joueur] = {
          joueur,
          parties: 0,
          totalScore: 0,
          totalBonus: 0,
          totalMois: 0,
          meilleurScore: 0,
        };

      }

      joueursMap[joueur].parties += 1;
      joueursMap[joueur].totalScore += score;
      joueursMap[joueur].totalBonus += bonus;

      if (
        score >
        joueursMap[joueur].meilleurScore
      ) {

        joueursMap[joueur].meilleurScore =
          score;

      }

      if (
        dateTexte.includes(
          moisActuel.split(" ")[0]
        ) &&
        dateTexte.includes(
          moisActuel.split(" ")[1]
        )
      ) {

        joueursMap[joueur].totalMois += score;

      }

    });

    const classement = Object.values(
      joueursMap
    )
      .map((j: any) => ({

        joueur: j.joueur,

        nomAffiche:
          nomsJoueurs[j.joueur] ||
          j.joueur,

        parties: j.parties,

        scoreMoyen:
          (
            j.totalScore /
            j.parties
          ).toFixed(1),

        totalMois: j.totalMois,

        meilleurScore:
          j.meilleurScore,

      }))
      .sort(
        (a: any, b: any) =>
          Number(b.scoreMoyen) -
          Number(a.scoreMoyen)
      );

      const meilleur = classement[0];

setStats({
  meilleurJoueur: meilleur?.nomAffiche || "-",
  meilleurScore: Number(meilleur?.scoreMoyen || 0),
  totalParties: classement.reduce(
    (acc: number, j: any) => acc + j.parties,
    0
  ),
  totalPoints: classement.reduce(
    (acc: number, j: any) => acc + j.totalMois,
    0
  ),
});

    setScores(classement);

  });

  }, []);

  const moisActuel = new Date()
    .toLocaleDateString(
      "fr-FR",
      {
        month: "long",
        year: "numeric",
      }
    );

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold">
            Classement Mensuel
          </h1>

          <div className="bg-zinc-900 px-6 py-3 rounded-2xl text-xl capitalize">
            {moisActuel}
          </div>

        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

  <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
    <p className="text-zinc-400 text-sm mb-2">
      Meilleur joueur
    </p>
    <h2 className="text-2xl font-bold">
      {stats.meilleurJoueur}
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
    <p className="text-zinc-400 text-sm mb-2">
      Score moyen
    </p>
    <h2 className="text-2xl font-bold">
      {stats.meilleurScore}/10
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
    <p className="text-zinc-400 text-sm mb-2">
      Parties jouées
    </p>
    <h2 className="text-2xl font-bold">
      {stats.totalParties}
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
    <p className="text-zinc-400 text-sm mb-2">
      Total des points
    </p>
    <h2 className="text-2xl font-bold">
      {stats.totalPoints}
    </h2>
  </div>

</div>
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">

          <table className="w-full">

            <thead className="bg-zinc-950 text-zinc-400">

              <tr>

                <th className="p-6 text-left">#</th>

                <th className="p-6 text-left">
                  Joueur
                </th>

                <th className="p-6 text-left">
                  Score moyen
                </th>

                <th className="p-6 text-left">
                  Total du mois
                </th>

                <th className="p-6 text-left">
                  Parties
                </th>

                <th className="p-6 text-left">
                  Meilleur score
                </th>

              </tr>

            </thead>

            <tbody>

              {scores.map(
                (
                  entry: any,
                  index: number
                ) => (

                  <tr
                    key={entry.joueur}
                    className="border-t border-zinc-800"
                  >

                    <td className="p-6 text-2xl">

                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : index + 1}

                    </td>

                    <td className="p-6 text-2xl font-bold">

                      {entry.nomAffiche}

                    </td>

                    <td className="p-6 text-2xl">

                      {entry.scoreMoyen}/10

                    </td>

                    <td className="p-6 text-2xl font-bold">

                      {entry.totalMois}

                    </td>

                    <td className="p-6 text-2xl">

                      {entry.parties}

                    </td>

                    <td className="p-6 text-2xl">

                      {entry.meilleurScore}/10

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>

  );

}
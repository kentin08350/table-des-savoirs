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

  useEffect(() => {

    fetch("https://docs.google.com/spreadsheets/d/1SUS5bdqapXtLbpHmh93q1l8MIHfDro2AhIMsfnDVjJA/edit?gid=415154897#gid=415154897")
      .then((res) => res.json())
      .then((data) => {

        const joueursMap: any = {};

        data.forEach((entry: any) => {

          const joueur = String(
            entry.Joueur || ""
          ).trim();

          const score = Number(entry.Score) || 0;
          const bonus = Number(entry.Bonus) || 0;

          const dateTexte = String(
            entry.Date || ""
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

          if (score > joueursMap[joueur].meilleurScore) {

            joueursMap[joueur].meilleurScore = score;

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
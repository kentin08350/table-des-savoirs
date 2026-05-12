import { GoogleSpreadsheet } from "google-spreadsheet";

const SHEET_ID = "1SUS5bdqapXtLbpHmh93q1l8MIHfDro2AhIMsfnDVjJA";

export async function getScores() {

  const response = await fetch(
    `https://opensheet.elk.sh/${SHEET_ID}/Scores`
  );

  const data = await response.json();

  return data;
}

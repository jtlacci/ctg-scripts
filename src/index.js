const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function setup() {}

async function createCsv(data, tribe = "all", eliminatedDay) {
  const dir = `./player-data/${tribe}/${eliminatedDay || "all"}`;

  fs.mkdirSync(dir, { recursive: true });
  const csvWriter = createCsvWriter({
    path: `${dir}/${new Date().toJSON()}.csv`,
    header: [
      { id: "tribe", title: "tribe" },
      { id: "address", title: "address" },
      { id: "userName", title: "user name" },
      { id: "displayName", title: "display name" },
      { id: "profileImageUrl", title: "profile image" },
      { id: "eliminatedDay", title: "eliminated day" },
    ],
  });
  const filterByTribe = data.players.filter((p) =>
    tribe === "all" ? true : p.tribe === tribe
  );

  const filterByElimination = filterByTribe.filter((p) =>
    eliminatedDay
      ? p.eliminatedDay === eliminatedDay
      : typeof p.eliminatedDay !== "number"
  );
  //console.log(filterByElimination);

  const records = filterByElimination;

  await csvWriter.writeRecords(records);
  return records;
}

async function clockGuesser() {
  const { data } = await axios(
    "https://cryptothegame.com/api/state/mini-game?day=4"
  );

  console.log(data);
}

async function createPacManCsv() {
  const { data } = await axios("https://cryptothegame.com/api/state/players");

  const {
    data: { allPlayersLeaderboard },
  } = await axios("https://cryptothegame.com/api/state/mini-game-result?day=3");

  const dir = `./game-data/all/`;
  fs.mkdirSync(dir, { recursive: true });

  const csvWriter = createCsvWriter({
    path: `./game-data/all/pacman.csv`,
    header: [
      { id: "tribe", title: "tribe" },
      { id: "address", title: "address" },
      { id: "userName", title: "user name" },
      { id: "displayName", title: "display name" },
      { id: "score", title: "score" },
      { id: "attempts", title: "attempts" },
      { id: "isCheater", title: "isCheater" },
    ],
  });

  const filterByTribe = data.players; //.filter((p) => p.tribe === "red");
  const filterByElimination = filterByTribe.filter(
    (p) => !p.eliminatedDay || p.eliminatedDay === 0
  );

  const playersWithScore = filterByElimination.map((player) => {
    const found = allPlayersLeaderboard.find(
      (scorer) => scorer.address === player.address
    );

    return { ...player, ...found };
  });

  console.log(playersWithScore);

  await csvWriter.writeRecords(playersWithScore);
}

async function createFlappyCsv() {
  const { data } = await axios("https://cryptothegame.com/api/state/players");

  const {
    data: { allPlayersLeaderboard },
  } = await axios("https://cryptothegame.com/api/state/mini-game-result?day=7");

  const dir = `./game-data/all/`;
  fs.mkdirSync(dir, { recursive: true });

  const csvWriter = createCsvWriter({
    path: `./game-data/all/flappy.csv`,
    header: [
      { id: "tribe", title: "tribe" },
      { id: "address", title: "address" },
      { id: "userName", title: "user name" },
      { id: "displayName", title: "display name" },
      { id: "score", title: "score" },
      { id: "attempts", title: "attempts" },
      { id: "isCheater", title: "isCheater" },
    ],
  });

  const filterByTribe = data.players; //.filter((p) => p.tribe === "red");
  const filterByElimination = filterByTribe.filter(
    (p) => !p.eliminatedDay || p.eliminatedDay === 0
  );

  const playersWithScore = filterByElimination.map((player) => {
    const found = allPlayersLeaderboard.find(
      (scorer) => scorer.address === player.address
    );

    return { ...player, ...found };
  });

  console.log(playersWithScore);

  await csvWriter.writeRecords(playersWithScore);
}

/* Script Entry */
async function main() {
  // const { db, client } = await setup();
  // const { data } = await axios("https://cryptothegame.com/api/state/players");
  // await createCsv(data);
  // await createCsv(data, "red");
  // await createCsv(data, "all");
  // await createPacManCsv();
  // await clockGuesser();
  await createFlappyCsv();
}

main().then(() => {
  console.log("END");
  return process.exit(1);
});

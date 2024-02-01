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
    eliminatedDay ? p.eliminatedDay === eliminatedDay : true
  );
  console.log(filterByElimination);

  const records = filterByElimination;

  await csvWriter.writeRecords(records);
}

/* Script Entry */
async function main() {
  // const { db, client } = await setup();

  const { data } = await axios("https://cryptothegame.com/api/state/players");

  // await createCsv(data);
  // await createCsv(data, "green");
  // await createCsv(data, "red", 1);
}

main().then(() => {
  console.log("END");
  return process.exit(1);
});

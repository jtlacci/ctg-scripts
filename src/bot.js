const { default: axios } = require("axios");
const {
  formatDistanceToNow,
  compareAsc,
  differenceInMinutes,
  format,
  formatDistance,
} = require("date-fns");

async function setup() {}

/* Script Entry */
async function main() {
  const { data } = await axios("https://cryptothegame.com/api/state/game");
  console.log(data);
  const { endsAt, day } = data.gameState;

  function checkTimeLeft(currentTick) {
    const interval = differenceInMinutes(endsAt, currentTick);
    return interval;
  }
  // TODO compute difference and distance at the same time
  function updateMessage(currentTick) {
    return `Next Game Phase: ${formatDistance(currentTick)}`;
  }

  function shouldUpdateChannel(interval) {
    if (interval === 180) return true; // 3 hours
    if (interval === 60) return true; // 1 hours
    if (interval === 30) return true; // .5 hours
    if (interval === 10) return true; // 10 min
    if (interval === 1) return true; // 1 min
    return false;
  }

  function shouldNotifyChannel(inverval) {
    if (interval === 60) return true; // 1 hours
    if (interval === 10) return true; // 10 min
    return false;
  }

  async function sendNotification(content) {
    // await axios.post(
    //   "https://discord.com/api/webhooks/1202711594010812517/BvweeOddVnWW_ZPGj7AEdqDITJY3oSMX6VrOqMLgBIVPNXYkx9dccaIzpM90o61w1EFh",
    //   {
    //     content,
    //   }
    // );
  }

  // while the game is running
  while (true) {
    // while in a game interval

    // send notification when a new interval starts
    sendNotification(updateMessage(Date.now()));

    while (!!compareAsc(endsAt, Date.now())) {
      const currentTick = Date.now();

      if (shouldUpdateChannel(checkTimeLeft(currentTick))) {
        // if the time left is an update interval send notification
        console.log(updateMessage(currentTick));
        sendNotification(updateMessage(currentTick));
      }
      await sleep(60000); // one min
    }
  }
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

main().then(() => {
  console.log("END");
  return process.exit(1);
});

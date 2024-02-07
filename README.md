# crypto the game scripts

Mostly for pulling player data

### Entry Point

run `npm install`
edit src/index.js the run `node .`

use the `createCsv` function to generate a csv of game data can sort by `tribe` or `eliminated day`

theres also some misc functions from daily challenges

### Discord Bot

edit src/bot.js to setup a discord bot that will send updates about challenges then run `node src/bot.js`
(this is fiddly because there api goes down so often)

### Misc Routes

Get all players: https://cryptothegame.com/api/state/players

Get user info: https://cryptothegame.com/api/state/user
(Tied to user cookie?)

Get game info: https://cryptothegame.com/api/state/game

Get mini game info: https://cryptothegame.com/api/state/mini-game?day=2

Get mini game results: https://cryptothegame.com/api/state/mini-game-result?day=3

Get total vote tally: https://cryptothegame.com/api/state/vote-tally-count?day=3

Get vote data: https://cryptothegame.com/api/state/vote-data?day=6

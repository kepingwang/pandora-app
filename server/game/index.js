const { fromJS } = require('immutable');
const da = require('../data-access');
const calculation = require('./calculation');

async function getGameInfo(roomName, email) {
  const room = await da.getRoom(roomName);
  const character = room.characters.find(
    ch => ch.email === email,
  );
  const others = room.characters.filter(ch => (
    ch.email !== email
  )).map(ch => ({
    characterName: ch.characterName,
    description: ch.description,
    story: ch.story,
    goal: ch.goal,
  }));
  const game = await da.getGame(room.gameName);
  return {
    gameName: room.gameName,
    description: character.description,
    story: character.story,
    goal: character.goal,
    attrs: character.attrs,
    stats: character.stats,
    globalStats: room.globalStats,
    event: game.events[room.gameRound],
    gameStatus: room.gameStatus,
    availableActions: game.actions[room.gameRound][character.characterName],
    availableAttrs: game.attrs,
    others,
  };
}

async function chooseActions(roomName, actionsMap) {
  let room = await da.getRoom(roomName);
  room = fromJS(room);

  room = calculation.updateIndicatorsFromActions(room, actionsMap);
  room = room.update('characters', characters => (
    characters.map(character => (
      character.update('actions', actions => (
        actions.push(actionsMap.get(character.get('characterName')))
      ))
    ))
  ));
  room = room.set('gameStatus', 'choosing-attrs');

  await da.setRoom(room.toJS());
}

async function chooseAttrs(roomName, attrsMap) {
  let room = await da.getRoom(roomName);
  room = fromJS(room);

  room = room.update('characters', characters => (
    characters.map(character => (
      character.merge({
        attrs: attrsMap.get(character.get('characterName')),
      })
    ))
  ));

  await da.setRoom(room.toJS());
}

async function nextRound(roomName) {
  let room = await da.getRoom(roomName);
  room = fromJS(room);

  room = calculation.updateResourcesFromAttrs(room);
  room = room.update('gameRound', round => round + 1);
  room = room.set('gameStatus', 'choosing-actions');

  await da.setRoom(room.toJS());
}

module.exports = {
  getGameInfo,
  chooseActions,
  chooseAttrs,
  nextRound,
};

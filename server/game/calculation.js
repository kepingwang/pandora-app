
/**
 * Takes a room of immutableJS object, and returns the updated room.
 * TODO: resources calculation
 */
function updateResourcesFromAttrs(roomArg) {
  let room = roomArg;
  room = room.update('characters', characters => (
    characters.map((character) => {
      let stats = character.get('stats');
      stats = stats.update('positiveCoins', c => c + 1);
      stats = stats.update('neutralCoins', c => c + 2);
      stats = stats.update('negativeCoins', c => c + 3);
      return character.set('stats', stats);
    })
  ));
  return room;
}

/**
 * Takes a room of immutableJS object, and returns the updated room.
 * TODO: action effects calculation (affects indicators)
 */
function updateIndicatorsFromActions(roomArg, actionsMap) {
  let room = roomArg;
  room = room.update('characters', characters => (
    characters.map((character) => {
      const stats = character.get('stats');
      const actionName = actionsMap.get(character.get('characterName'));
      console.log(`${character.get('characterName')} has chosen ${actionName}`);
      return character.set('stats', stats);
    })
  ));
  return room;
}

module.exports = {
  updateResourcesFromAttrs,
  updateIndicatorsFromActions,
};

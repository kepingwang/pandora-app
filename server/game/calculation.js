
/**
 * Takes a room of immutableJS object, and returns the updated room.
 * The room data structure is the same as the DyanmoDB PandoraRooms Schema.
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
 * This charActions is of the form Map(characterName, {
 *   gameName, actionName, category, description, emotionType, scope
 * }).
 * TODO: action effects calculation (affects indicators)
 */
function updateIndicatorsFromActions(roomArg, charActions) {
  let room = roomArg;
  room = room.update('characters', characters => (
    characters.map((character) => {
      let stats = character.get('stats');
      const action = charActions.get(character.get('characterName'));
      const emotionType = action.get('emotionType');

      if (emotionType === 'positive') {
        stats = stats.update('wellbeing', wellbeing => wellbeing + 1);
      } else if (emotionType === 'negative') {
        stats = stats.update('wellbeing', wellbeing => wellbeing - 1);
      }

      return character.set('stats', stats);
    })
  ));
  return room;
}

module.exports = {
  updateResourcesFromAttrs,
  updateIndicatorsFromActions,
};

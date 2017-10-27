
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
  let tension = room.getIn(['globalStats', 'tension']);
  let violence = room.getIn(['globalStats', 'violence']);
  room = room.update('characters', characters => (
    characters.map((character) => {
      let stats = character.get('stats');
      const action = charActions.get(character.get('characterName'));

      const category = action.get('category');
      const emotionType = action.get('emotionType'); // positive, neutral, negative
      const intensity = action.get('intensity');
      const scope = action.get('scope'); // personal, local, global

      let affluence = stats.get('affluence');
      let influence = stats.get('influence');
      let wellbeing = stats.get('wellbeing');

      // how to update tension, violence, affluence, influence, wellbeing
      // according to action category, emotionType, intensity, scope,
      // and according to actions of other players

      if (category === 'resources-psychological') {
        if (intensity === '1') {
          wellbeing += -1;
        }
      }

      return character.merge({
        stats: { affluence, influence, wellbeing },
      });
    })
  ));
  room = room.merge({
    globalStats: { tension, violence },
  });
  return room;
}

module.exports = {
  updateResourcesFromAttrs,
  updateIndicatorsFromActions,
};

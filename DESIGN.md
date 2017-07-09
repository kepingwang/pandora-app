## Notes for the game design

The game could be viewed as a state machine.

States contains: resources (3 kinds of coins), emotions, indicators, and possibly history and states of other players.

State transition is initiated by actions. (Choosing emotions is also seen as an action for the programmer.) Two general questions about actions:
1. How do states decides the set of available actions.
2. How do actions affect states.



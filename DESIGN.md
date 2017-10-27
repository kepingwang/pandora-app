## Game Play Scenarios

1. Game start when all players are in and the master pressed the start button.

2. Start with choosing attrs (emotions, beliefs, personalities). Client queries the backend and db for available attrs, with their attrType and name.

3. Players choose attrs, and press ready. The backend receives the ready message together with all the selected attrs. When all players are ready, the backend update the data of attrs in the database.

4. Backend calls nextGameStatus, which also calls nextGameRound. The database is updated with: gameRound, gameStatus, personal stats (resources generation). Use socket to signal the players to update client status.

4. Players choose actions, and ready. When all players are ready, the backend 1) retrieves action categories data and all relevant states, 2) calculate all updated personal and global states, 3) update all the states in the database, including globalStats, personal stats, and peronal actions.

5. Backend calls nextGameStatus, moving to choosing attrs. Sockets are used to signal clients to update info. Client will receive updated data on global stats and personal stats, and will move to the attr choosing screen.

gameRound and gameStatus proceeds automatically when all players have chosen actions.

Master can pause and resume a game. 

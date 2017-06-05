# Overall Design

The Pandora game will be a web application consisting of three parts:
1. **Player Section**: for students.
2. **Master Section**: for game master in class.
3. **Editor Section**: create and new games.

## User Rights

All users register or login through the same portal. Users have accesses to different sections according to their user rights. By default, a user only has access to player section. The accesses to master section and editor section can be activated by access codes or email requests.

Users with Master right can choose a game and create a session (a room). There will be a hall where users can view all existing game sessions.

Users with Player right can choose to join a game session. A game session could be protected by password. Once enough number of users have joined a session, the master can choose to start the session.

Users with Master right can create new games out of existing templates.

## Player Section

### Game Session
Once the game master has started the game with the required number of players, the session information is stored and that session will always be with those players. The game can go on only if all players and have joined the session. When a player logout or goes offline, the session is automatically paused.

### Game Player Interface
The game play user interface mainly consists of the following parts:
1. Personalities Tableau.
2. Personal and overall statistics.
3. Action choices board.
4. Message board showing the current status of the game.

### Game Flow
1. At the start of the game, players choose personalities from the tableau.
2. Then the game goes in rounds:  
  2.1 A event happen and players receive the information.
  2.2 Players choose actions.
  2.3 Statistics get updated and players receive the results.
  2.4 Players adjust their personalities.
  
In all these steps, only when all players have made decision can the game proceed.

## Master Section

### Game Flow Control

The master can pause and resume a game. The game (optionally) automatically pauses between different steps of the game and the master can resume to the next step.

### Game Master Interface

The master can see all the confirmed choices of the players, all the statistics, and all the game history.

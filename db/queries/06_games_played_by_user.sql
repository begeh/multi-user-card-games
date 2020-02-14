SELECT player1, player2, winner
FROM games_db
WHERE 'Alice' = games_db.player1 OR 'Alice' = games_db.player2;

-- created a table of all the times a player played a game. used for game-history table

SELECT player1, player2, winner
FROM games_db
WHERE 'Alice' = games_db.player1 OR 'Alice' = games_db.player2;

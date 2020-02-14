SELECT users.username
as user, count
(*) as number_of_plays
FROM games_db JOIN users ON users.username = games_db.player1 OR users.username = games_db.player2
WHERE users.username = games_db.player1 OR users.username = games_db.player2
GROUP BY users.username;

-- creates table with the username along with the number of times they have played a game. Potential use in game history table, but did not use it.

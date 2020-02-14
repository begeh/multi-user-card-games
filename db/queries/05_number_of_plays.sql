SELECT users.username
as user, count
(*) as number_of_plays
FROM games_db JOIN users ON users.username = games_db.player1 OR users.username = games_db.player2
WHERE users.username = games_db.player1 OR users.username = games_db.player2
GROUP BY users.username;

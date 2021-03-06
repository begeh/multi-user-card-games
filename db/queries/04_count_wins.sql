SELECT users.username
as user, count
(*) as number_of_wins
FROM games_db JOIN users ON users.username = winner
GROUP BY users.username
ORDER BY number_of_wins DESC;

-- creates table of user and their number of wins, ordered in descending order based on wins. used for leaderboard production.

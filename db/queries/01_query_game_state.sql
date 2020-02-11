 SELECT
    game_id,
    (SELECT users.username
      FROM users
      WHERE games_db.player1 = users.id
    ) as player_1,
    (SELECT users.username
        FROM users
        WHERE users.id = games_db.player2
    ) as player_2,
  turn_no,
  p1_hand,
  p2_hand,
  dealer_hand,
  p1_play,
  p2_play,
  dealer_play,
  p1_score,
  p2_score
  FROM turn_history
  JOIN games_db ON game_id = games_db.id
  WHERE game_id = 11;

  -- GETTING turn information!

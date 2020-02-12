-- VALUES ARE DYNAMIC! DO NOT USE THIS QUERY AS IS

INSERT INTO turn_history (
  game_id,
  turn_no,
  p1_hand,
  p2_hand,
  dealer_hand,
  p1_score,
  p2_score
  )
  VALUES(
    $1, $2, $3, $4, $5, $6, $7
  );


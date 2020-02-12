-- please note the values are dynamic in practice therefore they are not set here. DO NOT USE THIS QUERY AS IS



UPDATE turn_history
SET p1_play = $1,
  p2_play = $2,
  dealer_play = $3
WHERE
  game_id = $4
  AND
  turn_no = $5;

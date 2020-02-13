-- Users table seeds here (Example)
INSERT INTO users
  (username, password)
VALUES
  ('Alice', 'password'),
  ('Kira', 'password'),
  ('CliffWeir', 'cliffword'),
  ('bashir', 'bindotbash'),
  ('marancholia', 'octopusqueen');


-- games_db table seeds here
INSERT INTO games_db
  (player1, player2, outcome)
VALUES
  (1, 2, 1),
  (2, 3, 3),
  (2, 1, 2),
  (4, 3, 4),
  (3, 5, 3);

INSERT INTO cards
  (img_address)
VALUES
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/14H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/2H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/3H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/4H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/5H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/6H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/7H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/8H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/9H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/10H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/11H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/12H.png?raw=true'),
  ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/13H.png?raw=true');

-- Users table seeds here (Example)
INSERT INTO users
  (username, password)
VALUES
  ('Alice', 'password'),
  ('Kira', 'password'),
  ('Bashir', 'password'),
  ('Cliff', 'password'),
  ('Sid', 'password'),
  ('Jim', 'password'),
  ('Mara', 'password'),
  ('Joe', 'password'),
  ('Ned', 'password'),
  ('CliffWeir', 'cliffword'),
  ('bashir', 'bindotbash'),
  ('marancholia', 'octopusqueen');


-- games_db table seeds here
INSERT INTO games_db
  (player1, player2, winner)
VALUES
  ('Alice', 'Kira', 'Kira'),
  ('Kira', 'Alice', 'Alice'),
  ('Alice', 'Kira', 'Alice'),
  ('Kira', 'Alice', 'Kira'),
  ('Mara', 'Kira', 'Mara'),
  ('Cliff', 'Kira', 'Cliff'),
  ('Bashir', 'Kira', 'Bashir'),
  ('Mara', 'Alice', 'Alice'),
  ('Alice', 'Kira', 'Alice'),
  ('Kira', 'Mara', 'Mara'),
  ('Cliff', 'Sid', 'Cliff'),
  ('Sid', 'Kira', 'Sid'),
  ('Jim', 'Sid', 'Sid'),
  ('Jim', 'Mara', 'Jim'),
  ('Cliff', 'Bashir', 'Cliff'),
  ('Joe', 'Ned', 'Ned');

-- INSERT INTO cards
--   (img_address)
-- VALUES
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/14H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/2H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/3H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/4H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/5H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/6H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/7H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/8H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/9H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/10H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/11H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/12H.png?raw=true'),
--   ('https://github.com/begeh/multi-user-card-games/blob/master/graphics/13H.png?raw=true');

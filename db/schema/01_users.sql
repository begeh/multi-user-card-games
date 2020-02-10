-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS games_db CASCADE;
DROP TABLE IF EXISTS turn_history CASCADE;


-- USERS TABLE: stores id username, password, and status
-- ID is used to track game histories and win/loss statistics for leaderboards
-- USERNAME and PASSWORD for logins
-- ACTIVE tracks whether a player can be challenged for games or not
CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);


-- GAMES_DB TABLE tracks games for leaderboard purposes
-- player1 and player2 rederence user IDs
-- outcome also references a user ID to count win/loss ratios.
-- wins are games where the id is present in both fields, losses are games where they do not match
CREATE TABLE games_db(
  id SERIAL PRIMARY KEY NOT NULL,
  player1 INTEGER REFERENCES users(id) ON DELETE CASCADE,
  player2 INTEGER REFERENCES users(id) ON DELETE CASCADE,
  outcome INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE turn_history (
  id SERIAL PRIMARY KEY NOT NULL,
  game_id INTEGER REFERENCES games_db(id) ON DELETE CASCADE,
  turn_no INTEGER NOT NULL,
  p1_score INTEGER DEFAULT 0,
  p2_score INTEGER DEFAULT 0,
  p1_hand INTEGER [13],
  p2_hand INTEGER [13],
  dealer_hand INTEGER [13],
  p1_play INTEGER,
  p2_play INTEGER,
  dealer_play INTEGER
);

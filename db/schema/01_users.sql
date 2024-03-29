-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS games_db CASCADE;
DROP TABLE IF EXISTS turn_history CASCADE;
DROP TABLE IF EXISTS cards CASCADE;

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
-- id is the game's id
-- player1 and player2 refences players' names
-- winner references name of winner
CREATE TABLE games_db(
  id SERIAL PRIMARY KEY NOT NULL,
  player1 VARCHAR (255) NOT NULL,
  player2 VARCHAR (255) NOT NULL,
  winner VARCHAR (255) NOT NULL
);

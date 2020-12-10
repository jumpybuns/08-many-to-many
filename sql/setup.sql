DROP TABLE IF EXISTS consoles CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS consoles_games;

CREATE TABLE consoles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(25),
    make TEXT
);

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(50),
    developer TEXT

);

CREATE TABLE consoles_games (
    console_id BIGINT REFERENCES consoles(id),
    game_id BIGINT REFERENCES games(id),
    PRIMARY KEY(console_id, game_id)
);
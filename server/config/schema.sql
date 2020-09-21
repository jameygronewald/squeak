CREATE DATABASE squeak;

DROP TABLE IF EXISTS place;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL,
    first_name VARCHAR (100),
    last_name VARCHAR (100)
);

CREATE TABLE place(
    place_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    yelp_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    rating FLOAT NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(25) NOT NULL,
    zip_code VARCHAR(25) NOT NULL,
    notes text,
    user_rating INT,
    favorite BOOLEAN,
    CONSTRAINT fk_users
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);
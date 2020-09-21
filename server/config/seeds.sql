-- CREATE TABLE users (
--     user_id SERIAL NOT NULL PRIMARY KEY,
--     email VARCHAR (100) NOT NULL,
--     password VARCHAR (100) NOT NULL,
--     first_name VARCHAR (100),
--     last_name VARCHAR (100)
-- );

INSERT INTO users(email, password, first_name, last_name)
VALUES('beana@gmail.com', 'willowcat', 'Willow', 'Moon'), ('marymama@gmail.com', 'password 1234', 'Mary', 'Moon'), ('aggiejohnson@gmail.com', 'agnes', 'Agnes', 'Moon');

SELECT * FROM users LEFT JOIN place ON users.user_id = place.user_id;
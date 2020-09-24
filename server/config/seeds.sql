
INSERT INTO users(email, password, first_name, last_name)
VALUES('beana@gmail.com', 'willowcat', 'Willow', 'Moon'), ('marymama@gmail.com', 'password 1234', 'Mary', 'Moon'), ('aggiejohnson@gmail.com', 'agnes', 'Agnes', 'Moon');


-- Example Query tests
SELECT * FROM users LEFT JOIN place ON users.user_id = place.user_id;

SELECT * FROM users LEFT JOIN place ON users.user_id = place.user_id WHERE users.user_id = 1;
-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    pw VARCHAR(255)
);
-- @block
ALTER TABLE Users
    RENAME COLUMN pw TO password;
-- @block
INSERT INTO Users (email, pw)
VALUES ('tesdsd@world.com', 'dsds');
-- @block
SELECT *
FROM Users
ORDER BY id ASC;
-- @block
CREATE INDEX email_index ON Users(email);
-- to auto update json file:
-- @block
CREATE TABLE data_changes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- @block
CREATE TRIGGER after_insert_trigger
AFTER
INSERT ON Users FOR EACH ROW
INSERT INTO data_changes ()
VALUES ();
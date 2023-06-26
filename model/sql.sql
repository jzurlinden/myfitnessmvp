DROP TABLE if exists workouts;
DROP TABLE if exists users;

CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE `workouts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `type` VARCHAR(225) NOT NULL,
    `workout` VARCHAR(255) NOT NULL,
    `reps` VARCHAR(255) NOT NULL,
    `sets` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_workouts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);




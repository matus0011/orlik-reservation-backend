CREATE TABLE `users_table` (
	`id` serial PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);

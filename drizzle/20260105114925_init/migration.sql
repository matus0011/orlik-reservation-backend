CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`event_id` int NOT NULL,
	`user_id` int NOT NULL,
	`joined_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`team_id` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text,
	`limit_players` int NOT NULL DEFAULT 0,
	`created_by` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `memberships` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`user_id` int NOT NULL,
	`team_id` int NOT NULL,
	`joined_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(150) NOT NULL,
	`invite_code` varchar(50) NOT NULL,
	`created_by` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `invite_code_unique` UNIQUE INDEX(`invite_code`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(100) NOT NULL,
	`email` varchar(200),
	`global_role` varchar(50) NOT NULL DEFAULT 'USER',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`last_login_at` timestamp,
	`otp_secret` varchar(255),
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);
--> statement-breakpoint
CREATE INDEX `idx_bookings_event_id` ON `bookings` (`event_id`);--> statement-breakpoint
CREATE INDEX `idx_bookings_user_id` ON `bookings` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_events_team_id` ON `events` (`team_id`);--> statement-breakpoint
CREATE INDEX `idx_events_created_by` ON `events` (`created_by`);--> statement-breakpoint
CREATE INDEX `idx_memberships_user_id` ON `memberships` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_memberships_team_id` ON `memberships` (`team_id`);--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_event_id_events_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_team_id_teams_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_created_by_users_id_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `memberships` ADD CONSTRAINT `memberships_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `memberships` ADD CONSTRAINT `memberships_team_id_teams_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `teams` ADD CONSTRAINT `teams_created_by_users_id_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE;
CREATE TABLE `action_logs` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`action_type` varchar(100) NOT NULL,
	`performed_by` int,
	`target_user` int,
	`team_id` int,
	`event_id` int,
	`details` json,
	`created_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`event_id` int NOT NULL,
	`user_id` int NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'PENDING',
	`joined_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`team_id` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text,
	`date` timestamp NOT NULL DEFAULT (now()),
	`limit_players` int NOT NULL DEFAULT 0,
	`created_by` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `memberships` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`user_id` int NOT NULL,
	`team_id` int NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`joined_at` timestamp NOT NULL DEFAULT (now()),
	`can_add_members` boolean NOT NULL DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(150) NOT NULL,
	`invite_code` varchar(50) NOT NULL,
	`created_by` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `user_stats` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`user_id` int NOT NULL,
	`team_id` int NOT NULL,
	`year` int NOT NULL,
	`total_events_joined` int NOT NULL DEFAULT 0,
	`total_events_missed` int NOT NULL DEFAULT 0,
	`total_events_created` int NOT NULL DEFAULT 0,
	`total_kicks` int NOT NULL DEFAULT 0,
	`updated_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(100) NOT NULL,
	`email` varchar(200),
	`password_hash` varchar(255),
	`facebook_id` varchar(255),
	`avatar_url` text,
	`global_role` varchar(50) NOT NULL DEFAULT 'USER',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`last_login_at` timestamp,
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);
--> statement-breakpoint
ALTER TABLE `action_logs` ADD CONSTRAINT `action_logs_performed_by_users_id_fkey` FOREIGN KEY (`performed_by`) REFERENCES `users`(`id`);--> statement-breakpoint
ALTER TABLE `action_logs` ADD CONSTRAINT `action_logs_target_user_users_id_fkey` FOREIGN KEY (`target_user`) REFERENCES `users`(`id`);--> statement-breakpoint
ALTER TABLE `action_logs` ADD CONSTRAINT `action_logs_team_id_teams_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`);--> statement-breakpoint
ALTER TABLE `action_logs` ADD CONSTRAINT `action_logs_event_id_events_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`);--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_event_id_events_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`);--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_team_id_teams_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`);--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_created_by_users_id_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`);--> statement-breakpoint
ALTER TABLE `memberships` ADD CONSTRAINT `memberships_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);--> statement-breakpoint
ALTER TABLE `memberships` ADD CONSTRAINT `memberships_team_id_teams_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`);--> statement-breakpoint
ALTER TABLE `teams` ADD CONSTRAINT `teams_created_by_users_id_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`);--> statement-breakpoint
ALTER TABLE `user_stats` ADD CONSTRAINT `user_stats_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);--> statement-breakpoint
ALTER TABLE `user_stats` ADD CONSTRAINT `user_stats_team_id_teams_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`);
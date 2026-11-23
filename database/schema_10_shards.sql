-- ==============================================================================
-- NinetyPTE: 10x Sharded MySQL Database Architecture for Hostinger Shared Server
-- Max Quota: 3 GB (3072 MB) per Database | Total Clustered Storage: 30 GB
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- DATABASE 1: u123456_ninetypte_auth (Core Auth & Subscriptions)
-- ------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `u123456_ninetypte_auth` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u123456_ninetypte_auth`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(120) NULL,
  `role` ENUM('student', 'tutor', 'admin') DEFAULT 'student',
  `target_score` INT DEFAULT 79,
  `exam_type` ENUM('PTE Academic', 'PTE Core', 'PTE UKVI') DEFAULT 'PTE Academic',
  `exam_date` DATE NULL,
  `streak_count` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `plan_id` VARCHAR(50) NOT NULL,
  `status` ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
  `starts_at` TIMESTAMP NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `payment_reference` VARCHAR(100) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_sub_user` (`user_id`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- DATABASE 2: u123456_ninetypte_qb_speaking (Speaking Question Bank)
-- ------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `u123456_ninetypte_qb_speaking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u123456_ninetypte_qb_speaking`;

CREATE TABLE IF NOT EXISTS `speaking_questions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `task_type` ENUM('read-aloud', 'repeat-sentence', 'describe-image', 'retell-lecture', 'answer-short-question', 'respond-situation') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `prompt_text` TEXT NULL,
  `media_url` VARCHAR(500) NULL,
  `expected_keywords` JSON NULL,
  `prep_time_seconds` INT DEFAULT 35,
  `record_time_seconds` INT DEFAULT 40,
  `difficulty` ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
  `is_predicted` BOOLEAN DEFAULT FALSE,
  `frequency_weight` INT DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_speaking_task` (`task_type`, `is_predicted`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- DATABASE 3: u123456_ninetypte_qb_writing (Writing Question Bank)
-- ------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `u123456_ninetypte_qb_writing` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u123456_ninetypte_qb_writing`;

CREATE TABLE IF NOT EXISTS `writing_questions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `task_type` ENUM('summarize-written-text', 'write-essay', 'write-email') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `passage_prompt` TEXT NOT NULL,
  `model_band9_response` TEXT NULL,
  `min_words` INT DEFAULT 5,
  `max_words` INT DEFAULT 75,
  `time_limit_seconds` INT DEFAULT 600,
  `difficulty` ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
  `is_predicted` BOOLEAN DEFAULT FALSE,
  INDEX `idx_writing_task` (`task_type`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- DATABASE 4: u123456_ninetypte_qb_reading (Reading Question Bank)
-- ------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `u123456_ninetypte_qb_reading` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u123456_ninetypte_qb_reading`;

CREATE TABLE IF NOT EXISTS `reading_questions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `task_type` ENUM('fill-in-blanks-rw', 'multiple-choice-multiple', 'reorder-paragraphs', 'fill-in-blanks-r', 'multiple-choice-single') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `passage` TEXT NOT NULL,
  `options_data` JSON NOT NULL,
  `correct_answers` JSON NOT NULL,
  `difficulty` ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
  `is_predicted` BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- DATABASE 5: u123456_ninetypte_qb_listening (Listening Question Bank)
-- ------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `u123456_ninetypte_qb_listening` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u123456_ninetypte_qb_listening`;

CREATE TABLE IF NOT EXISTS `listening_questions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `task_type` ENUM('summarize-spoken-text', 'multiple-choice-multiple-l', 'fill-in-blanks-l', 'highlight-correct-summary', 'multiple-choice-single-l', 'select-missing-word', 'highlight-incorrect-words', 'write-from-dictation') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `audio_url` VARCHAR(500) NOT NULL,
  `transcript` TEXT NULL,
  `correct_text` TEXT NOT NULL,
  `difficulty` ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Hard',
  `is_predicted` BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- DATABASE 6 & 7: User Practice Attempts (Shard 1: User 1-50K | Shard 2: 50K+)
-- ------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `u123456_ninetypte_attempts_1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u123456_ninetypte_attempts_1`;

CREATE TABLE IF NOT EXISTS `practice_attempts` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `task_id` VARCHAR(50) NOT NULL,
  `question_id` VARCHAR(50) NOT NULL,
  `recorded_audio_url` VARCHAR(500) NULL,
  `submitted_text` TEXT NULL,
  `overall_score` INT NOT NULL,
  `fluency_score` INT NULL,
  `pronunciation_score` INT NULL,
  `content_score` INT NULL,
  `grammar_score` INT NULL,
  `spelling_score` INT NULL,
  `acoustic_analysis` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_attempts_user` (`user_id`, `created_at`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- DATABASE 8: u123456_ninetypte_mock_tests (Mock Tests & Scorecards)
-- ------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `u123456_ninetypte_mock_tests` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u123456_ninetypte_mock_tests`;

CREATE TABLE IF NOT EXISTS `mock_test_sessions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `mock_id` VARCHAR(50) NOT NULL,
  `speaking_score` INT NOT NULL,
  `writing_score` INT NOT NULL,
  `reading_score` INT NOT NULL,
  `listening_score` INT NOT NULL,
  `overall_score` INT NOT NULL,
  `full_report_json` JSON NOT NULL,
  `completed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

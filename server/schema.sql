-- WEiZ Sales Training - Production SQL Schema (MySQL 8+)
CREATE DATABASE IF NOT EXISTS weiz_training DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE weiz_training;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  employee_no VARCHAR(50) UNIQUE,
  name VARCHAR(120) NOT NULL,
  role ENUM('staff','lead','manager','admin') NOT NULL DEFAULT 'staff',
  stage ENUM('新人','專員','資深專員','組長','店長') NOT NULL DEFAULT '新人',
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question_bank (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  qid VARCHAR(80) NOT NULL UNIQUE,
  stage ENUM('新人','專員','資深專員','組長','店長') NOT NULL,
  q_type VARCHAR(50) NOT NULL,
  dimension VARCHAR(80) NOT NULL,
  title VARCHAR(255) NOT NULL,
  question_text TEXT NOT NULL,
  options_json JSON NOT NULL,
  answer_text TEXT NOT NULL,
  explain_text TEXT,
  image_key VARCHAR(80),
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_by BIGINT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_stage_active (stage, is_active),
  CONSTRAINT fk_question_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS training_sessions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_code VARCHAR(80) UNIQUE,
  user_id BIGINT NOT NULL,
  stage ENUM('新人','專員','資深專員','組長','店長') NOT NULL,
  mode ENUM('all','wrong-only') NOT NULL DEFAULT 'all',
  total_questions INT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  passed TINYINT(1) NOT NULL DEFAULT 0,
  started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  finished_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_finished (user_id, finished_at),
  CONSTRAINT fk_training_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS training_answers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  qid VARCHAR(80) NOT NULL,
  stage ENUM('新人','專員','資深專員','組長','店長') NOT NULL,
  dimension VARCHAR(80),
  selected_text TEXT,
  correct_text TEXT,
  is_right TINYINT(1) NOT NULL,
  answered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (session_id),
  INDEX idx_qid (qid),
  CONSTRAINT fk_answers_session FOREIGN KEY (session_id) REFERENCES training_sessions(id)
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  actor_user_id BIGINT NULL,
  action VARCHAR(120) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id VARCHAR(120),
  detail_json JSON,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_action_time (action, created_at),
  CONSTRAINT fk_audit_actor FOREIGN KEY (actor_user_id) REFERENCES users(id)
);

CREATE VIEW v_training_summary AS
SELECT
  ts.id AS session_id,
  u.name,
  u.role,
  ts.stage,
  ts.mode,
  ts.score,
  ts.total_questions,
  ROUND((ts.score / NULLIF(ts.total_questions * 10, 0)) * 100, 1) AS score_rate,
  ts.passed,
  ts.finished_at
FROM training_sessions ts
JOIN users u ON u.id = ts.user_id;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS habit_entries;
DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

-- Create habits table
CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create habit entries table for tracking daily completions
CREATE TABLE habit_entries (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER NOT NULL REFERENCES habits(id),
  date DATE NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);

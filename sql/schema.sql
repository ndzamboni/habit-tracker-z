-- schema.sql
-- drop tables and create tables
-- drop tables
DROP TABLE IF EXISTS habit_entries;
DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS users;

-- drop database
DROP DATABASE IF EXISTS habit_tracker;

-- create database
CREATE DATABASE habit_tracker;

-- use database
\c habit_tracker;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

-- Habits table
CREATE TABLE IF NOT EXISTS habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL
);

-- Habit entries table (for tracking daily completions)
CREATE TABLE IF NOT EXISTS habit_entries (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER REFERENCES habits(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  completed BOOLEAN NOT NULL DEFAULT false
);

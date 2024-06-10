import 'dotenv/config';
import Database from './db/index.js';
import bot from './bot/index.js';
import app from './server/index.js';

// Initialize the database
Database.init();

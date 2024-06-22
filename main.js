import 'dotenv/config';
import Database from './db/index.js';
import bot from './bot/index.js';
import app from './server/index.js';
import Equipment from './models/equipment.js';
import Exercise from './models/exercise.js';

// Initialize the database
Database.init();
Database.seed();
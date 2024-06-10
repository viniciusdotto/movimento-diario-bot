import sequelize from '../sequelize.js';
import User from '../models/user.js';
import Equipment from '../models/equipment.js';
import Exercise from '../models/exercise.js';
import Workout from '../models/workout.js';
import Repetition from '../models/repetition.js';
import '../models/userEquipment.js';

class Database {
  async init() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      // Sync all models
      await sequelize.sync({ force: true });  // Use { force: true } to drop and recreate the tables for development
      console.log('All models were synchronized successfully.');

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export default new Database();

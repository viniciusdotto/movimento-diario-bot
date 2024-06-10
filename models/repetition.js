import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Exercise from './exercise.js';
import Workout from './workout.js';

const Repetition = sequelize.define('repetitions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total_reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  load: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  workout_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workout,
      key: 'id'
    }
  },
  exercise_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Exercise,
      key: 'id'
    }
  },
}, {
  timestamps: true,
});

export default Repetition;
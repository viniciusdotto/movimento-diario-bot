import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Workout from './workout.js';

const WorkoutFeedback = sequelize.define('workout_feedbacks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  workout_feedback: {
    type: DataTypes.ENUM,
    values: ['EASY', 'NORMAL', 'HARD'],
    allowNull: false,
  },
  workout_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Workout,
      key: 'id'
    }
  },
}, {
  timestamps: true,
});

export default WorkoutFeedback;
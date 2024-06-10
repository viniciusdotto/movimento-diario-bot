import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './user.js';

const Workout = sequelize.define('workouts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  workout_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  workout_type: {
    type: DataTypes.ENUM,
    values: ['SUPERIOR', 'LEGS', 'FULL BODY'],
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
}, {
  timestamps: true,
});

export default Workout;
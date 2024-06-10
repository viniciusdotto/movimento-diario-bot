import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weekly_training_days: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  workout_duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default User;
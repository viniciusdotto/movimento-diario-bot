import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Equipment = sequelize.define('equipments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  max_load: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  timestamps: true,
});

export default Equipment;
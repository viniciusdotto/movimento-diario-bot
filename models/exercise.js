import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Equipment from './equipment.js';

const Exercise = sequelize.define('exercises', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exercise_type: {
    type: DataTypes.ENUM,
    values: ['SUP PULL HOR', 'SUP PULL VER', 'SUP PUSH HOR', 'SUP PUSH VER', 'INF PULL', 'INF PUSH'],
    allowNull: true,
  },
  easier_exercise: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'exercises',
      key: 'id'
    }
  },
  harder_exercise: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'exercises',
      key: 'id'
    }
  },
  equipment_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Equipment,
      key: 'id'
    }
  },
  has_load: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
}, {
  timestamps: true,
});

export default Exercise;
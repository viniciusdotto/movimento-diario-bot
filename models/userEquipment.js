import User from './user.js';
import Equipment from './equipment.js';

User.belongsToMany(Equipment, { through: 'user_equipments' });
Equipment.belongsToMany(User, { through: 'user_equipments' });
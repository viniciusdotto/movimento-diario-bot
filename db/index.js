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

      await sequelize.sync({ force: false });
      console.log('All models were synchronized successfully.');

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  async seed() {
    // Seed de Equipamentos
    // Equipment.create({
    //   id: 1,
    //   name: 'Halteres',
    //   max_load: 20
    // });

    // Equipment.create({
    //   id: 2,
    //   name: 'Barra',
    //   max_load: 100
    // });

    // Equipment.create({
    //   id: 3,
    //   name: 'Barra Fixa',
    //   max_load: 50
    // });

    // Equipment.create({
    //   id: 4,
    //   name: 'Barra Paralela',
    //   max_load: 50
    // });

    // Equipment.create({
    //   id: 5,
    //   name: 'Argolas de Suspensão',
    //   max_load: 50
    // });

    // Seed de Exercícios
    // Exercise.create({
    //   id: 1,
    //   name: 'Remada Unilateral',
    //   exercise_type: 'SUP PULL HOR',
    //   easier_exercise: null,
    //   equipment_id: 1,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 2,
    //   name: 'Remada com Barra',
    //   exercise_type: 'SUP PULL HOR',
    //   easier_exercise: 1,
    //   equipment_id: 2,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 3,
    //   name: 'Body Row',
    //   exercise_type: 'SUP PULL HOR',
    //   easier_exercise: 2,
      
    //   equipment_id: 5,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 4,
    //   name: 'Body Row Avançado',
    //   exercise_type: 'SUP PULL HOR',
    //   easier_exercise: 3,
      
    //   equipment_id: 5,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 5,
    //   name: 'Tucked Body Row',
    //   exercise_type: 'SUP PULL HOR',
    //   easier_exercise: 4,
    //   equipment_id: 5,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 6,
    //   name: 'Barra Fixa Com Salto',
    //   exercise_type: 'SUP PUSH VER',
    //   easier_exercise: null,
      
    //   equipment_id: 3,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 7,
    //   name: 'Barra Fixa',
    //   exercise_type: 'SUP PUSH VER',
    //   easier_exercise: 6,
      
    //   equipment_id: 3,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 8,
    //   name: 'Barra Fixa Explosiva',
    //   exercise_type: 'SUP PUSH VER',
    //   easier_exercise: 7,
      
    //   equipment_id: 3,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 9,
    //   name: 'Muscle Up com salto',
    //   exercise_type: 'SUP PUSH VER',
    //   easier_exercise: 8,
    //   equipment_id: 3,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 10,
    //   name: 'Muscle Up',
    //   exercise_type: 'SUP PUSH VER',
    //   easier_exercise: 9,
    //   equipment_id: 3,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 11,
    //   name: 'Flexão Inclinado',
    //   exercise_type: 'SUP PUSH HOR',
    //   easier_exercise: null,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 12,
    //   name: 'Flexão',
    //   exercise_type: 'SUP PUSH HOR',
    //   easier_exercise: 11,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 13,
    //   name: 'Flexão Arqueiro',
    //   exercise_type: 'SUP PUSH HOR',
    //   easier_exercise: 12,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 14,
    //   name: 'Flexão Com uma Mão Inclinado',
    //   exercise_type: 'SUP PUSH HOR',
    //   easier_exercise: 13,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 15,
    //   name: 'Flexão Com uma Mão',
    //   exercise_type: 'SUP PUSH HOR',
    //   easier_exercise: 14,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 16,
    //   name: 'Dips Cadeira',
    //   exercise_type: 'SUP PUSH VER',
    //   easier_exercise: null,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 17,
    //   name: 'Dips',
    //   exercise_type: 'SUP PUSH VER',
    //   easier_exercise: 16,
    //   equipment_id: 4,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 18,
    //   name: 'Dips Argola',
    //   exercise_type: 'SUP PUSH VER',
    //   easier_exercise: 17,
    //   equipment_id: 5,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 19,
    //   name: 'Stiff Halter',
    //   exercise_type: 'INF PULL',
    //   easier_exercise: null,
    //   equipment_id: 1,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 20,
    //   name: 'Levantamento Terra',
    //   exercise_type: 'INF PULL',
    //   easier_exercise: 19,
    //   equipment_id: 2,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 21,
    //   name: 'Agachamento Livre',
    //   exercise_type: 'INF PUSH',
    //   easier_exercise: null,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 22,
    //   name: 'Agachamento Búlgaro Livre',
    //   exercise_type: 'INF PUSH',
    //   easier_exercise: 21,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 23,
    //   name: 'Agachamento Búlgaro Halteres',
    //   exercise_type: 'INF PUSH',
    //   easier_exercise: 22,
    //   equipment_id: 1,
    //   has_load: true
    // });

    // Exercise.create({
    //   id: 24,
    //   name: 'Agachamento Lateral',
    //   exercise_type: 'INF PUSH',
    //   easier_exercise: 23,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 25,
    //   name: 'Pistol Squat Com Apoio',
    //   exercise_type: 'INF PUSH',
    //   easier_exercise: 24,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 26,
    //   name: 'Pistol Squat',
    //   exercise_type: 'INF PUSH',
    //   easier_exercise: 25,
    //   equipment_id: null,
    //   has_load: false
    // });

    // Exercise.create({
    //   id: 27,
    //   name: 'Pistol Squat Com Halter',
    //   exercise_type: 'INF PUSH',
    //   easier_exercise: 26,
    //   equipment_id: 1,
    //   has_load: true
    // });
    
    // Seed de UserEquipments
    // const user = await User.findOne({ where: { id: 1 } });
    // const equipments = await Equipment.findAll();

    // user.setEquipments(equipments);
  }
}

export default new Database();

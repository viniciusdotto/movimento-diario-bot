import Repetition from "../models/repetition.js";

async function index(workout) {
  return await Repetition.findAll({
    where: { workout_id: workout.id }
  });
}

export default { index };
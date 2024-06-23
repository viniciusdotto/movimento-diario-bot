import Exercise from "../models/exercise.js";

async function show(id) {
  return await Exercise.findByPk(id);
}

export default { show }
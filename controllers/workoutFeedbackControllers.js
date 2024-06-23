import WorkoutFeedback from "../models/workoutFeedback.js"

async function create(params) {
  WorkoutFeedback.create(params);
}

export default { create }
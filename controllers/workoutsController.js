import Repetition from '../models/repetition.js';
import Workout from '../models/workout.js';

async function deleteAll(user) {
  const workouts = await Workout.findAll( { where: { user_id: user.id }});
  workouts.forEach( async workout => {
    await Repetition.destroy({ where: { workout_id: workout.id } });
  })
  await Workout.destroy({ where: { user_id: user.id } });
}

async function create(user) {
  const numberOfWorkouts = (await Workout.findAll()).length;
  let workoutType = 'FULL BODY';
  if (user.weekly_training_days > 3) {
    workoutType = numberOfWorkouts == 0 ? 'SUPERIOR' : 'LEGS';
  }
  const workout = await Workout.create({ user_id: user.id, workout_type: workoutType });
  switch (user.weekly_training_days) {
    case 3:
      switch (user.workout_duration) {
        case 30:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 22})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 12})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 19})
          }
          break;
        case 60:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 12})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 19})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 12})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 19})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 22})
          }
          break;
        case 90:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 12})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 19})
          }
          break;
      }
      break;
    case 4:
      switch (user.workout_duration) {
        case 30:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 17})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 19})
          } else if (numberOfWorkouts == 2) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 12})
          }
          break;
        case 60:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 12})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 19})
          } else if (numberOfWorkouts == 2) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 12})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 17})
          }
          break;
        case 90:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 12})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 40, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 40, load: 0, workout_id: workout.id, exercise_id: 19})
          }
          break;
      }
      break;
    case 5:
      switch (user.workout_duration) {
        case 30:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 17})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 19})
          } else if (numberOfWorkouts == 2) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 12})
          }
          break;
        case 60:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 12})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 19})
          } else if (numberOfWorkouts == 2) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 12})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 17})
          }
          break;
        case 90:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 12})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 40, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 40, load: 0, workout_id: workout.id, exercise_id: 19})
          }
          break;
      }
      break;
    case 6:
      switch (user.workout_duration) {
        case 30:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 17})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 19})
          } else if (numberOfWorkouts == 2) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 12})
          }
          break;
        case 60:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 12})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 19})
          } else if (numberOfWorkouts == 2) {
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 32, load: 0, workout_id: workout.id, exercise_id: 12})
            await Repetition.create({ total_reps: 8, load: 0, workout_id: workout.id, exercise_id: 17})
          }
          break;
        case 90:
          if (numberOfWorkouts == 0) {
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 7})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 3})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 17})
            await Repetition.create({ total_reps: 24, load: 0, workout_id: workout.id, exercise_id: 12})
          } else if (numberOfWorkouts == 1) {
            await Repetition.create({ total_reps: 40, load: 0, workout_id: workout.id, exercise_id: 22})
            await Repetition.create({ total_reps: 40, load: 0, workout_id: workout.id, exercise_id: 19})
          }
          break;
      }
      break;
  }
}

async function show(user) {
  return await Workout.findOne( { where: { user_id: user.id }, order: [['id', 'DESC']] });
}

export default { deleteAll, create, show };
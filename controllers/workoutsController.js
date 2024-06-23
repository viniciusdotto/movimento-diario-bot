import Equipment from '../models/equipment.js';
import Exercise from '../models/exercise.js';
import Repetition from '../models/repetition.js';
import Workout from '../models/workout.js';
import WorkoutFeedback from '../models/workoutFeedback.js';

async function deleteAll(user) {
  const workouts = await Workout.findAll( { where: { user_id: user.id }});
  const promises = workouts.map( async workout => {
    await Repetition.destroy({ where: { workout_id: workout.id } });
    await WorkoutFeedback.destroy({ where: { workout_id: workout.id } });
  })

  await Promise.all(promises)
  await Workout.destroy({ where: { user_id: user.id } });
}

async function create(user) {
  const numberOfWorkouts = (await Workout.findAll({ where: { user_id: user.id }})).length;
  const lastWorkouts = await Workout.findAll({ where: { user_id: user.id }, order: [['id', 'DESC']], limit: 2 })
  let workoutType = 'FULL BODY';
  let feedback;
  let params;
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
          } else if ((numberOfWorkouts % 2) == 0) {
            feedback = await WorkoutFeedback.findOne({ where: { workout_id: lastWorkouts[1].id } });
            (await Repetition.findAll({ where: { workout_id: lastWorkouts[1].id } })).forEach( async repetition => {
              if ((numberOfWorkouts / 3) < 3) {
                const exercise = await Exercise.findByPk(repetition.exercise_id);
                const equipment = await Equipment.findByPk(exercise.equipment_id);
                switch (feedback.workout_feedback) {
                  case 'EASY':
                    if (exercise.has_load && repetition.load < equipment.max_load && repetition.total_reps / 3 > 12) {
                      await Repetition.create({
                        total_reps: parseInt(repetition.total_reps / 1.05),
                        load: (repetition.load * 1.1) > equipment.max_load ? equipment.max_load : parseInt(repetition.load * 1.1),
                        workout_id: workout.id,
                        exercise_id: exercise.id
                      })
                    } else {
                      await Repetition.create({
                        total_reps: parseInt(repetition.total_reps * 1.1),
                        load: repetition.load,
                        workout_id: workout.id,
                        exercise_id: exercise.id
                      })
                    }
                    break;
                  case 'NORMAL':
                    if (exercise.has_load && repetition.load < equipment.max_load && repetition.total_reps / 3 > 12) {
                      await Repetition.create({
                        total_reps: parseInt(repetition.total_reps / 1.05),
                        load: (repetition.load * 1.05) > equipment.max_load ? equipment.max_load : parseInt(repetition.load * 1.05),
                        workout_id: workout.id,
                        exercise_id: exercise.id
                      })
                    } else {
                      await Repetition.create({
                        total_reps: parseInt(repetition.total_reps * 1.05),
                        load: repetition.load,
                        workout_id: workout.id,
                        exercise_id: exercise.id
                      })
                    }
                    break;
                  case 'HARD':
                    await Repetition.create({
                      total_reps: repetition.total_reps,
                      load: repetition.load,
                      workout_id: workout.id,
                      exercise_id: exercise.id
                    })
                    break;
                }
              } else {
                await Repetition.create({
                  total_reps: repetition.total_reps,
                  load: repetition.load,
                  workout_id: workout.id,
                  exercise_id: exercise.id
                });
              }
            })
          } else if ((numberOfWorkouts % 2) == 1) {
            feedback = await WorkoutFeedback.findOne({ where: { workout_id: lastWorkouts[1].id } });
            (await Repetition.findAll({ where: { workout_id: lastWorkouts[1].id } })).forEach( async repetition => {
              const exercise = await Exercise.findByPk(repetition.exercise_id);
              const equipment = await Equipment.findByPk(exercise.equipment_id);
              if ((numberOfWorkouts / 3) < 3) {
                switch (feedback.workout_feedback) {
                  case 'EASY':
                    if (exercise.has_load && repetition.load < equipment.max_load && repetition.total_reps / 3 > 12) {
                      await Repetition.create({
                        total_reps: parseInt(repetition.total_reps / 1.05),
                        load: (repetition.load * 1.1) > equipment.max_load ? equipment.max_load : parseInt(repetition.load * 1.1),
                        workout_id: workout.id,
                        exercise_id: exercise.id
                      })
                    } else {
                      await Repetition.create({
                        total_reps: parseInt(repetition.total_reps * 1.1),
                        load: repetition.load,
                        workout_id: workout.id,
                        exercise_id: exercise.id
                      })
                    }
                    break;
                  case 'NORMAL':
                    if (exercise.has_load && repetition.load < equipment.max_load && repetition.total_reps / 3 > 12) {
                      await Repetition.create({
                        total_reps: parseInt(repetition.total_reps / 1.05),
                        load: (repetition.load * 1.05) > equipment.max_load ? equipment.max_load : parseInt(repetition.load * 1.05),
                        workout_id: workout.id,
                        exercise_id: exercise.id
                      })
                    } else {
                      await Repetition.create({
                        total_reps: parseInt(repetition.total_reps * 1.05),
                        load: repetition.load,
                        workout_id: workout.id,
                        exercise_id: exercise.id
                      })
                    }
                    break;
                  case 'HARD':
                    await Repetition.create({
                      total_reps: repetition.total_reps,
                      load: repetition.load,
                      workout_id: workout.id,
                      exercise_id: exercise.id
                    })
                    break;
                }
              } else {
                await Repetition.create({
                  total_reps: repetition.total_reps,
                  load: repetition.load,
                  workout_id: workout.id,
                  exercise_id: exercise.id
                });
              }
            })
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

async function updateDate(workout) {
  await workout.update({ workout_date: new Date() })
}

export default { deleteAll, create, show, updateDate };
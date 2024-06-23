import { bot } from './index.js';
import WorkoutController from '../controllers/workoutsController.js';
import RepetitionController from '../controllers/repetitionsController.js';
import ExerciseController from '../controllers/exercisesController.js';

const startWorkoutFlow = async (chatId) => {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Treino de Hoje', callback_data: 'currentWorkout' }],
        [{ text: 'Gerar Novo Treino', callback_data: 'newWorkout' }],
        [{ text: 'Sair', callback_data: '/quit' }]
      ]
    }
  }
  await bot.sendMessage(chatId, 'Escolha uma opção:', options);
}

const handleCurrentWorkout = async (chatId, user) => {
  const workout = await WorkoutController.show(user);
  const repetitions = await RepetitionController.index(workout);
  let workoutText = 'O seu treino de hoje é:\n\n';

  const promises = repetitions.map(async (repetition) => {
    const exercise = await ExerciseController.show(repetition.exercise_id);
    workoutText += `${exercise.name} - ${repetition.total_reps} repetições dividadas em ${Math.ceil(repetition.total_reps / 12)} série(s)\n`;
  });

  await Promise.all(promises);

  workoutText += '\nDescanse entre cada série de 1min e meio a 2min'

  await bot.sendMessage(chatId, workoutText);

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Concluir Treino', callback_data: 'workoutDone' }],
        [{ text: 'Gerar Novo Treino', callback_data: 'newWorkout' }],
        [{ text: 'Sair', callback_data: '/quit' }]
      ]
    }
  }
  await bot.sendMessage(chatId, 'O que você gostaria de fazer a seguir?', options);
}

const handleNewWorkout = async (chatId) => {
  const response = 'Para gerar um novo treino, preciso que você responda algumas perguntas.';
  await bot.sendMessage(chatId, response);

  handleWeeklyTrainingDays(chatId);
}

const handleWeeklyTrainingDays = async (chatId) => {
  const response = 'Quantos dias da semana você quer treinar?';
  await bot.sendMessage(chatId, response);

  let options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '3 dias', callback_data: 3 }],
        [{ text: '4 dias', callback_data: 4 }],
        [{ text: '5 dias', callback_data: 5 }],
        [{ text: '6 dias', callback_data: 6 }]
      ]
    }
  };
  await bot.sendMessage(chatId, 'Escolha uma opção para continuar:', options);
}

const handleWorkoutDuration = async (chatId) => {
  const response = 'Quanto tempo você tem disponível para treinar?';
  await bot.sendMessage(chatId, response);

  let options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '30min', callback_data: 30 }],
        [{ text: '60min', callback_data: 60 }],
        [{ text: '90min', callback_data: 90 }]
      ]
    }
  };
  await bot.sendMessage(chatId, 'Escolha uma opção para continuar:', options);
}

// TODO lógica de seleção de equipamentos disponiveis (manter simples na primeira versao)

export {
  startWorkoutFlow,
  handleCurrentWorkout,
  handleNewWorkout,
  handleWorkoutDuration
};

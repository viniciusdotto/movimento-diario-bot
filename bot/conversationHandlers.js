import { bot } from './index.js';

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

const handleCurrentWorkout = async (chatId) => {
  // TODO lógica de mostrar o treino atual
  const response = 'O seu treino de hoje é: ...';
  await bot.sendMessage(chatId, response);

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Treino de Hoje', callback_data: 'currentWorkout' }],
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
        [{ text: '45min', callback_data: 45 }],
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

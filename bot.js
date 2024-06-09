import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config'

import sequelize from './sequelize.js';
import User from './models/user.js';
import Equipment from './models/equipment.js';
import Exercise from './models/exercise.js';
import Workout from './models/workout.js';
import Repetition from './models/repetition.js';
import './models/userEquipment.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all models
    await sequelize.sync({ force: true });  // Use { force: true } to drop and recreate the tables for development
    console.log('All models were synchronized successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const token = process.env.API_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || 'atleta';
  const welcomeMessage = `Olá ${username}, bem-vindo ao Movimento Diário, seu gerador de treinos e periodizações! Como posso te ajudar?`;

  if (msg.text === '/quit') {
    bot.sendMessage(chatId, 'Volte sempre, se precisar de algo só mandar uma mensagem');
    return;
  }

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Treino de Hoje', callback_data: 'currentWorkout' }],
        [{ text: 'Gerar Novo Treino', callback_data: 'newWorkout' }]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const data = callbackQuery.data;

  let response;

  switch (data) {
    case 'currentWorkout':
      response = 'O seu treino de hoje é: ...';
      break;
    case 'newWorkout':
      response = 'Para gerar o novo treino, preciso que você responda algumas perguntas...';
      break;
    default:
      response = 'Por favor, escolha uma opção válida.';
  }

  bot.sendMessage(chatId, response);
  bot.answerCallbackQuery(callbackQuery.id);
});

bot.on('polling_error', (error) => {
  console.error(`[polling_error] ${error.code}: ${error.message}`);
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("API Started!");
});
import TelegramBot from 'node-telegram-bot-api';
import { handleMessage, handleCallbackQuery, handlePollingError } from './handlers.js';

const token = process.env.API_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => handleMessage(bot, msg));
bot.on('callback_query', (callbackQuery) => handleCallbackQuery(bot, callbackQuery));
bot.on('polling_error', handlePollingError);

export default bot;

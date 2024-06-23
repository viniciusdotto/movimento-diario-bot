import UsersController from '../controllers/usersController.js';
import WorkoutController from '../controllers/workoutController.js';
import { startWorkoutFlow, handleCurrentWorkout, handleNewWorkout, handleWorkoutDuration } from './conversationHandlers.js';

export async function handleMessage(bot, msg) {
  const chatId = msg.chat.id;

  try {
    let user = await UsersController.show(msg.from.username);
    if (!user) {
      await UsersController.create(msg.from.username);
      user = await UsersController.show(msg.from.username); 
    }

    const welcomeMessage = `Olá ${user.username}, bem-vindo ao Movimento Diário, seu gerador de treinos e periodizações! Como posso te ajudar?`;

    await bot.sendMessage(chatId, welcomeMessage);
    await startWorkoutFlow(chatId);

  } catch (error) {
    console.error('Error handling message:', error);
    bot.sendMessage(chatId, 'Ocorreu um erro ao processar sua mensagem.');
  }
}

export async function handleCallbackQuery(bot, callbackQuery) {
  try {
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;
    const data = callbackQuery.data;
    const user = await UsersController.show(msg.chat.username);
    switch (data) {
      case 'currentWorkout':
        handleCurrentWorkout(chatId);
        break;
      case 'newWorkout':
        handleNewWorkout(chatId);
        break;
      case '3':
        UsersController.update(user, { weekly_training_days: 3 });
        handleWorkoutDuration(chatId);
        break;
      case '4':
        UsersController.update(user, { weekly_training_days: 4 });
        handleWorkoutDuration(chatId);
        break;
      case '5':
        UsersController.update(user, { weekly_training_days: 5 });
        handleWorkoutDuration(chatId);
        break;
      case '6':
        UsersController.update(user, { weekly_training_days: 6 });
        handleWorkoutDuration(chatId);
        break;
      case '30':
        UsersController.update(user, { workout_duration: 30 });
        await WorkoutController.deleteAll();
        await WorkoutController.create(user);
        handleCurrentWorkout(chatId);
        break;
      case '60':
        UsersController.update(user, { workout_duration: 60 });
        await WorkoutController.deleteAll();
        await WorkoutController.create(user);
        handleCurrentWorkout(chatId);
        break;
      case '90':
        UsersController.update(user, { workout_duration: 90 });
        await WorkoutController.deleteAll();
        await WorkoutController.create(user);
        handleCurrentWorkout(chatId);
        break;
      case 'startWorkoutFlow':
        startWorkoutFlow(chatId);
        break;
      case '/quit':
        bot.sendMessage(chatId, 'Volte sempre, se precisar de algo só mandar uma mensagem');
        break;
      default:
        bot.sendMessage(chatId, 'Por favor, escolha uma opção válida.');
    }
    bot.answerCallbackQuery(callbackQuery.id);
  } catch (err) {
    console.log(err);
  }
}

export function handlePollingError(error) {
  console.error(`[polling_error] ${error.code}: ${error.message}`);
}

import UsersController from '../controllers/usersController.js';

export async function handleMessage(bot, msg) {
  const chatId = msg.chat.id;

  try {
    let user = await UsersController.show(msg.from.username);
    if (!user) {
      await UsersController.create(msg.from.username);
      user = await UsersController.show(msg.from.username); 
    }

    const welcomeMessage = `Olá ${user.username}, bem-vindo ao Movimento Diário, seu gerador de treinos e periodizações! Como posso te ajudar?`;

    if (msg.text === '/quit') {
      bot.sendMessage(chatId, 'Volte sempre, se precisar de algo só mandar uma mensagem');
      return;
    }

    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Treino de Hoje', callback_data: 'currentWorkout' }],
          [{ text: 'Gerar Novo Treino', callback_data: 'newWorkout' }],
          [{ text: 'Sair', callback_data: '/quit' }]
        ]
      }
    };

    bot.sendMessage(chatId, welcomeMessage, options);
  } catch (error) {
    console.error('Error handling message:', error);
    bot.sendMessage(chatId, 'Ocorreu um erro ao processar sua mensagem.');
  }
}

export function handleCallbackQuery(bot, callbackQuery) {
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
    case '/quit':
      response = 'Volte sempre, se precisar de algo só mandar uma mensagem';
      break;
    default:
      response = 'Por favor, escolha uma opção válida.';
  }

  bot.sendMessage(chatId, response);
  bot.answerCallbackQuery(callbackQuery.id);
}

export function handlePollingError(error) {
  console.error(`[polling_error] ${error.code}: ${error.message}`);
}

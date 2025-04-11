require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const sendSignal = require('./sendSignal');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || "usuário";

  bot.sendMessage(chatId, `Olá ${name}! 👋 Seja bem-vindo ao SureDash Bot!`);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.startsWith('/')) return;
  bot.sendMessage(chatId, `Recebido! Logo mais você verá suas surebets aqui. 😉`);
});


//Comando de TESTE
bot.onText(/\/teste/, async (msg) => {
  const data = {
    casa1: 'Betano',
    casa2: 'Pixbet',
    odd1: 2.10,
    odd2: 2.05,
    jogo: 'Time A x Time B',
    mercado: 'Resultado Final',
  };

  await sendSignal(bot, data);
  bot.sendMessage(msg.chat.id, '✅ Sinal de teste enviado!');
});

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

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

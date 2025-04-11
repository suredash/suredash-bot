require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// GRUPO PÚBLICO
const PUBLIC_CHAT_ID = '-1002120414412'; // @surebetschat

// Exemplo de sinal
function formatSurebetMessage(data) {
  return `
🚨 *NOVA SUREBET ENCONTRADA!*

🧮 *Lucro estimado:* ${data.lucro}%
💵 *Lucro:* +R$${data.lucroReais} (Investido: R$${data.investido})
🕐 *Jogo:* ${data.dataHora}

🏟️ *${data.esporte} – ${data.tipoMercado}*
📌 *Partida:* ${data.partida}

💼 *${data.casa1}*
• Odd: ${data.odd1}
• Entrada: R$${data.valor1}
• Mercado: ${data.mercado1}

💼 *${data.casa2}*
• Odd: ${data.odd2}
• Entrada: R$${data.valor2}
• Mercado: ${data.mercado2}

📅 Atualizado: ${data.dataAtualizacao}
  `;
}

// Envio de mensagem de exemplo
function enviarSinalExemplo() {
  const exemplo = {
    lucro: '9.08',
    lucroReais: '5.25',
    investido: '57.75',
    dataHora: '12/04/2025 - 08:00h',
    esporte: 'Futebol',
    tipoMercado: 'Escanteios',
    partida: 'Botev Plovdiv x Septemvri Sofia',
    casa1: 'SuperBet',
    odd1: '2.27',
    valor1: '27.75',
    mercado1: 'Acima 10.5 escanteios',
    casa2: 'Bet365 (BR)',
    odd2: '2.10',
    valor2: '30.00',
    mercado2: 'Abaixo 11 escanteios',
    dataAtualizacao: '11/04/2025 09:36',
  };

  const mensagem = formatSurebetMessage(exemplo);
  bot.sendMessage(PUBLIC_CHAT_ID, mensagem, { parse_mode: 'Markdown' });
}

// Envia mensagem de exemplo ao iniciar
enviarSinalExemplo();

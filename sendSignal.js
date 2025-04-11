const axios = require('axios');

const CHAT_GROUP_ID = '-100xxxxxxxxxx'; // ID do grupo de chat livre (substitua depois)
const VIP_USERS = [
  123456789, // Substitua pelos IDs dos usuários autorizados
  987654321,
];

function calculateSurebetProfit(odd1, odd2) {
  const inv1 = 1 / odd1;
  const inv2 = 1 / odd2;
  const total = inv1 + inv2;
  const profit = ((1 / total) - 1) * 100;
  return parseFloat(profit.toFixed(2));
}

async function sendSignal(bot, data) {
  const { casa1, casa2, odd1, odd2, jogo, mercado } = data;
  const lucro = calculateSurebetProfit(odd1, odd2);

  const message = `
📊 NOVO SINAL SUREBET
🏟️ *Jogo:* ${jogo}
🎯 *Mercado:* ${mercado}

🏦 *Casa 1:* ${casa1}
📈 *Odd:* ${odd1}

🏦 *Casa 2:* ${casa2}
📉 *Odd:* ${odd2}

💸 *Lucro:* *${lucro}%*
`;

  if (lucro <= 2) {
    // Enviar no grupo aberto
    await bot.sendMessage(CHAT_GROUP_ID, message, { parse_mode: 'Markdown' });
  } else {
    // Enviar apenas para usuários autorizados
    for (const userId of VIP_USERS) {
      try {
        await bot.sendMessage(userId, message, { parse_mode: 'Markdown' });
      } catch (err) {
        console.error(`Erro ao enviar para ${userId}:`, err.message);
      }
    }
  }
}

module.exports = sendSignal;

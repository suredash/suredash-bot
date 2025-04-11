const TelegramBot = require("node-telegram-bot-api");

// Token do bot que você criou
const token = "7988679461:AAG6kGeOwsf7xpPBWmZXLg1QCxEWhG4FtXE";
const bot = new TelegramBot(token, { polling: true });

// ID do grupo de chat livre
const PUBLIC_GROUP = "@surebetschat";

// Função simulada para buscar entradas de surebet
function buscarSurebetsMock() {
  // Aqui futuramente será a integração com sua base real
  const entradas = [
    {
      esporte: "Futebol",
      time1: "Flamengo",
      time2: "Palmeiras",
      odd1: 2.0,
      odd2: 2.0,
      lucro: 0.01, // 1%
    },
    {
      esporte: "Tênis",
      jogador1: "Nadal",
      jogador2: "Djokovic",
      odd1: 1.95,
      odd2: 2.10,
      lucro: 0.03, // 3%
    },
  ];

  // Retorna apenas entradas com lucro ≤ 2%
  return entradas.filter((e) => e.lucro <= 0.02);
}

// Função para enviar entradas no grupo público
function enviarEntradasPublicas() {
  const entradas = buscarSurebetsMock();

  entradas.forEach((entrada) => {
    const mensagem = `
🎯 <b>ENTRADA PÚBLICA (até 2%)</b>

🏟️ <b>Esporte:</b> ${entrada.esporte}
🔁 <b>Confronto:</b> ${entrada.time1} x ${entrada.time2}
📊 <b>Odds:</b> ${entrada.odd1} | ${entrada.odd2}
💰 <b>Lucro estimado:</b> ${(entrada.lucro * 100).toFixed(2)}%

⏳ Aproveite rápido, as odds mudam!
`;

    bot.sendMessage(PUBLIC_GROUP, mensagem, { parse_mode: "HTML" });
  });
}

// Envia entradas públicas a cada 1 minuto
setInterval(enviarEntradasPublicas, 60 * 1000);

// Comando opcional para testar
bot.onText(/\/teste/, (msg) => {
  bot.sendMessage(msg.chat.id, "Bot está funcionando! ✅");
});

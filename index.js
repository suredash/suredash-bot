const TelegramBot = require("node-telegram-bot-api");
const moment = require("moment");

const token = "7988679461:AAG6kGeOwsf7xpPBWmZXLg1QCxEWhG4FtXE";
const bot = new TelegramBot(token, { polling: true });

const PUBLIC_GROUP = "@surebetschat";

function buscarSurebetsMock() {
  const agora = moment();

  return [
    {
      casa1: "PixBet",
      casa2: "Betano",
      lucro: 0.018, // 1.8%
      valorLucro: 3.75,
      valorTotal: 50,
      esporte: "Futebol",
      confronto: "Corinthians – São Paulo",
      odd1: 2.25,
      odd2: 2.05,
      mercado1: "Mais de 2.5 gols",
      mercado2: "Menos de 2.5 gols",
      valor1: 24,
      valor2: 26,
      horarioPartida: agora.clone().add(5, "hours").format("YYYY-MM-DD HH:mm:ss"),
      atualizacao: agora.format("YYYY-MM-DD HH:mm:ss"),
      envio: agora.add(2, "seconds").format("YYYY-MM-DD HH:mm:ss"),
    },
  ];
}

function enviarEntradasPublicas() {
  const entradas = buscarSurebetsMock();

  entradas.forEach((e) => {
    const mensagem = `
🏘🔹<b>${e.casa1}</b> x <b>${e.casa2}</b>🔸
💰<b>${(e.lucro * 100).toFixed(2)}%</b>
🏦<b>+${e.valorLucro.toFixed(2)}$</b> [${e.valorTotal.toFixed(2)}$]
⏱️<b>${e.horarioPartida}</b>

🏆<b>${e.esporte}</b>

🔹<b>${e.casa1}:</b> ${e.confronto}
🔸<b>${e.casa2}:</b> ${e.confronto}

🔹<b>${e.casa1}:</b> ${e.odd1}
💸<b>${e.valor1}$</b>
${e.mercado1}

🔸<b>${e.casa2}:</b> ${e.odd2}
💸<b>${e.valor2}$</b>
${e.mercado2}

🔄<b>Atualizada:</b> ${e.atualizacao}
📨<b>Enviado:</b> ${e.envio}
`;

    bot.sendMessage(PUBLIC_GROUP, mensagem, { parse_mode: "HTML" });
  });
}

setInterval(enviarEntradasPublicas, 60 * 1000);

bot.onText(/\/teste/, (msg) => {
  bot.sendMessage(msg.chat.id, "Bot está funcionando! ✅");
});


//FALSA PORTA
// Evita erro de porta no Render - cria um servidor web "fake"
const http = require('http');
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running!');
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

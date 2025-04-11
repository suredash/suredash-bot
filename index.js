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

  entradas.forEach((e

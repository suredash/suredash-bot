require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');

// Configurações do bot
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// ID do chat público
const PUBLIC_CHAT_ID = '-1002120414412'; // Substitua pelo ID real do seu grupo

// Função para selecionar um banner aleatório com base no esporte
function getRandomBanner(esporte) {
  const banners = {
    futebol: ['futebol.gif'],
    basquete: ['basquete.gif'],
    tenis: ['tenis.gif'],
    volei: ['volei.gif'],
    esports: ['esports.gif']
  };
  const bannerList = banners[esporte.toLowerCase()] || ['default.gif'];
  const selectedBanner = bannerList[Math.floor(Math.random() * bannerList.length)];
  return path.join(__dirname, 'assets', 'banners', selectedBanner);
}

// Função para gerar a imagem do sinal
async function generateSignalImage(data) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fundo branco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Carregar e desenhar o banner
  const bannerPath = getRandomBanner(data.esporte);
  if (fs.existsSync(bannerPath)) {
    const banner = await loadImage(bannerPath);
    ctx.drawImage(banner, 0, 0, width, 150);
  }

  // Título
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 28px Arial';
  ctx.fillText(`Partida: ${data.partida}`, 50, 200);

  // Informações das casas de apostas
  const casas = [
    {
      nome: data.casa1,
      odd: data.odd1,
      valor: data.valor1,
      mercado: data.mercado1,
      logo: `${data.casa1.toLowerCase()}.png`
    },
    {
      nome: data.casa2,
      odd: data.odd2,
      valor: data.valor2,
      mercado: data.mercado2,
      logo: `${data.casa2.toLowerCase()}.png`
    }
  ];

  for (let i = 0; i < casas.length; i++) {
    const casa = casas[i];
    const yPosition = 250 + i * 150;

    // Carregar e desenhar o logo da casa
    const logoPath = path.join(__dirname, 'assets', 'logos', casa.logo);
    if (fs.existsSync(logoPath)) {
      const logo = await loadImage(logoPath);
      ctx.drawImage(logo, 50, yPosition, 100, 100);
    }

    // Informações da casa
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(casa.nome, 170, yPosition + 30);
    ctx.font = '16px Arial';
    ctx.fillText(`Odd: ${casa.odd}`, 170, yPosition + 60);
    ctx.fillText(`Valor: R$${casa.valor}`, 170, yPosition + 90);
    ctx.fillText(`Mercado: ${casa.mercado}`, 170, yPosition + 120);
  }

  // Informações adicionais
  ctx.fillStyle = '#000000';
  ctx.font = '18px Arial';
  ctx.fillText(`Lucro estimado: ${data.lucro}%`, 50, 550);
  ctx.fillText(`Ganho líquido: R$${data.lucroReais}`, 300, 550);
  ctx.fillText(`Início: ${data.dataHora}`, 50, 580);

  // Carregar e desenhar o logo do SureDash
  const logoSureDashPath = path.join(__dirname, 'assets', 'suredash_logo.png');
  if (fs.existsSync(logoSureDashPath)) {
    const logoSureDash = await loadImage(logoSureDashPath);
    ctx.drawImage(logoSureDash, width - 100, height - 100, 80, 80);
  }

  return canvas.toBuffer();
}

// Função para enviar o sinal
async function enviarSinal(data) {
  const imageBuffer = await generateSignalImage(data);
  const caption = `
🏆 *${data.partida}*
🎯 Mercado: ${data.tipoMercado}

🏠 ${data.casa1} - Odd: ${data.odd1}
💰 Entrada: R$${data.valor1}
🎲 ${data.mercado1}

🏠 ${data.casa2} - Odd: ${data.odd2}
💰 Entrada: R$${data.valor2}
🎲 ${data.m
::contentReference[oaicite:0]{index=0}
 

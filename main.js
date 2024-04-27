const TelegramApi = require("node-telegram-bot-api");

const TOKEN = "7168281901:AAGRqAUkcM4YDhnJ771Np0JE0UfwgPr_gZo";

const chats = {};

const bot = new TelegramApi(TOKEN, { polling: true });

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
    ],
  }),
};


const againOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text:"Play again", callback_data:"/game"}]
      ],
    }),
  };
function start() {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Hello",
    },
    {
      command: "/info",
      description: "Get the information",
    },
    {
      command: "/game",
      description: "Try guess the number",
    },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/2.webp"
      );
      return await bot.sendMessage(chatId, "Welcome");
    }

    if (text === "/info") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/6.webp"
      );
      return await bot.sendMessage(chatId, `You are @${msg.chat.username}`);
    }

    if (text === "/game") {
      await bot.sendMessage(
        chatId,
        "Now you need to guess number, which I memorize"
      );
      const randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      return await bot.sendMessage(chatId, "Let's go", gameOptions);
    }

    return await bot.sendMessage(chatId, `! Incorrect command`);
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === chats[chatId]) {
      return await bot.sendMessage(chatId, "You guess",againOptions);
    }

    return await bot.sendMessage(chatId, "You don't guess. The number was "+ chats[chatId],againOptions);

  });
}

start();

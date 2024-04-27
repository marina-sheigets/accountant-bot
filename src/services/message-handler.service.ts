import TelegramBot from "node-telegram-bot-api";
import { singleton } from "tsyringe";

@singleton()
export class MessageHandlerService {
    constructor() { }


    public async sendInvalidCommandMessage(bot: TelegramBot, chatId: number) {
        return await bot.sendMessage(chatId, "Invalid command");
    }

}

import * as TelegramBot from "node-telegram-bot-api";
import { Command } from "../constants/commands";
import { BotType } from "../types/telegram-types";
import { inject, singleton } from "tsyringe";
import { CommandHandlerService } from "./command-handler.service";
import { MessageHandlerService } from "./message-handler.service";

const dotenv = require("dotenv");
const { COMMANDS } = require("../constants/commands");

dotenv.config();

@singleton()
export class BotService {
    bot: BotType;
    chatId: number;


    constructor(
        @inject("CommandHandler") protected commandHandler: CommandHandlerService,
        @inject("MessageSender") protected messageSender: MessageHandlerService
    ) {
        this.bot = new TelegramBot(process.env.BOT_TOKEN as string, {
            polling: true,
        });

        if (this.bot) {

            this.bot.editMessageReplyMarkup({ inline_keyboard: [] });
            this.bot.on("message", this.getMessage);
        }

    }

    public setCommands() {
        if (!this.bot) {
            return;
        }

        this.bot.setMyCommands(COMMANDS);
    }

    protected getMessage = async (data: TelegramBot.Message) => {
        const message = data.text || "";
        this.chatId = data.chat.id;

        if (this.isValidCommand(message)) {
            await this.commandHandler.executeCommand(message);
            return;
        }

        await this.messageSender.sendInvalidCommandMessage(this.bot, this.chatId);
    }

    protected isValidCommand(command: string) {

        return (
            COMMANDS.filter((obj: Command) => obj.command === command).length === 1
        );
    }
}

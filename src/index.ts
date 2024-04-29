import "reflect-metadata";
import { container, instanceCachingFactory } from "tsyringe";
import { BotService } from "./services/bot.service";
import { MessageHandlerService } from "./services/message-handler.service";
import { CommandHandlerService } from "./services/command-handler.service";
import { CostsService } from "./services/costs.service";

async function main() {
    const botService = new BotService(new CommandHandlerService(new CostsService()), new MessageHandlerService())
    botService.setCommands();
}

main().catch(error => {
    console.error('Error occurred:', error);
});

container.register<MessageHandlerService>("MessageHandler", {
    useFactory: instanceCachingFactory<MessageHandlerService>(c => c.resolve(MessageHandlerService)),
});

container.register<CommandHandlerService>("CommandHandler", {
    useFactory: instanceCachingFactory<CommandHandlerService>(c => c.resolve(CommandHandlerService)),
});
container.register<BotService>("Bot", {
    useFactory: instanceCachingFactory<BotService>(c => c.resolve(BotService)),
});
container.register<CostsService>("Costs", {
    useFactory: instanceCachingFactory<CostsService>(c => c.resolve(CostsService)),
});


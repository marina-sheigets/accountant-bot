import { inject, singleton } from "tsyringe";
import { CostsService } from "./costs.service";

@singleton()
export class CommandHandlerService {
    constructor(
        @inject('Costs') protected costsService: CostsService
    ) { }

    public async executeCommand(command: string) {
        switch (command) {
            case '/add': {
                this.costsService.addCosts();
                break;
            }
            case '/view': {

            }
            case '/settings': {

            }
            case "/help": {

            }
        }
    }
}

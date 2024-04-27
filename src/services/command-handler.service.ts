import { singleton } from "tsyringe";

@singleton()
export class CommandHandlerService {
    constructor() { }

    public async executeCommand(command: string) {

    }
}

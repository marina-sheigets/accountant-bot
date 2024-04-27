export const COMMANDS: Command[] = [
  {
    command: "/add",
    description: "Add costs",
  },
  {
    command: "/view",
    description: "View my costs",
  },
  {
    command: "/view",
    description: "View my costs",
  },
  {
    command: "/setting",
    description: "Change settings",
  },
  {
    command: "/help",
    description: "Look what this bot can do",
  },
]

export interface Command {
  command: string,
  description: string
}
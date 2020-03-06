import { Client, Store, Command, print } from '../index';

export class CommandStore extends Store<Command> {
  constructor(client: Client) {
    super(client, 'commands');
  }
  set(key: string, value: Command): this {
    super.set(key, value);
    const { aliases } = value.options;
    if (aliases) {
      aliases.forEach(alias => {
        super.set(alias, value);
        print.import('commands', alias, `alias(${key})`);
      });
    }
    return this;
  }
  delete(key: string): boolean {
    const command: Command | undefined = super.get(key);
    if (!command) return false;
    const { aliases } = command.options;
    if (aliases) {
      aliases.forEach(alias => {
        super.delete(alias);
      });
    }
    return true;
  }
}

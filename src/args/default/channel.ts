import { Client, Args } from '../../index';
import { Channel } from 'discord.js';

export = class extends Args {
  constructor(client: Client) {
    super(client, 'channel');
  }
  run(message: string): Channel | undefined {
    return this.client.channels.cache.get(message);
  }
};
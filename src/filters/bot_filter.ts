import { config } from '../config';
import type { MessageType } from '../types';

const bots = (config.features.bots?.split('¬') ?? []) as string[];
const defaultBots = ['nightbot', 'streamelements', 'el_pato_bot', 'afordibot'];
const bannedBots = [...defaultBots, ...bots];

function botFilter({ userName }: MessageType) {
  return bannedBots.includes(userName);
}

export default botFilter;

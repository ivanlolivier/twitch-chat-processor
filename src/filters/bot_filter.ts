import getVariable, { BOTS } from '../lib/get_variable';
import type { MessageType } from '../types';

const bots = (getVariable(BOTS)?.split('¬') ?? []) as string[];
const defaultBots = ['nightbot', 'streamelements', 'el_pato_bot', 'afordibot'];
const bannedBots = [...defaultBots, ...bots];

function botFilter({ userName }: MessageType) {
  return bannedBots.includes(userName);
}

export default botFilter;

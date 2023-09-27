// ":limontechnology!limontechnology@limontechnology.tmi.twitch.tv "

import type { MessageType } from '../types';

export default function usernamePlacer(message: MessageType) {
  const toBeParsed = message.userType || message.vip;

  const userName = toBeParsed?.split(':')?.[1]?.split('!')[0] ?? message.userName;

  return { ...message, userName };
}

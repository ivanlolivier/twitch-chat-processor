import type { MessageType } from '../types';

export default function usernamePlacer(message: MessageType) {
  // Example: ":limontechnology!limontechnology@limontechnology.tmi.twitch.tv "
  const toBeParsed = message.userType || message.vip;

  message.userName = toBeParsed?.split(':')?.[1]?.split('!')[0] ?? message.userName;
  return message;
}

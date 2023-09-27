import type { MessageType } from '../types';

export const SPEAK_COMMAND = '!speak';

export function getToRead(words: string[]) {
  const hasLang = words[1][2] === '-';
  if (!hasLang) {
    return words.slice(1).join(' ');
  }

  const hasVoice = `${Number(words[2])}` !== 'NaN';
  if (!hasVoice) {
    return words.slice(2).join(' ');
  }

  return words.slice(3).join(' ');
}

/**
 * Example: !speak es-UY 3 Hello World
 */
export default function speakMessageRender(message: MessageType) {
  const words = message.msg.split(' ');
  if (words[0] !== SPEAK_COMMAND) {
    return message;
  }

  message.msg = `📢 ${getToRead(words)}`;
  return message;
}

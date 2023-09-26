import type { MessageType } from '../types';

function isNotAMessage({ msg }: MessageType) {
  return !msg?.trim();
}

export default isNotAMessage;

import type { MessageType } from '../types';

export default function messageCleaner(message: MessageType) {
  message.msg = message.msg.replace('\r\n', '');
  return message;
}

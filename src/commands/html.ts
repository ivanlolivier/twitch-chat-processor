import type { MessageType } from '../types';

export default function html(message: MessageType) {
  message.html = true;
  return message;
}

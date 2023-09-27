import type { MessageType } from '../types';

export default function html(message: MessageType) {
  return { ...message, html: true };
}

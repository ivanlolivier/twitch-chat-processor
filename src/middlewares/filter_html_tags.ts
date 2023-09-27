import type { MessageType } from '../types';

export default function filterHTMLTags(message: MessageType) {
  message.msg = message.msg.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return message;
}

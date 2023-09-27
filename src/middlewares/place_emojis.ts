import renderEmoji from '../lib/render_emoji';
import type { MessageType } from '../types';

export default function placeEmojis(message: MessageType) {
  if (typeof message.emotes === 'object') {
    Object.keys(message.emotes).forEach((emojiPattern) => {
      message.msg = message.msg.replaceAll(emojiPattern, renderEmoji(message.emotes[emojiPattern]));
    });
  }
  return message;
}

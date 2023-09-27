import type { MessageType } from '../types';

export default function defaultAvatar(msg: MessageType) {
  if (msg && msg.avatar?.includes('/user-default-pictures-uv/')) {
    return { ...msg, avatar: '/assets/user-default-pictures-uv/1.png' };
  }
  return msg;
}

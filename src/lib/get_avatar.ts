import { config } from '../config';
import type { User } from '../types';

const { defaultAvatar } = config.styles;

export default function getAvatar(user: User | null) {
  const avatar = user?.profileImageUrl?.replace('300x300', '70x70');

  return avatar
    ? avatar.includes('user-default-pictures')
      ? defaultAvatar
      : avatar
    : defaultAvatar;
}

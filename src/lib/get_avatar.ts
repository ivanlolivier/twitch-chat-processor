import userDataStorage from './users_data_storage';
import { config } from "../config";

const { defaultAvatar } = config.styles;

export default function getAvatar(userId: string) {
  const avatar = userDataStorage.getUserData(userId).profileImageUrl?.replaceAll('300', '70');
  return avatar
    ? avatar.includes('user-default-pictures')
      ? defaultAvatar
      : avatar
    : defaultAvatar;
}

import getVariable, { DEFAULT_AVATAR } from './get_variable';
import userDataStorage from './users_data_storage';

const defaultAvatar = getVariable(DEFAULT_AVATAR);

export default function getAvatar(userId: string) {
  const avatar = userDataStorage.getUserData(userId).profileImageUrl?.replaceAll('300', '70');
  return avatar
    ? avatar.includes('user-default-pictures')
      ? defaultAvatar
      : avatar
    : defaultAvatar;
}

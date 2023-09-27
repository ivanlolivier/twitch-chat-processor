import userDataStorage from '../lib/users_data_storage';
import type { MessageType } from '../types';

export default function preloadUserData(message: MessageType) {
  if (message.userId) userDataStorage.getUserData(message.userId);
  return message;
}

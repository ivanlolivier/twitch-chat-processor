import { config } from '../config';
import type { User } from '../types';

const { clientId, accessToken } = config.twitch;

type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: string; // admin | global_mod | staff | "" (normal user)
  broadcaster_type: string; // partner | affiliate | "" (normal broadcaster)
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  email?: string;
  created_at: string; // RFC3339 format
};

function apiDecoupler(rawUserData?: TwitchUser) {
  return {
    id: rawUserData?.id,
    login: rawUserData?.login,
    displayName: rawUserData?.display_name,
    type: rawUserData?.type,
    broadcasterType: rawUserData?.broadcaster_type,
    description: rawUserData?.description,
    profileImageUrl: rawUserData?.profile_image_url,
    offlineImageUrl: rawUserData?.offline_image_url,
    createdAt: rawUserData?.created_at,
  } as User;
}

class UsersDataStorage {
  private readonly storage: { [key: string]: User };

  constructor() {
    this.storage = {};
  }

  async getUserData(userId: string) {
    if (!this.storage[userId]) {
      const res = await fetch(`https://api.twitch.tv/helix/users?id=${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}`, 'Client-Id': clientId },
      });
      const { data } = await res.json();

      this.storage[userId] = apiDecoupler(data[0]);
    }

    return this.storage[userId];
  }
}

const userDataStorage = new UsersDataStorage();

export default userDataStorage;

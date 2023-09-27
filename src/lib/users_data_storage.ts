import axios from 'axios';

import { config } from '../config';

const { clientId, accessToken } = config.twitch;

function apiDecoupler(rawUserData) {
  return {
    id: rawUserData.id,
    login: rawUserData.login,
    displayName: rawUserData.display_name,
    type: rawUserData.type,
    broadcasterType: rawUserData.broadcaster_type,
    description: rawUserData.description,
    profileImageUrl: rawUserData.profile_image_url,
    offlineImageUrl: rawUserData.offline_image_url,
    viewCount: rawUserData.view_count,
    createdAt: rawUserData.created_at,
  };
}

class UsersDataStorage {
  private storage: { [key: string]: unknown };

  constructor() {
    this.storage = {};
  }

  getUserData(userId) {
    if (!this.storage[userId]) {
      axios({
        url: `https://api.twitch.tv/helix/users?id=${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Client-Id': clientId,
        },
      }).then((response) => {
        this.storage[userId] = apiDecoupler(response.data.data[0]);
      });
      return apiDecoupler({});
    }
    return this.storage[userId];
  }
}

const userDataStorage = new UsersDataStorage();

export default userDataStorage;

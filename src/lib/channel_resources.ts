import axios from 'axios';

import getVariable, { CHANNEL, ACCESS_TOKEN, CLIENT_ID } from './get_variable';

const channel = getVariable(CHANNEL);
const accessToken = getVariable(ACCESS_TOKEN);
const clientId = getVariable(CLIENT_ID);

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Client-Id': clientId,
  },
};

class ChannelResources {
  private channelData: { id: string; url: string };

  public badges: { id: string; url: string }[];

  constructor() {
    this.badges = [];

    axios.get(`https://api.twitch.tv/helix/users?login=${channel}`, config).then(({ data }) => {
      this.channelData = data.data[0];

      axios
        .get(
          `https://api.twitch.tv/helix/chat/badges?broadcaster_id=${this.channelData.id}`,
          config,
        )
        .then(({ data }) => {
          this.badges = [
            ...this.badges,
            ...data.data.map(({ set_id: setId, versions }) => ({
              id: setId,
              url: versions[0].image_url_2x,
            })),
          ];
        });
    });

    axios.get(`https://api.twitch.tv/helix/chat/badges/global`, config).then(({ data }) => {
      this.badges = [
        ...this.badges,
        ...data.data.map(({ set_id: setId, versions }) => ({
          id: setId,
          url: versions[0].image_url_2x,
        })),
      ];
    });
  }
}

const channelResources = new ChannelResources();

export default channelResources;

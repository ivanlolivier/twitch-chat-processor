import getURLParams from '../lib/get_url_params';

export const Index = {
  REDIRECT_URI: 'redirect_uri',
  SECRET: 'secret',
  CLIENT_ID: 'client_id',
  ACCESS_TOKEN: 'access_token',
  CHANNEL: 'channel',
};

export const STYLES = {
  DEFAULT_AVATAR: 'default_avatar',
};

export const FEATURES = {
  PATO_BOT: 'pato_bot',
  TTS: 'tts',
  TTS_INDEX: 'tts_index',
  TTS_ACCENT: 'tts_accent',
  RENDER: 'render',
  BOTS: 'bots',
  HTMLI: 'htmli',
};

const activeByDefault = [FEATURES.TTS, FEATURES.PATO_BOT, FEATURES.RENDER];

const urlParams = getURLParams();

function getTwitchConfig(string: string) {
  // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
  return import.meta.env[`VITE_${string.toUpperCase()}`];
}

function getStyleConfig(string: string) {
  // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
  return urlParams[string] ?? import.meta.env[`VITE_${string.toUpperCase()}`];
}

function getFeatureStatus(string: string) {
  return (
    urlParams[string] ??
    // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
    import.meta.env[`VITE_${string.toUpperCase()}`] ??
    activeByDefault.includes(string)
  );
}

export const config = {
  twitch: {
    redirectUri: getTwitchConfig(Index.REDIRECT_URI),
    clientId: getTwitchConfig(Index.CLIENT_ID),
    accessToken: getTwitchConfig(Index.ACCESS_TOKEN),
    channel: getTwitchConfig(Index.CHANNEL),
  },

  styles: {
    defaultAvatar: getStyleConfig(STYLES.DEFAULT_AVATAR),
  },

  features: {
    patoBot: getFeatureStatus(FEATURES.PATO_BOT),
    tts: getFeatureStatus(FEATURES.TTS),
    ttsIndex: Number(getFeatureStatus(FEATURES.TTS_INDEX)) || 1,
    ttsAccent: getFeatureStatus(FEATURES.TTS_ACCENT),
    render: getFeatureStatus(FEATURES.RENDER),
    bots: getFeatureStatus(FEATURES.BOTS) || '',
    htmli: getFeatureStatus(FEATURES.HTMLI),
  },
};

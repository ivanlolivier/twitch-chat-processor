import getURLParams from './get_url_params';

const VARIABLES = 'variables';

// config de twitch
export const REDIRECT_URI = 'redirect_uri';
export const SECRET = 'secret';
export const CLIENT_ID = 'client_id';
export const ACCESS_TOKEN = 'access_token';
export const CHANNEL = 'channel';

// estilos
export const DEFAULT_AVATAR = 'default_avatar';
export const STYLE = 'style';

// funciones
export const PATO_BOT = 'pato_bot';
export const TTS = 'tts';
export const TTS_INDEX = 'tts_index';
export const TTS_ACCENT = 'tts_accent';
export const RENDER = 'render';
export const BOTS = 'bots';
export const HTMLI = 'htmli';

let variables = JSON.parse(localStorage.getItem(VARIABLES) ?? '') ?? {};

variables = { ...variables, ...getURLParams() };

Object.keys(variables).forEach((key) => {
  if (typeof variables[key] === 'string') {
    if (variables[key].toLowerCase() === 'true') variables[key] = true;
    if (`${variables[key]}`.toLowerCase() === 'false') variables[key] = false;
  }
});

if (typeof variables[TTS_INDEX] === 'string') {
  variables[TTS_INDEX] = Number(variables[TTS_INDEX]) || 1;
}

localStorage.setItem(VARIABLES, JSON.stringify(variables));

const env = {
  // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
  secret: import.meta.env.VITE_SECRET,
  // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
  client_id: import.meta.env.VITE_CLIENT_ID,
  // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
  access_token: import.meta.env.VITE_ACCESS_TOKEN,
  // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
  channel: import.meta.env.VITE_CHANNEL,
  // @ts-expect-error TS2339: Property env does not exist on type ImportMeta
  default_avatar: import.meta.env.VITE_DEFAULT_AVATAR,
};

Object.keys(env).forEach((key) => {
  if (env[key]) variables[key] = env[key];
});

const activeByDefault = [TTS, PATO_BOT, RENDER];

activeByDefault.forEach((key) => {
  if (variables[key] === undefined) variables[key] = true;
});

export default function getVariable(variable) {
  return variables[variable];
}

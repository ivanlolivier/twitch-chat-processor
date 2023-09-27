/**
 * Raw Message Example
 * @badge-info=;
 * badges=broadcaster/1,premium/1;
 * client-nonce=cff61b7bd0fc37d33ec4a62b30fa2fd8;
 * color=#1E90FF;
 * display-name=Ivan_Lolivier;
 * emotes=;
 * first-msg=0;
 * flags=;
 * id=c9f3cee7-e6d5-45af-9b98-066d8c412be1;
 * mod=0;
 * returning-chatter=0;
 * room-id=660736343;
 * subscriber=0;
 * tmi-sent-ts=1695515920077;
 * turbo=0;
 * user-id=660736343;
 * user-type= :ivan_lolivier!ivan_lolivier@ivan_lolivier.tmi.twitch.tv
 * PRIVMSG #ivan_lolivier :test
 */
import type { MessageType } from '../types';

function toCamelCase(key) {
  const words = key.split('-');

  if (words.length > 1) {
    for (let i = 1; i < words.length; i++) {
      words[i] = words[i].replace(words[i][0], words[i][0].toUpperCase());
    }
    return words.join('');
  }

  return key;
}

type MiddlewareFn = (m: MessageType) => MessageType;

class MessagePreProcessor {
  private middlewares: MiddlewareFn[];

  private channel: string;

  constructor() {
    this.middlewares = [];
    this.channel = '';
  }

  mkMsgObj = (rawMsg: string) => {
    const [data, msg] = rawMsg.split(`PRIVMSG #${this.channel} :`);

    const rawObjMsg = { msg };
    data.split(';').forEach((element) => {
      if (element) {
        const [key, value] = element.split('=');
        const messageKey = key === '@badgeInfo' ? 'badgeInfo' : key;

        rawObjMsg[toCamelCase(messageKey)] = value;
      }
    });

    return rawObjMsg as MessageType;
  };

  setChannel(channel: string) {
    this.channel = channel;
  }

  useMiddleware(cb: MiddlewareFn) {
    this.middlewares.push(cb);
  }

  processMessage(rawMessage: string) {
    let message = this.mkMsgObj(rawMessage);
    this.middlewares.forEach((cb) => {
      message = cb(message);
    });
    return message;
  }
}

const messagePreProcessor = new MessagePreProcessor();

export default messagePreProcessor;

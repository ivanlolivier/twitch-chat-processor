import type { MessageType } from '../types';

type MiddlewareFn = (m: MessageType) => MessageType;

class MessageToRenderProcessor {
  private middlewares: MiddlewareFn[];

  constructor() {
    this.middlewares = [];
  }

  useMiddleware(cb: MiddlewareFn) {
    this.middlewares.push(cb);
  }

  processMessage(rawMessage: MessageType) {
    let message = rawMessage;
    this.middlewares.forEach((cb) => {
      message = cb(message);
    });
    return message;
  }
}

const messageToRenderProcessor = new MessageToRenderProcessor();

export default messageToRenderProcessor;

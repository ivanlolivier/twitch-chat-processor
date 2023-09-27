import type { MessageType } from '../types';

class CommandsContainer {
  addCommand(name: string, cb: (m: MessageType) => void) {
    this[name] = cb;
  }
}

export default CommandsContainer;

import html from '../commands/html';
import { renderCommandsContainer } from '../lib/containers';
import type { MessageType } from '../types';

renderCommandsContainer.addCommand('html', html);

export default function renderCommands(message: MessageType) {
  const isACommand = typeof message.msg === 'string' ? message.msg[0] === '$' : false;
  let messageToRender = null;

  if (isACommand) {
    let [command, ...rest] = message.msg.split(' ');
    command = command.replace('$', '');
    rest = rest.join(' ');

    const commandFn = renderCommandsContainer[command];
    if (commandFn) {
      message.msg = rest;
      messageToRender = commandFn(message);
    }
  }

  return messageToRender || message;
}

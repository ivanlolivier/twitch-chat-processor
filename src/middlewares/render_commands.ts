import { renderCommandsContainer } from '../lib/containers';
import html from '../render_commands/html';

renderCommandsContainer.addCommand('html', html);

export default function renderCommands(message) {
  const isACommand = typeof message.msg === 'string' ? message.msg[0] === '$' : false;
  let messageToRender = null;

  if (isACommand) {
    let [command, ...rest] = message.msg.split(' ');
    command = command.replace('$', '');
    rest = rest.join(' ');

    const commandFn = renderCommandsContainer[command];
    if (commandFn) {
      messageToRender = commandFn({ ...message, msg: rest });
    }
  }

  return messageToRender || message;
}

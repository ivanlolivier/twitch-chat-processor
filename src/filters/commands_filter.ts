import speak from '../commands/speak';
import { commandsContainer } from '../lib/containers';
import type { MessageType } from '../types';

commandsContainer.addCommand('speak', speak);

export default function commandsFilter({ msg }: MessageType) {
  let isACommand = msg?.[0] === '!';

  if (isACommand) {
    const [firstWord, ...rest] = msg.split(' ');
    const command = firstWord.replace('!', '');
    if (commandsContainer[command]) {
      isACommand = commandsContainer[command](rest.join(' '));
    }
  }

  return isACommand;
}

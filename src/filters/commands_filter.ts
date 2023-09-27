import speak from '../commands/speak';
import { commandsContainer } from '../lib/containers';
import type { MessageType } from '../types';

commandsContainer.addCommand('speak', speak);

export default function commandsFilter({ msg }: MessageType) {
  const isACommand = msg?.[0] === '!';
  if (!isACommand) return;

  if (isACommand) {
    const [firstWord, ...rest] = msg.split(' ');
    const command = firstWord.replace('!', '');
    if (!commandsContainer[command]) {
      return;
    }

    commandsContainer[command](rest.join(' '));
  }
}

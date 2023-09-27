import regexDynamic from '../lib/regex_dynamic';
import type { MessageType } from '../types';

const goose = regexDynamic('goose');
const ganso = regexDynamic('ganso');
const ganzo = regexDynamic('ganzo');

export default function antiGoose(message: MessageType) {
  if (goose?.test(message.msg)) {
    message.msg = message.msg.replaceAll(goose, ' duck');
    return message;
  }

  if (ganso?.test(message.msg)) {
    message.msg = message.msg.replaceAll(ganso, ' pato');
    return message;
  }

  if (ganzo?.test(message.msg)) {
    message.msg = message.msg.replaceAll(ganzo, ' pato');
    return message;
  }

  return message;
}

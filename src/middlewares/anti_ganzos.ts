// improved by sonnyARG 😎

import regexDynamic from '../lib/regex_dynamic';

const goose = regexDynamic('goose');
const ganso = regexDynamic('ganso');
const ganzo = regexDynamic('ganzo');

export default function antiGoose(message: { msg: string }) {
  if (goose?.test(message.msg)) {
    return { msg: message.msg.replaceAll(goose, ' duck') };
  }

  if (ganso?.test(message.msg)) {
    return { msg: message.msg.replaceAll(ganso, ' pato') };
  }

  if (ganzo?.test(message.msg)) {
    return { msg: message.msg.replaceAll(ganzo, ' pato') };
  }

  return message;
}

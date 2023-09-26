// by sonnyARG 😎

export default function regexDynamic(palabra: string) {
  let rgxLetras = ``;
  [...palabra].forEach((letra) => {
    // eslint-disable-next-line no-useless-escape
    rgxLetras += `[\s]*${letra}`;
  });
  return new RegExp(`(${rgxLetras})`, 'gi');
}

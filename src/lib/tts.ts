const message = new SpeechSynthesisUtterance('');
const voices = {};

setTimeout(() => {
  speechSynthesis.getVoices().forEach((v) => {
    voices[v.lang] = (voices[v.lang] ?? 0) + 1;
  });
}, 500);

export default function toTTS(msg: string) {
  const args = msg.split(' ');
  if (msg[2] === '-' && Boolean(voices[args[0]]) && !Number.isNaN(Number(args[1][0]))) {
    message.voice = speechSynthesis.getVoices().filter((v) => v.lang === args[0])[
      Number.isNaN(Number(args[1][0]))
        ? 0
        : Number(args[1][0]) <= voices[args[0]] && Number(args[1][0]) > 0
        ? Number(args[1][0]) - 1
        : 0
    ];
    message.text = msg.replace(
      `${args[0]}${Number.isNaN(Number(args[1][0])) ? ' ' : ` ${args[1]}`}`,
      '',
    );
  } else {
    message.voice = speechSynthesis.getVoices().filter((v) => v.lang === 'es-AR')[0];
    message.text = msg;
  }
  speechSynthesis.speak(message);
}

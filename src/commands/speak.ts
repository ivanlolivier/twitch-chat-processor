import { config } from '../config';

const { tts } = config.features;
const { ttsAccent, ttsIndex } = config.features;

const voices: Record<string, number> = {};
speechSynthesis.getVoices().forEach((v) => {
  voices[v.lang] = (voices[v.lang] ?? 0) + 1;
});

export default function speak(message: string) {
  if (!tts) {
    return false;
  }

  if (Object.keys(voices).length === 0) {
    speechSynthesis.getVoices().forEach((v) => {
      voices[v.lang] = (voices[v.lang] ?? 0) + 1;
    });
  }

  let accent = ttsAccent || 'es-AR';
  let voiceNumber = ttsIndex > 0 ? ttsIndex - 1 : 0;

  let toRead: string;
  const words = message.split(' ');
  if (/^[a-z]{2}-[A-Z]{2}$/.test(words[0])) {
    accent = words[0];
    if (!Number.isNaN(Number(words[1]))) {
      voiceNumber = Number(words[1]) - 1;
      toRead = words.slice(2).join(' ');
    } else {
      toRead = words.slice(1).join(' ');
    }
  } else {
    toRead = message;
  }

  const toSynthesis = new SpeechSynthesisUtterance(toRead);
  if (voices[accent] && voiceNumber >= 0 && voiceNumber < voices[accent]) {
    toSynthesis.voice = speechSynthesis.getVoices().filter((v) => v.lang === accent)[voiceNumber];
  }

  return speechSynthesis.speak(toSynthesis);
}

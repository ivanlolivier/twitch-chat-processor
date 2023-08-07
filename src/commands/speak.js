const voices = {}

speechSynthesis.getVoices().forEach((v) => { voices[v.lang] ? voices[v.lang]++ : voices[v.lang] = 1 })

export default function speak (message) {
    Object.keys(voices).length === 0 && speechSynthesis.getVoices().forEach((v) => { voices[v.lang] ? voices[v.lang]++ : voices[v.lang] = 1 })
    let accent = 'es-AR'
    let voiceNumber = 0
    let toRead = ''
    const words = message.split(' ')
    if (words[0][2] === '-') { // quiere decir que es un selector de acento como el 'es-AR'
        accent = words[0]
        if (`${Number(words[1])}` !== 'NaN') { // quiere decir que elige un indice
            voiceNumber = Number(words[1]) - 1
            toRead = words.slice(2).join(' ')
        }
        else toRead = words.slice(1).join(' ');
    }
    else toRead = message;
    const toSynthesis = new SpeechSynthesisUtterance(toRead)
    voices[accent] && voiceNumber >= 0 && voiceNumber < voices[accent] && (toSynthesis.voice = speechSynthesis.getVoices().filter((v) => (v.lang === accent))[voiceNumber])
    speechSynthesis.speak(toSynthesis)
    return false
}
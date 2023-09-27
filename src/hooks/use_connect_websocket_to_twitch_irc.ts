import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { config } from '../config';

function useConnectWebSocketToTwitchIRC() {
  const { accessToken, channel, clientId, redirectUri } = config.twitch;

  if (accessToken === undefined) {
    window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;
  }

  const [logged, setLogged] = useState(false);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    redirectUri ? 'wss://irc-ws.chat.twitch.tv:443' : 'ws://irc-ws.chat.twitch.tv:80',
  );

  useEffect(() => {
    if (!logged && readyState === ReadyState.OPEN) {
      sendMessage('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands');
      sendMessage(`PASS oauth:${accessToken}`);
      sendMessage('NICK ChrisVDev_OBS-Chat');
      sendMessage(`JOIN #${channel}`);
      setLogged(true);
    }
    if (readyState !== ReadyState.OPEN) {
      setLogged(false);
    }
  }, [logged, readyState, setLogged, sendMessage]);

  /*
      Una vez autenticado separo los mensajes del chat de el resto de la info
      que me pasa el IRC. Importante -> de paso contesto al PING para que Twitch
      no me cierre la conexión.
  */
  const [message, setMessage] = useState(''); // ultimo mensaje

  useEffect(() => {
    if (readyState === ReadyState.OPEN && logged) {
      if (lastMessage && lastMessage.data.includes('PRIVMSG')) {
        setMessage(lastMessage.data);
      }

      if (lastMessage && lastMessage.data.includes('PING')) {
        sendMessage('PONG :tmi.twitch.tv');
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    console.info(`Websocket: ${connectionStatus}`);
  }, [readyState]);

  return message;
}

export default useConnectWebSocketToTwitchIRC;

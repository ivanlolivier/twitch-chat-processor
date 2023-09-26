import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import getVariable, { ACCESS_TOKEN, CHANNEL, CLIENT_ID, REDIRECT_URI } from '../lib/get_variable';

function useConnectWebSocketToTwitchIRC() {
  const redirectUri = getVariable(REDIRECT_URI);
  const accessToken = getVariable(ACCESS_TOKEN);
  const clientId = getVariable(CLIENT_ID);
  const channel = getVariable(CHANNEL);

  /*
      Si no tengo el token para acceder al contenido del chat abro el OAuth de
      twitch para conseguirlo. Espero que por param de la URL me llegue el
      token de acceso gracias OAuth de Twitch si no lo tengo espero recibir el
      param CLientID o tenerlo ya el LocalStorage (registrado ya como APP en
      la consola de Twitch) para ejecutar el OAuth y recibir el Token
  */

  if (accessToken === undefined) {
    window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;
  }

  /*
      Una vez tengo el Token de acceso a twitch abro un websocket para
      conectarme al IRC, autenticarme y empezar a recibir los mensajes.
  */
  const [logged, setLogged] = useState(false);
  const webSocket = useWebSocket(
    redirectUri ? 'wss://irc-ws.chat.twitch.tv:443' : 'ws://irc-ws.chat.twitch.tv:80',
    {
      share: true,
      shouldReconnect: () => true,
    },
  );
  const { sendMessage, lastMessage, readyState } = webSocket;

  useEffect(() => {
    if (accessToken && !logged && readyState === ReadyState.OPEN) {
      sendMessage('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands');
      sendMessage(`PASS oauth:${accessToken}`);
      sendMessage('NICK ChrisVDev_OBS-Chat');
      sendMessage(`JOIN #${channel}`);
      setLogged(true);
    }
    if (readyState !== ReadyState.OPEN) {
      setLogged(false);
    }
  }, [logged, webSocket]);

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

  return message;
}

export default useConnectWebSocketToTwitchIRC;

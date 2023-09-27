import { useEffect, useState } from 'react';

import { config } from '../config';
import botFilter from '../filters/bot_filter';
import commandsFilter from '../filters/commands_filter';
import isNotAMessage from '../filters/is_not_a_message';
import messageFilters from '../lib/massage_filters';
import messagePreProcessor from '../lib/message_pre_processor';
import messageToRenderProcessor from '../lib/message_to_render_processor';
import antiGoose from '../middlewares/anti_ganzos';
import preloadUserData from '../middlewares/avatar_placer';
import filterHTMLTags from '../middlewares/filter_html_tags';
import getMessageEmojis from '../middlewares/get_message_emojis';
import linkRemover from '../middlewares/link_remover';
import messageCleaner from '../middlewares/message_cleaner';
import patoBotMiddleware from '../middlewares/pato_bot_middleware';
import placeEmojis from '../middlewares/place_emojis';
import placeHearts from '../middlewares/place_hearts';
import placeHTML from '../middlewares/place_html';
import renderCommands from '../middlewares/render_commands';
import speakMessageRender from '../middlewares/speak_message_render';
import usernamePlacer from '../middlewares/username_placer';
import type { MessageType } from '../types';

import useConnectWebSocketToTwitchIRC from './use_connect_websocket_to_twitch_irc';

const { channel } = config.twitch;
const { patoBot, htmli } = config.features;

messagePreProcessor.setChannel(channel);
messagePreProcessor.useMiddleware(getMessageEmojis);
messagePreProcessor.useMiddleware(preloadUserData);
messagePreProcessor.useMiddleware(linkRemover);
messagePreProcessor.useMiddleware(antiGoose);
messagePreProcessor.useMiddleware(usernamePlacer);

messageFilters.addFilter(isNotAMessage);
messageFilters.addFilter(botFilter);
messageFilters.addFilter(commandsFilter);

messageToRenderProcessor.useMiddleware(renderCommands);
messageToRenderProcessor.useMiddleware(messageCleaner);
messageToRenderProcessor.useMiddleware(speakMessageRender);
messageToRenderProcessor.useMiddleware(filterHTMLTags);
messageToRenderProcessor.useMiddleware(placeHearts);
messageToRenderProcessor.useMiddleware(placeEmojis);
if (htmli) {
  messageToRenderProcessor.useMiddleware(placeHTML);
}
if (patoBot) {
  messageToRenderProcessor.useMiddleware(patoBotMiddleware);
}

function useMessageLogic() {
  const message = useConnectWebSocketToTwitchIRC();
  const [messageToRender, setMessageToRender] = useState<MessageType | null>(null);

  useEffect(() => {
    const income = messagePreProcessor.processMessage(message);
    console.log({ income });

    if (messageFilters.mustBeFiltered(income)) {
      setMessageToRender(messageToRenderProcessor.processMessage(income));
    }
  }, [message]);

  return messageToRender;
}

export default useMessageLogic;

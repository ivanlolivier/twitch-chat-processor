import { useState, useEffect } from 'react';

import type { MessageType } from '../types';

import useMessageLogic from './use_message_logic';

const SHOW_TIME = 20; // seconds

function useMessageCue() {
  const message = useMessageLogic();
  const [cue, setCue] = useState<MessageType[]>([]);

  useEffect(() => {
    if (message?.msg) {
      setCue((lastCue) => [...lastCue, message]);

      setTimeout(() => {
        setCue((lastCue) => lastCue.filter((msg) => msg.id !== message.id));
      }, SHOW_TIME * 1000);
    }
  }, [message]);

  // ONLY FOR DEBUGGING
  useEffect(() => {
    console.log(cue);
  }, [cue]);

  return cue;
}

export default useMessageCue;

import React from 'react';

import Message from './components/Message';
import StyledMessage from './components/StyleMessage';
import { config } from './config';
import useMessageCue from './hooks/use_message_cue';
import type { MessageType } from './types';

const { render } = config.features;
const { style } = config.styles;

function App() {
  const cue = useMessageCue();

  if (!render) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-medium text-lg text-black'>No Render</h1>
      </div>
    );
  }

  const newMessages: MessageType[] = cue.filter((message) => Boolean(message.userId));

  return style ? (
    <div className='messages_container'>
      {newMessages.map((message) => (
        <StyledMessage key={message.id} message={message} />
      ))}
    </div>
  ) : (
    <div className='flex flex-col h-[100vh] justify-end text-zinc-100'>
      {newMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default App;

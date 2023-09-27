import React from 'react';

import Message from './components/Message';
import { config } from './config';
import useMessageCue from './hooks/use_message_cue';

const { render } = config.features;

function App() {
  const cue = useMessageCue();

  if (!render) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-medium text-lg text-black'>No Render</h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-[100vh] justify-end text-zinc-100'>
      {cue.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default App;

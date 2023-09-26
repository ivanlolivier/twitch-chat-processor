import { useState } from 'react';

import getAvatar from '../lib/get_avatar';
import './message.css';
import getVariable, { DEFAULT_AVATAR } from '../lib/get_variable';
import renderBadges from '../lib/render_badges';
import type { MessageType } from '../types';

const defaultAvatar = getVariable(DEFAULT_AVATAR);

function getOrnament(badges: string[]) {
  if (badges.includes('mod')) return 'moderator';
  if (badges.includes('vip')) return 'vip';
  if (badges.includes('broadcaster')) return 'broadcaster';
  if (badges.includes('subscriber')) return 'subscriber';
  return 'viewer';
}

type Props = {
  message: MessageType;
};

function StyledMessage({ message }: Props) {
  const avatar = getAvatar(message.userId);
  const badges = renderBadges(message.badges);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`message ${message.new ? 'newMessage' : ''}${
        message.dieing ? 'dieingMessage' : ''
      } ${getOrnament(message.badges)}`}
    >
      {badges[0] && badges[0]('message_userBadge-primary', 0, true)}
      <div className='message_viewer'>
        <div className={`message_viewer-avatar`}>
          <img
            className='message_viewer-avatarImg'
            src={message.quack ? message.quack : avatar}
            onLoad={() => {
              setLoaded(true);
            }}
            alt='Avatar'
          />
          <img
            className='message_viewer-avatarImg message_viewer-defaultImg'
            src={defaultAvatar || '/assets/st-chrisvdev.gif'}
            style={loaded ? { display: 'none' } : {}}
            alt='Default Avatar'
          />
        </div>
        <span
          className='message_viewer-name'
          style={{
            color: message.color
              ? message.color
              : `rgb(${Math.ceil(Math.random() * 128) + 128},${
                  Math.ceil(Math.random() * 128) + 128
                },${Math.ceil(Math.random() * 128) + 128})`,
          }}
        >
          {message.displayName}
        </span>
      </div>
      <div className='message_currentMessage-container'>
        <div className='message_currentMessage-box'>
          <div className='message_currentMessage-otherViewerBadges'>
            {badges
              .slice(1, badges.length)
              .map((badge, i) => badge('message_userBadge-others', i, true))}
          </div>
          <p
            className='message_currentMessage-text'
            dangerouslySetInnerHTML={{ __html: message.msg }}
          />
        </div>
      </div>
    </div>
  );
}

export default StyledMessage;

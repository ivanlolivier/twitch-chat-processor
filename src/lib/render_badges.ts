import { createElement } from 'react';

import channelResources from './channel_resources';

function getBadges(badges: string) {
  return badges.split(',').map((badge) => badge.split('/')[0]);
}

const getBadge = (id: string) => channelResources.badges.filter((badge) => badge.id === id)[0];

const renderBadge = (id: string) =>
  getBadge(id)
    ? (className, key, noStyle) =>
        createElement(
          'img',
          {
            key: `badges_${id}_${key}`,
            className: `${noStyle ? 'message_userBadge' : 'z-10 h-5 w-5'} ${className}`,
            src: `${getBadge(id).url}`,
            alt: `${id}`,
          },
          null,
        )
    : undefined;

export default function renderBadges(badgesStr: string) {
  const badges = getBadges(badgesStr);
  return badges.map((badge) => renderBadge(badge));
}

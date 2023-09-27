import { useEffect, useState } from 'react';

import userDataStorage from '../lib/users_data_storage';
import type { User } from '../types';

export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const u = await userDataStorage.getUserData(userId);
      setUser(u);
    })();
  }, [userId]);

  return { user, loading: !user };
}

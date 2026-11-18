import { useCallback, useEffect, useMemo, useState } from 'react';
import api, { clearToken, getToken, setToken } from '../api';
import { AuthContext } from './useAuth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    // No stored token: nothing to restore, loading already starts false.
    if (!getToken()) return undefined;

    let active = true;

    api.auth
      .me()
      .then((current) => {
        if (active) setUser(current);
      })
      .catch(() => {
        clearToken();
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: current } = await api.auth.login(email, password);
    setToken(token);
    setUser(current);
    return current;
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

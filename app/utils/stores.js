export const useAuth = () => {
  const access = useState('access', () => null);
  const refresh = useState('refresh', () => localStorage.getItem('refresh'));

  const setTokens = ({ access: accessToken, refresh: refreshToken }) => {
    access.value = accessToken;
    refresh.value = refreshToken;
    localStorage.setItem('refresh', refreshToken);
    localStorage.setItem('access', accessToken);
  };

  const logout = () => {
    access.value = null;
    refresh.value = null;
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
  };

  return { access, refresh, setTokens, logout };
};

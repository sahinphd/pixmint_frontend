export const useAuth = () => {
  const access = useState('access', () => null);
  const refresh = useState('refresh', () => localStorage.getItem('refresh'));

  const setTokens = ({ access: accessToken, refresh: refreshToken }) => {
    access.value = accessToken;
    refresh.value = refreshToken;
    localStorage.setItem('refresh', refreshToken);
  };

  const logout = () => {
    access.value = null;
    refresh.value = null;
    localStorage.removeItem('refresh');
  };

  return { access, refresh, setTokens, logout };
};

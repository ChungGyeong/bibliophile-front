// export const setToken = (token: string): void => {
//   const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
//   document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/; secure; httponly; SameSite=Strict`;
// };

export const getToken = (key: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === key) {
      return value;
    }
  }
  return null;
};

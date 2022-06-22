export const parseCookie = (cookies: string) => {
  return cookies
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce((acc: Record<string, string>, cookie) => {
      if (cookie.length !== 2) {
        return acc;
      }

      acc[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(cookie[1].trim());
      return acc;
    }, {});
};

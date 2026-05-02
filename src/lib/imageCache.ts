const cache: Record<string, string> = {};

export const getCachedImage = (key: string) => cache[key];
export const setCachedImage = (key: string, url: string) => {
  cache[key] = url;
};

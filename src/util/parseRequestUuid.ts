import { parse } from 'node:url';

export const parseRequestUuid = (endpoint: string, url: string): string => {
  const { pathname } = parse(url);

  return (
    pathname
      ?.toLowerCase()
      .replace(endpoint.toLowerCase(), '')
      .replace(/^\/|\/$/g, '') || ''
  );
};

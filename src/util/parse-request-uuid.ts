import { parse } from 'node:url';

export const parseRequestUuid = (endpoint: string, url: string | undefined): string | null => {
  const { pathname } = parse(url || '');

  return (
    pathname
      ?.toLowerCase()
      .replace(endpoint.toLowerCase(), '')
      .replace(/^\/|\/$/g, '') || null
  );
};

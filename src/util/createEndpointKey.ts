import { parse } from 'node:url';

export const createEndpointKey = (
  endpoints: string[],
  url: string | undefined,
  method: string | undefined
): string => {
  const { pathname } = parse(url || '');

  const pathnameEndpoint = pathname?.toLowerCase().replace(/\/$/g, '') || 'unknown';

  for (const endpoint of endpoints) {
    const uuidReg = new RegExp(`${endpoint}/` + '[a-z0-9-]+/?$', 'gi');

    if (pathnameEndpoint.match(uuidReg) !== null) {
      return `${endpoint}/{uuid}:${method?.toLowerCase()}`;
    } else if (pathnameEndpoint === endpoint) {
      return `${endpoint}:${method?.toLowerCase()}`;
    }
  }

  return 'unknown';
};

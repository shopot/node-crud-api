import { parse } from 'node:url';

export const createEndpointKey = (
  endpoint: string,
  url: string | undefined,
  method: string | undefined
): string => {
  const { pathname } = parse(url || '');

  const userIdReg = new RegExp(`${endpoint}/` + '[a-z0-9-]+/?$', 'gi');

  if (pathname?.match(userIdReg) !== null) {
    return `${endpoint}/{uuid}:${method?.toLowerCase()}`;
  }

  return `${endpoint}:${method?.toLowerCase()}`;
};

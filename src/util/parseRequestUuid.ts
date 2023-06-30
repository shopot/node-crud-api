import { parse } from 'node:url';
import { IncomingMessage } from 'http';

export const parseRequestUuid = (endpoint: string, request: IncomingMessage): string => {
  const url = request.url || '';

  const { pathname } = parse(url);

  return (
    pathname
      ?.toLowerCase()
      .replace(endpoint.toLowerCase(), '')
      .replace(/^\/|\/$/g, '') || ''
  );
};

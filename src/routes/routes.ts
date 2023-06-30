import { IncomingMessage, ServerResponse } from 'http';

import { createUsersRoutes } from '../api/users/routes/users.routes';
import { DEFAULT_HEADER } from '../common/constants';
import { HttpStatusCode } from '../common/HttpStatusCode';

const usersRoutes = createUsersRoutes();

const routes = {
  ...usersRoutes,

  // 404 route
  default: async (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage> & {
      req: IncomingMessage;
    }
  ): Promise<void> => {
    response.writeHead(HttpStatusCode.NOT_FOUND, DEFAULT_HEADER).end('not found');
  },
};

export { routes };

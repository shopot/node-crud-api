import { createUsersRoutes } from '../api/users/routes/users.routes';
import { HTTP404Error } from '../common/errors/Http404Error';
import { IncomingMessage, ServerResponse } from 'http';

const usersRoutes = createUsersRoutes();

const routes = {
  ...usersRoutes,

  // 404 route
  default: async (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage> & { req: IncomingMessage }
  ): Promise<void> => {
    throw new HTTP404Error();
  },
};

export { routes };

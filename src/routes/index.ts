import { factory } from '../factories';
import { createUserRoutes } from '../api/user';
import { IncomingMessage, ServerResponse } from 'http';
import { DEFAULT_HEADER } from '../util';

const userService = factory.user.generateInstance();

const userRoutes = createUserRoutes(userService);

const routes = {
  ...userRoutes,

  // 404 route
  default: async (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage> & {
      req: IncomingMessage;
    }
  ): Promise<void> => {
    response.writeHead(404, DEFAULT_HEADER);

    response.write('Not found!');

    response.end();
  },
};

export { routes };

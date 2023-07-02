import { IncomingMessage, ServerResponse } from 'http';
import process from 'node:process';
import cluster from 'node:cluster';

import { createUsersRoutes } from '../api/users/routes/users.routes';
import { Http404Error } from '../common/errors/Http404Error';

const isCluster = process.env.API_MODE === 'cluster' && cluster.isWorker;

const usersRoutes = createUsersRoutes(isCluster);

const routes = {
  ...usersRoutes,

  // 404 route
  default: async (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage> & { req: IncomingMessage }
  ): Promise<void> => {
    throw new Http404Error();
  },
};

export { routes };

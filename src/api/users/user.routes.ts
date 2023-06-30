import { UsersService } from './services/UsersService';
import { UsersController } from './controllers/UsersController';
import { ApiRoute } from '../../common/types/ApiRoute.type';

const createUsersRoutes = (usersService: UsersService) => {
  const userController = new UsersController(usersService);

  return {
    '/api/users:get': (request, response) => userController.getAll({ request, response }),

    '/api/users:post': (request, response) => userController.create({ request, response }),

    '/api/users/{uuid}:delete': (request, response) => userController.delete({ request, response }),

    '/api/users/{uuid}:get': (request, response) => userController.getById({ request, response }),

    '/api/users/{uuid}:put': (request, response) => userController.update({ request, response }),
  } as ApiRoute;
};

export { createUsersRoutes };

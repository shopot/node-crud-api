import { UserService } from './user.service';
import { TypeRoute } from '../../types';
import { userHandlers } from './user.handlers';

const createUserRoutes = (userService: UserService) => {
  return {
    '/api/users:get': (request, response) =>
      userHandlers.getUsers({
        request,
        response,
        userService,
      }),

    '/api/users/{uuid}:get': (request, response) =>
      userHandlers.getUserById({
        request,
        response,
        userService,
      }),
  } as TypeRoute;
};

export { createUserRoutes };

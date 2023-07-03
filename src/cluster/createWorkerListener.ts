import { Worker } from 'node:cluster';

import { UserActions } from '../api/users/types/UserActions';
import { CreateUserDto } from '../api/users/dto/CreateUser.dto';
import { PutUserDto } from '../api/users/dto/PutUser.dto';
import { HttpStatusCode } from '../common/HttpStatusCode';
import { ErrorMessage } from '../common/errors/ErrorMessage';
import { BaseError } from '../common/errors/BaseError';
import { UsersService } from '../api/users/services/UsersService';
import { InternalMessage } from '../common/types/InternalMessage';

export const createWorkerListener = (worker: Worker, sharedService: UsersService) => {
  return async (message: InternalMessage) => {
    if (message.action === undefined) {
      return Promise.resolve();
    }

    const id = message.payload?.id || '';

    const fields = message.payload?.fields || null;

    try {
      switch (message.action) {
        case UserActions.GET_USERS: {
          const data = await sharedService.list();

          worker.send({ data });

          break;
        }

        case UserActions.GET_USER_BY_ID: {
          const data = await sharedService.readById(String(id));

          worker.send({ data });

          break;
        }

        case UserActions.ADD_USER: {
          const data = await sharedService.create(fields as CreateUserDto);

          worker.send({ data });

          break;
        }

        case UserActions.UPDATE_USER_BY_ID: {
          const data = await sharedService.putById(String(id), fields as PutUserDto);

          worker.send({ data });

          break;
        }

        case UserActions.REMOVE_USER_BY_ID: {
          const data = await sharedService.deleteById(String(id));

          worker.send({ data });

          break;
        }

        default: {
          worker.send({
            status: HttpStatusCode.UNKNOWN_ERROR,
            message: ErrorMessage.UNKNOWN_ERROR,
          });
        }
      }
    } catch (error: unknown) {
      if (BaseError.isTrustedError(error as Error)) {
        worker.send({
          status: (error as BaseError).httpCode,
          message: (error as BaseError).message,
        });
      } else {
        worker.send({
          status: HttpStatusCode.INTERNAL_SERVER,
          message: ErrorMessage.INTERNAL_SERVER_ERROR,
        });
      }
    }
  };
};

import { UserService } from './user.service';
import { HandleParams } from '../../types';

export type CreateUserDto = {
  readonly username: string;
  readonly age: number;
  readonly hobbies: string[];
};

export type UserHandler = ({
  request,
  response,
  userService,
}: HandleParams & { userService: UserService }) => Promise<void>;

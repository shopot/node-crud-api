import { CreateUserDto } from './CreateUser.dto';

export type RequestDto = CreateUserDto & {
  id?: string;
};

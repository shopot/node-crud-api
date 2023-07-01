import { UsersService } from '../services/UsersService';
import { HandleParams } from '../../../common/types/HandleParams.type';
import { HttpStatusCode } from '../../../common/HttpStatusCode';
import { DEFAULT_HEADER } from '../../../common/constants';
import { parseRequestUuid } from '../../../util/parseRequestUuid';
import { APP_USERS_ENDPOINT } from '../../../config';
import { RequestDto } from '../dto/Request.dto';
import { BaseController } from '../../../common/BaseController';

export class UsersController extends BaseController {
  readonly userService: UsersService;

  constructor(userService: UsersService) {
    super();

    this.userService = userService;
  }

  public async getAll({ response }: HandleParams): Promise<void> {
    response
      .writeHead(HttpStatusCode.OK, DEFAULT_HEADER)
      .end(JSON.stringify(await this.userService.list()));
  }

  public async create({ request, response }: HandleParams): Promise<void> {
    const requestObject = (await this.getBody(request)) as RequestDto;

    response
      .writeHead(HttpStatusCode.CREATED, DEFAULT_HEADER)
      .end(JSON.stringify(await this.userService.create(requestObject)));
  }

  public async getById({ request, response }: HandleParams): Promise<void> {
    const id = parseRequestUuid(APP_USERS_ENDPOINT, request);

    response
      .writeHead(HttpStatusCode.OK, DEFAULT_HEADER)
      .end(JSON.stringify(await this.userService.readById(id)));
  }

  public async update({ request, response }: HandleParams): Promise<void> {
    const requestObject = (await this.getBody(request)) as RequestDto;

    const id = parseRequestUuid(APP_USERS_ENDPOINT, request);

    const user = await this.userService.putById(id || '', requestObject);

    response.writeHead(HttpStatusCode.CREATED, DEFAULT_HEADER).end(JSON.stringify(user));
  }

  public async delete({ request, response }: HandleParams): Promise<void> {
    const id = parseRequestUuid(APP_USERS_ENDPOINT, request);

    await this.userService.deleteById(id);

    response.writeHead(HttpStatusCode.DELETED, DEFAULT_HEADER).end();
  }
}

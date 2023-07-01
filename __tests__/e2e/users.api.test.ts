import request from 'supertest';
import { server } from '../../src';
import { HttpStatusCode } from '../../src/common/HttpStatusCode';
import { APP_PORT, APP_USERS_ENDPOINT } from '../../src/config';
import { ErrorMessage } from '../../src/common/errors/ErrorMessage';

const ACCEPT_HEADER = {
  field: 'Accept',
  val: 'application/json',
};

const setup = () => {
  const mockedUser1 = {
    username: 'Batman',
    age: 43,
    hobbies: ['games', 'music'],
  };

  const mockedUser2 = {
    username: 'Robin',
    age: 23,
    hobbies: ['Wine', 'girls'],
  };

  const mockedUserMissed = {
    username: 'Cat',
    age: 18,
  };

  const mockedUsersInvalid = {
    attrName: {
      name: 'Batman',
      age: 43,
      hobbies: ['games', 'music'],
    },

    attrValue: {
      username: 'Batman',
      age: 'old man',
      hobbies: ['games', 'music'],
    },
  };

  return {
    mockedUser1,
    mockedUser2,
    mockedUserMissed,
    mockedUsersInvalid,
  };
};

afterAll((done) => {
  server.close();

  done();
});

describe('Resources are created by sending HTTP POST requests', () => {
  beforeAll(() => {
    server.close();

    server.listen(APP_PORT);
  });

  it('should return 201 and new user after creation with valid data payload', async () => {
    const { mockedUser1 } = setup();

    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedUser1))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.CREATED);
  });

  it('should return 400 when trying to create user with invalid attr name', async () => {
    const { mockedUsersInvalid } = setup();

    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedUsersInvalid.attrName))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should return 400 when trying to create user with invalid attr value', async () => {
    const { mockedUsersInvalid } = setup();

    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedUsersInvalid.attrValue))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should return 400 when trying to create user with missed attr', async () => {
    const { mockedUserMissed } = setup();

    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedUserMissed))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should return INVALID_REQUEST_PAYLOAD when trying to create user with invalid data payload', async () => {
    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify({ firstname: 'John Doe' }));

    expect(response.body.error).toEqual(ErrorMessage.INVALID_REQUEST_PAYLOAD);
  });
});

describe('Resources are updated by sending HTTP PUT requests', () => {
  it('should return 200 after update with valid data payload', async () => {
    const response = await request(server)
      .get(APP_USERS_ENDPOINT)
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    const user = response.body[0];

    const { id } = user;

    const responseUpdated = await request(server)
      .put(`${APP_USERS_ENDPOINT}/${id}`)
      .send(
        JSON.stringify({
          username: 'New Batman',
        })
      )
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(responseUpdated.statusCode).toBe(HttpStatusCode.OK);
  });

  it('should return valid user data after update', async () => {
    const response = await request(server)
      .get(APP_USERS_ENDPOINT)
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    const user = response.body[0];

    const { id } = user;

    const responseUpdated = await request(server)
      .put(`${APP_USERS_ENDPOINT}/${id}`)
      .send(
        JSON.stringify({
          username: 'New Batman',
        })
      )
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(responseUpdated.body).toEqual({ ...user, username: 'New Batman' });
  });

  it(`should return INVALID_REQUEST_PAYLOAD when trying to update user with invalid data payload`, async () => {
    const { mockedUsersInvalid } = setup();

    const response = await request(server)
      .get(APP_USERS_ENDPOINT)
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    const user = response.body[0];

    const { id } = user;

    const responseUpdated = await request(server)
      .put(`${APP_USERS_ENDPOINT}/${id}`)
      .send(JSON.stringify(mockedUsersInvalid.attrName))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(responseUpdated.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

    expect(responseUpdated.body.error).toEqual(ErrorMessage.INVALID_REQUEST_PAYLOAD);
  });
});

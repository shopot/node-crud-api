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

  const UUID = 'eeec98f9-16c0-4ada-827a-fdb0bc46a449';

  return {
    mockedUser1,
    mockedUser2,
    mockedUserMissed,
    mockedUsersInvalid,
    UUID,
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

    expect(response.body.error).toEqual(ErrorMessage.BAD_REQUEST);
  });
});

describe('Resources are updated by sending HTTP PUT requests', () => {
  it('should return 200 after update with valid data payload', async () => {
    const { id } = (
      await request(server).get(APP_USERS_ENDPOINT).set(ACCEPT_HEADER.field, ACCEPT_HEADER.val)
    ).body[0];

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

    const { id } = (
      await request(server).get(APP_USERS_ENDPOINT).set(ACCEPT_HEADER.field, ACCEPT_HEADER.val)
    ).body[0];

    const responseUpdated = await request(server)
      .put(`${APP_USERS_ENDPOINT}/${id}`)
      .send(JSON.stringify(mockedUsersInvalid.attrName))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(responseUpdated.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

    expect(responseUpdated.body.error).toEqual(ErrorMessage.BAD_REQUEST);
  });
});

describe('Resources are deleted by sending HTTP DELETE requests', () => {
  it('should return 204 after delete with valid user id', async () => {
    const { id } = (
      await request(server).get(APP_USERS_ENDPOINT).set(ACCEPT_HEADER.field, ACCEPT_HEADER.val)
    ).body[0];

    const responseDeleted = await request(server)
      .delete(`${APP_USERS_ENDPOINT}/${id}`)
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(responseDeleted.statusCode).toBe(HttpStatusCode.DELETED);
  });

  it('should return 404 and USER_NOT_EXISTS after delete with invalid user id', async () => {
    const { UUID } = setup();

    const responseDeleted = await request(server)
      .delete(`${APP_USERS_ENDPOINT}/${UUID}`)
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(responseDeleted.statusCode).toBe(HttpStatusCode.NOT_FOUND);

    expect(responseDeleted.body.error).toBe(ErrorMessage.USER_NOT_FOUND);
  });
});

describe('Resources are read data by sending HTTP GET requests', () => {
  it('should return not empty users list', async () => {
    const { mockedUser1 } = setup();

    // Create user for the test
    await request(server).post(APP_USERS_ENDPOINT).send(JSON.stringify(mockedUser1));

    const response = await request(server)
      .get(APP_USERS_ENDPOINT)
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.OK);

    expect(response.body.length).not.toBe(0);
  });

  it('should return a user data after send a valid user id', async () => {
    const { mockedUser1 } = setup();

    // Create user for the test
    await request(server).post(APP_USERS_ENDPOINT).send(JSON.stringify(mockedUser1));

    const { id } = (
      await request(server).get(APP_USERS_ENDPOINT).set(ACCEPT_HEADER.field, ACCEPT_HEADER.val)
    ).body[0];

    const response = await request(server)
      .get(`${APP_USERS_ENDPOINT}/${id}`)
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  it('should return 404 and USER_NOT_EXISTS after send a invalid user id', async () => {
    const { UUID } = setup();

    const response = await request(server)
      .get(`${APP_USERS_ENDPOINT}/${UUID}`)
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);

    expect(response.body.error).toBe(ErrorMessage.USER_NOT_FOUND);
  });
});

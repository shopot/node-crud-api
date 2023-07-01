import request from 'supertest';
import { server } from '../../src';
import { HttpStatusCode } from '../../src/common/HttpStatusCode';
import { APP_USERS_ENDPOINT } from '../../src/config';
import { ErrorMessage } from '../../src/common/errors/ErrorMessage';

afterAll((done) => {
  server.close();

  done();
});

const ACCEPT_HEADER = {
  field: 'Accept',
  val: 'application/json',
};

const mockedCreateUserData = {
  username: 'Batman',
  age: 43,
  hobbies: ['games', 'music'],
};

const mockedCreateUserInvalidData = {
  invalidAttrName: {
    name: 'Batman',
    age: 43,
    hobbies: ['games', 'music'],
  },

  invalidAttrValue: {
    username: 'Batman',
    age: 'old man',
    hobbies: ['games', 'music'],
  },

  missedAttr: {
    username: 'Batman',
    age: 42,
  },
};

describe('Resources are created by sending HTTP POST requests', () => {
  it('should return 201 and new user after creation with valid data payload', async () => {
    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedCreateUserData))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.CREATED);
  });

  it('should return 400 when trying to create user with invalid attr name', async () => {
    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedCreateUserInvalidData.invalidAttrName))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should return 400 when trying to create user with invalid attr value', async () => {
    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedCreateUserInvalidData.invalidAttrValue))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should return 400 when trying to create user with missed attr', async () => {
    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedCreateUserInvalidData.missedAttr))
      .set(ACCEPT_HEADER.field, ACCEPT_HEADER.val);

    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should return INVALID_REQUEST_PAYLOAD when trying to create user with invalid data payload', async () => {
    const response = await request(server)
      .post(APP_USERS_ENDPOINT)
      .send(JSON.stringify(mockedCreateUserInvalidData.invalidAttrValue));

    const { error } = response.body;

    expect(error).toEqual(ErrorMessage.INVALID_REQUEST_PAYLOAD);
  });
});

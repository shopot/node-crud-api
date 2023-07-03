# Simple CRUD API

Implement simple CRUD API using in-memory database underneath.

#### [RSSchool NodeJS Course Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

---

#### Installation

```bash
$ git clone https://github.com/shopot/node-crud-api.git
```

```bash
$ cd node-crud-api
```

```bash
$ git checkout develop
```

```bash
$ npm install
```

#### Configuration

Rename the file `.env.example` to `.env` for set load and set PORT environment variable from `.env` file.

#### Running the app
Start development server:
```
$ npm run start:dev
```
Build and start production server:
```
$ npm run start:prod
```
Start development server with Cluster API and balancing:
```
$ npm run start:dev:multi
```
Build and start production server with Cluster API and balancing:
```
$ npm run start:prod:multi
```
Run end-to-end (e2e) API test:

You must stop all production or development server before run tests
```
$ npm run test
```

---

#### OpenAPI docs

https://nodejs-crud-openapi.netlify.app/

---

#### Endpoints description

  - **GET** `api/users` is used to get all persons
    - Response: `status code` **200** and all users records
  - **GET** `api/users/${userId}`
    - Response: `status code` **200** and and record with `id === userId` if it exists
    - Response: `status code` **400** and message `Invalid user id` if provided id is not valid uuid
    - Response: `status code` **404** and message `User not found`
  - **POST** `api/users` is used to create record about new user and store it in database
    - Response: `status code` **201** and newly created record
    - Response: `status code` **400** and message `Bad request` if request `body` does not contain **required** fields
  - **PUT** `api/users/{userId}` is used to update existing user
    - Response: ` status code` **200** and updated record
    - Response: ` status code` **400** and message `Invalid user id` if provided id is not valid uuid
    - Response: ` status code` **404** and and message `User not found`
  - **DELETE** `api/users/${userId}` is used to delete existing user from database
    - Response: `status code` **204** if the record is found and deleted
    - Response: ` status code` **400** and message `Invalid user id` if provided id is not valid uuid
    - Response: ` status code` **404** and and message `User not found`

Requests to non-existing endpoints (e.g. `some-non/existing/resource`) Response: `status code` **404** `Not found`)

---

#### Testing

Script `npm run test` runs end-to-end test for all HTTP Request (GET, CREATE, PUT, DELETE) methods with valid and invalid data.

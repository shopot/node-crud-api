import { createServer } from 'node:http';
import { parse, fileURLToPath } from 'node:url';
import { APP_PORT, APP_USERS_ENDPOINT } from './config';
import { createEndpointKey, parseRequestUuid } from './util';

const args = process.argv.slice(2);

console.log('args:', args);

// Setting Port Number as 3000
const port = 3000;

// Setting hostname as the localhost
// NOTE: You can set hostname to something
// else as well, for example, say 127.0.0.1
const hostname = 'localhost';

// Creating Server
const index = createServer((req, res) => {
  const { url, method } = req;

  const key = createEndpointKey(APP_USERS_ENDPOINT, url, method);

  // parseRequestUuid(APP_USERS_ENDPOINT, url);

  console.log(key);

  // Handling Request and Response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Welcome to Geeks For Geeks');
});

// Making the server to listen to required
// hostname and port number
index.listen(port, hostname, () => {
  // Callback
  console.log(`Server running at http://${hostname}:${port}/`);
});

console.log(APP_PORT);

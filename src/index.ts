import 'dotenv/config';
import { createServer } from 'node:http';

import handler from './handler';
import { setup } from './setup';

const { isCluster, port, createCluster } = setup();

const server = createServer(isCluster ? createCluster(port) : handler);

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

export { server };

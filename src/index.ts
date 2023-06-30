import { createServer } from 'node:http';
import handler from './handler';

const PORT = process.env.PORT || 3000;

const server = createServer(handler);

server.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

export { server };

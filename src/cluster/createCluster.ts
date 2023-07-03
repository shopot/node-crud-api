import { cpus } from 'os';
import cluster from 'cluster';
import { IncomingMessage, ServerResponse } from 'http';

import { clusterFactory } from './factories/cluster.factory';
import { createWorkerListener } from './createWorkerListener';
import { createRequest } from '../util/createRequest';
import { API_HOSTNAME } from '../config';

export const createCluster = (port: number) => {
  const cpusCount = cpus().length;

  const sharedService = clusterFactory.createUsersService();

  const workers: number[] = [];

  for (let i = 0; i < cpusCount; i++) {
    const workerPort = port + i + 1;

    workers.push(workerPort);

    const worker = cluster.fork({ workerPort });

    worker.on('message', createWorkerListener(worker, sharedService));
  }

  let currentWorkerIndex = 0;

  return (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const port = workers[currentWorkerIndex++ % cpusCount];

    console.log(`Send request to ${API_HOSTNAME}:${port}`);

    req.pipe(createRequest(req, res, port));
  };
};

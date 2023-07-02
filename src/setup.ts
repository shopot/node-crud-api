import process from 'node:process';
import cluster from 'node:cluster';

import { APP_PORT } from './config';
import { createCluster } from './cluster/createCluster';

export const setup = () => {
  const _defaultPort = Number(process.env.PORT || APP_PORT);

  const isCluster = process.env.API_MODE === 'cluster' && cluster.isMaster;

  const port = Number(cluster.isPrimary ? _defaultPort : process.env.workerPort);

  return {
    isCluster,
    port,
    createCluster,
  };
};

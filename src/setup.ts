import process from 'node:process';
import cluster from 'node:cluster';
import { createCluster } from './cluster/createCluster';

export const setup = () => {
  const _defaultPort = Number(process.env.PORT || 3000);

  const isCluster = process.env.API_MODE === 'cluster' && cluster.isMaster;

  const port = Number(cluster.isPrimary ? _defaultPort : process.env.workerPort);

  return {
    isCluster,
    port,
    createCluster,
  };
};

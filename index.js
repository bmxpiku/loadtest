const cluster = require('cluster');

if (cluster.isMaster) {
  const master = require('./cluster/master');
  master.start();
} else {
  const child = require('./cluster/child');
  child.start();
}

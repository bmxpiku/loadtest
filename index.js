const cluster = require('cluster');

require('dotenv').config();

if (cluster.isMaster) {
  const master = require('./cluster/master');
  master.start();
} else {
  const child = require('./cluster/child');
  child.start();
}

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const CHILD_PROCESSES = process.env.CHILD_PROCESSES || 3;
const workers = [];

function start() {
  console.log(`Master ${process.pid} is running`);
  // Fork workers
  for (let i = 0; i < parseInt(CHILD_PROCESSES); i++) {
    console.log(`Forking process number ${i}...`);
    const worker = cluster.fork();
    workers.push(worker);
  }
  const app = express();
  const port = process.env.PORT || 3000;

  app.get('/shut', (req, res) => {
    const count = workers.length;
    workers.forEach(function(worker) {
      worker.send({msg: `Message from master ${process.pid}`, shutDown: 1});
    });
    return res.status(200).send(`Killed ${count} child processes`);
  });

  app.get('/create/:amount', (req, res) => {
    const count = workers.length + parseInt(req.params.amount);
    for (let i = workers.length; i < count; i++) {
      console.log(`Forking process number ${i}...`);
      const worker = cluster.fork();
      workers.push(worker);
    }
    return res.status(200).send(`Created ${req.params.amount} child processes`);
  });

  const init = async () => {
    await app.listen(port, () => {
      console.log(`Started on port ${port}`);
    });
  };
  process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
  });
  init();
}

module.exports = {
  start,
};

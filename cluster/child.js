const request = require('request');
// const fs = require('fs');
const bpc = require('./bpc');
const bpc_client = require('bpc_client');
// const URL = process.env.STREAM_URL || 'http://live.taleradio.dk/24syv';
const { URL } = require('url');
const devnull = require('dev-null');

async function childProcess() {
  await bpc.initializeBPC();
  process.on('message', function (message) {
    console.log(`Worker ${process.pid} receives message '${JSON.stringify(message)}'`);
    if (message.shutDown) {
      console.log('shutting down');
      process.exit()
    }
  });

  const { hostname } = new URL(process.env.BPC_URL);
  const uidArray = require('./users.json');

  try {
    for (let i = 0; i < 10; i++) {
      const randomObject = uidArray[Math.floor(Math.random() * uidArray.length)]
      const itsID = randomObject.id;
      bpc_client.request({
        hostname,
        path: `/permissions/${itsID}/_all`,
      });
    }
    console.log("I'm child, and I'm done")
  } catch (err) {
    console.error(err)
  }


}

module.exports = {
  start: childProcess,
};

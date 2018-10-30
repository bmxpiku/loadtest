const request = require('request');
// const fs = require('fs');
const URL = process.env.STREAM_URL || 'http://live.taleradio.dk/24syv';
const devnull = require('dev-null');

async function childProcess() {
  process.on('message', function (message) {
    console.log(`Worker ${process.pid} receives message '${JSON.stringify(message)}'`);
    if (message.shutDown) {
      console.log('shutting down');
      process.exit()
    }
  });

  //fs.createWriteStream(`song${process.pid}.mp3`)
  const pass = request(`${URL}`).pipe(devnull());

  pass.on('end', () => {
    console.log('There will be no more data.');
    process.exit()
  });
}

module.exports = {
  start: childProcess,
};

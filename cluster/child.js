let active = true;
const request = require('request');
const fs = require('fs');
const URL = process.env.URL;
const devnull = require('dev-null');

async function childProcess() {


//fs.createWriteStream(`song${process.pid}.mp3`)
  const pass = request(`${URL}`).pipe(devnull());
  pass.on('data', (chunk) => { console.log(chunk.toString()); });

  // pass.write('ok');  // will not emit 'data'
  pass.on('end', () => {
    console.log('There will be no more data.');
    console.log('shutting down');
    process.exit()
  });
}

module.exports = {
  start: childProcess,
};

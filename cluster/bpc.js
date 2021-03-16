const bpc_client = require('bpc_client');

async function initializeBPC(){

  bpc_client.events.on('ready', async () => {
    console.info(`Connected to BPC as ${process.env.BPC_APP_ID}`);
  });

  await bpc_client.connect();
}

module.exports = {
  initializeBPC,
};

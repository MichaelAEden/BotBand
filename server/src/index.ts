console.log('Loading function');

import app from './app/app';
import awsServerlessExpress = require('aws-serverless-express');

// TODO: initialize db connection here?

const server = awsServerlessExpress.createServer(app);

const handler = (event, context): void => {
  awsServerlessExpress.proxy(server, event, context);
};

exports.handler = handler;

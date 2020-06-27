import * as express from 'express';

const app = express();

// Middleware
app.use((req, res, next) => {
  if (process.env.DEBUG)
    console.log(
      'Received request with body: ',
      JSON.stringify(req.body, null, 2)
    );
  // TODO: add production URL.
  const origin = process.env.ENV === 'dev' ? 'http://localhost:3000' : '';
  res.set('Access-Control-Allow-Origin', origin);

  next();
});

app.get('/test', async (req, res) => {
  console.log('Hello, world!');
});

export default app;

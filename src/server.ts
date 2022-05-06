import express from 'express';

const app = express();

app.get('/users', (req, res) => res.send('opa\n'));

app.listen(3333, () => {
  console.log('Server started on port 3333');
});

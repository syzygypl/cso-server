const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const basicAuth = require('express-basic-auth');

const apiProxy = proxy(
  '/api',
  {
    target: 'http://localhost:' + process.env.BACKEND_PORT,
    pathRewrite: { '^/api' : '' }
  }
);

app.use(basicAuth({
  users: {
    [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASS},
  challenge: true,
  realm: 'csoJa4ds92a2ad12w1'
}));

app.use(apiProxy);
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});

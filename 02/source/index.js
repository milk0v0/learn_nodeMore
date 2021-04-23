// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('hi 666')
// });

// server.listen(3000, () => {
//   console.log('Sever at 3000');
// })

// 抽离 业务 框架

const MyKoa = require('./myKoa');
const app = new MyKoa();

// app.use((req, res) => {
//   res.writeHead(200);
//   res.end('hi 666')
// });

app.use(ctx => {
  ctx.body = 'haha 666'
});
app.use(ctx => {
  ctx.body = 'haha 888'
});

app.listen(3000, () => {
  console.log('Sever at 3000');
})
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  // 之前
  const start = Date.now();
  await next();
  // 之后
  const end = Date.now();
  console.log(`请求 ${ctx.url} 耗时 ${parseInt(end - start)} ms`);
})

app.use(ctx => {
  const expire = Date.now() + 100;
  while (Date.now() < expire);
  ctx.body = {
    name: 'milk'
  }
});

app.listen(3000, () => {
  console.log('Sever at 3000');
})
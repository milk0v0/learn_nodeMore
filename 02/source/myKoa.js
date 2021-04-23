const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class MyKoa {
  listen(...args) {
    // 启动 http 服务
    const server = http.createServer((req, res) => {
      const ctx = this.createContext();
      this.callback(ctx);

      // 响应
      res.end(ctx.body)
    });

    server.listen(...args);
  }

  use(callback) {
    this.callback = callback;
  }

  /**
   * 创建上下文
   */
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx
  }
}

module.exports = MyKoa;
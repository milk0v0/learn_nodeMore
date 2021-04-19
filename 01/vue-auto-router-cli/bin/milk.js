#!/usr/bin/env node
// 声明解释器

const program = require('commander'); // 帮助定制命令行界面
const init = require('../lib/init');

program.version(require('../package.json').version);

program
  .command('init <name>')
  .description('init Project')
  .action(init);

program
  .command('refresh')
  .description('refresh routers...')
  .action(require('../lib/refresh'))

/**
 * Process - node 进程
 *  argv - 返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数
 *    1. 第一个元素是 process.execPath - 启动 Node.js 进程的可执行文件的绝对路径 `C:\Program Files\nodejs\node.exe`
 *    2. 第二个元素是正被执行的 JavaScript 文件的路径
 *    3. 其余的元素是任何额外的命令行参数
 */
program.parse(process.argv);
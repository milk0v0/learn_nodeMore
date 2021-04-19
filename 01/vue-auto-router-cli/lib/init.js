const { promisify } = require('util');

const figlet = promisify(require('figlet')); // 以奇奇怪怪的方式在命令行输出文字
const clear = require('clear'); // 命令行 `cls` 命令，清屏

// 粉笔，可以把命令行染成别的颜色
const chalk = require('chalk');
const { clone } = require('./download');
const log = content => console.log(chalk.red(content));
const open = require("open"); // 打开浏览器

// 子进程输出流对接到主进程
const spawn = async (...args) => {
  const { spawn } = require('child_process');
  return new Promise(resolve => {
    const proc = spawn(...args);

    // console.log(proc.stdout);
    proc.stdout && proc.stdout.pipe(process.stdout);
    proc.stderr && proc.stderr.pipe(process.stderr); // 子进程出错流

    proc.on('close', () => {
      resolve();
    })
  })
}

module.exports = async name => {
  // 打印环境界面
  clear();
  const data = await figlet('MILK Welcome');
  log(data);

  log(`创建项目：${name}`);
  await clone('github:su37josephxia/vue-template', name);

  // 安装依赖 npm install
  log('安装依赖');

  /**
   * 因为在 Windows 上，当我们执行 npm 时，我们实际执行的是 npm.cmd 批处理，而在 Windows 上，.cmd, .bat 批处理是无法脱离 cmd.exe 这一解释器而单独运行的。
   * 因此，我们需要显式地调用 cmd
   *  尽管微软指定在根环境中 %COMSPEC% 必须包含 'cmd.exe' 的路径，但子进程并不总是遵循相同的要求。
   *  因此，在可以衍生 shell 的 child_process 函数中，如果 process.env.ComSpec 不可以，则使用 'cmd.exe' 作为后备
   */
  // await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], {
  //   cwd: `./${name}`,
  //   stdio: 'inherit',
  // });
  await spawn('npm', ['install'], {
    cwd: `./${name}`,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  log(`
    安装完成：
    To get Start:
    ===========================
    cd ${name}
    npm run serve
    ===========================
  `);

  open(`http://localhost:8080`);

  await spawn('npm', ['run', 'serve'], {
    cwd: `./${name}`,
    shell: process.platform === 'win32'
  })
}
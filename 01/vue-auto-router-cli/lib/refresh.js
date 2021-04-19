const fs = require('fs');
const handlebars = require('handlebars'); // 模板渲染库

const chalk = require('chalk');

module.exports = async () => {
  const list = fs.readdirSync('./src/views')
    .filter(item => item !== 'Home.vue') // 去除主页
    .map(item => ({
      name: item.replace('.vue', '').toLowerCase(),
      file: item
    }))

  // 生成路由定义
  compile({ list }, './src/router.js', './template/router.js.hbs');
  // 生成菜单
  compile({ list }, './src/App.vue', './template/App.vue.hbs');

  /**
   * 编译模板文件
   * @param {*} meta 
   * @param {*} filePath 
   * @param {*} templatePath 
   */
  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      const result = handlebars.compile(content)(meta); // 将模板文件编译成生成函数，再用函数生成模板
      fs.writeFileSync(filePath, result);
      console.log(chalk.red(`${filePath}创建成功`));
    }
  }
}
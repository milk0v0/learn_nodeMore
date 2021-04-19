const { promisify } = require('util');
const download = promisify(require('download-git-repo')); // 从节点下载并提取一个git存储库（GitHub，GitLab，Bitbucket）
const ora = require('ora'); // 下载进度条

module.exports.clone = async (repo, desc) => {
  const process = ora(`下载中...${repo}`);
  process.start();
  await download(repo, desc);
  process.succeed();
}
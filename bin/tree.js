const directoryToObject = require('../lib/directoryToObject.js');
const objectToMatrix = require('../lib/objectToMatrix.js');
const matrixToTree = require('../lib/matrixToTree.js');
const writeTreeToDir = require('../lib/writeTreeToDir.js');

const options = require('yargs')
    .option( "d", { alias: "directory",  describe: "设置根目录路径", type: "string" } )
    .option( "exclude", { describe: "设置忽略的文件", type: "string" } )
    .option( "extensions", { describe: "设置文件夹的后缀", type: "string" } )
    .option( "depth", { describe: "设置遍历深度", type: "number" } )
    .option( "t", { alias: "to", describe: "目录树结构输出位置", type: "string" } )
    .help()
    .alias( "?", "help" )
    .argv;

const directory = options.d || require('process').cwd();
const config = {};
options.exclude && (config.exclude = new RegExp(options.exclude));
options.extensions && (config.extensions = new RegExp(options.extensions));
options.depth && (config.depth = options.depth);

const result = directoryToObject(directory, config);

const queue = objectToMatrix([result]);
const tree = matrixToTree(queue);
console.log(tree);
if (options.t) {
  writeTreeToDir(tree, options.t);
}


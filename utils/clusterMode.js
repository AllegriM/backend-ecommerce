const args = require('./minimist');

console.log(args.mode)
const clusterMode = args.mode === 'CLUSTER';

module.exports = clusterMode;

const args = require('./minimist');

const clusterMode = args.mode === 'CLUSTER';

module.exports = clusterMode;

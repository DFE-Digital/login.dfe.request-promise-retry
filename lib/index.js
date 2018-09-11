const rp = require('request-promise');
const asyncRetry = require('login.dfe.async-retry');

const requestPromiseRetry = (opts) => {
  const retryStrategy = opts.retry || asyncRetry.strategies.apiStrategy;
  return asyncRetry(async () => {
    return rp(opts);
  }, retryStrategy);
};

module.exports = requestPromiseRetry;
module.exports.defaults = (defaults) => {
  rp.defaults(defaults);
  return requestPromiseRetry;
};
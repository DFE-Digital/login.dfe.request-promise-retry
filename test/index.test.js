jest.mock('request-promise');
jest.mock('login.dfe.async-retry');

const rp = require('request-promise');
const asyncRetry = require('login.dfe.async-retry');
const requestPromiseRetry = require('./../lib');

describe('when calling request promise retry', () => {
  let opts;

  beforeEach(() => {
    rp.mockReset().mockReturnValue({ data: 'stuff' });
    rp.defaults.mockReset();

    asyncRetry.mockReset().mockImplementation(async (fn) => {
      return await fn();
    });

    opts = {};
  });

  it('then it should return response from request-promise', async () => {
    const actual = await requestPromiseRetry(opts);

    expect(actual).toEqual({ data: 'stuff' });
  });

  it('then it should use api strategy for retries is none specified on opts', async () => {
    await requestPromiseRetry(opts);

    expect(asyncRetry).toHaveBeenCalledTimes(1);
    expect(asyncRetry.mock.calls[0][1]).toBe(asyncRetry.strategies.apiStrategy);
  });

  it('then it should use api strategy for retry options from opts when specified', async () => {
    opts.retry = {
      retries: 1,
    };

    await requestPromiseRetry(opts);

    expect(asyncRetry).toHaveBeenCalledTimes(1);
    expect(asyncRetry.mock.calls[0][1]).toBe(opts.retry);
  });

  it('then it should call rp defaults with opts from defaults', () => {
    const defaults = {
      a:1,
    };

    requestPromiseRetry.defaults(defaults);

    expect(rp.defaults).toHaveBeenCalledTimes(1);
    expect(rp.defaults).toHaveBeenCalledWith(defaults);
  });

  it('then it should return requestPromiseRetry instance from defaults', () => {
    const defaults = {
      a:1,
    };

    const actual = requestPromiseRetry.defaults(defaults);

    expect(actual).toBe(requestPromiseRetry);
  });
});

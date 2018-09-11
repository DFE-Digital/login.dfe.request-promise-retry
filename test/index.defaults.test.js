jest.mock('request-promise');

const rp = require('request-promise');
const requestPromiseRetry = require('./../lib');

describe('when setting defaults', () => {
  const defaults = {
    a:1,
  };

  beforeEach(() => {
    rp.defaults.mockReset();
  });

  it('then it should call rp defaults with opts', () => {
    requestPromiseRetry.defaults(defaults);

    expect(rp.defaults).toHaveBeenCalledTimes(1);
    expect(rp.defaults).toHaveBeenCalledWith(defaults);
  });

  it('then it should return requestPromiseRetry instance', () => {
    const actual = requestPromiseRetry.defaults(defaults);

    expect(actual).toBe(requestPromiseRetry);
  });
});

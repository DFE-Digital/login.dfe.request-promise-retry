# login.dfe.request-promise-retry
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

Wrapper of [request-promise](https://github.com/request/request-promise) to support retries using [login.dfe.async-retry](https://github.com/DFE-Digital/login.dfe.async-retry)

# Usage

The library wraps the method version of [request-promise](https://github.com/request/request-promise).
It is designed to be a drop in replacement. The most basic usage is:

```
const rp = require('login.dfe.request-promise-retry'); // Only need to change require

return await rp({
    method: 'GET',
    uri: 'http://www.education.gov.uk',
});
```

The above example will pass all the options directly to request-promise, but will wrap the call in a retry using the default api strategy from [login.dfe.async-retry](https://github.com/DFE-Digital/login.dfe.async-retry).


You can also specify your own retry strategy:

```
const rp = require('login.dfe.request-promise-retry');

return await rp({
    method: 'GET',
    uri: 'http://www.education.gov.uk',
    retry: { // Options for login.dfe.async-retry
        retries: 5,
    },
});
```

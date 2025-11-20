# Paystack SDK

#### Why Another [Paystack](https://paystack.com) Package?

Existing Paystack libraries are either outdated, lack modern features, or fail to support TypeScript. This package addresses these gaps by providing:  
-  Full TypeScript support for type safety and better developer experience.
-  A modern, actively maintained library aligned with Paystack’s latest API updates.
-  Clean, intuitive APIs designed for ease of use.  

### Installation

For Yarn
`yarn add paystack-sdk`

For NPM
`npm install paystack-sdk`

### Usage

For Typescript

```typescript
import {Paystack} from 'paystack-sdk';
// or
import Paystack from 'paystack-sdk';

const paystack = new Paystack("secret_key");
```

For Javscript

```javascript
const Paystack = require('paystack-sdk').Paystack;
// or
const Paystack = require('paystack-sdk');

const paystack = new Paystack('secret_key');
```

OR

```javascript
const { Paystack } = require('paystack-sdk');
const paystack = new Paystack('secret_key');
```

All methods use promise meaning you can either use the `async...await` or `then...catch` or `try...catch`

### Modules

- [x] Charge
- [x] Customers
- [x] Plans
- [x] Products
- [x] Subscriptions
- [x] Transactions
- [x] Transfers
- [x] Dedicated Virtual Accounts
- [x] Apple Pay
- [x] Subaccounts
- [x] Transaction Splits
- [x] Settlements
- [x] Invoices
- [x] Transfer Recipients
- [x] Transfers Control
- [x] Bulk Charges
- [x] Refunds
- [x] Verification
- [x] Miscellaneous
- [ ] Disputes
- [ ] Control Panel
- [ ] Terminal
- [ ] Virtual Terminal
- [ ] Direct Debit
- [ ] Payment Pages
- [ ] Payment Requests
- [ ] Integration

## CONTRIBUTING

If you notice a missing function, or maybe a bug. Please feel free to submit
a PR. I will take a look at it.
You will need to fork the repo and create a PR against it with your changes.  
Thank you :smile:

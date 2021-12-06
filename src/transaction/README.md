# Transactions
Import the package
For Typescript
```
import Paystack from 'paystack-sdk'
const paystack = new Paystack("secret_key);
```
For Javscript
```
const Paystack = require('paystack-sdk');
const paystack = new Paystack("secret_key")
```
### Initialize Transaction
```
paystack.transaction
  .initialize({
    amount: 2000,
    email: 'john@doe.com',
  })
.then((transaction) => console.log(transaction));
```

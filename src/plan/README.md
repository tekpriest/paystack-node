# Plan
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
### Create Plan
```
paystack.plan
  .create({
    name: 'Test Plan',
    amount: 20000,
    interval: 'daily',
  })
  .then((plan) => console.log(plan));
```
### List Plans
```
paystack.plan
  .list({ perPage: 2 })
  .then((plans) => console.log(plans));
```
### Fetch Plan
```
paystack.plan
  .fetch(123456)
  .then((plan) => console.log(plan));
```
### Update Plan
```
paystack.plan
  .update(123456, {
    amount: 30000,
  })
  .then((plan) => console.log(plan));
```

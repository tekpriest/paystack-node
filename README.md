# Paystack SDK

#### Why Another [Paystack](https://paystack.com) Package?
Other packages are either outdated or don't support types.

### Installation
For Yarn
`yarn add paystack-sdk`

For NPM
`npm install paystack-sdk`

### Usage
For Typescript
```
import { Paystack } from 'paystack-sdk'

const paystack = new Paystack("secret_key);
```

For Javscript
```
const Paystack = new Paystack("secret_key")
```

### Example Request
All methods use promise meaning you can either use the `async...await` or `then...catch` or `try...catch`

### Charge
#### Create Charge
```
paystack.charge.create({
  email:"johndoe@example.com",
  amount: 1000
}).then((charge) => {
  console.log(charge)
}).catch((error) => {
  console.error(error)
})
```

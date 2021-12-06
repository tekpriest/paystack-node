# Charge
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

### Full Example
_Using bank details, a birthday and two OTPs_
```
paystack.charge
  .create({
    amount: 2000,
    email: 'john@doe.com',
    bank: {
      account_number: '0000000000',
      code: '057',
    },
  })
  .then(async (charge) => {
    if (charge.data.status === 'send_birthday') {
      const response = await paystack.charge.submitBirthday({
        birthday: '1961-09-21',
        reference: charge.data.reference,
      });
      if (response.data.status === 'send_otp') {
        try {
          const result = await paystack.charge.submitOTP({
            otp: '123456',
            reference: charge.data.reference,
          });
          paystack.charge
            .submitOTP({
              otp: '123456',
              reference: charge.data.reference,
            })
            .then((payment) => console.log(payment));
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
```

### Create Charge
```
paystack.charge
  .create({
    amount: 2000,
    email: 'john@doe.com',
  })
  .then((charge) => console.log(charge));
```
### Submit PIN
```
paystack.charge
  .submitPIN({
    pin: '1234',
    reference: '5bwib5v6anhe9xa',
  })
  .then((charge) => console.log(charge));
```

### Submit OTP
```
paystack.charge
  .submitOTP({
    otp: '123456',
    reference: '5bwib5v6anhe9xa',
  })
  .then((charge) => console.log(charge));
```

### Submit Phone
```
paystack.charge
  .submitPhone({
    phone: '08012345678',
    reference: '5bwib5v6anhe9xa',
  })
  .then((charge) => console.log(charge));
```

### Submit Birthday
```
paystack.charge
  .submitBirthday({
    birthday: '1961-09-21',
    reference: '5bwib5v6anhe9xa',
  })
  .then((charge) => console.log(charge));
```

### Submit Address
```
paystack.charge
  .submitAddress({
    address: '140 N 2ND ST',
    city: 'Stroudsburg',
    state: 'PA',
    zip_code: '18360',
  })
  .then((charge) => console.log(charge));
```

### Check Pending Charge
```
paystack.charge
  .checkPending('5bwib5v6anhe9xa')
  .then((charge) => console.log(charge));
```

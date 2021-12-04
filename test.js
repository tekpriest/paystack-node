const Paystack = require('./dist');

const paystack = new Paystack(
  'sk_test_aa82d43e2dd64b5188ab855cf1770c37198a0afc',
);

// let reference;
// paystack.charge
//   .create({
//     amount: 3000,
//     bank: { code: '057', account_number: '0000000000' },
//     birthday: '1995-01-15',
//     email: 'john@doe.com',
//   })
//   .then((charge) => {
//     console.log(charge);
//     // reference = charge.data.reference;
//   });

paystack.charge.checkPendingCharge('wpnmpkd1plo1yv5').then((charge) => {
  console.log(charge);
});

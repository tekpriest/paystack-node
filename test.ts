import { Paystack } from './src/paystack';

const paystack = new Paystack(
  'sk_test_aa82d43e2dd64b5188ab855cf1770c37198a0afc',
);

// exports.listCustomers = paystack.customer
//   .list()
//   .then((c) => console.log(c.data.length));
// exports.createCustomer = paystack.customer
//   .create({
//     email: 'j@j.com',
//     first_name: 'Jon',
//     last_name: 'Doe',
//   })
// .then((c) => console.log(c));
// paystack.transaction.list().then((t) => console.log(t.data.length));

/* 
  Test by devFresher
 */
paystack.verification
  .resolveAccount({
    account_number: '8101424375',
    bank_code: '999992',
  })
  .then((resolved) => {
    console.log(resolved);
  });

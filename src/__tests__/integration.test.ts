import Paystack from '../paystack';

const TEST_KEY = process.env.PAYSTACK_TEST_KEY;

const run = TEST_KEY
  ? (name: string, fn: () => void): void => describe(name, fn)
  : (name: string, fn: () => void): void => describe.skip(name, fn);

run('Paystack live API (integration)', () => {
  const paystack = new Paystack(TEST_KEY as string);

  jest.setTimeout(30000);

  it('lists banks', async () => {
    const result = await paystack.misc.banks({ perPage: 1 });
    expect(result.status).toBe(true);
    expect(result.message).toBe('Banks retrieved');
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('lists countries', async () => {
    const result = await paystack.misc.countries();
    expect(result.status).toBe(true);
    expect(result.message).toBe('Countries retrieved');
    expect(Array.isArray(result.data)).toBe(true);
  });
});

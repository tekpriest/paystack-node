import Paystack from '../paystack';
import { createHttpClient, PaystackHttpError } from '../http';

const globals = globalThis as unknown as { fetch: unknown };
const originalFetch = globals.fetch;

let fetchMock: jest.Mock = jest.fn();

function okResponse(body: unknown = {}) {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => body,
  };
}

beforeEach(() => {
  fetchMock = jest.fn();
  globals.fetch = fetchMock;
});

afterAll(() => {
  globals.fetch = originalFetch;
});

describe('Paystack HTTP client (mocked fetch)', () => {
  it('sends auth headers and unwraps the response body', async () => {
    fetchMock.mockResolvedValue(
      okResponse({ status: true, message: 'ok', data: { id: 1 } }),
    );

    const paystack = new Paystack('sk_test_fake');
    const result = await paystack.transaction.verify('ref_123');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.paystack.co/transaction/verify/ref_123');
    expect(init.method).toBe('GET');
    expect(init.headers.Authorization).toBe('Bearer sk_test_fake');
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(result).toEqual({ status: true, message: 'ok', data: { id: 1 } });
  });

  it('serializes query params including Date values', async () => {
    fetchMock.mockResolvedValue(okResponse());

    const paystack = new Paystack('sk_test_fake');
    await paystack.transaction.list({
      perPage: 10,
      from: new Date('2020-01-01T00:00:00.000Z'),
    });

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe(
      'https://api.paystack.co/transaction?perPage=10&from=2020-01-01T00%3A00%3A00.000Z',
    );
  });

  it('serializes object bodies to JSON and passes string bodies through', async () => {
    fetchMock.mockResolvedValue(okResponse());
    const client = createHttpClient('sk_test_fake');

    await client.post('/x', { a: 1 });
    expect(fetchMock.mock.calls[0][1].body).toBe('{"a":1}');

    await client.post('/y', '{"a":1}');
    expect(fetchMock.mock.calls[1][1].body).toBe('{"a":1}');
  });

  it('rejects with PaystackHttpError carrying status and body on non-2xx', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({ status: false, message: 'bad input', data: null }),
    });

    const paystack = new Paystack('sk_test_fake');
    const error = await paystack.transaction.verify('bad').catch((e) => e);

    expect(error).toBeInstanceOf(PaystackHttpError);
    expect(error).toMatchObject({
      status: 400,
      body: { status: false, message: 'bad input', data: null },
    });
  });
});

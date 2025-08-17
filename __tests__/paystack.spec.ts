import axios from "axios";
import { Paystack } from "../src/paystack";

jest.mock('axios')
const Axios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  Axios.create.mockReturnValue({
    interceptors: { response: { use: jest.fn() } }
  } as any)
});

describe('PaystackSDK', () => {
  it('sets correct headers on initialization', () => {
    new Paystack('test-key')

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: 'Bearer test-key',
        'Content-Type': 'application/json'
      }
    })
  })
})

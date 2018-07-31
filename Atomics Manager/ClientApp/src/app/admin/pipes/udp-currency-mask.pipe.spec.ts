import { UdpCurrencyMaskPipe } from './udp-currency-mask.pipe';

describe('UdpCurrencyMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new UdpCurrencyMaskPipe();
    expect(pipe).toBeTruthy();
  });
});

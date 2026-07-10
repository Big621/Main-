import { formatWeiHexToEth } from './balance';

describe('formatWeiHexToEth', () => {
  it('formats whole ETH values', () => {
    expect(formatWeiHexToEth('0x1bc16d674ec80000')).toBe('2');
  });

  it('formats fractional ETH values to four decimal places', () => {
    expect(formatWeiHexToEth('0x10fc8583d514000')).toBe('0.0765');
  });

  it('supports a custom number of decimal places', () => {
    expect(formatWeiHexToEth('0x1b7a5f826f460000', 2)).toBe('1.98');
  });
});

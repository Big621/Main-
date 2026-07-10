const WEI_PER_ETH = 10n ** 18n;

/**
 * Convert a hex-encoded wei value (as returned by `eth_getBalance`) into a
 * human-readable ETH string with up to `decimals` fractional digits.
 *
 * @param weiHex - The balance in wei, hex-encoded (e.g. `0x1bc16d674ec80000`).
 * @param decimals - The maximum number of fractional digits to display.
 * @returns The balance formatted in ETH (e.g. `2` or `1.2345`).
 */
export const formatWeiHexToEth = (weiHex: string, decimals = 4) => {
  const wei = BigInt(weiHex);
  const whole = wei / WEI_PER_ETH;
  const fraction = wei % WEI_PER_ETH;

  if (fraction === 0n) {
    return whole.toString();
  }

  const fractionDigits = fraction
    .toString()
    .padStart(18, '0')
    .slice(0, decimals)
    .replace(/0+$/u, '');

  if (fractionDigits === '') {
    return whole.toString();
  }

  return `${whole.toString()}.${fractionDigits}`;
};

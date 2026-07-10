import { useRequest } from './useRequest';
import { formatWeiHexToEth } from '../utils';

export type AccountBalance = {
  account: string;
  balance: string;
};

/**
 * Utility hook to fetch the connected account's ETH balance.
 *
 * @returns The getBalance wrapper method.
 */
export const useGetBalance = () => {
  const request = useRequest();

  /**
   * Get the connected account's ETH balance.
   *
   * @returns The account and formatted balance, or null if unavailable.
   */
  const getBalance = async (): Promise<AccountBalance | null> => {
    const accounts = (await request({
      method: 'eth_requestAccounts',
    })) as string[] | null;
    const account = accounts?.[0];

    if (!account) {
      return null;
    }

    const balanceHex = (await request({
      method: 'eth_getBalance',
      params: [account, 'latest'],
    })) as string | null;

    if (!balanceHex) {
      return null;
    }

    return {
      account,
      balance: formatWeiHexToEth(balanceHex),
    };
  };

  return getBalance;
};

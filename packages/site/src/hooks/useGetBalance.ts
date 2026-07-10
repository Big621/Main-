import { useRequest } from './useRequest';
import { formatWeiHexToEth } from '../utils';

export type AccountBalance = {
  account: string;
  balance: string;
};

/**
 * Utility hook to fetch the connected accounts' ETH balances.
 *
 * @returns The getBalances wrapper method.
 */
export const useGetBalance = () => {
  const request = useRequest();

  /**
   * Get the ETH balance for every connected account.
   *
   * @returns The accounts and their formatted balances, or null if unavailable.
   */
  const getBalances = async (): Promise<AccountBalance[] | null> => {
    const accounts = (await request({
      method: 'eth_requestAccounts',
    })) as string[] | null;

    if (!accounts || accounts.length === 0) {
      return null;
    }

    const balances = await Promise.all(
      accounts.map(async (account) => {
        const balanceHex = (await request({
          method: 'eth_getBalance',
          params: [account, 'latest'],
        })) as string | null;

        return {
          account,
          balance: balanceHex ? formatWeiHexToEth(balanceHex) : '0',
        };
      }),
    );

    return balances;
  };

  return getBalances;
};

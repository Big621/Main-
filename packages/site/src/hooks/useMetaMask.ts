import { useCallback, useEffect, useState } from 'react';

import { useMetaMaskContext } from './MetamaskContext';
import { useRequest } from './useRequest';
import { defaultSnapOrigin } from '../config';
import type { GetSnapsResponse } from '../types';

/**
 * A hook to retrieve useful data from MetaMask.
 *
 * @returns The information.
 */
export const useMetaMask = () => {
  const { provider, setInstalledSnap, installedSnap, setError } =
    useMetaMaskContext();
  const request = useRequest();

  const [isFlask, setIsFlask] = useState(false);

  const snapsDetected = provider !== null;

  /**
   * Detect if the version of MetaMask is Flask.
   */
  const detectFlask = useCallback(async () => {
    const clientVersion = await request({
      method: 'web3_clientVersion',
    });

    const isFlaskDetected =
      typeof clientVersion === 'string' && clientVersion.includes('flask');

    setIsFlask(isFlaskDetected);
  }, [request]);

  /**
   * Get the Snap informations from MetaMask.
   */
  const getSnap = useCallback(async () => {
    const snaps = (await request({
      method: 'wallet_getSnaps',
    })) as GetSnapsResponse | null;

    setInstalledSnap(snaps?.[defaultSnapOrigin] ?? null);
  }, [request, setInstalledSnap]);

  useEffect(() => {
    const detect = async () => {
      if (provider) {
        await detectFlask();
        await getSnap();
      }
    };

    detect().catch((detectError: unknown) => {
      setError(
        detectError instanceof Error
          ? detectError
          : new Error(String(detectError)),
      );
    });
  }, [provider, detectFlask, getSnap, setError]);

  return { isFlask, snapsDetected, installedSnap, getSnap };
};

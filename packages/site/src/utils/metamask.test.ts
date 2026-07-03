import { hasSnapsSupport, getSnapsProvider } from './metamask';

describe('hasSnapsSupport', () => {
  it('returns true when wallet_getSnaps succeeds', async () => {
    const mockProvider = {
      request: jest.fn().mockResolvedValue({}),
    } as any;

    expect(await hasSnapsSupport(mockProvider)).toBe(true);
    expect(mockProvider.request).toHaveBeenCalledWith({
      method: 'wallet_getSnaps',
    });
  });

  it('returns false when wallet_getSnaps throws', async () => {
    const mockProvider = {
      request: jest.fn().mockRejectedValue(new Error('not supported')),
    } as any;

    expect(await hasSnapsSupport(mockProvider)).toBe(false);
  });
});

describe('getSnapsProvider', () => {
  const originalEthereum = (window as any).ethereum;

  afterEach(() => {
    (window as any).ethereum = originalEthereum;
  });

  it('returns null when window is undefined', async () => {
    const windowRef = globalThis.window;
    // @ts-expect-error - simulating SSR
    delete globalThis.window;

    const result = await getSnapsProvider();
    expect(result).toBeNull();

    Object.defineProperty(globalThis, 'window', { value: windowRef });
  });

  it('returns window.ethereum when it supports snaps', async () => {
    const mockProvider = {
      request: jest.fn().mockResolvedValue({}),
    };
    (window as any).ethereum = mockProvider;

    const result = await getSnapsProvider();
    expect(result).toBe(mockProvider);
  });

  it('checks detected providers when default does not support snaps', async () => {
    const supportingProvider = {
      request: jest.fn().mockResolvedValue({}),
    };
    const nonSupportingProvider = {
      request: jest.fn().mockRejectedValue(new Error('nope')),
    };

    (window as any).ethereum = {
      ...nonSupportingProvider,
      detected: [supportingProvider],
    };

    const result = await getSnapsProvider();
    expect(result).toBe(supportingProvider);
  });

  it('checks providers array when detected has none supporting', async () => {
    const supportingProvider = {
      request: jest.fn().mockResolvedValue({}),
    };
    const nonSupportingProvider = {
      request: jest.fn().mockRejectedValue(new Error('nope')),
    };

    (window as any).ethereum = {
      ...nonSupportingProvider,
      providers: [supportingProvider],
    };

    const result = await getSnapsProvider();
    expect(result).toBe(supportingProvider);
  });

  it('returns null when no provider supports snaps and EIP6963 times out', async () => {
    const nonSupportingProvider = {
      request: jest.fn().mockRejectedValue(new Error('nope')),
    };
    (window as any).ethereum = nonSupportingProvider;

    jest.useFakeTimers();
    const resultPromise = getSnapsProvider();

    // Flush microtasks so the async checks run before advancing timers
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    jest.advanceTimersByTime(600);
    const result = await resultPromise;
    expect(result).toBeNull();
    jest.useRealTimers();
  });
});

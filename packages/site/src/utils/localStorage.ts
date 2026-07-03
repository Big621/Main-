/**
 * Assert that local storage is available and return it.
 *
 * @returns The local storage instance.
 * @throws If local storage is not available.
 */
function assertLocalStorage(): Storage {
  const { localStorage: ls } = window;

  if (ls !== null) {
    return ls;
  }

  throw new Error('Local storage is not available.');
}

/**
 * Get a local storage key.
 *
 * @param key - The local storage key to access.
 * @returns The value stored at the key provided if the key exists.
 */
export const getLocalStorage = (key: string) => {
  return assertLocalStorage().getItem(key);
};

/**
 * Set a value to local storage at a certain key.
 *
 * @param key - The local storage key to set.
 * @param value - The value to set.
 */
export const setLocalStorage = (key: string, value: string) => {
  assertLocalStorage().setItem(key, value);
};

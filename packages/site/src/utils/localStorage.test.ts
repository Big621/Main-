/* eslint-disable n/no-unsupported-features/node-builtins */
import { getLocalStorage, setLocalStorage } from './localStorage';

describe('getLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the value stored at the given key', () => {
    localStorage.setItem('testKey', 'testValue');
    expect(getLocalStorage('testKey')).toBe('testValue');
  });

  it('returns null when the key does not exist', () => {
    expect(getLocalStorage('nonExistent')).toBeNull();
  });
});

describe('setLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('sets a value in local storage', () => {
    setLocalStorage('myKey', 'myValue');
    expect(localStorage.getItem('myKey')).toBe('myValue');
  });

  it('overwrites an existing value', () => {
    localStorage.setItem('myKey', 'oldValue');
    setLocalStorage('myKey', 'newValue');
    expect(localStorage.getItem('myKey')).toBe('newValue');
  });
});

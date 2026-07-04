import * as localStorageUtils from './localStorage';
import { getThemePreference } from './theme';

describe('getThemePreference', () => {
  let getLocalStorageSpy: jest.SpyInstance;
  let setLocalStorageSpy: jest.SpyInstance;

  beforeEach(() => {
    getLocalStorageSpy = jest.spyOn(localStorageUtils, 'getLocalStorage');
    setLocalStorageSpy = jest
      .spyOn(localStorageUtils, 'setLocalStorage')
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns true when local storage has "dark" preference', () => {
    getLocalStorageSpy.mockReturnValue('dark');
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });

    expect(getThemePreference()).toBe(true);
  });

  it('returns false when local storage has "light" preference', () => {
    getLocalStorageSpy.mockReturnValue('light');
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });

    expect(getThemePreference()).toBe(false);
  });

  it('falls back to system dark preference when no local storage value', () => {
    getLocalStorageSpy.mockReturnValue(null);
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: true }),
    });

    expect(getThemePreference()).toBe(true);
    expect(setLocalStorageSpy).toHaveBeenCalledWith('theme', 'dark');
  });

  it('falls back to system light preference when no local storage value', () => {
    getLocalStorageSpy.mockReturnValue(null);
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });

    expect(getThemePreference()).toBe(false);
    expect(setLocalStorageSpy).toHaveBeenCalledWith('theme', 'light');
  });

  it('does not call setLocalStorage when preference exists', () => {
    getLocalStorageSpy.mockReturnValue('dark');
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });

    getThemePreference();
    expect(setLocalStorageSpy).not.toHaveBeenCalled();
  });

  it('returns false when window is undefined', () => {
    const originalWindow = globalThis.window;
    // @ts-expect-error - simulating SSR
    delete globalThis.window;

    expect(getThemePreference()).toBe(false);

    globalThis.window = originalWindow;
  });
});

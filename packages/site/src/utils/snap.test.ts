import { isLocalSnap } from './snap';

describe('isLocalSnap', () => {
  it('returns true for a snap ID starting with "local:"', () => {
    expect(isLocalSnap('local:http://localhost:8080')).toBe(true);
  });

  it('returns true for any string starting with "local:"', () => {
    expect(isLocalSnap('local:foo')).toBe(true);
  });

  it('returns false for a non-local snap ID', () => {
    expect(isLocalSnap('npm:@metamask/example-snap')).toBe(false);
  });

  it('returns false for an empty string', () => {
    expect(isLocalSnap('')).toBe(false);
  });

  it('returns false when "local:" appears mid-string', () => {
    expect(isLocalSnap('snap:local:something')).toBe(false);
  });
});

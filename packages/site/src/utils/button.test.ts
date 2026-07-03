import { shouldDisplayReconnectButton } from './button';
import type { Snap } from '../types';

const makeSnap = (id: string): Snap => ({
  permissionName: `wallet_snap_${id}`,
  id,
  version: '1.0.0',
  initialPermissions: {},
});

describe('shouldDisplayReconnectButton', () => {
  it('returns a truthy value when the installed snap is local', () => {
    expect(
      shouldDisplayReconnectButton(makeSnap('local:http://localhost:8080')),
    ).not.toBeNull();
  });

  it('returns a falsy value when the installed snap is not local', () => {
    expect(
      shouldDisplayReconnectButton(makeSnap('npm:@metamask/example-snap')),
    ).toBe(false);
  });

  it('returns null when installedSnap is null', () => {
    expect(shouldDisplayReconnectButton(null)).toBeNull();
  });
});

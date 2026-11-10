import { describe, expect, it } from 'vitest';
import { DEFAULT_MODELING_SYSTEM_ID, resolveNativeModelingRoot } from '../src/native-modeling-root';

describe('native modeling root configuration', () => {
  it('retains the existing default when the environment override is absent', () => {
    expect(resolveNativeModelingRoot(undefined)).toBe(DEFAULT_MODELING_SYSTEM_ID);
    expect(resolveNativeModelingRoot('')).toBe(DEFAULT_MODELING_SYSTEM_ID);
  });

  it.each([
    'nf_5d3585516a77_root_a', 'nf_5d3585516a77_root_b', 'Root-A',
    '28F7326A-7C72-4C2D-A497-A16372ABBADC', 'x'.repeat(100),
  ])('preserves the explicit root %s without remapping', root => {
    expect(resolveNativeModelingRoot(root)).toBe(root);
  });

  it.each([
    null, false, true, 0, 123, [], {}, ' ', ' root', 'root ',
    '../root', 'root/child', '%72oot', 'root?admin=true', 'root#fragment',
    'root=value', 'root\\child', 'root\nadmin', 'root\u0000', 'x'.repeat(101),
  ])('rejects invalid explicit configuration %# without falling back', root => {
    expect(() => resolveNativeModelingRoot(root)).toThrow('Invalid native modeling system ID');
  });
});

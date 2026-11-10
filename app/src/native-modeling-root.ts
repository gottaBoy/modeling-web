export const DEFAULT_MODELING_SYSTEM_ID =
  '28F7326A-7C72-4C2D-A497-A16372ABBADC';

export function resolveNativeModelingRoot(value: unknown): string {
  if (value === undefined || value === '') return DEFAULT_MODELING_SYSTEM_ID;
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$/.test(value)) {
    throw new Error('Invalid native modeling system ID');
  }
  return value;
}

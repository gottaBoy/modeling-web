export const DEFAULT_DEVELOPMENT_CENTER_ID = 'demo';

export function resolveNativeDevelopmentCenter(value: unknown): string {
  if (value === undefined || value === '') return DEFAULT_DEVELOPMENT_CENTER_ID;
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$/.test(value)) {
    throw new Error('Invalid native development center ID');
  }
  return value;
}

export function nativeCentralStartupUrl(
  href: string,
  center: unknown,
): string | undefined {
  const target = new URL(href);
  if (target.hash) return undefined;
  const centerId = resolveNativeDevelopmentCenter(center);
  target.hash =
    `/-/index/psdevcenterid=${centerId}/psdevcentercentraltreeexpview/srfnav=root%3Asln%3Asln_all/psdevslngridview/srfnavctx={"srfnavctrlid":"central.psdevcentercentraltreeexpview@central.psdevcenter.main"}`;
  return target.href;
}

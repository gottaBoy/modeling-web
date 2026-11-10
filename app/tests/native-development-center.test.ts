import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DEVELOPMENT_CENTER_ID,
  nativeCentralStartupUrl,
  resolveNativeDevelopmentCenter,
} from '../src/native-development-center';

const entry = 'http://127.0.0.1:32478/central/?language=en&retained=value';

describe('native Central development-center configuration', () => {
  it('retains the existing demo default only when no override is supplied', () => {
    expect(DEFAULT_DEVELOPMENT_CENTER_ID).toBe('demo');
    expect(resolveNativeDevelopmentCenter(undefined)).toBe('demo');
    expect(resolveNativeDevelopmentCenter('')).toBe('demo');
    expect(nativeCentralStartupUrl(entry, undefined)).toContain('/psdevcenterid=demo/');
  });

  it.each([
    'nf_5d3585516a77_center_a',
    'nf_5d3585516a77_center_b',
    'Center-A',
    'demo',
    'A'.repeat(100),
  ])('preserves the explicit center %s without choosing another tenant', center => {
    expect(resolveNativeDevelopmentCenter(center)).toBe(center);
    const target = new URL(nativeCentralStartupUrl(entry, center)!);
    const original = new URL(entry);
    expect(target.origin).toBe(original.origin);
    expect(target.pathname).toBe(original.pathname);
    expect(target.search).toBe(original.search);
    expect(target.hash).toContain(`/psdevcenterid=${center}/`);
    expect(target.hash).toContain('/psdevcentercentraltreeexpview/');
    expect(target.hash).toContain('/psdevslngridview/');
    expect(target.hash).not.toContain('/psdevslnsys=');
  });

  it.each([
    null, false, true, 0, 123, [], {}, ' ', ' center', 'center ',
    '../center', 'center/child', '%63enter', 'center?admin=true',
    'center#fragment', 'center=value', 'center\\child', 'center\nadmin',
    'center\u0000', 'A'.repeat(101),
  ])('rejects invalid explicit configuration %# without falling back', center => {
    expect(() => resolveNativeDevelopmentCenter(center)).toThrow('Invalid native development center ID');
    expect(() => nativeCentralStartupUrl(entry, center)).toThrow('Invalid native development center ID');
  });

  it.each([
    '/-/index/psdevcenterid=existing/custom_view/-',
    '/psdevslnsys=nf_5d3585516a77_root_a/modelingindex/-',
    '/custom/deep/link?selected=a',
  ])('does not replace an existing deep link %s', hash => {
    const target = new URL(entry);
    target.hash = hash;
    expect(nativeCentralStartupUrl(target.href, 'nf_5d3585516a77_center_b')).toBeUndefined();
    expect(nativeCentralStartupUrl(target.href, 'invalid/override')).toBeUndefined();
  });

  it('maps the explicit center environment separately from the ModelDesign root', () => {
    const mapping = readFileSync(new URL('../../environment.config', import.meta.url), 'utf8');
    expect(mapping.split('\n').filter(line =>
      line === 'nativeDevelopmentCenterId:NATIVE_DEVELOPMENT_CENTER_ID')).toHaveLength(1);
    expect(mapping).toContain('nativeModelingSystemId:NATIVE_MODELING_SYSTEM_ID');
    expect(mapping.split('\n').filter(line =>
      line === 'requireOrganizationContext:REQUIRE_ORGANIZATION_CONTEXT')).toHaveLength(1);
    const main = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8');
    expect(main).toContain("if (nativeModelApp === 'Central' && !window.location.hash)");
    expect(main).toContain('nativeEnvironment?.nativeDevelopmentCenterId');
    expect(main).toContain("if (nativeModelApp === 'ModelDesign' && !window.location.hash)");
    expect(main).toContain('resolveNativeModelingRoot(nativeEnvironment?.nativeModelingSystemId)');
  });
});

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';

const mainUrl = new URL('../src/main.ts', import.meta.url);
const hostSource = readFileSync(mainUrl, 'utf8');
const shimSource = readFileSync(new URL('../src/vite-env.d.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(hostSource, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;

function runHost(environment: Record<string, unknown>) {
  const runApp = vi.fn(async (_plugins?: unknown[], _opts?: unknown) => undefined);
  const tap = vi.fn();
  const window = {
    Environment: environment,
    location: {
      href: 'http://127.0.0.1:32449/modeldesign/#/existing/deep/link',
      hash: '#/existing/deep/link',
      replace: vi.fn(),
    },
  };
  const dependencies: Record<string, unknown> = {
    '@ibiz-template/vue3-components': { runApp },
    '@ibiz-template/vue3-util': { AppHooks: { appResorceInited: { tap } } },
    'vue-text-format': {},
    'vue-grid-layout': {},
    './user-register': {},
    './native-modeling-root': {},
    './native-development-center': {},
  };
  const execute = () => new Function('require', 'window', 'exports', compiled)(
    (name: string) => {
      if (!Object.hasOwn(dependencies, name)) throw new Error(`Unexpected host import: ${name}`);
      return dependencies[name];
    },
    window,
    {},
  );
  return { execute, runApp, tap, window };
}

describe('native host MQTT deployment opt-in', () => {
  it.each(['Central', 'ModelDesign'].flatMap(nativeModelApp =>
    [false, true].map(enableMqtt => ({ nativeModelApp, enableMqtt })),
  ))('passes the exact $enableMqtt boolean for $nativeModelApp', environment => {
    const fixture = runHost(environment);
    fixture.execute();
    expect(fixture.runApp).toHaveBeenCalledOnce();
    expect(fixture.runApp.mock.calls[0][1]).toEqual({
      environmentOverrides: { enableMqtt: environment.enableMqtt },
    });
    expect(fixture.window.location.replace).not.toHaveBeenCalled();
  });

  it.each(['Central', 'ModelDesign'])('retains model precedence for %s when no override is supplied', nativeModelApp => {
    const fixture = runHost({ nativeModelApp });
    fixture.execute();
    expect(fixture.runApp.mock.calls[0][1]).toEqual({ environmentOverrides: undefined });
  });

  it.each([undefined, 'PLM', 'Other'].flatMap(nativeModelApp =>
    [false, true, 'false', {}].map(enableMqtt => ({ nativeModelApp, enableMqtt })),
  ))('does not opt a legacy/non-native host into override policy: %j', environment => {
    const fixture = runHost(environment);
    fixture.execute();
    expect(fixture.runApp.mock.calls[0][1]).toEqual({ environmentOverrides: undefined });
  });

  it.each(['Central', 'ModelDesign'].flatMap(nativeModelApp =>
    [null, 'false', 'true', 0, 1, {}, [], new Boolean(false)]
      .map(enableMqtt => ({ nativeModelApp, enableMqtt })),
  ))('fails closed before startup hooks on invalid native configuration: %j', environment => {
    const fixture = runHost(environment);
    expect(fixture.execute).toThrow('Invalid native enableMqtt: an explicit boolean is required');
    expect(fixture.runApp).not.toHaveBeenCalled();
    expect(fixture.tap).not.toHaveBeenCalled();
    expect(fixture.window.location.replace).not.toHaveBeenCalled();
  });
});

function hostTypeDiagnostics(extra = '') {
  const mainPath = fileURLToPath(mainUrl);
  const source = ts.createSourceFile('vite-env.d.ts', shimSource, ts.ScriptTarget.Latest, true);
  const declaration = source.statements.find(statement =>
    ts.isModuleDeclaration(statement) &&
    ts.isStringLiteral(statement.name) &&
    statement.name.text === '@ibiz-template/vue3-components');
  if (!declaration) throw new Error('Actual host runApp declaration is missing');
  const modules: Record<string, string> = {
    '@ibiz-template/runtime': 'export interface IApiAppHubService { microAppConfigCenter: { registerMicroApps(apps: unknown[]): void } }',
    '@ibiz-template/vue3-util': "import type { IApiAppHubService } from '@ibiz-template/runtime'; export declare const AppHooks: { appResorceInited: { tap(callback: (ctx: IApiAppHubService) => void): void } };",
    'vue-text-format': 'declare const plugin: unknown; export default plugin;',
    'vue-grid-layout': 'declare const plugin: unknown; export default plugin;',
    './user-register': 'declare const plugin: unknown; export default plugin;',
    './native-modeling-root': readFileSync(new URL('../src/native-modeling-root.ts', import.meta.url), 'utf8'),
    './native-development-center': readFileSync(new URL('../src/native-development-center.ts', import.meta.url), 'utf8'),
  };
  const virtual = new Map<string, string>([
    [mainPath, `${hostSource}\n${extra}`],
    [`${mainPath}.contracts.d.ts`, declaration.getText(source)],
    ...Object.entries(modules).map(([name, contents]) =>
      [`${mainPath}.${name.replace(/[^A-Za-z0-9]/g, '_')}.ts`, contents] as const),
  ]);
  const options: ts.CompilerOptions = {
    strict: true, noEmit: true, target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Node10,
    skipLibCheck: true, types: [],
  };
  const host = ts.createCompilerHost(options);
  const read = host.readFile.bind(host);
  host.readFile = path => virtual.get(path) ?? read(path);
  const exists = host.fileExists.bind(host);
  host.fileExists = path => virtual.has(path) || exists(path);
  host.getSourceFile = (path, languageVersion) => {
    const text = host.readFile(path);
    return text === undefined ? undefined : ts.createSourceFile(path, text, languageVersion, true);
  };
  host.resolveModuleNames = names => names.map(name =>
    Object.hasOwn(modules, name)
      ? { resolvedFileName: `${mainPath}.${name.replace(/[^A-Za-z0-9]/g, '_')}.ts` }
      : undefined);
  const program = ts.createProgram([mainPath, `${mainPath}.contracts.d.ts`], options, host);
  return ts.getPreEmitDiagnostics(program).map(diagnostic => ({
    code: diagnostic.code,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
  }));
}

describe('native host MQTT type contract', () => {
  it('compiles the actual host and its real runApp declaration with strict options', () => {
    expect(hostTypeDiagnostics()).toEqual([]);
  });

  it.each([
    '{ enableMqtt: "false" }',
    '{ enableMqtt: {} }',
    '{ enableMqtt: null }',
    '{ unreviewed: false }',
  ])('does not let the host declaration erase invalid override typing: %s', override => {
    const diagnostics = hostTypeDiagnostics(`runApp([], { environmentOverrides: ${override} });`);
    expect(diagnostics).toHaveLength(1);
    expect([2322, 2353]).toContain(diagnostics[0].code);
  });
});

import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  rmSync,
  existsSync,
  symlinkSync,
  cpSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { pathToFileURL } from 'node:url';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  copyModelPlugins,
  findPluginModelFiles,
  findPluginSource,
  modelPluginMiddleware,
} from '../vite-plugins/ibiz-vite-plugin';
import IBizVitePlugin from '../vite-plugins/ibiz-vite-plugin';
import type { ResolvedConfig } from 'vite';

const directories: string[] = [];
afterEach(() => {
  vi.unstubAllEnvs();
  for (const directory of directories.splice(0))
    rmSync(directory, { recursive: true, force: true });
});

function write(path: string, contents: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
}

function fixture() {
  const cwd = mkdtempSync(join(tmpdir(), 'model-plugin-resources-'));
  directories.push(cwd);
  const source = join(cwd, 'source');
  const model = join(cwd, 'model.json');
  mkdirSync(source);
  const options = {
    pluginSource: source,
    modelFiles: [model],
    targetRoot: 'output/plugins',
  };
  const references: string[] = [];
  function plugin(
    name = '@aibiz/test',
    overrides: Record<string, unknown> = {},
  ) {
    const manifest = {
      name,
      version: '0.1.0',
      system: 'dist/index.system.js',
      styles: ['dist/style.css'],
      ...overrides,
    };
    const ref = `${name}@0.1.0`;
    const root = join(source, ref);
    write(join(root, 'package.json'), JSON.stringify(manifest));
    write(
      join(root, 'dist/index.system.js'),
      'System.register([], () => ({execute() {}}));',
    );
    write(join(root, 'dist/style.css'), 'body { color: black; }');
    references.push(ref);
    write(
      model,
      JSON.stringify({
        nested: references.map(rTObjectRepo => ({ rTObjectRepo })),
      }),
    );
    return { root, ref, manifest };
  }
  return {
    cwd,
    source,
    model,
    options,
    plugin,
    copy: () => copyModelPlugins(cwd, options),
    target: (ref: string) => join(cwd, options.targetRoot, ref),
  };
}

async function send(
  handler: ReturnType<typeof modelPluginMiddleware>,
  url: string,
  method = 'GET',
) {
  const headers: Record<string, string> = {};
  let body = '';
  let forwarded = false;
  const res = {
    statusCode: 0,
    setHeader(name: string, value: string) {
      headers[name.toLowerCase()] = value;
    },
    end(value?: Buffer) {
      body = value?.toString('utf8') ?? '';
    },
  };
  await handler(
    { url, method } as IncomingMessage,
    res as unknown as ServerResponse,
    () => {
      forwarded = true;
    },
  );
  return { status: res.statusCode, headers, body, forwarded };
}

describe('model runtime plugin resource delivery', () => {
  it('publishes build-hook assets into the resolved output instead of process.cwd()/dist', async () => {
    const f = fixture();
    const p = f.plugin();
    vi.stubEnv('IBIZ_PLUGIN_SOURCE', f.source);
    vi.stubEnv('IBIZ_PLUGIN_MODEL_FILE', f.model);
    for (const name of [
      'core',
      'runtime',
      'model-helper',
      'vue3-util',
      'vue3-components',
      'web-theme',
      'devtool',
    ]) {
      write(
        join(
          f.cwd,
          'node_modules/@ibiz-template',
          name,
          'dist/index.system.min.js',
        ),
        'System.register([], () => ({execute() {}}));',
      );
    }
    for (const name of ['ai-chat', 'gantt', 'bi-report', 'data-view']) {
      const root = join(f.cwd, 'node_modules/@ibiz-template-plugin', name);
      write(join(root, 'package.json'), '{"version":"1.0.0"}');
      for (const file of [
        'index.legacy.js',
        'polyfills.legacy.js',
        'style.css',
      ]) {
        write(join(root, 'dist', file), 'runtime fixture');
      }
    }
    write(join(f.cwd, 'public/assets/images/no-data.png'), 'image fixture');
    const outDir = join(f.cwd, 'isolated-build');
    write(join(outDir, 'index.html'), '<html></html>');
    write(
      join(outDir, 'extras/json/system-import.json'),
      '{"imports":{},"styles":{}}',
    );
    write(
      join(outDir, 'environments/environment.js'),
      'window.Environment = { dev: true };',
    );
    const buildPlugin = IBizVitePlugin().find(
      plugin => plugin.name === 'iBizSys:System',
    )!;
    const configHook = buildPlugin.configResolved;
    const closeHook = buildPlugin.closeBundle;
    const config = { root: f.cwd, build: { outDir } } as ResolvedConfig;
    await (typeof configHook === 'function' ? configHook : configHook!.handler)(
      config,
    );
    await (
      typeof closeHook === 'function' ? closeHook : closeHook!.handler
    ).call({} as never);
    expect(existsSync(join(outDir, 'plugins', p.ref, 'package.json'))).toBe(
      true,
    );
    expect(
      existsSync(
        join(outDir, 'extras/js/@ibiz-template/runtime/index.system.min.js'),
      ),
    ).toBe(true);
    expect(existsSync(join(f.cwd, 'dist'))).toBe(false);
  });

  it('copies declared dist resources exactly, deduplicating nested model references', async () => {
    const f = fixture();
    const p = f.plugin();
    write(
      f.model,
      JSON.stringify([
        { rTObjectRepo: p.ref },
        { child: { rtobjectrepo: p.ref } },
      ]),
    );
    write(join(p.root, 'src/private.ts'), 'private source');
    await f.copy();
    for (const path of [
      'package.json',
      'dist/index.system.js',
      'dist/style.css',
    ]) {
      expect(readFileSync(join(f.target(p.ref), path))).toEqual(
        readFileSync(join(p.root, path)),
      );
    }
    expect(existsSync(join(f.target(p.ref), 'src'))).toBe(false);
  });

  it('publishes root sibling manifests and string styles without requiring a dist directory', async () => {
    const f = fixture();
    const p = f.plugin('@aibiz/console', {
      system: './index.system.js',
      styles: 'style.css',
    });
    rmSync(join(p.root, 'dist'), { recursive: true });
    write(
      join(p.root, 'index.system.js'),
      'System.register([], () => ({execute() {}}));',
    );
    write(join(p.root, 'style.css'), 'body { color: green; }');
    await f.copy();
    expect(readdirSync(f.target(p.ref)).sort()).toEqual([
      'index.system.js',
      'package.json',
      'style.css',
    ]);
    expect(readFileSync(join(f.target(p.ref), 'package.json'))).toEqual(
      readFileSync(join(p.root, 'package.json')),
    );
  });

  it('delivers real local GlobalAppUtil and native theme sibling manifests without remapping identity', async () => {
    const f = fixture();
    const packages = [
      '../../local-plugins/global-util',
      '../../local-plugins/studio-theme/dist/icon',
      '../../local-plugins/studio-theme/dist/color',
      '../../local-plugins/console-layout/dist/console',
    ];
    const refs: string[] = [];
    for (const path of packages) {
      const root = resolve(__dirname, path);
      const manifest = JSON.parse(
        readFileSync(join(root, 'package.json'), 'utf8'),
      );
      const ref = `${manifest.name}@${manifest.version}`;
      refs.push(ref);
      write(join(f.source, ref, 'package.json'), JSON.stringify(manifest));
      for (const asset of [manifest.system, ...(manifest.styles ?? [])]) {
        const target = join(f.source, ref, asset);
        mkdirSync(dirname(target), { recursive: true });
        cpSync(join(root, asset), target);
      }
    }
    write(
      f.model,
      JSON.stringify(refs.map(rTObjectRepo => ({ rTObjectRepo }))),
    );
    await f.copy();
    for (const ref of refs) {
      const manifest = JSON.parse(
        readFileSync(join(f.target(ref), 'package.json'), 'utf8'),
      );
      expect(`${manifest.name}@${manifest.version}`).toBe(ref);
      expect(readFileSync(join(f.target(ref), manifest.system))).toEqual(
        readFileSync(join(f.source, ref, manifest.system)),
      );
    }
  });

  it('keeps the public Stencil loader, polyfills, underlying runtime and lazy chunks executable', async () => {
    const f = fixture();
    const p = f.plugin('@ibiz-template-plugin/runtime-model', {
      type: 'module',
      system: 'index.system.js',
      styles: [],
    });
    write(
      join(p.root, 'index.system.js'),
      'System.register([], () => ({execute() {}}));',
    );
    write(
      join(p.root, 'loader/index.js'),
      "export * from '../dist/esm/polyfills/index.js';\nexport * from '../dist/esm/loader.js';\n",
    );
    write(
      join(p.root, 'loader/index.d.ts'),
      'export declare function defineCustomElements(): void;',
    );
    write(join(p.root, 'loader/package.json'), '{"module":"./index.js"}');
    write(
      join(p.root, 'dist/esm/polyfills/index.js'),
      'export const applyPolyfills = () => "polyfills";',
    );
    write(
      join(p.root, 'dist/esm/loader.js'),
      'export const defineCustomElements = () => import("./component.entry.js");',
    );
    write(
      join(p.root, 'dist/esm/component.entry.js'),
      'export const component = "delivered";',
    );
    await f.copy();
    for (const asset of [
      'index.system.js',
      'loader/index.js',
      'loader/index.d.ts',
      'loader/package.json',
      'dist/esm/polyfills/index.js',
      'dist/esm/loader.js',
      'dist/esm/component.entry.js',
    ]) {
      expect(readFileSync(join(f.target(p.ref), asset))).toEqual(
        readFileSync(join(p.root, asset)),
      );
    }
    // Use Node's native ESM loader, preserving relative lazy imports in the copied tree.
    const loader = await import(
      /* @vite-ignore */ pathToFileURL(join(f.target(p.ref), 'loader/index.js'))
        .href
    );
    expect(loader.applyPolyfills()).toBe('polyfills');
    expect((await loader.defineCustomElements()).component).toBe('delivered');
  });

  it('copies a declared resource directory with its local CSS images', async () => {
    const f = fixture();
    const p = f.plugin('@aibiz/images', { styles: ['assets/style.css'] });
    write(
      join(p.root, 'assets/style.css'),
      'body { background: url("./image.png"); }',
    );
    write(join(p.root, 'assets/image.png'), 'image fixture');
    await f.copy();
    expect(
      readFileSync(join(f.target(p.ref), 'assets/image.png'), 'utf8'),
    ).toBe('image fixture');
  });

  it('validates all packages before writing when a later manifest is incomplete', async () => {
    const f = fixture();
    f.plugin('@aibiz/a-valid');
    f.plugin('@aibiz/z-invalid', { system: 'dist/missing.js' });
    await expect(f.copy()).rejects.toThrow('missing declared file');
    expect(existsSync(join(f.cwd, f.options.targetRoot))).toBe(false);
  });

  it('replaces selected packages without retaining stale chunks or deleting unrelated packages', async () => {
    const f = fixture();
    const p = f.plugin();
    write(join(f.target(p.ref), 'dist/old.entry.js'), 'stale chunk');
    write(join(f.target(p.ref), 'old.system.js'), 'stale sibling');
    const unrelated = join(f.cwd, f.options.targetRoot, '@aibiz/other@1');
    write(join(unrelated, 'package.json'), '{"unrelated":true}');
    await f.copy();
    expect(existsSync(join(f.target(p.ref), 'dist/old.entry.js'))).toBe(false);
    expect(existsSync(join(f.target(p.ref), 'old.system.js'))).toBe(false);
    expect(readFileSync(join(unrelated, 'package.json'), 'utf8')).toBe(
      '{"unrelated":true}',
    );
    expect(
      readdirSync(join(f.cwd, f.options.targetRoot)).some(name =>
        name.startsWith('.ibiz-plugins-'),
      ),
    ).toBe(false);
  });

  it('does not follow stale nested output symlinks while replacing a package', async () => {
    const f = fixture();
    const p = f.plugin();
    const outside = join(f.cwd, 'external');
    write(join(outside, 'private.js'), 'keep private');
    mkdirSync(f.target(p.ref), { recursive: true });
    symlinkSync(outside, join(f.target(p.ref), 'dist'));
    await f.copy();
    expect(readFileSync(join(outside, 'private.js'), 'utf8')).toBe('keep private');
    expect(existsSync(join(outside, 'index.system.js'))).toBe(false);
    expect(readFileSync(join(f.target(p.ref), 'dist/index.system.js'))).toEqual(
      readFileSync(join(p.root, 'dist/index.system.js')),
    );
  });

  it.each(['scope', 'package'])(
    'rejects an internal output %s alias without modifying the aliased package',
    async component => {
      const f = fixture();
      const p = f.plugin();
      const root = join(f.cwd, f.options.targetRoot);
      const other = join(root, '@other/test@1');
      write(join(other, 'package.json'), '{"unrelated":true}');
      if (component === 'scope') {
        symlinkSync(join(root, '@other'), join(root, '@aibiz'));
      } else {
        mkdirSync(dirname(f.target(p.ref)), { recursive: true });
        symlinkSync(other, f.target(p.ref));
      }
      await expect(f.copy()).rejects.toThrow('invalid runtime plugin output');
      expect(readFileSync(join(other, 'package.json'), 'utf8')).toBe(
        '{"unrelated":true}',
      );
    },
  );

  it.each(['dist', 'loader'])(
    'rejects a dangling nested source symlink in %s before publishing',
    async directory => {
      const f = fixture();
      const p = f.plugin();
      mkdirSync(join(p.root, directory), { recursive: true });
      symlinkSync('missing.js', join(p.root, directory, 'dangling.js'));
      await expect(f.copy()).rejects.toThrow('symlink runtime plugin resource');
      expect(existsSync(join(f.cwd, f.options.targetRoot))).toBe(false);
    },
  );

  it.each([
    ['missing version', { version: undefined }, /has no version/],
    ['invalid version', { version: 1 }, /has no version/],
    ['missing name', { name: undefined }, /identity differs/],
    ['wrong identity', { name: '@aibiz/other' }, /identity differs/],
    ['wrong version', { version: '0.2.0' }, /identity differs/],
    ['missing system', { system: undefined }, /invalid.*manifest assets/],
    ['numeric system', { system: 1 }, /invalid.*manifest assets/],
    ['object styles', { styles: {} }, /invalid.*manifest assets/],
    ['numeric style', { styles: [1] }, /invalid.*manifest assets/],
    ['empty style', { styles: [''] }, /Invalid runtime plugin/],
    ['directory entrypoint', { system: 'dist' }, /missing declared file/],
    ['missing CSS', { styles: ['dist/missing.css'] }, /missing declared file/],
  ])('rejects %s', async (_label, overrides, message) => {
    const f = fixture();
    f.plugin('@aibiz/test', overrides);
    await expect(f.copy()).rejects.toThrow(message);
    expect(existsSync(join(f.cwd, f.options.targetRoot))).toBe(false);
  });

  it.each([
    '/outside.js',
    '../outside.js',
    'dist/../../outside.js',
    'dist\\outside.js',
    'https://remote.invalid/plugin.js',
    '//remote.invalid/plugin.js',
    'dist/a.js?x=1',
    'dist/a.js#entry',
    'dist/%2e%2e/private.js',
    'src/private.ts',
    'node_modules/private.js',
  ])('rejects nonlocal or ambiguous declared asset %s', async system => {
    const f = fixture();
    f.plugin('@aibiz/test', { system });
    await expect(f.copy()).rejects.toThrow(/Invalid runtime plugin/);
  });

  it.each([
    '../escape',
    '/outside',
    '@scope/pkg\\escape',
    '@scope/%2e%2e',
    '@scope/plugin@1?query',
    'https://remote.invalid/pkg',
  ])('rejects invalid repository %s', async ref => {
    const f = fixture();
    write(f.model, JSON.stringify({ rTObjectRepo: ref }));
    await expect(f.copy()).rejects.toThrow('Invalid runtime plugin repository');
  });

  it('rejects missing and malformed manifests', async () => {
    const f = fixture();
    const p = f.plugin();
    rmSync(join(p.root, 'package.json'));
    await expect(f.copy()).rejects.toThrow('missing runtime plugin package');
    write(join(p.root, 'package.json'), '{');
    await expect(f.copy()).rejects.toThrow();
  });

  it.each(['source', 'source/nested', '.'])(
    'refuses in-place or overlapping publication to %s',
    async targetRoot => {
      const f = fixture();
      const p = f.plugin();
      const before = readFileSync(join(p.root, 'package.json'));
      await expect(
        copyModelPlugins(f.cwd, { ...f.options, targetRoot }),
      ).rejects.toThrow('must not overlap');
      expect(readFileSync(join(p.root, 'package.json'))).toEqual(before);
    },
  );

  it('rejects output aliases into the source and nested source symlinks', async () => {
    const f = fixture();
    const p = f.plugin();
    symlinkSync(f.source, join(f.cwd, 'alias'));
    await expect(
      copyModelPlugins(f.cwd, { ...f.options, targetRoot: 'alias/copy' }),
    ).rejects.toThrow('must not overlap');
    write(join(f.cwd, 'private.js'), 'private');
    symlinkSync(join(f.cwd, 'private.js'), join(p.root, 'dist/private.js'));
    await expect(f.copy()).rejects.toThrow('symlink runtime plugin resource');
  });

  it('rejects a package or target symlink escaping its tree', async () => {
    const f = fixture();
    const p = f.plugin();
    const outside = join(f.cwd, 'external');
    mkdirSync(outside);
    mkdirSync(dirname(f.target(p.ref)), { recursive: true });
    symlinkSync(outside, f.target(p.ref));
    await expect(f.copy()).rejects.toThrow('escaped output');
    rmSync(f.target(p.ref));
    cpSync(p.root, join(outside, 'package'), { recursive: true });
    rmSync(p.root, { recursive: true });
    symlinkSync(join(outside, 'package'), p.root);
    await expect(f.copy()).rejects.toThrow('escaped source');
  });

  it('explicit source/model selection cannot fall back to another tree or merge PLM model references', async () => {
    const f = fixture();
    f.plugin();
    mkdirSync(join(f.cwd, 'public/plugins'), { recursive: true });
    vi.stubEnv('IBIZ_PLUGIN_SOURCE', 'missing-source');
    expect(() => findPluginSource(f.cwd)).toThrow(
      'explicit runtime plugin source',
    );
    vi.stubEnv('IBIZ_PLUGIN_SOURCE', 'source');
    expect(findPluginSource(f.cwd)).toBe(f.source);
    vi.stubEnv('IBIZ_PLUGIN_MODEL_FILE', 'missing-model.json');
    expect(() => findPluginModelFiles(f.cwd)).toThrow(
      'explicit runtime plugin model',
    );
    vi.stubEnv('IBIZ_PLUGIN_MODEL_FILE', 'model.json');
    expect(findPluginModelFiles(f.cwd)).toEqual([f.model]);
    await copyModelPlugins(f.cwd);
    expect(
      existsSync(join(f.cwd, 'dist/plugins/@aibiz/test@0.1.0/package.json')),
    ).toBe(true);
  });
});

describe('native plugin asset middleware', () => {
  it.each(['/central/plugins/', '/modeldesign/plugins/', '/plugins/'])(
    'serves the manifest and loader with JavaScript MIME under %s',
    async mount => {
      const f = fixture();
      const p = f.plugin();
      write(join(p.root, 'loader/index.mjs'), 'export const loader = true;');
      const handler = modelPluginMiddleware(f.source);
      const manifest = await send(
        handler,
        `${mount}${p.ref}/package.json?version=1`,
      );
      expect(manifest.status).toBe(200);
      expect(manifest.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(JSON.parse(manifest.body)).toEqual(p.manifest);
      const loader = await send(handler, `${mount}${p.ref}/loader/index.mjs`);
      expect(loader.status).toBe(200);
      expect(loader.headers['content-type']).toBe(
        'application/javascript; charset=utf-8',
      );
      expect(loader.headers['x-content-type-options']).toBe('nosniff');
      expect(loader.headers['cache-control']).toBe('no-store');
      expect(loader.body).toContain('export const loader');
      const head = await send(
        handler,
        `${mount}${p.ref}/loader/index.mjs`,
        'HEAD',
      );
      expect(head.status).toBe(200);
      expect(head.body).toBe('');
    },
  );

  it('missing plugin assets return 404 rather than falling through to the login HTML', async () => {
    const f = fixture();
    const p = f.plugin();
    const response = await send(
      modelPluginMiddleware(f.source),
      `/central/plugins/${p.ref}/loader/missing.js`,
    );
    expect(response).toMatchObject({ status: 404, body: '', forwarded: false });
  });

  it('handles malformed encoding and refuses writes without forwarding', async () => {
    const f = fixture();
    const handler = modelPluginMiddleware(f.source);
    expect(await send(handler, '/plugins/%ZZ')).toMatchObject({
      status: 400,
      forwarded: false,
    });
    expect(
      await send(handler, '/plugins/pkg@1/package.json', 'POST'),
    ).toMatchObject({
      status: 405,
      headers: { allow: 'GET, HEAD' },
      forwarded: false,
    });
    expect(await send(handler, '/central/login')).toMatchObject({
      forwarded: true,
    });
  });

  it.each([
    '../private.js',
    '%2e%2e/private.js',
    'dist/%2fetc%2fpasswd',
    'dist/a.js.map',
    'src/private.ts',
    'node_modules/private.js',
    '.dependencies/private.js',
  ])('refuses private or escaping asset %s', async path => {
    const f = fixture();
    const p = f.plugin();
    expect(
      await send(modelPluginMiddleware(f.source), `/plugins/${p.ref}/${path}`),
    ).toMatchObject({ status: 403, forwarded: false });
  });

  it('refuses a symlink to an external asset', async () => {
    const f = fixture();
    const p = f.plugin();
    write(join(f.cwd, 'private.js'), 'private');
    symlinkSync(join(f.cwd, 'private.js'), join(p.root, 'dist/private.js'));
    expect(
      await send(
        modelPluginMiddleware(f.source),
        `/plugins/${p.ref}/dist/private.js`,
      ),
    ).toMatchObject({ status: 403, forwarded: false });
  });
});

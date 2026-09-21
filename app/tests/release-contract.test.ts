import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(appRoot, 'public');
const importMapPath = resolve(publicRoot, 'extras/json/system-import.json');
const nginxConfigPath = resolve(appRoot, '..', 'nginx-local.conf');
const modelSchemaRoot = resolve(
  appRoot,
  '..',
  '..',
  'plm/model/PSSYSAPPS/plmweb/PSAPPDATAENTITIES',
);
const quickCreateViewPath = resolve(
  appRoot,
  '..',
  '..',
  'plm/model/PSSYSAPPS/plmweb/PSAPPDEVIEWS/idea_quick_create_view.json',
);

function readImportMap(): {
  imports?: Record<string, string | string[]>;
  styles?: Record<string, string | string[]>;
} {
  return JSON.parse(readFileSync(importMapPath, 'utf8'));
}

function importMapValues(
  section: Record<string, string | string[]> | undefined,
  packageName: string,
): string[] {
  const value = section?.[packageName];
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function activeEnvironmentValue(
  environment: string,
  key: 'appId' | 'mockDcSystemId',
): string | undefined {
  const match = environment.match(new RegExp(`^\\s*${key}:\\s*'([^']+)'`, 'm'));
  return match?.[1];
}

describe('release contract', () => {
  it('registers the modeldesign micro application during app resource initialization', () => {
    const main = readFileSync(resolve(appRoot, 'src/main.ts'), 'utf8');

    expect(main).toContain('AppHooks.appResorceInited.tap');
    expect(main).toContain("name: 'ibizplm__plmweb'");
    expect(main).toContain("entry: '/modeldesign/'");
    expect(main).toContain('registerMicroApps');
  });

  it('keeps the runtime application id aligned with the micro application name', () => {
    const main = readFileSync(resolve(appRoot, 'src/main.ts'), 'utf8');
    const environment = readFileSync(
      resolve(publicRoot, 'environments/environment.js'),
      'utf8',
    );

    expect(activeEnvironmentValue(environment, 'appId')).toBe(
      'ibizmodeling__modeldesign',
    );
    expect(activeEnvironmentValue(environment, 'mockDcSystemId')).toBe(
      'ibizmodeling',
    );
    expect(main).toContain("name: 'ibizplm__plmweb'");
  });

  it('keeps the modeldesign API static model route ahead of its business proxy', () => {
    const nginx = readFileSync(nginxConfigPath, 'utf8');
    const modelRoute = nginx.indexOf(
      'location ^~ /api/ibizmodeling__modeldesign/remotemodel/',
    );
    const businessRoute = nginx.indexOf(
      'location ^~ /api/ibizmodeling__modeldesign/ {',
    );

    expect(modelRoute).toBeGreaterThanOrEqual(0);
    expect(businessRoute).toBeGreaterThan(modelRoute);
    expect(nginx).toContain('root /app/model;');
    expect(nginx).toContain(
      'rewrite ^/api/ibizmodeling__modeldesign/(.*)$ /ibizmodeling/serviceapi/$1 break;',
    );
    expect(nginx).toContain('proxy_pass $modeling_upstream;');
    expect(nginx).toMatch(
      /location \^~ \/api\/ibizmodeling__modeldesign\/dictionaries\/ \{[\s\S]*?proxy_set_header srfsystemid\s+ibizplm;[\s\S]*?proxy_set_header srforgid\s+\$plm_srforgid;/,
    );
  });

  it('publishes generated JSON Schemas for common dynamic entities', () => {
    const nginx = readFileSync(nginxConfigPath, 'utf8');
    for (const applicationId of ['ibizmodeling__modeldesign', 'ibizplm__plmweb']) {
      expect(nginx).toContain(
        `location ^~ /api/${applicationId}/jsonschema/ {`,
      );
      expect(nginx).toContain(
        `rewrite ^/api/${applicationId}/jsonschema/([A-Za-z0-9_]+)$`,
      );
    }
    for (const name of ['IDEA', 'TICKET', 'WORK_ITEM', 'TEST_CASE', 'AI_KB_CHUNK']) {
      const file = resolve(modelSchemaRoot, `${name}.jsonschema`);
      expect(existsSync(file), `${name}.jsonschema`).toBe(true);
      const schema = JSON.parse(readFileSync(file, 'utf8')) as {
        type?: string; properties?: Record<string, unknown>;
      };
      expect(schema.type, name).toBe('object');
      expect(Object.keys(schema.properties || {}).length, name).toBeGreaterThan(0);
    }
  });

  it('provides an explicit empty response for optional user theme discovery', () => {
    const nginx = readFileSync(nginxConfigPath, 'utf8');

    expect(nginx).toContain(
      'location = /api/ibizmodeling__modeldesign/extension/app_view_themes/fetch_cur_user_all',
    );
    expect(nginx).toContain(
      'location = /api/ibizplm__plmweb/extension/app_view_themes/fetch_cur_user_all',
    );
    expect(nginx).toMatch(
      /location = \/api\/ibizmodeling__modeldesign\/extension\/app_view_themes\/fetch_cur_user_all \{[\s\S]*?return 200 '\[\]';/,
    );
  });

  it('ships a portable deployment smoke entrypoint with credential injection', () => {
    const packageJson = JSON.parse(
      readFileSync(resolve(appRoot, 'package.json'), 'utf8'),
    ) as { scripts?: Record<string, string> };
    const smokePath = resolve(appRoot, 'scripts/deployment-smoke.mjs');
    const smoke = readFileSync(smokePath, 'utf8');

    expect(packageJson.scripts?.['smoke:deployment']).toBe(
      'node scripts/deployment-smoke.mjs',
    );
    expect(smoke).toContain('MODEL_DESIGN_USER');
    expect(smoke).toContain('MODEL_DESIGN_PASSWORD');
    expect(smoke).toContain('PLAYWRIGHT_MODULE');
    expect(smoke).not.toMatch(/\/Users\/|_npx\/|Google Chrome\.app/);
    expect(smoke).not.toContain('knownConsolePatterns');
    expect(smoke).not.toContain('SMOKE_ALLOW_KNOWN_RUNTIME_WARNINGS');
    expect(smoke).not.toContain('known-runtime-event');
    expect(smoke).toContain('authentication-probe');
    expect(smoke).toContain('authentication-navigation-abort');
    expect(smoke).toContain(
      'function isExpectedAuthenticationConsole(message, authenticated)',
    );
    expect(smoke).toContain(
      'isExpectedAuthenticationConsole(message, authenticated)',
    );
    expect(smoke).toContain(
      'function isExpectedAuthenticationNavigationAbort(message, authenticated)',
    );
    expect(smoke).toContain(
      'isExpectedAuthenticationNavigationAbort(text, authenticated)',
    );
  });

  it('copies installed release assets with overwrite enabled and verifies exact dist copies', () => {
    const vitePlugin = readFileSync(
      resolve(appRoot, 'vite-plugins/ibiz-vite-plugin.ts'),
      'utf8',
    );
    const releaseHarness = readFileSync(
      resolve(appRoot, 'scripts/release-harness.mjs'),
      'utf8',
    );

    expect(vitePlugin).toContain('cpy(cpDir, outDir, { overwrite: true })');
    expect(releaseHarness).toContain('verifyCopiedDirectory(');
    expect(releaseHarness).toContain('verifyFileCopy(');
    expect(releaseHarness).toContain(
      'is not an exact copy of its installed source',
    );
  });

  it('publishes model runtime plugins into the static plugin tree', () => {
    const vitePlugin = readFileSync(
      resolve(appRoot, 'vite-plugins/ibiz-vite-plugin.ts'),
      'utf8',
    );
    const releaseHarness = readFileSync(
      resolve(appRoot, 'scripts/release-harness.mjs'),
      'utf8',
    );

    expect(vitePlugin).toContain('copyModelPlugins');
    expect(vitePlugin).toContain('IBIZ_PLUGIN_SOURCE');
    expect(vitePlugin).toContain('../../plm-web/public/plugins');
    expect(vitePlugin).toContain('dist/plugins');
    expect(vitePlugin).toContain('rtobjectrepo');
    expect(vitePlugin).toContain('missing runtime plugin package');
    expect(vitePlugin).toContain('IBizRouterView already returns a VNode');
    expect(vitePlugin).toContain('this.c.noCache?e||null');
    expect(vitePlugin).toContain('nextSibling:e=>e?e.nextSibling:null');
    expect(vitePlugin).toContain('remove:e=>{const t=e&&e.parentNode;t&&t.removeChild(e)}');
    expect(vitePlugin).toContain('parentNode:e=>e?e.parentNode:null');
    expect(vitePlugin).toContain('vue3-util/index.system.min.js');
    expect(vitePlugin).toContain('const e=""!==n&&t?t:null');
    expect(vitePlugin).toContain('const n={};let o=!0');
    expect(vitePlugin).toContain(
      'w(l.type,{...s,...e,key:t.manualKey})',
    );
    expect(vitePlugin).toContain('runtime/index.system.min.js');
    expect(vitePlugin).toContain(
      'this.view?this.view.getController("".concat(this.model.name,"_batchtoolbar")):void 0',
    );
    expect(vitePlugin).toContain(
      'ibiz.log.debug(ibiz.i18n.t("runtime.uiLogic.viewLogicInitializationParameter"',
    );
    expect(releaseHarness).toContain('verifyModelPluginAssets');
    expect(releaseHarness).toContain('dist/plugins resolves');
  });

  it('resolves every versioned import-map asset from the checked-in public tree', () => {
    const importMap = readImportMap();
    const versionedPackages = [
      '@antv/x6',
      '@ibiz-template-plugin/ai-chat',
      '@ibiz-template-plugin/bi-report',
      '@ibiz-template-plugin/data-view',
      '@ibiz-template-plugin/gantt',
      'vue-i18n',
    ];

    versionedPackages.forEach(packageName => {
      const values = [
        ...importMapValues(importMap.imports, packageName),
        ...importMapValues(importMap.styles, packageName),
      ];
      expect(
        values.length,
        `${packageName} has no import-map asset`,
      ).toBeGreaterThan(0);
      values.forEach(asset => {
        const assetPath = resolve(dirname(importMapPath), asset.split('?')[0]);
        expect(
          existsSync(assetPath),
          `${packageName} points to missing asset ${asset}`,
        ).toBe(true);
      });
    });
  });

  it('pins versioned plugin assets to the installed release versions', () => {
    const importMap = readImportMap();
    const expectedVersions = {
      '@ibiz-template-plugin/ai-chat': '0.0.66',
      '@ibiz-template-plugin/bi-report': '0.0.32',
      '@ibiz-template-plugin/data-view': '0.0.6',
      '@ibiz-template-plugin/gantt': '0.1.8-alpha.378',
    };

    Object.entries(expectedVersions).forEach(([packageName, version]) => {
      const assets = importMapValues(importMap.imports, packageName);
      expect(assets.some(asset => asset.includes(`/${version}/`))).toBe(true);
    });
  });

  it('keeps the idea quick-create view logic bound to its actual form controller', () => {
    const view = JSON.parse(readFileSync(quickCreateViewPath, 'utf8')) as {
      getPSControls?: Array<{ codeName?: string; controlType?: string }>;
      getPSAppViewLogics?: Array<{ getPSViewCtrlName?: string }>;
    };
    const controllers = new Set(
      (view.getPSControls || [])
        .filter(control => control.controlType === 'FORM')
        .map(control => control.codeName),
    );
    const references = (view.getPSAppViewLogics || [])
      .map(item => item.getPSViewCtrlName)
      .filter((name): name is string => Boolean(name));

    expect(controllers).toContain('quick_create');
    expect(references).toContain('quick_create');
    references.forEach(reference => {
      expect(
        controllers,
        `view logic references missing form controller ${reference}`,
      ).toContain(reference);
    });
  });
});

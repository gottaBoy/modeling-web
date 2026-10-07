import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(appRoot, 'public');
const importMapPath = resolve(publicRoot, 'extras/json/system-import.json');
const nginxConfigPath = resolve(appRoot, '..', 'nginx-local.conf');
const plmRouteConfigPath = resolve(
  appRoot,
  '..',
  '..',
  'plm/deploy/compose/nacos-configs/deployapp-ibizmodeling-plmweb.txt',
);
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
  it('runs mounted native startup scripts independently of file executable permissions', () => {
    const nativeCompose = readFileSync(
      resolve(appRoot, '../../plm/deploy/compose/docker-compose-modeling-native.yml'),
      'utf8',
    );
    expect(nativeCompose).toContain('entrypoint: ["/bin/sh", "/start.sh"]');
    expect(nativeCompose).toContain(
      '../../../modelingweb/environment.config:/environment.config:ro',
    );
    expect(nativeCompose).toContain('NATIVE_MODEL_APP: Central');
    expect(nativeCompose).toContain('NATIVE_MODEL_APP: ModelDesign');
    expect(nativeCompose).toContain('NATIVEMODELAPP: Central');
    expect(nativeCompose).toContain('NATIVEMODELAPP: ModelDesign');
    const environmentConfig = readFileSync(
      resolve(appRoot, '../environment.config'),
      'utf8',
    );
    expect(environmentConfig).toMatch(/^nativeModelApp:NATIVEMODELAPP$/m);
  });

  it('registers the modeldesign micro application during app resource initialization', () => {
    const main = readFileSync(resolve(appRoot, 'src/main.ts'), 'utf8');

    expect(main).toContain('AppHooks.appResorceInited.tap');
    expect(main).toContain("name: nativeAppCode");
    expect(main).toContain("`ibizmodeling__${nativeAppCode}`");
    expect(main).toMatch(
      /name:\s*nativeAppCode\s*\?\s*`ibizmodeling__\$\{nativeAppCode\}`\s*:\s*'ibizplm__plmweb'/,
    );
    expect(main).toMatch(
      /entry:\s*nativeAppCode\s*\?\s*`\/\$\{nativeAppCode\}\/`\s*:\s*'\/modeldesign\/'/,
    );
    expect(main).toContain('registerMicroApps');
  });

  it('proxies native platform configuration and extensions to their real services', () => {
    const nginx = readFileSync(
      resolve(appRoot, '../nginx-native.conf'),
      'utf8',
    );
    const businessRoute = nginx.indexOf('location ^~ /api/nativeapicode/ {');
    for (const [route, target] of [
      ['configs', 'configs'],
      ['extension', 'extension/api'],
    ]) {
      const routeStart = nginx.indexOf(
        `location ^~ /api/nativeapicode/${route}/ {`,
      );
      expect(routeStart).toBeGreaterThanOrEqual(0);
      expect(routeStart).toBeLessThan(businessRoute);
      const block = nginx.slice(routeStart).split('\n    }')[0];
      expect(block).toContain(
        `rewrite ^/api/nativeapicode/${route}/(.*)$ /${target}/$1 break;`,
      );
      expect(block).toContain('proxy_pass $native_auth;');
      expect(block).toContain(
        'proxy_set_header Authorization $http_authorization;',
      );
      expect(block).not.toMatch(/return 200/);
    }
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
    expect(main).toMatch(
      /name:\s*nativeAppCode\s*\?\s*`ibizmodeling__\$\{nativeAppCode\}`\s*:\s*'ibizplm__plmweb'/,
    );
  });

  it('keeps the modeldesign API static model route ahead of its business proxy', () => {
    const nginx = readFileSync(nginxConfigPath, 'utf8');
    const modelRoute = nginx.indexOf(
      'location ^~ /api/ibizmodeling__modeldesign/remotemodel/',
    );
    const workItemsRoute = nginx.indexOf(
      'location ^~ /api/ibizmodeling__modeldesign/work_items/',
    );
    const recentsRoute = nginx.indexOf(
      'location ^~ /api/ibizmodeling__modeldesign/recents/',
    );
    const businessRoute = nginx.indexOf(
      'location ^~ /api/ibizmodeling__modeldesign/ {',
    );

    expect(modelRoute).toBeGreaterThanOrEqual(0);
    expect(workItemsRoute).toBeGreaterThanOrEqual(0);
    expect(recentsRoute).toBeGreaterThanOrEqual(0);
    expect(businessRoute).toBeGreaterThan(modelRoute);
    expect(businessRoute).toBeGreaterThan(workItemsRoute);
    expect(businessRoute).toBeGreaterThan(recentsRoute);
    expect(nginx).toContain('root /app/model;');
    expect(nginx).toContain(
      'rewrite ^/api/ibizmodeling__modeldesign/(?<modeling_api_path>.*)$ $modeling_api_service_prefix/$modeling_api_path break;',
    );
    expect(nginx).toContain('proxy_pass $modeling_api_upstream;');
    expect(nginx).toMatch(
      /location \^~ \/api\/ibizmodeling__modeldesign\/dictionaries\/ \{[\s\S]*?proxy_set_header srfsystemid\s+ibizplm;[\s\S]*?proxy_set_header srforgid\s+\$plm_srforgid;/,
    );
    expect(nginx).toMatch(
      /location \^~ \/api\/ibizmodeling__modeldesign\/work_items\/ \{[\s\S]*?rewrite \^\/api\/ibizmodeling__modeldesign\/\(\.\*\)\$ \/ibizservicerunner\/serviceapi\/\$1 break;[\s\S]*?proxy_pass \$plm_upstream;[\s\S]*?proxy_set_header Authorization\s+\$http_authorization;[\s\S]*?proxy_set_header srfsystemid\s+ibizplm;[\s\S]*?proxy_set_header srforgid\s+\$plm_srforgid;/,
    );
    expect(nginx).toMatch(
      /location \^~ \/api\/ibizmodeling__modeldesign\/recents\/ \{[\s\S]*?rewrite \^\/api\/ibizmodeling__modeldesign\/\(\.\*\)\$ \/ibizservicerunner\/serviceapi\/\$1 break;[\s\S]*?proxy_pass \$plm_upstream;[\s\S]*?proxy_set_header Authorization\s+\$http_authorization;[\s\S]*?proxy_set_header srfsystemid\s+ibizplm;[\s\S]*?proxy_set_header srforgid\s+\$plm_srforgid;/,
    );
  });

  it('routes the PLM service entities without capturing or matching modeling entity prefixes', () => {
    const nginx = readFileSync(nginxConfigPath, 'utf8');
    const routeConfig = JSON.parse(
      readFileSync(plmRouteConfigPath, 'utf8'),
    ) as { routes: Array<{ uri: string; predicates: string[] }> };
    const entities = routeConfig.routes
      .filter(route => route.uri === 'lb://ibizmodeling-serviceapi')
      .flatMap(route => route.predicates)
      .filter(predicate => predicate.startsWith('Path='))
      .flatMap(predicate => predicate.slice(5).split(','))
      .map(path => path.match(/^\/ibizmodeling__plmweb\/([^/*]+)\/\*\*$/)?.[1])
      .filter((entity): entity is string => Boolean(entity));
    const upstreamMap = nginx.match(
      /map \$request_uri \$modeling_api_upstream \{([\s\S]*?)\n\}/,
    )?.[1];
    expect(upstreamMap).toBeDefined();
    expect(upstreamMap).toContain('default http://modelingservice:32002;');
    const routePattern = upstreamMap?.match(/^\s*~(\S+) http:\/\/plmservice:30251;/m)?.[1];
    expect(routePattern).toBeDefined();
    const pattern = new RegExp(routePattern!);
    for (const entity of entities) {
      for (const suffix of ['', '?size=10', '/fetch_main', '/id/nested/fetch_main?size=10']) {
        const path = `/api/ibizmodeling__modeldesign/${entity}${suffix}`;
        expect(pattern.test(path), path).toBe(true);
        expect(path.match(pattern)?.length, path).toBe(1);
      }
    }
    for (const path of [
      '/api/ibizmodeling__modeldesign/pssysapps/fetch_main',
      '/api/ibizmodeling__modeldesign/psdataentities/fetch_main',
      '/api/ibizmodeling__modeldesign/products_extra/fetch_main',
      '/api/ibizplm__plmweb/products/fetch_main',
    ]) {
      expect(pattern.test(path), path).toBe(false);
    }
    expect(nginx).toMatch(
      /map \$modeling_api_upstream \$modeling_api_service_prefix \{\s+default \/ibizmodeling\/modelapi;\s+http:\/\/plmservice:30251 \/ibizservicerunner\/serviceapi;/,
    );
    expect(nginx).toMatch(
      /map \$modeling_api_upstream \$modeling_api_system_id \{\s+default ibizmodeling;\s+http:\/\/plmservice:30251 ibizplm;/,
    );
    expect(nginx).toContain('proxy_set_header srfsystemid       $modeling_api_system_id;');
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
      '@ibiz-template-plugin/ai-chat': '0.0.60',
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

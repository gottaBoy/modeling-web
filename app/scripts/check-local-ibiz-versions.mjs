#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packagePath = path.join(appRoot, 'package.json');
const lockPath = path.join(appRoot, 'pnpm-lock.yaml');

const localPackages = {
  '@ibiz-template-plugin/ai-chat':
    '../../ibiz-app-hub/plugins/ibiz-ai-chat',
  '@ibiz-template-plugin/bi-report':
    '../../ibiz-app-hub/plugins/ibiz-bi-report',
  '@ibiz-template-plugin/data-view':
    '../../ibiz-app-hub/plugins/ibiz-data-view',
  '@ibiz-template-plugin/gantt':
    '../../ibiz-app-hub/plugins/ibiz-gantt',
  '@ibiz-template/core': '../../ibiz-app-hub/packages/core',
  '@ibiz-template/devtool':
    '../../ibiz-app-hub/plugins/ibiz-template-devtools',
  '@ibiz-template/model-helper':
    '../../ibiz-app-hub/packages/model-helper',
  '@ibiz-template/runtime': '../../ibiz-app-hub/packages/runtime',
  '@ibiz-template/theme': '../../ibiz-app-hub/packages/theme',
  '@ibiz-template/vue3-components':
    '../../ibiz-app-hub/components/ibiz-next-vue3',
  '@ibiz-template/vue3-util': '../../ibiz-app-hub/packages/vue3-util',
  '@ibiz-template/web-theme': '../../ibiz-app-hub/components/web-theme',
  '@ibiz/model-core': '../../ibiz-app-hub/models/model-core',
  '@ibiz/rt-model-api': '../../ibiz-app-hub/models/rt-model-api',
};

const appPackage = JSON.parse(readFileSync(packagePath, 'utf8'));
const lockText = readFileSync(lockPath, 'utf8');
let failed = false;

function fail(message) {
  failed = true;
  console.error(`[ibiz:versions] FAIL ${message}`);
}

function gitRevision(relativeDirectory) {
  try {
    return execFileSync(
      'git',
      ['-C', path.resolve(appRoot, relativeDirectory), 'rev-parse', 'HEAD'],
      { encoding: 'utf8' },
    ).trim();
  } catch {
    return 'unavailable';
  }
}

for (const [name, relativePath] of Object.entries(localPackages)) {
  const expectedSpecifier = `link:${relativePath}`;
  const actualSpecifier =
    appPackage.dependencies?.[name] ??
    appPackage.devDependencies?.[name] ??
    null;
  if (actualSpecifier !== expectedSpecifier) {
    fail(
      `${name} must declare ${expectedSpecifier}, found ${
        actualSpecifier ?? 'missing'
      }`,
    );
    continue;
  }

  const sourcePackagePath = path.join(appRoot, relativePath, 'package.json');
  if (!existsSync(sourcePackagePath)) {
    fail(`${name} source manifest is missing: ${sourcePackagePath}`);
    continue;
  }
  const sourcePackage = JSON.parse(readFileSync(sourcePackagePath, 'utf8'));
  if (sourcePackage.name !== name) {
    fail(`${name} source manifest name is ${sourcePackage.name}`);
  }
  if (!sourcePackage.version) {
    fail(`${name} source manifest has no version`);
  }

  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedSpecifier = expectedSpecifier.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&',
  );
  const lockEntry = new RegExp(
    `['"]?${escapedName}['"]?:\\s*\\n\\s+specifier: ${escapedSpecifier}\\s*\\n\\s+version: ${escapedSpecifier}`,
  );
  if (!lockEntry.test(lockText)) {
    fail(`${name} lockfile entry does not resolve to ${expectedSpecifier}`);
  }

  console.log(
    `[ibiz:versions] OK ${name}@${sourcePackage.version} <- ${relativePath}`,
  );
}

for (const staleVersion of ['0.0.66', '0.6.18', '0.7.0']) {
  if (lockText.includes(`@ibiz-template-plugin/ai-chat@${staleVersion}`)) {
    fail(`stale ai-chat registry version remains in pnpm-lock.yaml: ${staleVersion}`);
  }
}

console.log(`[ibiz:versions] app ${appPackage.version}`);
console.log(
  `[ibiz:versions] app-hub ${gitRevision('../../ibiz-app-hub')}`,
);
console.log(`[ibiz:versions] modelingweb ${gitRevision('..')}`);
console.log(
  `[ibiz:versions] ${Object.keys(localPackages).length} local package relation(s) checked`,
);

if (failed) process.exitCode = 1;

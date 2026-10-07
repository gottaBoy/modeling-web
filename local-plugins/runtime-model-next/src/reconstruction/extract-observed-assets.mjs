/**
 * Mechanical AST extraction for this reconstructed candidate only.
 * Originals are read-only; writes are applied as patches within src/**.
 * Run from the package root with --apply to restore observed render methods
 * and decoded CSS literals, or without it to check CSS fidelity.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { optimizeCss } from '@stencil/core/compiler/stencil.js';
import ts from 'typescript';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const workspace = resolve(packageRoot, '../../..');
const observation = resolve(
  workspace,
  'plm-web/public/plugins/@ibiz-template-plugin/model-design@0.0.3-alpha.122/es/node_modules/.pnpm/' +
  '@ibiz-template-plugin_runtime-model@0.2.2_@stencil_store@2.0.16/node_modules/' +
  '@ibiz-template-plugin/runtime-model/dist/esm/ibiz-model-runtime_4.entry.mjs',
);
const input = readFileSync(observation, 'utf8');
const original = ts.createSourceFile(observation, input, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const declarations = new Map(
  original.statements.filter(ts.isVariableStatement)
    .flatMap(statement => statement.declarationList.declarations.map(declaration =>
      [declaration.name.getText(original), declaration.initializer])),
);
const components = [
  {
    name: 'IBizModelRuntime',
    tag: 'ibiz-model-runtime',
    css: 'ibizModelRuntimeCss',
    signatures: {
      emptySvg: 'emptySvg(): VNode',
      renderEmpty: 'renderEmpty(info: RuntimeRenderChild, icon?: RuntimeRenderChild): VNode',
      render: 'render(): VNode',
    },
  },
  {
    name: 'IBizModelRuntimeList',
    tag: 'ibiz-model-runtime-list',
    css: 'ibizModelRuntimeListCss',
    signatures: {
      renderListItemContent: 'renderListItemContent(item: RuntimeItem, _index: number): VNode',
      renderListContent: 'renderListContent(): VNode',
      render: 'render(): VNode',
    },
  },
  { name: 'LoadingPanel$1', tag: 'loading-mask', css: 'loadingMaskCss', signatures: {} },
  { name: 'LoadingPanel', tag: 'loading-panel', css: 'loadingPanelCss', signatures: {} },
];

let patch = '*** Begin Patch\n';
for (const component of components) {
  const folder = `src/components/${component.tag}`;
  const cssPath = resolve(packageRoot, folder, `${component.tag}.css`);
  const literal = declarations.get(component.css);
  assert.ok(literal && ts.isStringLiteral(literal), `AST CSS literal: ${component.css}`);
  const decoded = literal.text;
  const editable = decoded.replaceAll('}', '}\n').replaceAll('{', ' {\n  ').replaceAll(';', ';\n  ');
  const previousCss = readFileSync(cssPath, 'utf8');
  assert.equal(
    await canonicalCss(previousCss, cssPath),
    await canonicalCss(decoded, `${component.tag}.observed.css`),
    `${component.tag} CSS`,
  );
  if (process.argv.includes('--apply')) {
    patch += replacement(cssPath, previousCss, `${editable.trimEnd()}\n`);
  }

  const methods = Object.entries(component.signatures);
  if (!methods.length || !process.argv.includes('--apply')) continue;
  const tsxPath = resolve(packageRoot, folder, `${component.tag}.tsx`);
  const previousTsx = readFileSync(tsxPath, 'utf8');
  const candidate = ts.createSourceFile(tsxPath, previousTsx, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const candidateClass = candidate.statements.find(ts.isClassDeclaration);
  const originalClass = declarations.get(component.name);
  assert.ok(candidateClass && originalClass && ts.isClassExpression(originalClass));
  const edits = methods.map(([name, signature]) => {
    const oldMethod = candidateClass.members.find(member => member.name?.getText(candidate) === name);
    const sourceMethod = originalClass.members.find(member => member.name?.getText(original) === name);
    assert.ok(oldMethod && sourceMethod && ts.isMethodDeclaration(sourceMethod));
    let body = sourceMethod.body.getText(original);
    body = body.replace(/ref: ref =>/g, 'ref: (ref: HTMLElement) =>');
    body = body.replace(/ref: (?:\(ref: HTMLElement\)|ref) => \(this.hiddenInput = ref\)/g,
      'ref: (ref: HTMLInputElement) => (this.hiddenInput = ref)');
    body = body.replace(/"on-click": e =>/g, '"on-click": (e: MouseEvent) =>');
    body = body.replace(/"on-click": \(e\) =>/g, '"on-click": (e: MouseEvent) =>');
    body = body.replace(/onInput: \(e\) =>/g, 'onInput: (e: Event) =>');
    body = body.replace('item.data.logicName || item.text', 'item.data!.logicName || item.text');
    return { start: oldMethod.getStart(candidate), end: oldMethod.end, text: `${signature} ${body}` };
  });
  let nextTsx = previousTsx;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    nextTsx = nextTsx.slice(0, edit.start) + edit.text + nextTsx.slice(edit.end);
  }
  patch += replacement(tsxPath, previousTsx, nextTsx);
}

if (process.argv.includes('--apply')) {
  patch += '*** End Patch\n';
  execFileSync('apply_patch', [], { cwd: workspace, input: patch, stdio: ['pipe', 'inherit', 'inherit'] });
}
console.log('4 AST CSS literals verified; no third-party code extracted.');

function replacement(path, oldText, newText) {
  const lines = text => text.replace(/\n$/, '').split('\n');
  return `*** Update File: ${relative(workspace, path)}\n@@\n` +
    lines(oldText).map(line => `-${line}\n`).join('') +
    lines(newText).map(line => `+${line}\n`).join('');
}

async function canonicalCss(input, filePath) {
  const result = await optimizeCss({ input, filePath, minify: true, autoprefixer: false });
  assert.deepEqual(result.diagnostics, [], `CSS parse/optimization: ${filePath}`);
  return result.output;
}

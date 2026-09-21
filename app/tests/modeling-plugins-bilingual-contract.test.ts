import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, createSSRApp } from 'vue';
import type { Component } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { parse as parseSfc } from 'vue/compiler-sfc';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import catalog from '../src/modeling-plugins/catalog.json';
import { createTranslator, locale, setLocale } from '../src/modeling-plugins/i18n';
import type { ModelingLocale, TranslationParams } from '../src/modeling-plugins/i18n';
import {
  errorKeys, errorText, messages as sharedMessages, pluginTitle, t, WorkspaceError,
} from '../src/modeling-plugins/messages';
import { jsonSafetyProblem } from '../src/modeling-plugins/document-safety';
import { getPlugin, plugins, validateContent } from '../src/modeling-plugins/registry';
import type { PluginContent, PluginDocument, ValidationIssue } from '../src/modeling-plugins/types';
import { graphT, messages as graphMessages } from '../src/modeling-plugins/graph/messages';
import {
  edgesOf, makeNode, nodesOf, palettes, propertyFields,
} from '../src/modeling-plugins/graph/model';
import type { GraphContent, GraphPluginId } from '../src/modeling-plugins/graph/model';
import { evaluateRules, semanticPreview } from '../src/modeling-plugins/graph/semantics';
import { layoutMessages, layoutT } from '../src/modeling-plugins/layout/messages';
import { layoutSchemas, readableContent } from '../src/modeling-plugins/layout/schema';
import type { LayoutContent, LayoutPluginId } from '../src/modeling-plugins/layout/schema';
import { addLayoutItem, propertyOptions } from '../src/modeling-plugins/layout/operations';
import { csvData } from '../src/modeling-plugins/layout/preview';
import { validateFormValues } from '../src/modeling-plugins/layout/validation';
import {
  englishMessages as toolMessages, issueText, toolIssue, toolsT,
} from '../src/modeling-plugins/tools/messages';
import type { ToolsMessageKey } from '../src/modeling-plugins/tools/messages';
import {
  consistencyReport, exportMaterial, fieldTypes, filterTasks, generateViewModel, inspectModel,
  previewSchemaImport, previewSync, settingDefinitions, taskStatuses, viewKinds,
} from '../src/modeling-plugins/tools/definitions';
import { ToolValidationError } from '../src/modeling-plugins/tools/safe';
import { PluginStore, StoreError } from '../modeling-server/store';
import GraphEditor from '../src/modeling-plugins/graph/GraphEditor.vue';
import LayoutEditor from '../src/modeling-plugins/layout/LayoutEditor.vue';
import ToolsEditor from '../src/modeling-plugins/tools/ToolsEditor.vue';

// LOCAL acceptance only: real translators, validators, Vue SSR, and file storage.
// No browser/HTTP transport or original/upstream product integration is exercised.
// X6 needs DOM globals even at import time; SSR must never construct its canvas.
const graphConstructor = vi.hoisted(() => vi.fn(() => {
  throw new Error('A browser graph must not be constructed during in-process SSR');
}));
vi.mock('@antv/x6', () => ({ Graph: graphConstructor }));

const require = createRequire(import.meta.url);
const vueParser = require('vue-eslint-parser') as typeof import('vue-eslint-parser');
const sourceRoot = fileURLToPath(new URL('../src/modeling-plugins/', import.meta.url));
const initialLocale = locale.value;
const languages = ['zh-CN', 'en'] as const;
const han = /\p{Script=Han}/u;
const userText = '\u7528\u6237\u6a21\u578b Keep /Case_09';
const keyCollision = '\u540d\u79f0';
const graphKeyCollision = '\u5f00\u59cb';
const literalReplacement = '$& $1 $$ {label} {count} \u539f\u6587';

// Independent inventory: dropping a catalog entry cannot silently drop acceptance coverage.
const localCatalog = [
  { id: 'logicdesign', family: 'graph' },
  { id: 'plm4modeling', family: 'tool' },
  { id: 'ibizappviewcreator', family: 'tool' },
  { id: 'modelperspectivetool', family: 'tool' },
  { id: 'ibizmodelingadvanced', family: 'tool' },
  { id: 'modeling-materials', family: 'tool' },
  { id: 'modeling-sync', family: 'tool' },
  { id: 'formdesign', family: 'layout' },
  { id: 'workflowdesign', family: 'graph' },
  { id: 'erdesign', family: 'graph' },
  { id: 'griddesign', family: 'layout' },
  { id: 'toolbardesign', family: 'layout' },
  { id: 'dataquerydesign', family: 'graph' },
  { id: 'menudesign', family: 'layout' },
  { id: 'treeviewdesign', family: 'layout' },
  { id: 'dataflowdesign', family: 'graph' },
  { id: 'viewdesign', family: 'layout' },
  { id: 'mddesign', family: 'layout' },
  { id: 'dashboarddesign', family: 'layout' },
  { id: 'valueruledesign', family: 'graph' },
  { id: 'chartdesign', family: 'layout' },
  { id: 'bireportdesign', family: 'layout' },
  { id: 'ibizdbschemaimporter', family: 'tool' },
] as const;
type LocalEntry = (typeof localCatalog)[number];
type LocalId = LocalEntry['id'];
type Owner = 'shared' | LocalEntry['family'];
const matrix = localCatalog.flatMap(entry => languages.map(language => ({ ...entry, language })));
const dictionaries: Record<Owner, Record<string, string>> = {
  shared: sharedMessages, graph: graphMessages, layout: layoutMessages, tool: toolMessages,
};
const translators = { shared: t, graph: graphT, layout: layoutT, tool: toolsT };
const owners = ['shared', 'graph', 'layout', 'tool'] as const;

beforeEach(() => setLocale('zh-CN'));
afterEach(() => setLocale(initialLocale));

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function placeholders(text: string): string[] {
  return [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
}

function interpolate(text: string, params: TranslationParams = {}): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(params, key) ? String(params[key] ?? '') : match);
}

function chineseFor(owner: Owner, english: string): string {
  const key = Object.keys(dictionaries[owner]).find(key => dictionaries[owner][key] === english);
  expect(key, `${owner}/messages.ts must map an actual Chinese default to "${english}"`).toBeDefined();
  return key!;
}

function expectedText(owner: Owner, english: string, language: ModelingLocale, params = {}): string {
  return interpolate(language === 'en' ? english : chineseFor(owner, english), params);
}

function assertEnglish(value: string, at: string): void {
  expect(value.trim(), at).not.toBe('');
  expect(value, at).not.toMatch(han);
  expect(value, at).toMatch(/[A-Za-z]{2,}/);
}

function otherLanguage(language: ModelingLocale): ModelingLocale {
  return language === 'en' ? 'zh-CN' : 'en';
}

interface KeyUse {
  owner: Owner;
  key: string;
  file: string;
  line: number;
  surface: 'script' | 'template';
  call: string;
}
interface Binding { owner: Owner; argument: number }

function ownerOf(file: string): Owner {
  const family = relative(sourceRoot, file).split('/')[0];
  return family === 'tools' ? 'tool' : family === 'graph' || family === 'layout' ? family : 'shared';
}

function importedBinding(name: string, source: string, file: string): Binding | undefined {
  const owner = ownerOf(resolve(dirname(file), source));
  if (['t', 'graphT', 'layoutT', 'toolsT'].includes(name)) return { owner, argument: 0 };
  if (name === 'toolIssue' || name === 'toolErrorText') return { owner: 'tool', argument: 1 };
  if (name === 'WorkspaceError') return { owner: 'shared', argument: 0 };
  return undefined;
}

function tsLiterals(expression: ts.Node | undefined): ts.StringLiteralLike[] {
  if (!expression) return [];
  if (ts.isStringLiteralLike(expression)) return [expression];
  if (ts.isParenthesizedExpression(expression) || ts.isAsExpression(expression) ||
    ts.isTypeAssertionExpression(expression) || ts.isNonNullExpression(expression) ||
    ts.isSatisfiesExpression(expression)) return tsLiterals(expression.expression);
  if (ts.isConditionalExpression(expression)) {
    return [...tsLiterals(expression.whenTrue), ...tsLiterals(expression.whenFalse)];
  }
  if (ts.isBinaryExpression(expression) &&
    [ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.BarBarToken].includes(expression.operatorToken.kind)) {
    return [...tsLiterals(expression.left), ...tsLiterals(expression.right)];
  }
  return [];
}

// Read ASTs only. Never execute a source file or rewrite it to discover keys.
function sourceKeys(file: string, source: string): KeyUse[] {
  const bindings = new Map<string, Binding>();
  const uses: KeyUse[] = [];
  const scripts: { text: string; lineOffset: number }[] = [];
  if (file.endsWith('.vue')) {
    const parsed = parseSfc(source, { filename: file });
    expect(parsed.errors, `${relative(sourceRoot, file)} SFC parse errors`).toEqual([]);
    for (const block of [parsed.descriptor.script, parsed.descriptor.scriptSetup]) {
      if (block) scripts.push({ text: block.content, lineOffset: block.loc.start.line - 1 });
    }
  } else scripts.push({ text: source, lineOffset: 0 });

  const trees = scripts.map(script => ({
    ...script, tree: ts.createSourceFile(file, script.text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS),
  }));
  for (const { tree } of trees) {
    tree.forEachChild(node => {
      if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) return;
      const source = node.moduleSpecifier.text;
      const imports = node.importClause?.namedBindings;
      if (imports && ts.isNamedImports(imports)) {
        imports.elements.forEach(specifier => {
          const binding = importedBinding((specifier.propertyName ?? specifier.name).text, source, file);
          if (binding) bindings.set(specifier.name.text, binding);
        });
      } else if (imports && ts.isNamespaceImport(imports)) {
        for (const name of ['t', 'graphT', 'layoutT', 'toolsT', 'toolIssue', 'toolErrorText']) {
          const binding = importedBinding(name, source, file);
          if (binding) bindings.set(`${imports.name.text}.${name}`, binding);
        }
      }
    });
  }
  if (file.endsWith('/messages.ts')) {
    const name = { shared: 't', graph: 'graphT', layout: 'layoutT', tool: 'toolsT' }[ownerOf(file)];
    bindings.set(name, { owner: ownerOf(file), argument: 0 });
  }
  for (const { tree, lineOffset } of trees) {
    const add = (literal: ts.StringLiteralLike, binding: Binding, call: string, key = literal.text) => {
      uses.push({
        owner: binding.owner, key, file: relative(sourceRoot, file),
        line: tree.getLineAndCharacterOfPosition(literal.getStart(tree)).line + 1 + lineOffset,
        surface: 'script', call,
      });
    };
    const visit = (node: ts.Node) => {
      if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
        const name = node.expression.getText(tree);
        const binding = bindings.get(name);
        if (binding) tsLiterals(node.arguments?.[binding.argument]).forEach(key => add(key, binding, name));
      }
      // Graph/tool validators also localize literal issue messages at their public boundary.
      if (ts.isPropertyAssignment(node) && node.name.getText(tree) === 'message') {
        const codeProperty = node.parent.properties.find(property =>
          ts.isPropertyAssignment(property) && property.name.getText(tree) === 'code');
        const code = codeProperty && ts.isPropertyAssignment(codeProperty)
          ? tsLiterals(codeProperty.initializer)[0]?.text : undefined;
        tsLiterals(node.initializer).filter(key => han.test(key.text)).forEach(key => {
          // Workspace diagnostics are rendered via errorKeys[code], not their raw server message.
          if (code && ownerOf(file) === 'shared') {
            add(key, { owner: 'shared', argument: 0 }, `errorKeys[${code}]`, errorKeys[code] ?? `UNMAPPED_ERROR_CODE:${code}`);
          } else add(key, { owner: ownerOf(file), argument: 0 }, 'validation message');
        });
      }
      // Layout's local add() helpers defer translation; inspect their Chinese validation defaults too.
      if (file.endsWith('/validation.ts') && ts.isStringLiteralLike(node) && han.test(node.text)) {
        add(node, { owner: ownerOf(file), argument: 0 }, 'validation default');
      }
      ts.forEachChild(node, visit);
    };
    visit(tree);
  }
  if (file.endsWith('.vue')) {
    const parsed = vueParser.parseForESLint(source, {
      filePath: file, parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2022, sourceType: 'module',
    });
    type Ast = { type: string; [key: string]: any };
    const literals = (node: Ast | undefined): Ast[] => {
      if (!node) return [];
      if (node.type === 'Literal' && typeof node.value === 'string') return [node];
      if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
        return [{ ...node, value: node.quasis[0].value.cooked }];
      }
      if (['TSAsExpression', 'TSTypeAssertion', 'TSNonNullExpression', 'TSSatisfiesExpression'].includes(node.type)) {
        return literals(node.expression);
      }
      if (node.type === 'ConditionalExpression') return [...literals(node.consequent), ...literals(node.alternate)];
      if (node.type === 'LogicalExpression') return [...literals(node.left), ...literals(node.right)];
      return [];
    };
    const nameOf = (node: Ast): string => node.type === 'Identifier' ? node.name :
      node.type === 'MemberExpression' && !node.computed ? `${nameOf(node.object)}.${nameOf(node.property)}` : '';
    const seen = new Set<object>();
    const visit = (value: unknown) => {
      if (!value || typeof value !== 'object' || seen.has(value)) return;
      seen.add(value);
      if (Array.isArray(value)) { value.forEach(visit); return; }
      const node = value as Ast;
      if (node.type === 'CallExpression' || node.type === 'NewExpression') {
        const name = nameOf(node.callee);
        const binding = bindings.get(name);
        if (binding) literals(node.arguments[binding.argument]).forEach(literal => uses.push({
          owner: binding.owner, key: literal.value, file: relative(sourceRoot, file),
          line: literal.loc.start.line, surface: 'template', call: name,
        }));
      }
      Object.entries(node).forEach(([key, child]) => {
        if (!['parent', 'loc', 'range', 'tokens', 'comments', 'references', 'variables'].includes(key)) visit(child);
      });
    };
    visit(parsed.ast.templateBody);
  }
  return uses;
}

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(entry => entry.isDirectory() ? sourceFiles(join(directory, entry.name)) :
      entry.name.endsWith('.ts') || entry.name.endsWith('.vue') ? [join(directory, entry.name)] : []);
}

describe.sequential('independent LOCAL bilingual dictionaries and source contracts', () => {
  it('covers exactly the 23 required local catalog IDs and their families', () => {
    expect(catalog.map(({ id, family }) => ({ id, family }))).toEqual(localCatalog);
    expect(plugins.map(({ id, family }) => ({ id, family }))).toEqual(localCatalog);
    expect(new Set(plugins.map(plugin => plugin.id)).size).toBe(23);
    expect(matrix).toHaveLength(46);
    expect(typeof window).toBe('undefined');
  });

  it.each(owners)('%s dictionary contains English and preserves Chinese placeholder keys and values', owner => {
    const dictionary = dictionaries[owner];
    const translate = translators[owner] as (key: string, params?: TranslationParams) => string;
    const snapshot = JSON.stringify(dictionary);
    const problems: string[] = [];
    for (const [key, english] of Object.entries(dictionary)) {
      const at = `${owner}/messages.ts: ${JSON.stringify(key)}`;
      if (!english.trim() || han.test(english)) problems.push(`${at}: not English: ${JSON.stringify(english)}`);
      // Format-only templates such as "{label}{index}" legitimately contain no words.
      const hasEnglishWords = /[A-Za-z]{2,}/.test(english.replace(/\{\w+\}/g, ''));
      const composedItemCount = owner === 'layout' && key === '{count} \u4e2a{item}' && english === '{item}: {count}';
      if (han.test(key) && (english === key || (!hasEnglishWords && !composedItemCount))) {
        problems.push(`${at}: missing an actual English description`);
      }
      if (JSON.stringify(placeholders(key)) !== JSON.stringify(placeholders(english))) {
        problems.push(`${at}: placeholder mismatch: ${JSON.stringify(english)}`);
      }
      const params = Object.fromEntries(placeholders(key).map(name => [name, literalReplacement]));
      for (const language of languages) {
        setLocale(language);
        expect(translate(key), at).toBe(language === 'en' ? english : key);
        expect(translate(key, params), at).toBe(interpolate(language === 'en' ? english : key, params));
      }
    }
    expect(problems).toEqual([]);
    expect(JSON.stringify(dictionary)).toBe(snapshot);
  });

  it.each(owners)('%s translator preserves false, zero, empty, null, and literal user text', owner => {
    const dictionary = dictionaries[owner];
    const key = Object.keys(dictionary).find(key => placeholders(key).length > 0)!;
    expect(key).toBeDefined();
    const translate = translators[owner] as (key: string, params?: TranslationParams) => string;
    for (const language of languages) {
      setLocale(language);
      for (const value of [false, 0, '', null, literalReplacement, keyCollision]) {
        const params = Object.fromEntries(placeholders(key).map(name => [name, value]));
        expect(translate(key, params)).toBe(interpolate(language === 'en' ? dictionary[key] : key, params));
      }
    }
  });

  it('the source scanner handles TS escapes, aliases, multiline calls, and Vue directive expressions', () => {
    const save = chineseFor('shared', 'Save model');
    const label = chineseFor('graph', 'Node label');
    const escapedSave = [...save].map(char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`).join('');
    const fixture = [
      '<script setup lang="ts">',
      'import { t as shared } from "../messages";',
      'import { graphT as graph } from "./messages";',
      `const title = shared(\n"${escapedSave}"\n);`,
      `const untouched = "${label}";`,
      '</script>',
      '<template>',
      `<button :aria-label='graph(${JSON.stringify(label)})' @click='shared(${JSON.stringify(save)})'>`,
      `{{ graph(\`${label}\`, { label: "this is user data, not a key" }) }}`,
      '</button>',
      '</template>',
    ].join('\n');
    const found = sourceKeys(join(sourceRoot, 'graph/ScannerFixture.vue'), fixture);
    expect(found.map(({ owner, key, surface }) => ({ owner, key, surface }))).toEqual([
      { owner: 'shared', key: save, surface: 'script' },
      { owner: 'graph', key: label, surface: 'template' },
      { owner: 'shared', key: save, surface: 'template' },
      { owner: 'graph', key: label, surface: 'template' },
    ]);
    expect(found.every(use => use.line > 0)).toBe(true);
    const missing = sourceKeys(join(sourceRoot, 'graph/ScannerFixture.ts'),
      'import { graphT as translated } from "./messages"; translated("missing-literal-key");');
    expect(missing).toHaveLength(1);
    expect(Object.hasOwn(graphMessages, missing[0].key)).toBe(false);
  });

  it.each(owners)('%s maps every literal TS/Vue translator call and owned validation message', owner => {
    const uses = sourceFiles(sourceRoot).flatMap(file => sourceKeys(file, readFileSync(file, 'utf8')))
      .filter(use => use.owner === owner);
    expect(uses.filter(use => use.surface === 'script').length).toBeGreaterThan(0);
    expect(uses.filter(use => use.surface === 'template').length).toBeGreaterThan(0);
    const missing = uses.filter(use => !Object.hasOwn(dictionaries[owner], use.key));
    expect(missing.map(use => `${use.file}:${use.line} ${use.call}(${JSON.stringify(use.key)})`)).toEqual([]);
  });

  it('independent English anchors cannot pass by returning keys or catalog IDs', () => {
    const anchors: [Owner, string][] = [
      ['shared', 'Save model'], ['shared', 'Upstream integration: unverified'],
      ['graph', 'Node label'], ['graph', 'Graph validation'],
      ['layout', 'Component palette'], ['layout', 'Default value'],
      ['tool', 'Conflict resolution'], ['tool', 'Task title'],
    ];
    setLocale('en');
    for (const [owner, english] of anchors) {
      const key = chineseFor(owner, english);
      expect(han.test(key)).toBe(true);
      expect(createTranslator(dictionaries[owner])(key)).toBe(english);
    }
  });

  it('layout count templates compose an actual translated item label, preserving the numeric count', () => {
    const live = computed(() => layoutT('{count} \u4e2a{item}', {
      item: layoutSchemas.formdesign.itemLabel, count: 0,
    }));
    expect(live.value).toBe('0 \u4e2a\u5b57\u6bb5');
    setLocale('en');
    expect(live.value).toBe('Field: 0');
    setLocale('zh-CN');
    expect(live.value).toBe('0 \u4e2a\u5b57\u6bb5');
  });

  it('shared safety diagnostics translate by stable error code rather than raw server wording', () => {
    let deep: PluginContent = {};
    for (let depth = 0; depth < 82; depth += 1) deep = { child: deep };
    const cases = [
      { code: 'too_deep', value: deep, english: 'The model exceeds the maximum nesting depth.' },
      { code: 'unsafe_key', value: JSON.parse('{"constructor":"user-text"}'), english: 'The model contains unsafe properties.' },
      { code: 'invalid_number', value: { amount: Infinity }, english: 'Model numbers must be finite and valid.' },
      { code: 'secret_field', value: { password: 'fixture-only' }, english: 'Credentials cannot be stored in model files.' },
    ];
    for (const test of cases) {
      const diagnostic = jsonSafetyProblem(test.value);
      expect(diagnostic?.code).toBe(test.code);
      const key = errorKeys[test.code];
      expect(key).toBeDefined();
      expect(Object.hasOwn(sharedMessages, key)).toBe(true);
      const error = new WorkspaceError(key);
      const before = JSON.stringify(diagnostic);
      const live = computed(() => errorText(error));
      for (const language of languages) {
        setLocale(language);
        expect(live.value).toBe(expectedText('shared', test.english, language));
        expect(JSON.stringify(diagnostic)).toBe(before);
      }
    }
  });

  it.skip('original/upstream integration and browser/HTTP transport are NOT TESTED by this LOCAL suite', () => {});
});

interface LabelRef { path: string; read: () => string }

function capturedLabels(entry: LocalEntry): LabelRef[] {
  const plugin = getPlugin(entry.id);
  const labels: LabelRef[] = [{ path: 'definition.title', read: () => plugin.title }];
  plugin.capabilities.forEach((_, index) =>
    labels.push({ path: `capabilities[${index}]`, read: () => plugin.capabilities[index] }));
  const append = (value: { label: string }, path: string) => labels.push({ path, read: () => value.label });
  if (entry.family === 'graph') {
    palettes[entry.id as GraphPluginId].forEach(palette => {
      append(palette, `palette.${palette.kind}`);
      propertyFields(entry.id, palette.kind).forEach(field => {
        append(field, `${palette.kind}.${field.key}`);
        field.options?.forEach(option => append(option, `${palette.kind}.${field.key}.${option.value}`));
      });
    });
  } else if (entry.family === 'layout') {
    const schema = layoutSchemas[entry.id as LayoutPluginId];
    labels.push({ path: 'schema.title', read: () => schema.title }, { path: 'schema.itemLabel', read: () => schema.itemLabel });
    const appendProperty = (property: (typeof schema.settings)[number], path: string) => {
      append(property, path);
      property.options?.forEach(option => append(option, `${path}.${option.value}`));
    };
    schema.settings.forEach(property => appendProperty(property, `settings.${property.key}`));
    schema.palette.forEach(palette => {
      append(palette, `palette.${palette.type}`);
      palette.properties.forEach(property => appendProperty(property, `${palette.type}.${property.key}`));
    });
  } else {
    if (entry.id === 'plm4modeling') taskStatuses.forEach(value => append(value, `statuses.${value.value}`));
    if (entry.id === 'ibizappviewcreator') {
      fieldTypes.forEach(value => append(value, `fieldTypes.${value.value}`));
      viewKinds.forEach(value => append(value, `viewKinds.${value.value}`));
    }
    if (entry.id === 'ibizmodelingadvanced') settingDefinitions.forEach(value => append(value, `settings.${value.key}`));
  }
  return labels;
}

interface FailureProbe {
  path: string;
  english: string;
  params?: TranslationParams;
  break: (content: PluginContent) => void;
}

const graphNode = (content: PluginContent, kind: string) =>
  (content as GraphContent).nodes.find(node => node.kind === kind)!;
const setting = (name: string, value: unknown) => (content: PluginContent) => {
  (content.settings as PluginContent)[name] = value;
};
const rangeProbe = (key: string, value: number, min: number, max: number): FailureProbe => ({
  path: `settings.${key}`, english: 'Must be an integer between {min} and {max}',
  params: { min, max }, break: setting(key, value),
});
const optionProbe = (key: string): FailureProbe => ({
  path: `settings.${key}`, english: 'Unsupported option', break: setting(key, 'user-not-an-option'),
});
const probes: Record<LocalId, FailureProbe> = {
  logicdesign: {
    path: 'nodes[1].properties.target',
    english: 'Names must start with a letter or underscore and contain only letters, digits, or underscores',
    break: content => { graphNode(content, 'assign').properties.target = ''; },
  },
  workflowdesign: {
    path: 'nodes[1].properties.dueHours', english: 'The due time must be greater than 0 and at most 87600 hours',
    break: content => { graphNode(content, 'approval').properties.dueHours = 0; },
  },
  erdesign: {
    path: 'nodes[0].properties.columns[0].nullable', english: 'Primary keys cannot be nullable',
    break: content => { (graphNode(content, 'table').properties.columns as PluginContent[])[0].nullable = true; },
  },
  dataflowdesign: {
    path: 'nodes[0].properties.records', english: 'Sample records must be an array of objects with at most 1000 rows',
    break: content => { graphNode(content, 'source').properties.records = 'user-not-an-array'; },
  },
  dataquerydesign: {
    path: 'nodes[2].properties.limit', english: 'The row limit must be an integer from 1 to 10000',
    break: content => { graphNode(content, 'select').properties.limit = 0; },
  },
  valueruledesign: {
    path: 'nodes[1].properties.operator', english: 'Unsupported comparison operator',
    break: content => { graphNode(content, 'predicate').properties.operator = 'user-not-an-operator'; },
  },
  formdesign: rangeProbe('columns', 0, 1, 3),
  griddesign: rangeProbe('pageSize', 0, 1, 100),
  toolbardesign: optionProbe('mode'),
  menudesign: optionProbe('direction'),
  treeviewdesign: { path: 'settings.checkable', english: 'Must be a boolean', break: setting('checkable', 'true') },
  viewdesign: rangeProbe('gap', -1, 0, 48),
  mddesign: rangeProbe('columns', 0, 1, 4),
  dashboarddesign: rangeProbe('gap', -1, 0, 48),
  chartdesign: optionProbe('chartType'),
  bireportdesign: rangeProbe('precision', 9, 0, 6),
  plm4modeling: {
    path: '/tasks/0/title', english: 'Task title is required',
    break: content => { content.tasks = [{ id: 'User_Task-A9', title: '', assignee: userText, status: 'todo', comments: [], modelRefs: [] }]; },
  },
  ibizappviewcreator: {
    path: '/view/kind', english: 'Unknown view type',
    break: content => { (content.view as PluginContent).kind = 'user-not-a-view'; },
  },
  modelperspectivetool: {
    path: '/query', english: 'Search query must be text', break: content => { content.query = 42; },
  },
  ibizmodelingadvanced: {
    path: '/settings/pageSize', english: 'Page size must be an integer from 1 to 500', break: setting('pageSize', 0),
  },
  'modeling-materials': {
    path: '/materials/0', english: 'Material name and category are required',
    break: content => { content.materials = [{ id: 'User_Material-A9', name: '', kind: 'entity', tags: [], model: {} }]; },
  },
  'modeling-sync': {
    path: '/incoming', english: 'Must be an object', break: content => { content.incoming = []; },
  },
  ibizdbschemaimporter: {
    path: '/schema/name', english: 'Schema name must be a valid code name',
    break: content => { (content.schema as PluginContent).name = ''; },
  },
};

function messagesOnly(issues: ValidationIssue[]): ValidationIssue[] {
  return issues.map(({ path, message }) => ({ path, message }));
}

function assertProbe(entry: LocalEntry, issues: ValidationIssue[], language: ModelingLocale): void {
  const probe = probes[entry.id];
  expect(messagesOnly(issues), `${entry.id} domain validation in ${language}`).toContainEqual({
    path: probe.path, message: expectedText(entry.family, probe.english, language, probe.params),
  });
  if (language === 'en') issues.forEach(issue => assertEnglish(issue.message, `${entry.id} ${issue.path}`));
}

function userContent(entry: LocalEntry): PluginContent {
  const content = getPlugin(entry.id).create();
  const model = {
    id: 'User_Model-A9', name: userText, caption: keyCollision,
    getPSDataEntities: [{ id: 'User_Entity-A9', name: userText, getPSDEFields: [] }],
  };
  if (entry.family === 'graph') {
    const graph = content as GraphContent;
    const ids = new Map(graph.nodes.map((node, index) => [node.id, `User_Node-${index}_A9`]));
    graph.nodes.forEach((node, index) => {
      node.id = ids.get(node.id)!;
      node.label = index === 0 ? graphKeyCollision : userText;
      node.properties.userNote = literalReplacement;
    });
    graph.edges.forEach((edge, index) => {
      edge.id = `User_Edge-${index}_A9`;
      edge.source = ids.get(edge.source)!;
      edge.target = ids.get(edge.target)!;
      edge.label = graphKeyCollision;
    });
    if (entry.id === 'valueruledesign') graph.nodes.forEach(node => { node.properties.message = userText; });
    if (entry.id === 'dataflowdesign') {
      (graphNode(content, 'source').properties.records as PluginContent[])[0].name = userText;
    }
  } else if (entry.family === 'layout') {
    const layout = content as LayoutContent;
    layout.title = userText;
    const ids = new Map(layout.items.map((item, index) => [item.id, `User_Item-${index}_A9`]));
    layout.items.forEach((item, index) => {
      item.id = ids.get(item.id)!;
      item.label = index === 0 ? keyCollision : userText;
      if (item.parentId) item.parentId = ids.get(String(item.parentId))!;
    });
    layout.data.columns[0].label = keyCollision;
    layout.data.rows[0].name = userText;
    if (entry.id === 'formdesign') layout.items.find(item => item.type === 'text')!.defaultValue = userText;
  } else {
    switch (entry.id) {
      case 'plm4modeling':
        content.model = clone(model);
        content.tasks = [{
          id: 'User_Task-A9', title: userText, assignee: keyCollision, status: 'doing',
          comments: [{ id: 'User_Comment-A9', author: keyCollision, body: literalReplacement }],
          modelRefs: ['/getPSDataEntities/0'],
        }];
        break;
      case 'ibizappviewcreator':
        content.entity = {
          id: 'User_Entity_A9', codeName: 'User_Entity_A9', name: userText,
          fields: [{ id: 'User_Field_A9', codeName: 'User_Field_A9', name: keyCollision, type: 'string', primaryKey: true, required: true }],
        };
        content.view = { codeName: 'User_View_A9', caption: userText, kind: 'grid', fieldIds: ['User_Field_A9'] };
        content.generatedModel = {};
        content.generatedModel = generateViewModel(content);
        break;
      case 'modelperspectivetool':
        content.model = clone(model);
        break;
      case 'ibizmodelingadvanced':
        content.model = clone(model);
        (content.settings as PluginContent).systemName = userText;
        break;
      case 'modeling-materials':
        content.materials = [{ id: 'User_Material-A9', name: userText, kind: keyCollision, tags: [literalReplacement], model: clone(model) }];
        content.targetModel = { id: 'User_Target-A9', name: keyCollision };
        break;
      case 'modeling-sync':
        content.base = clone(model);
        content.target = clone(model);
        content.incoming = { ...clone(model), userNote: literalReplacement };
        break;
      case 'ibizdbschemaimporter':
        content.schema = {
          name: 'User_Schema_A9', tables: [{
            name: 'User_Table_A9', label: userText,
            columns: [{ name: 'User_Field_A9', label: keyCollision, type: 'varchar', nullable: false, length: 100, default: userText }],
            primaryKey: ['User_Field_A9'], foreignKeys: [],
          }],
        };
        content.generatedModel = previewSchemaImport(content.schema as PluginContent).model;
        break;
    }
  }
  content.userExtension = {
    id: '\u539f\u59cb/Raw~ID_A9', caption: keyCollision, text: userText,
    replacements: literalReplacement, values: [0, false, '', null, 'en-US', 'zh-CN', 'Start'],
  };
  return content;
}

function nativeProjection(entry: LocalEntry, content: PluginContent): unknown {
  if (entry.family === 'graph') return {
    nodes: nodesOf(content), edges: edgesOf(content), semantic: semanticPreview(entry.id, content),
  };
  if (entry.family === 'layout') return {
    readable: readableContent(entry.id as LayoutPluginId, content), csv: csvData(content as LayoutContent),
  };
  switch (entry.id) {
    case 'plm4modeling': return filterTasks(content);
    case 'ibizappviewcreator': return generateViewModel(content);
    case 'modelperspectivetool': return inspectModel(content.model as PluginContent);
    case 'ibizmodelingadvanced': return consistencyReport(content);
    case 'modeling-materials': return exportMaterial(content, 'User_Material-A9');
    case 'modeling-sync': return previewSync(content.base as PluginContent, content.target as PluginContent, content.incoming as PluginContent);
    case 'ibizdbschemaimporter': return previewSchemaImport(content.schema as PluginContent);
    default: throw new Error('Missing native preservation probe for a local tool');
  }
}

describe.sequential('live cross-family metadata, defaults, and domain validation', () => {
  it.each(localCatalog)('$id retranslates captured metadata without changing existing defaults', entry => {
    const plugin = getPlugin(entry.id);
    const draft = plugin.create();
    const before = JSON.stringify(draft);
    const labels = capturedLabels(entry);
    const live = computed(() => labels.map(label => label.read()));
    const chinese = [...live.value];
    const catalogBefore = JSON.stringify(catalog);
    expect(pluginTitle(entry.id)).toBe(catalog.find(item => item.id === entry.id)!.title);
    expect(labels.length).toBeGreaterThan(1);
    setLocale('en');
    const expected = chinese.map((key, index) => {
      expect(Object.hasOwn(dictionaries[entry.family], key), `${entry.id} ${labels[index].path}: ${key}`).toBe(true);
      return dictionaries[entry.family][key];
    });
    expect(live.value).toEqual(expected);
    live.value.forEach((value, index) => assertEnglish(value, `${entry.id} ${labels[index].path}`));
    assertEnglish(pluginTitle(entry.id), `${entry.id} navigation title`);
    expect(pluginTitle(entry.id)).not.toBe(entry.id);
    expect(validateContent(entry.id, draft)).toEqual([]);
    expect(JSON.stringify(draft)).toBe(before);
    setLocale('zh-CN');
    expect(live.value).toEqual(chinese);
    expect(JSON.stringify(draft)).toBe(before);
    expect(JSON.stringify(catalog)).toBe(catalogBefore);
  });

  it.each(matrix)('$id [$language] creates independent valid defaults and rejects malformed roots', entry => {
    setLocale(entry.language);
    const plugin = getPlugin(entry.id);
    const first = plugin.create();
    const second = plugin.create();
    expect(first).not.toBe(second);
    expect(validateContent(entry.id, first)).toEqual([]);
    expect(validateContent(entry.id, second)).toEqual([]);
    const before = JSON.stringify(second);
    first.acceptanceOnly = userText;
    expect(JSON.stringify(second)).toBe(before);
    for (const invalid of [null, [], 'user-text', 0]) {
      expect(validateContent(entry.id, invalid)).toEqual([{
        path: 'content', message: expectedText('shared', 'Model content must be a JSON object.', entry.language),
      }]);
    }
    const emptyIssues = validateContent(entry.id, {});
    expect(emptyIssues.length).toBeGreaterThan(0);
    expect(emptyIssues.some(issue => issue.message === expectedText('shared',
      'The model structure does not match the plugin contract.', entry.language))).toBe(false);
    if (entry.language === 'en') emptyIssues.forEach(issue => assertEnglish(issue.message, `${entry.id} ${issue.path}`));
  });

  it.each(matrix)('$id [$language] retranslates a retained invalid draft with unchanged issue paths', entry => {
    setLocale(entry.language);
    const invalid = getPlugin(entry.id).create();
    probes[entry.id].break(invalid);
    const before = JSON.stringify(invalid);
    const live = computed(() => validateContent(entry.id, invalid));
    const initial = messagesOnly(live.value);
    assertProbe(entry, live.value, entry.language);
    setLocale(otherLanguage(entry.language));
    assertProbe(entry, live.value, otherLanguage(entry.language));
    expect(live.value.map(issue => issue.path)).toEqual(initial.map(issue => issue.path));
    expect(messagesOnly(live.value)).not.toEqual(initial);
    expect(JSON.stringify(invalid)).toBe(before);
    setLocale(entry.language);
    expect(messagesOnly(live.value)).toEqual(initial);
    expect(JSON.stringify(invalid)).toBe(before);
  });

  it.each(localCatalog)('$id preserves native user text, generated output, IDs, and unknown fields', entry => {
    const content = userContent(entry);
    expect(validateContent(entry.id, content)).toEqual([]);
    const before = JSON.stringify(content);
    const projection = JSON.stringify(nativeProjection(entry, content));
    for (const language of ['en', 'zh-CN', 'en'] as const) {
      setLocale(language);
      capturedLabels(entry).forEach(label => label.read());
      expect(validateContent(entry.id, content)).toEqual([]);
      expect(JSON.stringify(nativeProjection(entry, content))).toBe(projection);
      expect(JSON.stringify(content)).toBe(before);
    }
  });

  it.each(localCatalog.filter(entry => entry.family !== 'tool'))('$id localizes new palette labels but never existing items', entry => {
    const content = getPlugin(entry.id).create();
    const before = JSON.stringify(content);
    if (entry.family === 'graph') {
      const id = entry.id as GraphPluginId;
      for (const palette of palettes[id]) {
        setLocale('zh-CN');
        const chinese = makeNode(id, palette.kind, 'User_New_Node-A9');
        const snapshot = JSON.stringify(chinese);
        const label = chinese.label;
        setLocale('en');
        const english = makeNode(id, palette.kind, 'User_New_Node-A9');
        expect(english.id).toBe(chinese.id);
        expect(english.kind).toBe(chinese.kind);
        expect(english.label).toBe(graphMessages[label]);
        expect(JSON.stringify(chinese)).toBe(snapshot);
      }
    } else {
      const id = entry.id as LayoutPluginId;
      for (const palette of layoutSchemas[id].palette) {
        setLocale('zh-CN');
        const chinese = addLayoutItem(id, content as LayoutContent, palette.type);
        expect(chinese.items.length, `${id}/${palette.type}`).toBe((content as LayoutContent).items.length + 1);
        const snapshot = JSON.stringify(chinese);
        const chineseLabel = palette.label;
        const count = (content as LayoutContent).items.filter(item => item.type === palette.type).length + 1;
        setLocale('en');
        const english = addLayoutItem(id, content as LayoutContent, palette.type);
        const added = english.items[english.items.length - 1];
        expect(added.label).toBe(`${layoutMessages[chineseLabel]} ${count}`);
        expect(added.id).toBe(chinese.items[chinese.items.length - 1].id);
        expect(validateContent(id, english)).toEqual([]);
        expect(JSON.stringify(chinese)).toBe(snapshot);
      }
    }
    expect(JSON.stringify(content)).toBe(before);
  });

  it('layout dynamic options translate the root option while retaining user labels and IDs', () => {
    const entry = localCatalog.find(entry => entry.id === 'viewdesign')!;
    const content = userContent(entry) as LayoutContent;
    const schema = layoutSchemas.viewdesign;
    const parent = schema.palette[0].properties.find(property => property.source === 'parents')!;
    const field = schema.palette.find(palette => palette.type === 'form')!.properties.find(property => property.source === 'fields')!;
    const before = JSON.stringify(content);
    for (const language of languages) {
      setLocale(language);
      const options = propertyOptions(parent, content);
      expect(options[0]).toEqual({ value: '', label: expectedText('layout', 'Root', language) });
      expect(options.slice(1)).toEqual(content.items.filter(item => item.type === 'container')
        .map(item => ({ value: item.id, label: item.label })));
      expect(propertyOptions(field, content)).toEqual(content.data.columns
        .map(column => ({ value: column.key, label: `${column.label} (${column.key})` })));
    }
    expect(JSON.stringify(content)).toBe(before);
  });

  it('form default validation re-translates its message, not the user caption or field ID', () => {
    const entry = localCatalog.find(entry => entry.id === 'formdesign')!;
    const content = userContent(entry) as LayoutContent;
    const field = content.items.find(item => item.required === true)!;
    field.label = keyCollision;
    const before = JSON.stringify(content);
    const live = computed(() => validateFormValues(content, {}));
    for (const language of ['zh-CN', 'en', 'zh-CN'] as const) {
      setLocale(language);
      expect(live.value).toContainEqual({
        path: field.id, message: expectedText('layout', '{label}: required', language, { label: keyCollision }),
      });
      expect(JSON.stringify(content)).toBe(before);
    }
  });

  it('rule default failure text is live, while an explicitly supplied identical Chinese message is data', () => {
    const content = getPlugin('valueruledesign').create() as GraphContent;
    const key = chineseFor('graph', 'Condition not satisfied');
    content.nodes.forEach(node => { delete node.properties.message; });
    const sample = { age: 0, status: 'inactive' };
    const live = computed(() => evaluateRules(content, sample));
    const before = JSON.stringify(content);
    for (const language of languages) {
      setLocale(language);
      const result = live.value;
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error(JSON.stringify(result.issues));
      expect(result.value.passed).toBe(false);
      expect(result.value.results.filter(item => !item.passed).map(item => item.message))
        .toEqual(content.nodes.map(() => language === 'en' ? 'Condition not satisfied' : key));
      expect(JSON.stringify(content)).toBe(before);
    }
    content.nodes.forEach(node => { node.properties.message = key; });
    setLocale('en');
    const result = evaluateRules(content, sample);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error(JSON.stringify(result.issues));
    expect(result.value.results.filter(item => !item.passed).every(item => item.message === key)).toBe(true);
  });

  it.each(localCatalog.filter(entry => entry.family === 'tool'))('$id retains and retranslates actual ToolValidationError instances', entry => {
    const content = getPlugin(entry.id).create();
    probes[entry.id].break(content);
    const error = new ToolValidationError(validateContent(entry.id, content));
    const paths = error.issues.map(issue => issue.path);
    const before = JSON.stringify(content);
    const live = computed(() => error.message);
    for (const language of ['zh-CN', 'en', 'zh-CN'] as const) {
      setLocale(language);
      expect(live.value).toContain(expectedText('tool', probes[entry.id].english, language, probes[entry.id].params));
      expect(error.issues.map(issue => issue.path)).toEqual(paths);
      expect(JSON.stringify(content)).toBe(before);
    }
  });

  it('tool diagnostics interpolate opaque user paths, references, and IDs without translating them', () => {
    const id = '\u7528\u6237/Raw~ID $& {id}';
    const key = chineseFor('tool', 'Duplicate sibling model identifier: {id}') as ToolsMessageKey;
    const issue = toolIssue(`/models/${id}`, key, { id });
    const before = JSON.stringify(issue);
    for (const language of languages) {
      setLocale(language);
      expect(issueText(issue)).toBe(expectedText('tool', 'Duplicate sibling model identifier: {id}', language, { id }));
      expect(issue.path).toBe(`/models/${id}`);
      expect(JSON.stringify(issue)).toBe(before);
    }
  });
});

const editors: Record<LocalEntry['family'], Component> = {
  graph: GraphEditor, layout: LayoutEditor, tool: ToolsEditor,
};

describe.sequential('all 23 LOCAL editors through Vue SSR (no browser rendering)', () => {
  it.each(matrix)('$id [$language] renders defaults, user content, and actual domain validation failures', async entry => {
    setLocale(entry.language);
    const render = async (content: PluginContent) => {
      const before = JSON.stringify(content);
      const html = await renderToString(createSSRApp(editors[entry.family], {
        pluginId: entry.id, modelValue: content,
      }));
      expect(JSON.stringify(content)).toBe(before);
      expect(html).toContain(`data-plugin-id="${entry.id}"`);
      expect(graphConstructor).not.toHaveBeenCalled();
      return html;
    };
    const defaults = getPlugin(entry.id).create();
    expect(validateContent(entry.id, defaults)).toEqual([]);
    const html = await render(defaults);
    if (entry.family === 'graph') expect(html).toContain(expectedText('graph', 'Graph validation', entry.language));
    else if (entry.family === 'layout') expect(html).toContain(expectedText('layout', 'Component palette', entry.language));
    else expect(html).toContain(getPlugin(entry.id).title);

    const user = userContent(entry);
    expect(validateContent(entry.id, user)).toEqual([]);
    const userHtml = await render(user);
    expect(userHtml).toContain(userText);
    const snapshot = JSON.stringify(user);
    setLocale(otherLanguage(entry.language));
    expect(await render(user)).toContain(userText);
    expect(JSON.stringify(user)).toBe(snapshot);

    setLocale(entry.language);
    probes[entry.id].break(defaults);
    assertProbe(entry, validateContent(entry.id, defaults), entry.language);
    const failedHtml = await render(defaults);
    expect(failedHtml).toContain(expectedText(entry.family, probes[entry.id].english, entry.language, probes[entry.id].params));
    setLocale(otherLanguage(entry.language));
    expect(await render(defaults)).toContain(expectedText(entry.family, probes[entry.id].english,
      otherLanguage(entry.language), probes[entry.id].params));
  });
});

describe.sequential('real PluginStore bilingual save/reload, not browser or original integration', () => {
  let directory: string;
  beforeAll(async () => { directory = await mkdtemp(join(tmpdir(), 'modeling-bilingual-contract-')); });
  afterAll(async () => { if (directory) await rm(directory, { recursive: true, force: true }); });

  it.each(matrix)('$id [$language] saves defaults and native user data across locale switches and fresh stores', async entry => {
    setLocale(entry.language);
    const store = new PluginStore(join(directory, entry.language));
    for (const [kind, content] of [
      ['defaults', getPlugin(entry.id).create()], ['user', userContent(entry)],
    ] as const) {
      setLocale(entry.language);
      expect(validateContent(entry.id, content)).toEqual([]);
      const draft: PluginDocument = {
        schemaVersion: 1, id: `User_${kind}-A9`, pluginId: entry.id,
        title: `${userText} ${kind}`, revision: 0, updatedAt: '', content,
      };
      const before = JSON.stringify(draft);
      const saved = await store.save(entry.id, draft.id, draft);
      expect(saved).toMatchObject({ id: draft.id, pluginId: entry.id, title: draft.title, revision: 1, content });
      expect(JSON.stringify(draft)).toBe(before);
      const path = join(store.root, entry.id, `${draft.id}.json`);
      const savedBytes = await readFile(path, 'utf8');
      expect(JSON.parse(savedBytes)).toEqual(saved);

      setLocale(otherLanguage(entry.language));
      const fresh = new PluginStore(store.root);
      const reloaded = await fresh.get(entry.id, draft.id);
      expect(reloaded).toEqual(saved);
      expect(validateContent(entry.id, reloaded.content)).toEqual([]);
      expect(await fresh.list(entry.id)).toContainEqual(saved);
      expect(await fresh.save(entry.id, draft.id, draft)).toEqual(saved);
      expect(await readFile(path, 'utf8')).toBe(savedBytes);

      const revised = await fresh.save(entry.id, draft.id, reloaded);
      expect(revised.revision).toBe(2);
      expect(revised.content).toEqual(content);
      expect(revised.title).toBe(draft.title);
      const revisedBytes = await readFile(path, 'utf8');
      const invalid = clone(revised);
      probes[entry.id].break(invalid.content);
      const rejected = await fresh.save(entry.id, draft.id, invalid).then(
        () => undefined, (error: unknown) => error,
      );
      expect(rejected).toBeInstanceOf(StoreError);
      expect(rejected).toMatchObject({ status: 422, code: 'validation_failed' });
      expect((rejected as StoreError).message).toContain(expectedText(entry.family,
        probes[entry.id].english, otherLanguage(entry.language), probes[entry.id].params));
      expect(await readFile(path, 'utf8')).toBe(revisedBytes);

      setLocale(entry.language);
      expect(await new PluginStore(store.root).get(entry.id, draft.id)).toEqual(revised);
      expect(JSON.stringify(draft)).toBe(before);
      expect(await readdir(join(store.root, entry.id))).toEqual(kind === 'defaults'
        ? ['User_defaults-A9.json'] : ['User_defaults-A9.json', 'User_user-A9.json']);
    }
  });
});

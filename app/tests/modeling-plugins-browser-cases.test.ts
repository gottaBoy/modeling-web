import { afterEach, expect, it } from 'vitest';
import { domainCases, assertDomainEdit, invalidDomainDocument } from '../../../scripts/modeling-browser-cases.mjs';
import catalog from '../src/modeling-plugins/catalog.json';
import { getPlugin, validateContent } from '../src/modeling-plugins/registry';
import { setLocale } from '../src/modeling-plugins/i18n';
import { addNode, isGraphPluginId } from '../src/modeling-plugins/graph/model';
import { addLayoutItem } from '../src/modeling-plugins/layout/operations';
import type { LayoutContent, LayoutPluginId } from '../src/modeling-plugins/layout/schema';
import {
  addTask, addWizardField, addPerspectiveEntity, updateSettings,
  addMaterial, addSyncChange, addSchemaTable,
} from '../src/modeling-plugins/tools/definitions';
import type { PluginContent, PluginDocument } from '../src/modeling-plugins/types';

// The browser's probes are checked against real domain operations/validators.
// This test deliberately does not claim any browser or HTTP execution.
const operations: Record<string, (content: PluginContent) => PluginContent> = {
  plm4modeling: addTask,
  ibizappviewcreator: addWizardField,
  modelperspectivetool: addPerspectiveEntity,
  ibizmodelingadvanced: content => updateSettings(content, {
    pageSize: Number((content.settings as PluginContent).pageSize) % 500 + 1,
  }),
  'modeling-materials': addMaterial,
  'modeling-sync': addSyncChange,
  ibizdbschemaimporter: addSchemaTable,
};
afterEach(() => setLocale('zh-CN'));

it('the browser case inventory contains all 23 plugins without generic fallback', () => {
  expect(Object.keys(domainCases).sort()).toEqual(catalog.map(item => item.id).sort());
  expect(() => invalidDomainDocument({ pluginId: 'unknown' })).toThrow();
});

it('sync browser assertion rejects replacing existing inputs while adding keys', () => {
  const before = { id: 'fixture', pluginId: 'modeling-sync', revision: 0, content: getPlugin('modeling-sync').create() };
  const after = { ...before, content: { ...before.content, incoming: { entity_1: {}, entity_2: {} } } };
  expect(() => assertDomainEdit('modeling-sync', before, after)).toThrow(/existing input/);
});

it.each(catalog.flatMap(entry => ['zh-CN', 'en'].map(language => ({ ...entry, language }))))(
  '$id ($language) browser add/invalid probes preserve identity and test actual domain validation',
  ({ id, family, language }) => {
    setLocale(language);
    const content = getPlugin(id).create();
    const original = JSON.stringify(content);
    const edited = isGraphPluginId(id) ? addNode(content, id) :
      family === 'layout' ? addLayoutItem(id as LayoutPluginId, content as LayoutContent) :
        operations[id](content);
    const before: PluginDocument = {
      schemaVersion: 1, id: 'browser-fixture', pluginId: id,
      title: 'Harness fixture domain', revision: 0, updatedAt: '', content,
    };
    const after = { ...before, content: edited };
    expect(() => assertDomainEdit(id, before, after)).not.toThrow();
    expect(validateContent(id, edited)).toEqual([]);
    expect(() => assertDomainEdit(id, before, before)).toThrow();
    const snapshot = JSON.stringify(after);
    const invalid = invalidDomainDocument(after);
    const issues = validateContent(id, invalid.content);
    expect(issues.length).toBeGreaterThan(0);
    if (language === 'en') expect(issues.map(issue => issue.message).join(' ')).not.toMatch(/\p{Script=Han}/u);
    expect(invalid.id).toBe(before.id);
    expect(invalid.revision).toBe(before.revision);
    expect(JSON.stringify(content)).toBe(original);
    expect(JSON.stringify(after)).toBe(snapshot);
  },
);

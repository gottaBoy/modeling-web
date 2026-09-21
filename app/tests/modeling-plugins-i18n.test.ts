import { afterEach, describe, expect, it, vi } from 'vitest';
import { locale, normalizeLocale, setLocale, createTranslator, initializeLocale } from '../src/modeling-plugins/i18n';
import { errorKeys, errorText, messages, pluginTitle, t, WorkspaceError } from '../src/modeling-plugins/messages';
import catalog from '../src/modeling-plugins/catalog.json';
import { plugins, validateContent } from '../src/modeling-plugins/registry';

afterEach(() => { vi.unstubAllGlobals(); setLocale('zh-CN'); });

describe('shared bilingual workspace', () => {
  it('normalizes locale aliases without requiring a browser', () => {
    for (const value of ['en', 'en-US', 'EN_gb']) expect(normalizeLocale(value)).toBe('en');
    for (const value of ['zh-CN', 'zh-cn', '', 'unsupported']) expect(normalizeLocale(value)).toBe('zh-CN');
  });

  it('persists a changed language without losing the selected document URL', () => {
    const location = {
      href: 'http://localhost/modeling-plugins.html?lang=zh-CN#/formdesign?document=example',
      search: '?lang=zh-CN',
    };
    const storage = new Map<string, string>();
    const browser = {
      location,
      navigator: { language: 'zh-CN' },
      document: { documentElement: { lang: '' }, title: '' },
      history: {
        state: { retained: true },
        replaceState: vi.fn((_state, _title, url: URL) => {
          location.href = url.href;
          location.search = url.search;
        }),
      },
      localStorage: {
        getItem: (key: string) => storage.get(key),
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    };
    vi.stubGlobal('window', browser);
    initializeLocale();
    setLocale('en-US');
    expect(storage.get('modeling.language')).toBe('en');
    expect(location.href).toBe('http://localhost/modeling-plugins.html?lang=en#/formdesign?document=example');
    initializeLocale();
    expect(locale.value).toBe('en');
    expect(browser.document.documentElement.lang).toBe('en');
    expect(browser.history.state).toEqual({ retained: true });
  });

  it('can initialize and switch languages with browser storage disabled', () => {
    vi.stubGlobal('window', {
      location: { href: 'http://localhost/modeling-plugins.html', search: '' },
      navigator: { language: 'en-GB' },
      document: { documentElement: { lang: '' }, title: '' },
      localStorage: {
        getItem: () => { throw new Error('storage disabled'); },
        setItem: () => { throw new Error('storage disabled'); },
      },
    });
    initializeLocale();
    expect(locale.value).toBe('en');
    expect(() => setLocale('zh-CN')).not.toThrow();
    expect(locale.value).toBe('zh-CN');
  });

  it('keeps Chinese defaults and translates every shared message with matching placeholders', () => {
    const params = (value: string) => [...value.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
    for (const [chinese, english] of Object.entries(messages)) {
      expect(english).not.toMatch(/[\u3400-\u9fff]/u);
      expect(params(chinese)).toEqual(params(english));
      setLocale('zh-CN');
      expect(t(chinese as keyof typeof messages)).toBe(chinese);
      setLocale('en');
      expect(t(chinese as keyof typeof messages)).toBe(english);
    }
  });

  it('preserves zero, false, and literal replacement symbols in interpolation', () => {
    const translate = createTranslator({ '值：{value}': 'Value: {value}' });
    setLocale('en');
    expect(translate('值：{value}', { value: 0 })).toBe('Value: 0');
    expect(translate('值：{value}', { value: false })).toBe('Value: false');
    expect(translate('值：{value}', { value: '$& {other}' })).toBe('Value: $& {other}');
    expect(translate('值：{value}')).toBe('Value: {value}');
  });

  it('has meaningful titles for all 23 IDs, without rewriting catalog data', () => {
    const before = JSON.stringify(catalog);
    for (const entry of catalog) {
      setLocale('zh-CN');
      expect(pluginTitle(entry.id)).toBe(entry.title);
      setLocale('en');
      expect(pluginTitle(entry.id)).not.toBe(entry.id);
      expect(pluginTitle(entry.id)).not.toMatch(/[\u3400-\u9fff]/u);
    }
    expect(JSON.stringify(catalog)).toBe(before);
  });

  it('language changes preserve every existing draft and its Chinese user content', () => {
    setLocale('zh-CN');
    for (const plugin of plugins) {
      const draft = { title: '用户自己的中文标题', content: plugin.create() };
      const before = JSON.stringify(draft);
      setLocale('en');
      expect(validateContent(plugin.id, draft.content)).toEqual([]);
      pluginTitle(plugin.id);
      setLocale('zh-CN');
      expect(JSON.stringify(draft)).toBe(before);
    }
  });

  it('retains error identity and re-translates existing errors on language switch', () => {
    const error = new WorkspaceError(errorKeys.revision_conflict);
    setLocale('zh-CN');
    expect(errorText(error)).toContain('当前修改仍保留');
    setLocale('en');
    expect(errorText(error)).toContain('current edits are retained');
    expect(locale.value).toBe('en');
    expect(errorText(error)).not.toMatch(/[\u3400-\u9fff]/u);
  });
});

import type { IAppView } from '@ibiz/model-core';
import type { ModelLoaderProvider } from '@ibiz-template/runtime';
import english from './en.json';

const labels: Record<string, string> = english;
const displayKeys = new Set([
  'caption',
  'text',
  'title',
  'tooltip',
  'emptyText',
  'placeHolder',
  'placeholder',
  'editorPlaceHolder',
  'excelCaption',
  'editItemCaption',
  'lnname',
  'ruleInfo',
  'nextCaption',
  'prevCaption',
  'finishCaption',
  'cancelCaption',
]);

export function translateModelLabel(value: string): string {
  return Object.prototype.hasOwnProperty.call(labels, value)
    ? labels[value]
    : value;
}

export function localizeModel<T>(model: T): T {
  if (Array.isArray(model)) return model.map(item => localizeModel(item)) as T;
  if (!model || typeof model !== 'object') return model;
  const result: Record<string, unknown> = {};
  Object.entries(model).forEach(([key, value]) => {
    let translated = value;
    if (displayKeys.has(key) && typeof value === 'string') {
      translated = translateModelLabel(value);
    } else if (key === 'appDEFields' && Array.isArray(value)) {
      translated = value.map(field => {
        const localized = localizeModel(field);
        if (field && typeof field.logicName === 'string') {
          localized.logicName = translateModelLabel(field.logicName);
        }
        return localized;
      });
    } else if (typeof value === 'object') {
      translated = localizeModel(value);
    }
    Object.defineProperty(result, key, {
      value: translated,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  });
  return result as T;
}

const installed = new WeakSet<object>();
const methods = [
  'getApp',
  'getAppView',
  'getAppDataEntity',
  'getAppDataEntityByCodeName',
  'loadAppView',
  'translationModelToDsl',
];

interface LocaleHost {
  env: { appId: string };
  i18n: { getLang(): string };
  hub: { registerModelLoaderProvider(provider: ModelLoaderProvider): void };
  util: { layoutPanel: { fill(model: IAppView): IAppView } };
}

export function installModelLocale(host: LocaleHost): void {
  const { hub } = host;
  if (installed.has(hub)) return;
  const englishMode = (): boolean => /^en(?:[-_]|$)/i.test(host.i18n.getLang());
  const register = hub.registerModelLoaderProvider;
  hub.registerModelLoaderProvider = (provider: ModelLoaderProvider): void => {
    const original = provider as unknown as Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    >;
    const adapter = Object.create(provider) as typeof original;
    methods.forEach(name => {
      if (typeof original[name] !== 'function') return;
      adapter[name] = async (...args: unknown[]): Promise<unknown> => {
        const result = await original[name].apply(provider, args);
        const appId =
          name === 'translationModelToDsl'
            ? host.env.appId
            : args[0] || host.env.appId;
        return englishMode() &&
          typeof appId === 'string' &&
          /^ibizmodeling__/i.test(appId)
          ? localizeModel(result)
          : result;
      };
    });
    register.call(hub, adapter as unknown as ModelLoaderProvider);
  };
  const layout = host.util.layoutPanel;
  const fill = layout.fill;
  layout.fill = (model: IAppView): IAppView => {
    const result = fill.call(layout, model);
    return englishMode() &&
      /^ibizmodeling__/i.test(result.appId || '') &&
      result.viewLayoutPanel
      ? { ...result, viewLayoutPanel: localizeModel(result.viewLayoutPanel) }
      : result;
  };
  installed.add(hub);
}

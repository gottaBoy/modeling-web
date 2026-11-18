import type { IAppCodeList, IAppView, ICodeItem } from '@ibiz/model-core';
import type {
  CodeListItem,
  IApiCodeListService,
  ModelLoaderProvider,
} from '@ibiz-template/runtime';
import english from './en.json';
import codeListLabels from './code-list-labels.json';

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
  'realTitle',
]);
const dataKeys = new Set([
  'data',
  'userData',
  'editorParams',
  'controlParams',
  'viewParamJO',
  'parentDataJO',
]);
interface ReviewedCodeList {
  emptyText?: string;
  items: Record<string, string>;
}
const staticCodeLists: Record<string, ReviewedCodeList> = codeListLabels;

export function translateModelLabel(value: string): string {
  return Object.prototype.hasOwnProperty.call(labels, value)
    ? labels[value]
    : value;
}

const installed = new WeakSet<object>();
const methods = [
  'initApp',
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
  hub: {
    registerModelLoaderProvider(provider: ModelLoaderProvider): void;
    getApp?(appId?: string):
      | {
          codeList?: IApiCodeListService & {
            setCodeList?(model: IAppCodeList): void;
          };
        }
      | undefined;
  };
  util: { layoutPanel: { fill(model: IAppView): IAppView } };
}

const localizedCodeLists = new WeakSet<object>();

function localizeCodeListLabel<
  T extends { text?: string; value?: string | number },
>(item: T, reviewed: ReviewedCodeList): T {
  const value = String(item.value);
  return Object.prototype.hasOwnProperty.call(reviewed.items, value) &&
    reviewed.items[value] === item.text
    ? { ...item, text: translateModelLabel(item.text) }
    : item;
}

function localizeCodeListItems(
  items: readonly CodeListItem[],
  reviewed: ReviewedCodeList,
): CodeListItem[] {
  return items.map(item => ({
    ...localizeCodeListLabel(item, reviewed),
    ...(Array.isArray(item.children)
      ? { children: localizeCodeListItems(item.children, reviewed) }
      : {}),
  }));
}

function localizeCodeListModel(
  model: IAppCodeList,
  reviewed: ReviewedCodeList,
): IAppCodeList {
  const items = (values: ICodeItem[]): ICodeItem[] =>
    values.map(item => ({
      ...localizeCodeListLabel(item, reviewed),
      ...(item.codeItems ? { codeItems: items(item.codeItems) } : {}),
    }));
  return {
    ...model,
    ...(model.emptyText && model.emptyText === reviewed.emptyText
      ? { emptyText: translateModelLabel(model.emptyText) }
      : {}),
    ...(model.codeItems ? { codeItems: items(model.codeItems) } : {}),
  };
}

export function localizeModel<T>(model: T): T {
  if (Array.isArray(model)) return model.map(item => localizeModel(item)) as T;
  if (!model || typeof model !== 'object') return model;
  if (Object.prototype.hasOwnProperty.call(model, 'codeListType')) {
    const codeList = model as unknown as IAppCodeList;
    return codeList.codeListType === 'STATIC' &&
      Object.prototype.hasOwnProperty.call(
        staticCodeLists,
        codeList.codeName || '',
      )
      ? (localizeCodeListModel(
          codeList,
          staticCodeLists[codeList.codeName!],
        ) as T)
      : model;
  }
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
    } else if (!dataKeys.has(key) && typeof value === 'object') {
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

function installCodeListLocale(
  host: LocaleHost,
  appId: string,
  englishMode: () => boolean,
): void {
  const service = host.hub.getApp?.(appId)?.codeList;
  if (!service?.setCodeList || localizedCodeLists.has(service)) return;
  const models = new Map<string, IAppCodeList>();
  const setCodeList = service.setCodeList.bind(service);
  service.setCodeList = (model): void => {
    setCodeList(model);
    if (model.id) models.set(model.id, model);
    if (model.codeName) models.set(model.codeName, model);
  };
  const getCodeList = service.getCodeList.bind(service);
  // getCodeList merges sub-app models; label checks must not invoke that path.
  const reviewedLabels = (
    model?: IAppCodeList,
  ): ReviewedCodeList | undefined =>
    englishMode() &&
    model?.codeListType === 'STATIC' &&
    Object.prototype.hasOwnProperty.call(staticCodeLists, model.codeName || '')
      ? staticCodeLists[model!.codeName!]
      : undefined;
  const get = service.get.bind(service);
  const getItem = service.getItem.bind(service);
  service.get = async (
    tag,
    context,
    params,
  ): Promise<readonly CodeListItem[]> => {
    const items = await get(tag, context, params);
    const reviewed = reviewedLabels(models.get(tag));
    return reviewed ? localizeCodeListItems(items, reviewed) : items;
  };
  service.getItem = async (
    tag,
    value,
    context,
    params,
  ): Promise<CodeListItem | undefined> => {
    const item = await getItem(tag, value, context, params);
    const reviewed = reviewedLabels(models.get(tag));
    if (!item || !reviewed) return item;
    return localizeCodeListItems([item], reviewed)[0];
  };
  service.getCodeList = (tag): IAppCodeList | undefined => {
    const model = getCodeList(tag);
    const reviewed = reviewedLabels(model);
    if (!model || !reviewed) return model;
    return localizeCodeListModel(model, reviewed);
  };
  localizedCodeLists.add(service);
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
        const appId =
          name === 'translationModelToDsl'
            ? host.env.appId
            : args[0] || host.env.appId;
        const modelingApp =
          typeof appId === 'string' && /^ibizmodeling__/i.test(appId);
        if (name === 'initApp' && modelingApp) {
          installCodeListLocale(host, appId, englishMode);
        }
        const result = await original[name].apply(provider, args);
        const localized =
          englishMode() && modelingApp ? localizeModel(result) : result;
        return localized;
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

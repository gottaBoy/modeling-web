import { ref } from 'vue';

export type ModelingLocale = 'zh-CN' | 'en';
export type TranslationParams = Record<string, unknown>;

export const locale = ref<ModelingLocale>('zh-CN');

export function normalizeLocale(value: string): ModelingLocale {
  return /^en(?:-|$)/i.test(value.trim().replace(/_/g, '-')) ? 'en' : 'zh-CN';
}

export function setLocale(value: string): void {
  locale.value = normalizeLocale(value);
  if (typeof window === 'undefined') return;
  window.document.documentElement.lang = locale.value;
  window.document.title = locale.value === 'en' ? 'iBiz Modeling' : 'iBiz 建模';
  const url = new URL(window.location.href);
  if (url.searchParams.has('lang')) {
    url.searchParams.set('lang', locale.value);
    window.history.replaceState(window.history.state, '', url);
  }
  try {
    window.localStorage.setItem('modeling.language', locale.value);
  } catch {
    // Language switching remains available when browser storage is disabled.
  }
}

export function initializeLocale(): void {
  if (typeof window === 'undefined') return;
  let preferred = new URLSearchParams(window.location.search).get('lang');
  try {
    preferred ||= window.localStorage.getItem('modeling.language') ||
      window.localStorage.getItem('language');
  } catch {
    // The explicit URL language and browser preference still work.
  }
  setLocale(preferred || window.navigator.language || 'zh-CN');
}

// Keys are the Chinese defaults for plugin-owned UI, never user model content.
export function createTranslator<T extends Record<string, string>>(english: T) {
  return (text: keyof T & string, params: TranslationParams = {}): string => {
    const translated = Object.prototype.hasOwnProperty.call(english, text) ? english[text] : undefined;
    const template = locale.value === 'en' && typeof translated === 'string' ? translated : text;
    return template.replace(/\{(\w+)\}/g, (match, key: string) =>
      Object.prototype.hasOwnProperty.call(params, key) ? String(params[key] ?? '') : match);
  };
}

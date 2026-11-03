/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */

import { IViewController, ViewEngineBase } from '@ibiz-template/runtime';
import type { App } from 'vue';
import { provideGlobalConfig } from 'element-plus';
import elementEnglish from 'element-plus/dist/locale/en.mjs';
import elementChinese from 'element-plus/dist/locale/zh-cn.mjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { installModelLocale } from './locale/model-locale';

export default {
  install(app: App): void {
    const nativeModelApp = (
      window as typeof window & { Environment?: { nativeModelApp?: string } }
    ).Environment?.nativeModelApp;
    if (nativeModelApp === 'Central' || nativeModelApp === 'ModelDesign') {
      installModelLocale(ibiz);
      const english = /^en(?:[-_]|$)/i.test(ibiz.i18n.getLang());
      dayjs.locale(english ? 'en' : 'zh-cn');
      provideGlobalConfig(
        { locale: english ? elementEnglish : elementChinese },
        app,
        true,
      );
    }
    // Production uses prebuilt component packages, not the source engine registry.
    ibiz.engine.register(
      'VIEW_HtmlView',
      (c: IViewController) => new ViewEngineBase(c),
    );
    ibiz.engine.register(
      'VIEW_DEHTMLVIEW',
      (c: IViewController) => new ViewEngineBase(c),
    );
  },
};

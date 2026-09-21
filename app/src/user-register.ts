/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */

import { IViewController, ViewEngineBase } from '@ibiz-template/runtime';

export default {
  install(): void {
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

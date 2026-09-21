import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { CaptionBarControl } from './caption-bar.mjs';
import { CaptionBarProvider } from './caption-bar.provider.mjs';

"use strict";
const IBizCaptionBarControl = withInstall(
  CaptionBarControl,
  function(v) {
    v.component(CaptionBarControl.name, CaptionBarControl);
    registerControlProvider(
      ControlType.CAPTIONBAR,
      () => new CaptionBarProvider()
    );
  }
);

export { IBizCaptionBarControl, IBizCaptionBarControl as default };

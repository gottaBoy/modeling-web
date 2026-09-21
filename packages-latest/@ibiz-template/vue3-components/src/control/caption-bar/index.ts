import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CaptionBarControl } from './caption-bar';
import { CaptionBarProvider } from './caption-bar.provider';

export const IBizCaptionBarControl = withInstall(
  CaptionBarControl,
  function (v: App) {
    v.component(CaptionBarControl.name, CaptionBarControl);
    registerControlProvider(
      ControlType.CAPTIONBAR,
      () => new CaptionBarProvider(),
    );
  },
);

export default IBizCaptionBarControl;

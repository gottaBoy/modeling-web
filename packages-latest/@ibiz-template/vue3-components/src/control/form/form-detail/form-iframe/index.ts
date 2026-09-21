import { withInstall } from '@ibiz-template/vue3-util';
import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import FormIFrame from './form-iframe';
import { FormIFrameProvider } from './form-iframe.provider';

export const IBizFormIFrame = withInstall(FormIFrame, function (v: App) {
  v.component(FormIFrame.name!, FormIFrame);
  registerFormDetailProvider('IFRAME', () => new FormIFrameProvider());
});

export default IBizFormIFrame;

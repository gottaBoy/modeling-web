import { withInstall } from '@ibiz-template/vue3-util';
import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { FormIFrame } from './form-iframe.mjs';
import { FormIFrameProvider } from './form-iframe.provider.mjs';

"use strict";
const IBizFormIFrame = withInstall(FormIFrame, function(v) {
  v.component(FormIFrame.name, FormIFrame);
  registerFormDetailProvider("IFRAME", () => new FormIFrameProvider());
});

export { IBizFormIFrame, IBizFormIFrame as default };

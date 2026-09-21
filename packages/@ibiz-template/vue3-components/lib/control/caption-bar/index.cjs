'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var captionBar = require('./caption-bar.cjs');
var captionBar_provider = require('./caption-bar.provider.cjs');

"use strict";
const IBizCaptionBarControl = vue3Util.withInstall(
  captionBar.CaptionBarControl,
  function(v) {
    v.component(captionBar.CaptionBarControl.name, captionBar.CaptionBarControl);
    runtime.registerControlProvider(
      runtime.ControlType.CAPTIONBAR,
      () => new captionBar_provider.CaptionBarProvider()
    );
  }
);

exports.IBizCaptionBarControl = IBizCaptionBarControl;
exports.default = IBizCaptionBarControl;

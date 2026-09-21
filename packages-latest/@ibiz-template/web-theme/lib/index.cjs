'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./theme/index.css');
var index$1 = require('./publish/index.cjs');
require('./publish/locale/index.cjs');
var zhCn = require('./publish/locale/zh-cn.cjs');
var en = require('./publish/locale/en.cjs');

"use strict";
var index = {
  install() {
    index$1.install((key, model) => {
      ibiz.util.layoutPanel.register(key, model);
    });
  }
};

exports.ZH_CN = zhCn.default;
exports.EN = en.default;
exports.default = index;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./theme/index.css');
var index$1 = require('./publish/index.cjs');

"use strict";
var index = {
  install() {
    index$1.install((key, model) => {
      ibiz.util.layoutPanel.register(key, model);
    });
  }
};

exports.default = index;

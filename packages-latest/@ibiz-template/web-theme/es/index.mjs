import './theme/index.css';
import { install } from './publish/index.mjs';
import './publish/locale/index.mjs';
export { default as ZH_CN } from './publish/locale/zh-cn.mjs';
export { default as EN } from './publish/locale/en.mjs';

"use strict";
var index = {
  install() {
    install((key, model) => {
      ibiz.util.layoutPanel.register(key, model);
    });
  }
};

export { index as default };

import './theme/index.css';
import { install } from './publish/index.mjs';

"use strict";
var index = {
  install() {
    install((key, model) => {
      ibiz.util.layoutPanel.register(key, model);
    });
  }
};

export { index as default };

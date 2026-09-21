'use strict';

var vue = require('vue');

"use strict";
function useCodeListListen(appCodeListId, srfappid, fn) {
  let codeListInstance;
  vue.onMounted(async () => {
    if (appCodeListId) {
      const app = await ibiz.hub.getApp(srfappid);
      codeListInstance = await app.codeList.getCodeListInstance(appCodeListId);
      if (codeListInstance) {
        codeListInstance.onChange(fn);
      }
    }
  });
  vue.onUnmounted(() => {
    if (codeListInstance) {
      codeListInstance.offChange(fn);
    }
  });
}

exports.useCodeListListen = useCodeListListen;

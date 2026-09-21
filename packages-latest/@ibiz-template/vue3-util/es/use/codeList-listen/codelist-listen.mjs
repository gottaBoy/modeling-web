import { onMounted, onUnmounted } from 'vue';

"use strict";
function useCodeListListen(appCodeListId, srfappid, fn) {
  let codeListInstance;
  onMounted(async () => {
    if (appCodeListId) {
      const app = await ibiz.hub.getApp(srfappid);
      codeListInstance = await app.codeList.getCodeListInstance(appCodeListId);
      if (codeListInstance) {
        codeListInstance.onChange(fn);
      }
    }
  });
  onUnmounted(() => {
    if (codeListInstance) {
      codeListInstance.offChange(fn);
    }
  });
}

export { useCodeListListen };

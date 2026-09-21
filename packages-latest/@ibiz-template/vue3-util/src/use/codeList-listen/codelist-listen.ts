import { CodeListItem, DynamicCodeListCache } from '@ibiz-template/runtime';
import { onMounted, onUnmounted } from 'vue';

type FnType = (data: CodeListItem[] | undefined) => void;

export function useCodeListListen(
  appCodeListId: string | undefined,
  srfappid: string,
  fn: FnType,
): void {
  let codeListInstance: DynamicCodeListCache | undefined;

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

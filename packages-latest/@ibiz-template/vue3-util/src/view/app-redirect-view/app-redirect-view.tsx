import { defineComponent, onMounted, onUnmounted } from 'vue';
import { IBizContext } from '@ibiz-template/core';
import { toLocalOpenWFRedirectView } from '@ibiz-template/runtime';

export const AppRedirectView = defineComponent({
  setup() {
    const context = IBizContext.create(ibiz.appData?.context || {});

    onUnmounted(() => {
      context.destroy();
    });

    const { href } = window.location;

    async function toRedirect(): Promise<void> {
      await toLocalOpenWFRedirectView(context, href);
    }

    onMounted(() => ibiz.util.hiddenAppLoading());

    toRedirect();
  },
  render() {
    return <div>{ibiz.i18n.t('vue3Util.view.redirectionProgress')}</div>;
  },
});

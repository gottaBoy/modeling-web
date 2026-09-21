import {
  defineComponent,
  ref,
  resolveComponent,
  h,
  Ref,
  onMounted,
  computed,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { useRoute } from 'vue-router';
import { IBizContext } from '@ibiz-template/core';
import { IViewConfig } from '@ibiz-template/runtime';
import './unauthorized-view.scss';

export const UnauthorizedView = defineComponent({
  setup() {
    const ns = useNamespace('unauthorized-view');

    const route = useRoute();

    const viewCodeName = computed(() => {
      return `${route.params.viewcodename}`;
    });

    const hasAppView = ref(false);

    const appView: Ref<null | IViewConfig> = ref(null);

    const viewShell = resolveComponent('IBizViewShell');

    const context = IBizContext.create({});

    const params = {};

    const isMounted = ref(false);

    onMounted(async () => {
      try {
        const appViewConfig = await ibiz.hub.config.view.get(
          viewCodeName.value,
        );
        if (appViewConfig) {
          appView.value = appViewConfig;
          hasAppView.value = true;
        }
      } catch (err) {
        ibiz.log.warn(err);
      }
      ibiz.util.hiddenAppLoading();
      isMounted.value = true;
    });

    return () => {
      if (isMounted.value) {
        return hasAppView.value ? (
          h(viewShell, {
            context,
            params,
            viewId: appView.value!.id,
          })
        ) : (
          <div class={ns.b()}>
            <img
              class={ns.e('img')}
              src={`${ibiz.env.assetsUrl}/images/404.png`}
            />
            <div class={ns.e('tips')}>
              {ibiz.i18n.t('view.noResourcesView.noResourcePrompt')}
              <br />
              {ibiz.i18n.t('view.noResourcesView.noExistPrompt', {
                code: viewCodeName.value,
              })}
            </div>
          </div>
        );
      }
      return null;
    };
  },
});

import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent, h, onMounted, resolveComponent } from 'vue';
import { useRoute } from 'vue-router';
import './error-view.scss';
import { getErrorViewProvider } from '@ibiz-template/runtime';

export const ErrorView = defineComponent({
  name: 'ErrorView',
  setup() {
    const ns = useNamespace('error-view');
    const route = useRoute();

    const code = computed(() => {
      return `${route.params.code}`;
    });

    onMounted(() => ibiz.util.hiddenAppLoading());

    const isTop = computed(() => {
      return route && !route.params.view1;
    });

    return { ns, isTop, code };
  },
  render() {
    if (this.code) {
      const provider = getErrorViewProvider(this.code);
      if (provider) {
        if (typeof provider.component === 'string') {
          return h(resolveComponent(provider.component) as string);
        }
        return h(provider.component);
      }
    }

    return (
      <div class={[this.ns.b()]}>
        {ibiz.i18n.t('view.errorView.noExistPrompt', { code: this.code })}
      </div>
    );
  },
});

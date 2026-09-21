import { RuntimeError } from '@ibiz-template/core';
import { getDERedirectToView, ViewController } from '@ibiz-template/runtime';
import { IAppDERedirectView } from '@ibiz/model-core';
import {
  defineComponent,
  h,
  PropType,
  ref,
  resolveComponent,
  toRaw,
  watch,
} from 'vue';
import { useViewController } from '../../use';

export const DeRedirectView = defineComponent({
  name: 'IBizDeRedirectView',
  props: {
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    modelData: { type: Object as PropType<IAppDERedirectView>, required: true },
    isEmbedCtrlNav: { type: Boolean, default: false },
  },
  setup(props) {
    const c = useViewController((...args) => new ViewController(...args));
    const toViewId = ref<string>();
    const toViewContext = ref<IContext>();
    const toViewParams = ref<IParams>();

    c.evt.on('onCreated', () => {
      getDERedirectToView(
        toRaw(props.modelData),
        toRaw(c.context),
        toRaw(c.params),
      ).then(async result => {
        if (result.type === 'view') {
          toViewId.value = result.viewId;
          toViewContext.value = result.context;
          toViewParams.value = result.params;
        } else {
          throw new RuntimeError(
            ibiz.i18n.t('vue3Util.view.embeddedRedirectionView'),
          );
        }
      });
    });
    if (props.isEmbedCtrlNav) {
      watch(
        () => [c.context, c.params],
        () => {
          getDERedirectToView(
            toRaw(props.modelData),
            toRaw(c.context),
            toRaw(c.params),
          ).then(async result => {
            if (result.type === 'view') {
              toViewId.value = result.viewId;
              toViewContext.value = result.context;
            }
          });
        },
        {
          deep: true,
        },
      );
    }

    return { c, toViewId, toViewContext, toViewParams };
  },
  render() {
    if (this.toViewId) {
      return h(
        resolveComponent('IBizViewShell'),
        {
          context: this.toViewContext,
          params: this.toViewParams,
          viewId: this.toViewId,
          ...this.$attrs,
        },
        this.$slots,
      );
    }
    return (
      <div style='width: 100%; height: 100%;' v-loading={!this.toViewId}></div>
    );
  },
});

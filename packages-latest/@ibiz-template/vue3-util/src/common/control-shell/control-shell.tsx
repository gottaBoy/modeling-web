/* eslint-disable no-param-reassign */
/* eslint-disable vue/no-mutating-props */
import {
  CTX,
  getControlProvider,
  IControlProvider,
  ViewController,
  ViewType,
} from '@ibiz-template/runtime';
import {
  defineComponent,
  h,
  inject,
  PropType,
  provide,
  ref,
  resolveComponent,
} from 'vue';
import './control-shell.scss';
import { IAppView, IControl } from '@ibiz/model-core';
import { IBizContext } from '@ibiz-template/core';
import { useNamespace } from '../../use';

export const IBizControlShell = defineComponent({
  name: 'IBizControlShell',
  props: {
    modelData: { type: Object as PropType<IControl>, required: true },
  },
  setup(props) {
    // 上下文里提前预告部件
    const ctx = inject('ctx') as CTX;
    if (ctx) {
      ctx.evt.emit('onForecast', props.modelData.name!);
    } else {
      // 没有的时候模拟一个给下级
      const viewModel: IAppView = {
        name: 'AppView',
        id: 'AppView',
        viewType: ViewType.DE_CUSTOM_VIEW,
        appId: ibiz.env.appId,
      };
      provide(
        'ctx',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (new ViewController(viewModel, IBizContext.create({})) as any).ctx,
      );
    }

    const isComplete = ref(false);
    const errMsg = ref('');
    const provider = ref<IControlProvider>();
    getControlProvider(props.modelData)
      .then(item => {
        if (!item) {
          errMsg.value = ibiz.i18n.t(
            'vue3Util.common.onFoundCorrespondingPart',
          );
        } else {
          provider.value = item;
        }
        isComplete.value = true;
      })
      .catch(err => {
        ibiz.log.error(err);
        errMsg.value = err.message;
        isComplete.value = true;
      });
    const ns = useNamespace('control-shell');

    return { ns, isComplete, errMsg, provider };
  },
  render() {
    if (this.isComplete && this.provider) {
      return h(
        resolveComponent(this.provider.component) as string,
        {
          provider: this.provider,
          ...this.$props,
          ...this.$attrs,
        },
        this.$slots,
      );
    }
    return (
      <div class={this.ns.b()} v-loading={!this.isComplete}>
        {this.isComplete ? this.errMsg : null}
      </div>
    );
  },
});

import { defineComponent, ref } from 'vue';
import { useEventListener, useNamespace } from '@ibiz-template/vue3-util';
import './row-edit-popover.scss';

export const IBizRowEditPopover = defineComponent({
  name: 'IBizRowEditPopover',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    confirm: () => true,
    cancel: () => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('row-edit-popover');

    const onCancel = () => {
      emit('cancel');
    };
    const onConfirm = () => {
      emit('confirm');
    };

    const componentRef = ref(document);
    useEventListener(
      componentRef,
      'keydown',
      evt => {
        if (props.show && evt.key === 'Escape') {
          onCancel();
        }
      },
      { capture: true }, // 捕获防止内部ui拦截点击事件
    );

    return { ns, onCancel, onConfirm };
  },
  render() {
    return (
      <div class={[this.ns.b(), this.ns.is('hidden', !this.show)]}>
        <el-button onClick={this.onConfirm}>
          {ibiz.i18n.t('control.common.determine')}
        </el-button>
        <el-button onClick={this.onCancel}>
          {ibiz.i18n.t('app.cancel')}
        </el-button>
      </div>
    );
  },
});

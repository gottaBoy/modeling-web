import { defineComponent, nextTick, PropType, ref, Ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './pdf-print-process.scss';

export const PdfPrintProcess = defineComponent({
  name: 'IBizPdfPrintProcess',
  props: {
    data: {
      type: Object as PropType<IData>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const ns = useNamespace('pdf-print-process');

    const contentRef: Ref<Element | null> = ref(null);

    watch(
      () => props.data,
      () => {
        // 成功或失败3秒后关闭
        if (['success', 'failed'].includes(props.data.status)) {
          setTimeout(() => {
            emit('close');
          }, 3000);
        }
        if (contentRef.value) {
          nextTick(() => {
            contentRef.value?.scrollTo({
              top: contentRef.value.scrollHeight,
              behavior: 'smooth',
            });
          });
        }
      },
      { deep: true },
    );

    // 点击关闭
    const onClose = () => {
      emit('close');
    };

    // 绘制头部，关闭按钮仅在全屏时显示
    const renderHeader = () => {
      return (
        <div class={ns.e('header')}>
          <div class={ns.e('header-caption')}>
            <div
              class={[
                ns.e('status'),
                ns.is('processing', props.data.status === 'processing'),
                ns.is('success', props.data.status === 'success'),
                ns.is('failed', props.data.status === 'failed'),
              ]}
            ></div>
            <div class={ns.e('caption')}>{props.data.caption}</div>
          </div>
          <div class={ns.e('toolbar')}>
            <ion-icon name='close-outline' onClick={onClose}></ion-icon>
          </div>
        </div>
      );
    };

    //  绘制内容
    const renderContent = () => {
      return (
        <div class={ns.e('content')}>
          <div class={ns.e('process')}>
            <el-progress percentage={props.data.percentage} />
          </div>
          <div class={ns.e('steps')} ref='contentRef'>
            {props.data.items.map((item: IData) => {
              return (
                <div class={ns.e('step')}>
                  <div class={ns.e('step-time')}>{item.time}</div>
                  <div class={ns.e('step-title')}>{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    return { ns, contentRef, renderHeader, renderContent };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  },
});

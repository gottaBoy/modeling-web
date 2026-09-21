import { useNamespace } from '@ibiz-template/vue3-util';
import { IDETBUIActionItem } from '@ibiz/model-core';
import { computed, defineComponent, PropType } from 'vue';
import { IToolbarController } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import { convertBtnType } from '../../../util';
import './short-cut-button.scss';

export const IBizShortCutButton = defineComponent({
  name: 'IBizShortCutButton',
  props: {
    mode: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    item: {
      type: Object as PropType<IDETBUIActionItem>,
      required: true,
    },
    controller: {
      type: Object as PropType<IToolbarController>,
      required: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const ns = useNamespace('short-cut-button');
    const ns2 = useNamespace('toolbar-item');

    const onClick = (e: MouseEvent): void => {
      emit('click', e);
    };

    const buttonType = props.item.buttonStyle?.toLowerCase();

    const buttonState = computed(
      () => props.controller.state.buttonsState[props.item.id!],
    );

    const isShortCut = computed(() => props.controller.view.state.isShortCut);

    return { ns, ns2, buttonState, buttonType, isShortCut, onClick };
  },
  render() {
    return (
      <div class={[this.ns.b(), this.ns.is('short-cut', this.isShortCut)]}>
        <el-button
          title={showTitle(
            this.isShortCut
              ? `${ibiz.i18n.t('app.cancel')}${this.item.tooltip}`
              : this.item.tooltip,
          )}
          size={this.size}
          type={convertBtnType(this.item.buttonStyle)}
          loading={this.buttonState.loading}
          disabled={this.buttonState.disabled}
          onClick={this.onClick}
        >
          {this.item.showIcon && this.item.sysImage && (
            <span class={[this.ns2.b('icon'), this.ns.e('icon')]}>
              <iBizIcon icon={this.item.sysImage} />
            </span>
          )}
          {this.item.showCaption && (
            <span class={this.ns2.b('text')}>
              {this.isShortCut
                ? `${ibiz.i18n.t('app.cancel')}${this.item.caption}`
                : this.item.caption}
            </span>
          )}
        </el-button>
      </div>
    );
  },
});

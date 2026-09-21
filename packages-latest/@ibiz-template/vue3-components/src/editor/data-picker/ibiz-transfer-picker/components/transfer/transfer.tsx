import { computed, defineComponent, h, reactive, ref, VNode } from 'vue';
import { isEmpty } from 'ramda';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  useMove,
  usePropsAlias,
  useComputedData,
  useCheckedChange,
} from './transfer-util';
import { transferEmits, transferProps } from './interface';
import type { TransferCheckedState, TransferDirection } from './interface';
import { TransferPanel } from '../transfer-panel/transfer-panel';
import { arrowLeft, arrowRight } from './icon';
import './transfer.scss';

export const TransferSelect = defineComponent({
  name: 'IBizTransfer',
  props: transferProps,
  emits: transferEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace('transfer');

    const checkedState = reactive<TransferCheckedState>({
      leftChecked: [],
      rightChecked: [],
    });

    const propsAlias = usePropsAlias(props);

    const { sourceData, targetData } = useComputedData(props);

    const { onSourceCheckedChange, onTargetCheckedChange } = useCheckedChange(
      checkedState,
      emit,
    );

    const { addToLeft, addToRight } = useMove(props, checkedState, emit);

    const leftPanel = ref();
    const rightPanel = ref();

    const clearQuery = (which: TransferDirection): void => {
      switch (which) {
        case 'left':
          leftPanel.value!.query = '';
          break;
        case 'right':
          rightPanel.value!.query = '';
          break;
        default:
          break;
      }
    };

    const onLeftAcSearch = (query: string): void => {
      emit('leftAcSearch', query);
    };

    const hasButtonTexts = computed(() => props.buttonTexts.length === 2);

    const leftPanelTitle = computed(() => props.titles[0] || '可选列表');

    const rightPanelTitle = computed(() => props.titles[1] || '已选列表');

    const panelFilterPlaceholder = computed(
      () => props.filterPlaceholder || '请输入',
    );

    const optionRender = computed(() => (option: IData): VNode | VNode[] => {
      if (props.renderContent) return props.renderContent(h, option);

      const defaultSlotVNodes = (slots.default?.({ option }) || []).filter(
        node => node.type !== Comment,
      );
      if (defaultSlotVNodes.length) {
        return defaultSlotVNodes;
      }

      return h(
        'span',
        option[propsAlias.value.label] || option[propsAlias.value.key],
      );
    });
    return {
      ns,
      leftPanel,
      sourceData,
      rightPanel,
      targetData,
      optionRender,
      checkedState,
      hasButtonTexts,
      leftPanelTitle,
      rightPanelTitle,
      panelFilterPlaceholder,
      addToLeft,
      addToRight,
      clearQuery,
      onLeftAcSearch,
      onSourceCheckedChange,
      onTargetCheckedChange,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <TransferPanel
          ref='leftPanel'
          data={this.sourceData}
          readonly={this.readonly}
          optionRender={this.optionRender}
          placeholder={this.panelFilterPlaceholder}
          title={this.leftPanelTitle}
          filterable={this.filterable}
          format={this.format}
          enableAcSearch={this.enableRemoteSearch}
          loading={this.loading}
          filterMethod={this.filterMethod}
          defaultChecked={this.leftDefaultChecked}
          onAcSearch={this.onLeftAcSearch}
          props={this.props}
          onCheckedChange={this.onSourceCheckedChange}
        ></TransferPanel>
        <div class={this.ns.e('buttons')}>
          <el-button
            class={[
              this.ns.e('button'),
              this.ns.is('with-texts', this.hasButtonTexts),
            ]}
            type='primary'
            disabled={
              !!isEmpty(this.checkedState.rightChecked) || this.readonly
            }
            onClick={this.addToLeft}
          >
            <el-icon>{{ default: () => arrowLeft() }}</el-icon>
            {this.buttonTexts[0] !== undefined ? (
              <span>{this.buttonTexts[0]}</span>
            ) : null}
          </el-button>
          <el-button
            class={[
              this.ns.e('button'),
              this.ns.is('with-texts', this.hasButtonTexts),
            ]}
            type='primary'
            disabled={!!isEmpty(this.checkedState.leftChecked) || this.readonly}
            onClick={this.addToRight}
          >
            {this.buttonTexts[1] !== undefined ? (
              <span>{this.buttonTexts[1]}</span>
            ) : null}

            <el-icon>{{ default: () => arrowRight() }}</el-icon>
          </el-button>
        </div>
        <TransferPanel
          ref='rightPanel'
          data={this.targetData}
          readonly={this.readonly}
          optionRender={this.optionRender}
          placeholder={this.panelFilterPlaceholder}
          filterable={this.filterable}
          format={this.format}
          filterMethod={this.filterMethod}
          title={this.rightPanelTitle}
          defaultChecked={this.rightDefaultChecked}
          props={this.props}
          onCheckedChange={this.onTargetCheckedChange}
        ></TransferPanel>
      </div>
    );
  },
});

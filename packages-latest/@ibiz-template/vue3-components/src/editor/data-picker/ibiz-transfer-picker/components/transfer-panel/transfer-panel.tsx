import { computed, defineComponent, reactive, toRefs } from 'vue';
import { isEmpty } from 'ramda';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  transferPanelEmits,
  transferPanelProps,
  TransferPanelState,
} from './interface';
import { useCheck, usePropsAlias } from './transfer-panel-util';
import { Search } from './icon';
import './transfer-panel.scss';

export const TransferPanel = defineComponent({
  name: 'IBizTransferPanel',
  props: transferPanelProps,
  emits: transferPanelEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace('transfer-panel');

    const panelState = reactive<TransferPanelState>({
      checked: [],
      allChecked: false,
      query: '',
      checkChangeByUser: true,
    });

    const propsAlias = usePropsAlias(props);

    const {
      filteredData,
      checkedSummary,
      isIndeterminate,
      onInputChange,
      handleAllCheckedChange,
    } = useCheck(props, panelState, emit);

    const hasNoMatch = computed(
      () => !isEmpty(panelState.query) && isEmpty(filteredData.value),
    );

    const hasFooter = computed(
      () => !(slots.default && isEmpty(slots.default!()[0].children)),
    );

    const { checked, allChecked, query } = toRefs(panelState);
    return {
      ns,
      query,
      allChecked,
      checkedSummary,
      hasNoMatch,
      hasFooter,
      checked,
      filteredData,
      propsAlias,
      isIndeterminate,
      onInputChange,
      handleAllCheckedChange,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <p class={this.ns.e('header')}>
          <el-checkbox
            v-model={this.allChecked}
            disabled={this.readonly}
            indeterminate={this.isIndeterminate}
            validateEvent={false}
            onChange={this.handleAllCheckedChange}
          >
            <span class={this.ns.em('header', 'title')}>{this.title}</span>
            <span class={this.ns.em('header', 'count')}>
              {this.checkedSummary}
            </span>
          </el-checkbox>
        </p>

        <div
          class={[this.ns.e('body'), this.ns.is('with-footer', this.hasFooter)]}
        >
          {this.filterable ? (
            <el-input
              v-model={this.query}
              readonly={this.readonly}
              class={this.ns.e('filter')}
              size='default'
              placeholder={this.placeholder}
              prefixIcon={() => Search()}
              clearable
              validateEvent={false}
              onInput={this.onInputChange}
            ></el-input>
          ) : null}

          <div
            class={[
              this.ns.e('content'),
              this.ns.is('filterable', this.filterable),
            ]}
            v-loading={this.enableAcSearch && this.loading}
          >
            {!this.hasNoMatch && !isEmpty(this.data) ? (
              <el-checkbox-group
                v-model={this.checked}
                validateEvent={false}
                disabled={this.readonly}
                class={[this.ns.e('list')]}
              >
                {{
                  default: () => {
                    return this.filteredData.map((item: IData) => {
                      return (
                        <el-checkbox
                          class={this.ns.e('item')}
                          key={item[this.propsAlias.key]}
                          label={item[this.propsAlias.key]}
                          disabled={!!item[this.propsAlias.disabled]}
                          validateEvent={false}
                        >
                          {this.optionRender?.(item)}
                        </el-checkbox>
                      );
                    });
                  },
                }}
              </el-checkbox-group>
            ) : (
              <div class={this.ns.e('empty')}>
                {this.$slots.empty ? (
                  this.$slots.empty?.()
                ) : (
                  <iBizNoData class={this.ns.em('empty', 'no-data')} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});

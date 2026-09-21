/* eslint-disable prefer-const */
import { defineComponent, PropType, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IModal, IColumnState, IModalData } from '@ibiz-template/runtime';
import { clone } from 'ramda';
import './gantt-setting.scss';

const selectedIcon = (): JSX.Element => (
  <svg
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    height='1em'
    width='1em'
    focusable='false'
  >
    <g stroke-width='1' fill-rule='evenodd'>
      <path d='M6.012 11.201L1.313 6.832l-.817.879 5.54 5.15 9.304-9.163-.842-.855z'></path>
    </g>
  </svg>
);

const closeIcon = (): JSX.Element => (
  <svg
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    height='1em'
    width='1em'
    focusable='false'
  >
    <g stroke-width='1' fill-rule='evenodd'>
      <path
        d='M7.456 7.456V-.115h1.2v7.571h7.572v1.2H8.656v7.572h-1.2V8.656H-.115v-1.2h7.571z'
        transform='rotate(45 8.056 8.056)'
      ></path>
    </g>
  </svg>
);

const searchIcon = (): JSX.Element => (
  <svg
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    height='1em'
    width='1em'
    focusable='false'
  >
    <g stroke-width='1' fill-rule='evenodd'>
      <path d='M6.751 12.303A5.557 5.557 0 0 1 1.2 6.751C1.2 3.691 3.69 1.2 6.751 1.2a5.558 5.558 0 0 1 5.551 5.551 5.557 5.557 0 0 1-5.551 5.552M6.751 0a6.751 6.751 0 1 0 4.309 11.949l3.855 3.855a.6.6 0 1 0 .849-.849l-3.854-3.853A6.751 6.751 0 0 0 6.751 0'></path>
    </g>
  </svg>
);

// 列表类型
type ListType = 'optional' | 'selected';

export const IBizGanttSetting = defineComponent({
  name: 'IBizGanttSetting',
  props: {
    modal: { type: Object as PropType<IModal>, required: true },
    // 表格列状态数组
    columnStates: { type: Object as PropType<IColumnState[]>, required: true },
    // 必须显示的列
    mustShowColumns: {
      type: Array as PropType<string[]>,
      required: true,
      default: () => ['sn', 'name'],
    },
    // 最多显示多少列，默认值为0，表示无限制
    limitsize: {
      type: Number,
      default: 0,
    },
  },
  emits: [],
  setup(props) {
    const ns = useNamespace('gantt-setting');

    // 左侧输入框绑定
    const optionalInput = ref('');
    // 右侧输入框绑定
    const selectedInput = ref('');

    // 绘制数据
    const states = ref<IColumnState[]>([]);

    // 计算是否为必须显示的值
    const calcMustShowColumn = (item: IColumnState): boolean => {
      return props.mustShowColumns.some(item2 => item.key === item2);
    };

    // 初始化数据
    const initData = (): void => {
      states.value = clone(props.columnStates);
    };

    watch(
      () => props.columnStates,
      () => {
        initData();
      },
      { immediate: true, deep: true },
    );

    // 处理右侧关闭
    const onListItemClose = (e: MouseEvent, item: IData): void => {
      e.stopPropagation();
      Object.assign(item, { hidden: !item.hidden });
    };

    // 处理右侧项点击
    const onListItemClick = (item: IColumnState): void => {
      if (props.limitsize > 0 && item.hidden) {
        const columns = states.value.filter((_item: IColumnState) => {
          const must = calcMustShowColumn(_item);
          return !must && !_item.hidden;
        });
        if (columns && columns.length >= props.limitsize) {
          ibiz.message.warning(
            ibiz.i18n.t('component.ganttSetting.reachedMaximum'),
          );
          return;
        }
      }
      Object.assign(item, { hidden: !item.hidden });
    };

    // 取消
    const onClose = (): void => {
      props.modal.dismiss();
    };

    // 确认
    const onConfirm = (): void => {
      const modalData: IModalData = {
        ok: true,
        data: states.value,
      };
      props.modal.dismiss(modalData);
    };

    // 恢复默认
    const onResultDefault = (): void => {
      initData();
    };

    // 绘制左侧搜索
    const renderLeftSearch = (): JSX.Element => {
      return (
        <el-input
          placeholder={ibiz.i18n.t('app.search')}
          v-model={optionalInput.value}
          clearable={true}
        >
          {{
            prefix: () => searchIcon(),
          }}
        </el-input>
      );
    };

    // 绘制右侧搜索
    const renderRightSearch = (): JSX.Element => {
      return (
        <el-input
          placeholder={ibiz.i18n.t('app.search')}
          v-model={selectedInput.value}
          clearable={true}
        >
          {{
            prefix: () => searchIcon(),
          }}
        </el-input>
      );
    };

    // 绘制列表项
    const renderListItem = (
      item: IColumnState,
      type: ListType = 'optional',
    ): JSX.Element | null => {
      const caption = item.caption || '';
      const isOptional = type === 'optional';
      const isMust = calcMustShowColumn(item);
      if (!isOptional && item.hidden && !isMust) {
        return null;
      }
      const isSelectedShow =
        isOptional &&
        states.value.some(
          (item2: IData) => item.key === item2.key && !item.hidden,
        );
      const searchVal = isOptional ? optionalInput.value : selectedInput.value;
      const isFilterItem = !caption.includes(searchVal);

      return (
        <div
          class={[
            ns.b('list-item'),
            ns.is('disabled', isMust && isOptional),
            ns.is('filter-item', isFilterItem),
          ]}
          onClick={() => isOptional && !isMust && onListItemClick(item)}
        >
          <div class={ns.be('list-item', 'caption')}>{caption}</div>
          <div class={[ns.be('list-item', 'end-icon')]}>
            {(isSelectedShow || (isOptional && isMust)) && selectedIcon()}
            {!isOptional && !isMust && (
              <div
                class={ns.bem('list-item', 'end-icon', 'close')}
                onClick={e => onListItemClose(e, item)}
              >
                {closeIcon()}
              </div>
            )}
          </div>
        </div>
      );
    };

    // 绘制列表
    const renderSearchList = (
      listData: IColumnState[] = [],
      type: ListType = 'optional',
    ): JSX.Element => {
      const isOptional = type === 'optional';
      const searchVal = isOptional ? optionalInput.value : selectedInput.value;
      let values: IColumnState[] = [];
      listData.forEach(
        item => item.caption?.includes(searchVal) && values.push(item),
      );

      const lengthNum = isOptional
        ? values.length
        : listData.filter(item => !item.hidden).length;
      const caption = isOptional
        ? ibiz.i18n.t('component.ganttSetting.optionalAttribute')
        : ibiz.i18n.t('component.ganttSetting.selectedAttribute');
      const limitsizeLag = ibiz.i18n.t('component.ganttSetting.limitsize', {
        max: props.limitsize + props.mustShowColumns.length,
      });
      return (
        <div class={ns.b('search-list')}>
          <div class={ns.be('search-list', 'caption')}>
            {`${caption} · ${lengthNum} ${
              !isOptional && props.limitsize > 0 ? `(${limitsizeLag})` : ''
            }`}
          </div>
          <div class={ns.be('search-list', 'content')}>
            <div class={ns.be('search-list', 'search')}>
              {isOptional ? renderLeftSearch() : renderRightSearch()}
            </div>
            <div class={ns.be('search-list', 'list')}>
              {values.map((item: IColumnState) => {
                return renderListItem(item, type);
              })}
            </div>
          </div>
        </div>
      );
    };

    return {
      ns,
      optionalInput,
      selectedInput,
      states,
      renderSearchList,
      onClose,
      onConfirm,
      onResultDefault,
    };
  },

  render() {
    return (
      <div class={[this.ns.b()]}>
        <div class={[this.ns.e('header')]}>
          {ibiz.i18n.t('component.ganttSetting.headerCaption')}
        </div>
        <div class={[this.ns.e('content')]}>
          <div class={[this.ns.em('content', 'optional')]}>
            {this.renderSearchList(this.states, 'optional')}
          </div>
          <div class={[this.ns.em('content', 'selected')]}>
            {this.renderSearchList(this.states, 'selected')}
          </div>
        </div>
        <div class={[this.ns.e('bottom')]}>
          <el-button type='text' onClick={this.onResultDefault}>
            {ibiz.i18n.t('component.ganttSetting.resultDefault')}
          </el-button>
          <div class={[this.ns.em('bottom', 'btn-right')]}>
            <el-button type='text' onClick={this.onClose}>
              {ibiz.i18n.t('app.cancel')}
            </el-button>
            <el-button onClick={this.onConfirm}>
              {ibiz.i18n.t('app.confirm')}
            </el-button>
          </div>
        </div>
      </div>
    );
  },
});

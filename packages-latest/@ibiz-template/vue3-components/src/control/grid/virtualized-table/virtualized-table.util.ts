/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, ComputedRef, ref, Ref, watch } from 'vue';
import {
  Srfuf,
  ControlVO,
  GridRowState,
  GridController,
} from '@ibiz-template/runtime';

// 排序方向
type orderDir = 'asc' | 'desc' | undefined;

/**
 * @description 虚拟表格列模型
 * @export
 * @interface IColumn
 */
export interface IColumn {
  /**
   * @description 列唯一标识（列模型代码标识）
   * @type {string}
   * @memberof IColumn
   */
  key: string;
  /**
   * @description 列类型
   * @type {string}
   * @memberof IColumn
   */
  type: string;
  /**
   * @description 列宽
   * @type {number}
   * @memberof IColumn
   */
  width: number;
  /**
   * @description 宽度单位
   * @type {string}
   * @memberof IColumn
   */
  widthUnit: string;
  /**
   * @description 是否隐藏列
   * @type {boolean}
   * @memberof IColumn
   */
  hidden: boolean;
  /**
   * @description 列标题
   * @type {string}
   * @memberof IColumn
   */
  title?: string;
  /**
   * @description 表格单元格内容对齐方式
   * @type {('left' | 'center' | 'right')}
   * @memberof IColumn
   */
  align?: string;
  /**
   * @description 列的类名
   * @type {string}
   * @memberof IColumn
   */
  class?: string;
  /**
   * @description 头部单元格样式
   * @type {string}
   * @memberof IColumn
   */
  headerClass?: string;
  /**
   * @description 固定列位置
   * @type {('left' | 'right')}
   * @memberof IColumn
   */
  fixed?: 'left' | 'right';
  /**
   * @description 设置列是否排序
   * @type {boolean}
   * @memberof IColumn
   */
  enableSort?: boolean;
}

export function useVirtualizedTable(
  c: GridController,
  props: IData,
): {
  tableRef: Ref<any>;
  tableData: ComputedRef<ControlVO[]>;
  sortValue: ComputedRef<{
    prop?: string;
    order: orderDir;
  }>;
  columnModel: ComputedRef<IColumn[]>;
  isAllSelected(): boolean;
  isSelected(data: ControlVO): boolean;
  handleSelectAll(state: boolean): void;
  handleSelectionChange(data: ControlVO): void;
  handleSortClick(event: MouseEvent, column: IColumn, newOrder: orderDir): void;
  calcColumnWidth(_columns: IColumn[], bodyWidth: number): IColumn[];
  handleRowClick(event: MouseEvent, data: ControlVO): Promise<void>;
  handleDbRowClick(event: MouseEvent, data: ControlVO): Promise<void>;
  handleHeaderCellClick(event: MouseEvent, column: IColumn): void;
} {
  const initSimpleData = (): void => {
    if (!props.data) return;
    c.state.items = props.data;
    c.state.rows = c.state.items.map(item => {
      const row = new GridRowState(new ControlVO(item), c);
      return row;
    });
    c.calcAggResult(c.state.items);
    c.calcTotalData();
  };

  c.evt.on('onCreated', async () => {
    if (c.state.isSimple) initSimpleData();
  });

  watch(
    () => props.data,
    () => {
      if (c.state.isSimple) initSimpleData();
    },
    {
      deep: true,
    },
  );

  // 表格引用
  const tableRef = ref();
  // 表格数据
  const tableData = computed(() => {
    // TODO 树表未支持
    return c.state.rows.map(row => row.data);
  });

  // 排序值
  const sortValue = computed<{ prop?: string; order: orderDir }>(() => {
    const [
      prop = c.model.minorSortAppDEFieldId,
      order = c.model.minorSortDir?.toLowerCase(),
    ] = c.state.sortQuery.split(',');

    return {
      prop,
      order: order as orderDir,
    };
  });

  // 列模型
  const columnModel = computed(() => {
    // TODO 多级表头未支持
    const { columnStates, singleSelect } = c.state;
    const columns: IColumn[] = [];
    // 不是单选时添加选择列
    if (!singleSelect)
      columns.push({
        key: c.id,
        width: 55,
        align: 'center',
        type: 'selection',
        widthUnit: 'PX',
        hidden: false,
        class: 'is-selection',
        headerClass: 'is-selection',
      });
    const { degridColumns } = c.model;
    degridColumns?.forEach(model => {
      const {
        align,
        width,
        caption,
        codeName,
        widthUnit,
        columnType,
        cellSysCss,
        enableSort,
      } = model;
      const state = columnStates.find(s => s.key === codeName);
      columns.push({
        key: codeName!,
        title: caption,
        width: width || 160,
        hidden: state?.hidden === true,
        enableSort: !!enableSort,
        class: cellSysCss?.cssName,
        widthUnit: widthUnit || 'PX',
        type: columnType!.toLowerCase(),
        headerClass: cellSysCss?.cssName,
        align: align?.toLowerCase() || 'center',
      });
    });
    return columns;
  });

  /**
   * @description 切换排序
   * @param {orderDir} order
   */
  function toggleOrder(order: orderDir): orderDir {
    const sortOrders: orderDir[] = ['asc', 'desc', undefined];
    if (order === undefined) return sortOrders[0];
    const index = sortOrders.indexOf(order || null);
    return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
  }

  /**
   * @description 处理排序改变
   * @param {string} prop
   * @param {orderDir} order
   * @returns {*}  {void}
   */
  function handleSortChange(prop: string, order: orderDir): void {
    // TODO 本地排序未支持
    const fieldName = c.fieldColumns[prop].model.appDEFieldId;
    const sortQuery = `${fieldName},${order}`;
    // 如果排序条件相同，不触发查询
    if (sortQuery === c.state.sortQuery) return;
    c.setSort(fieldName, order);
    c.load({
      isInitialLoad: c.model.pagingMode === 2 || c.model.pagingMode === 3,
    });
  }

  /**
   * @description 处理行单击
   * @param {MouseEvent} event
   * @param {ControlVO} data
   * @returns {*}  {Promise<void>}
   */
  async function handleRowClick(
    event: MouseEvent,
    data: ControlVO,
  ): Promise<void> {
    // 新建行拦截行点击事件
    if (data.srfuf === Srfuf.CREATE) return;
    await c.onRowClick(data);
  }

  /**
   * @description 处理行双击
   * @param {MouseEvent} event
   * @param {ControlVO} data
   * @returns {*}  {Promise<void>}
   */
  async function handleDbRowClick(
    event: MouseEvent,
    data: ControlVO,
  ): Promise<void> {
    // 新建行拦截行双击事件
    if (data.srfuf === Srfuf.CREATE) return;
    await c.onDbRowClick(data);
  }

  /**
   * @description 处理头部单元格点击
   * @param {MouseEvent} event
   * @param {IColumn} column
   */
  function handleHeaderCellClick(event: MouseEvent, column: IColumn): void {
    // TODO 本地排序未支持
    const { enableSort, key } = column;
    if (enableSort) {
      const { prop, order } = sortValue.value;
      let newOrder: orderDir = 'asc';
      // 如果点击已排序表头，则切换排序
      if (prop === key) newOrder = toggleOrder(order);
      handleSortChange(key, newOrder);
    }
  }

  /**
   * @description 处理排序点击
   * @param {MouseEvent} event
   * @param {IColumn} column
   * @param {orderDir} newOrder
   */
  function handleSortClick(
    event: MouseEvent,
    column: IColumn,
    newOrder: orderDir,
  ): void {
    event.stopPropagation();
    const { prop, order } = sortValue.value;
    const { key } = column;
    if (prop === key && newOrder === order) newOrder = undefined;
    handleSortChange(key, newOrder);
  }

  /**
   * @description 判断是否选中
   * @param {ControlVO} data
   * @returns {*}  {boolean}
   */
  function isSelected(data: ControlVO): boolean {
    return !!c.state.selectedData.find(x => x.srfkey === data.srfkey);
  }

  /**
   * @description 判断是否全选
   * @returns {*}  {boolean}
   */
  function isAllSelected(): boolean {
    // TODO 未支持树表格
    return (
      tableData.value.length > 0 &&
      tableData.value.every(
        (data: IData) =>
          !!c.state.selectedData.find(
            selected => data.srfkey === selected.srfkey,
          ),
      )
    );
  }

  /**
   * @description 处理选择所有
   */
  function handleSelectAll(state: boolean): void {
    c.setSelection(state ? [...c.state.items] : []);
  }

  /**
   * @description 处理选中改变
   * @param {ControlVO} data
   */
  function handleSelectionChange(data: ControlVO): void {
    const selection = [...c.state.selectedData];
    const index = selection.findIndex(
      selected => selected.srfkey === data.srfkey,
    );
    index === -1 ? selection.push(data) : selection.splice(index, 1);
    c.setSelection([...selection]);
  }

  /**
   * @description 计算列宽
   * @param {IColumn[]} _columns
   * @param {number} bodyWidth
   * @returns {*}  {IColumn[]}
   */
  function calcColumnWidth(_columns: IColumn[], bodyWidth: number): IColumn[] {
    const columns = [..._columns];
    // 显示列
    const showColumns = columnModel.value.filter(model => !model.hidden);
    // 显示列总宽
    const totalWidth = showColumns.reduce(
      (accumulator, currentValue) => accumulator + currentValue.width,
      0,
    );
    // 表格可视宽度大于总列宽时，手动计算自适应列宽
    if (bodyWidth > totalWidth && showColumns.length) {
      // 自适应列
      let adaptiveColumn = showColumns.filter(
        model => model.widthUnit === 'STAR',
      );
      // 如果没有配置自适应列，则最后一列变为自适应列
      if (!adaptiveColumn.length)
        adaptiveColumn = [showColumns[showColumns.length - 1]];
      const width = (bodyWidth - totalWidth - 6) / adaptiveColumn.length;
      adaptiveColumn.forEach(column => {
        column.width += width;
      });
    }
    return columns;
  }

  return {
    tableRef,
    tableData,
    sortValue,
    columnModel,
    isSelected,
    isAllSelected,
    handleRowClick,
    handleSortClick,
    handleSelectAll,
    calcColumnWidth,
    handleDbRowClick,
    handleHeaderCellClick,
    handleSelectionChange,
  };
}

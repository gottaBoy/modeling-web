import { PropType, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IAppDEField, IDEDataImportItem } from '@ibiz/model-core';
import './data-import2-table.scss';

interface ISharedProperties {
  logicName?: string;
  caption?: string;
}
type DataOption =
  | (IAppDEField & ISharedProperties)
  | (IDEDataImportItem & ISharedProperties);

export const DataImport2Table = defineComponent({
  name: 'DataImport2Table',
  props: {
    previewinfo: {
      type: Object as PropType<[string[]]>,
      required: true,
    },
    dataOption: {
      type: Object as PropType<DataOption[]>,
      required: true,
    },
    selectValues: {
      type: Object as PropType<string[]>,
      required: true,
    },
    columnMappingSave: {
      type: Boolean,
      required: true,
    },
    columnMap: {
      type: Object as PropType<Map<string, IData>>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const ns = useNamespace('data-import2-table');

    // 绘制下拉选择
    const renderSelect = (itemx: string, index: number) => {
      const change = (item: string) => {
        emit('selectValuesChange', index, item);
        const data = props.columnMap.get(`${itemx}-${index}`);
        if (data) {
          data.name = item;
        }
        emit('columnMapChange', `${itemx}-${index}`, data);
        emit('columnMappingSaveChange', false);
      };
      return (
        <el-select
          modelValue={props.selectValues[index]}
          filterable
          placeholder={ibiz.i18n.t(
            'component.dataImport2Table.selectAttribute',
          )}
          onChange={change}
          key={index}
          popper-class={ns.e('dataimport-select')}
          class={ns.e('select')}
        >
          {props.dataOption.map(item => {
            return (
              <el-option
                key={item.name}
                value={item.id}
                label={item.caption ? item.caption : item.logicName}
              ></el-option>
            );
          })}
        </el-select>
      );
    };

    // 绘制表格
    const renderTable = () => {
      const arr = props.previewinfo;
      // 创建表格行
      const rows = arr.map((row: string[], rowIndex: number) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) =>
            rowIndex === 0 ? (
              <th key={cellIndex} class={ns.e('dataimport2-table-th')}>
                {cell}
              </th>
            ) : (
              <td key={cellIndex} class={ns.e('dataimport2-table-td')}>
                {cell}
              </td>
            ),
          )}
        </tr>
      ));
      const newRows = [
        <tr key='newRow'>
          {arr[0].map((item: string, index: number) => (
            <td key={index} class={ns.e('dataimpoer2-table-select')}>
              {renderSelect(item, index)}
            </td>
          ))}
        </tr>,
        ...rows,
      ];
      // 返回表格元素
      return (
        <table class={ns.e('dataimport-table')}>
          <tbody>{newRows}</tbody>
        </table>
      );
    };
    const renderEmpty = () => {
      return <div class={ns.e('empty')}>{ibiz.i18n.t('app.noData')}</div>;
    };
    return { ns, renderEmpty, renderTable };
  },
  render() {
    return (
      <div class={[this.ns.e('template-container'), 'ibiz-panel-view-content']}>
        {this.previewinfo[0] && this.previewinfo[0].length
          ? this.renderTable()
          : this.renderEmpty()}
      </div>
    );
  },
});

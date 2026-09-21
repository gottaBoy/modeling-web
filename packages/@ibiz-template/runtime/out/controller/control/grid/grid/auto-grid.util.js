import { clone } from 'ramda';
import { mergeDefaultInLeft } from '@ibiz-template/core';
import { getEntitySchema } from '../../../utils';
import { GridRowState } from './grid-row.state';
import { GridNotifyState } from '../../../constant';
import { Srfuf } from '../../../../service';
const TypeToDataType = {
    string: 25,
    number: 6,
    integer: 9,
    date: 27,
    time: 28,
    'date-time': 5,
};
const TypeToEditor = {
    string: {
        appId: '',
        editorType: 'TEXTBOX',
    },
    number: {
        appId: '',
        editorType: 'NUMBER',
    },
    date: {
        appId: '',
        editorType: 'DATEPICKEREX_NOTIME',
    },
    dropdown: {
        appId: '',
        valueType: 'SIMPLE',
        editorType: 'MDROPDOWNLIST',
        appCodeListId: '',
        editorParams: {
            overflowMode: 'ellipsis',
        },
    },
};
/**
 * 获取编辑器模型
 *
 * @param {IData} item
 * @param {string} appId
 * @param {boolean} [isSingleSelect=false]
 * @return {*}  {IEditor}
 */
function getEditorModel(item, appId, isSingleSelect = false) {
    let type = ['integer', 'number'].includes(item.type) ? 'number' : 'string';
    if (['date', 'date-time', 'time'].includes(item.format)) {
        type = item.format;
    }
    if (item.enumSource || item.enumOptions) {
        type = 'dropdown';
    }
    const model = Object.assign(Object.assign({}, TypeToEditor[type]), { appId });
    switch (type) {
        case 'dropdown':
            if (isSingleSelect)
                model.editorType = 'DROPDOWNLIST';
            if (item.enumSource) {
                Object.assign(model, {
                    appCodeListId: item.enumSource,
                });
            }
            else {
                const enumOptions = [];
                Object.keys(item.enumOptions).forEach(key => {
                    enumOptions.push({
                        id: key,
                        value: key,
                        text: item.enumOptions[key],
                    });
                });
                Object.assign(model.editorParams, { enumOptions });
            }
            break;
        case 'date-time':
            Object.assign(model, {
                editorType: 'DATEPICKER',
            });
            break;
        case 'time':
            Object.assign(model, {
                editorType: 'DATEPICKEREX_NODAY',
            });
            break;
        default:
            break;
    }
    return model;
}
/**
 * 根据json模型计算出表格模型
 *
 * @param {IData} json
 * @param {GridController} c
 * @return {*}  {(Promise<
 *   | {
 *       degridColumns: IDEGridFieldColumn[];
 *       degridDataItems: IDEGridDataItem[];
 *       degridEditItems: IDEGridEditItem[];
 *     }
 *   | undefined
 * >)}
 */
async function calcColumnModelBySchema(json, c) {
    const columns = [];
    const dataItems = [];
    const editColumns = [];
    if (json.properties && Object.keys(json.properties).length > 0) {
        const { properties } = json;
        const { disableonupdate, disableoncreate, propertyorder, singleselect } = c.controlParams;
        // 必填列
        const required = json.required || [];
        // 单选列表
        const singleSelect = json[singleselect] || [];
        // 列排序
        const columnKeys = json[propertyorder] || [];
        // 新建时启用编辑
        const enableCreate = json[disableonupdate] || [];
        // 更新时启用编辑
        const enableUpdate = json[disableoncreate] || [];
        columnKeys.forEach(key => {
            if (properties[key]) {
                let type;
                switch (properties[key].type) {
                    case 'string':
                        type = 'string';
                        if (['date', 'date-time', 'time'].includes(properties[key].format)) {
                            type = properties[key].format;
                        }
                        break;
                    case 'integer':
                        type = 'integer';
                        break;
                    case 'number':
                        type = 'number';
                        break;
                    default:
                        ibiz.log.error(ibiz.i18n.t('runtime.controller.control.grid.unsupported', {
                            type: properties[key].type,
                        }));
                }
                if (type) {
                    let enableCond = 3;
                    if (enableCreate.includes(key)) {
                        enableCond = 1;
                    }
                    else if (enableUpdate.includes(key)) {
                        enableCond = 2;
                    }
                    columns.push({
                        appId: c.model.appId,
                        appDEFieldId: key,
                        id: key,
                        codeName: key,
                        columnType: 'DEFGRIDCOLUMN',
                        width: 140,
                        widthUnit: 'STAR',
                        valueType: 'SIMPLE',
                        caption: properties[key].description,
                        hideDefault: false,
                        enableRowEdit: true,
                        enableSort: ['date', 'date-time'].includes(type),
                        dataItemName: key,
                    });
                    editColumns.push({
                        codeName: key,
                        enableCond,
                        allowEmpty: !required.includes(key),
                        appId: c.model.appId,
                        editor: getEditorModel(properties[key], c.model.appId, singleSelect.includes(key)),
                    });
                    dataItems.push({
                        id: key,
                        appId: c.model.appId,
                        appDEFieldId: key,
                        valueType: 'SIMPLE',
                        dataType: TypeToDataType[type],
                    });
                }
            }
        });
    }
    return {
        degridColumns: columns,
        degridDataItems: dataItems,
        degridEditItems: editColumns,
    };
}
/**
 * 根据jsonschema初始化自定义表格模型
 *
 * @export
 * @param {GridController} c
 * @return {*}  {Promise<void>}
 */
export async function initModelByEntitySchema(c) {
    var _a, _b;
    const json = await getEntitySchema(c.model.appDataEntityId, c.context, c.jsonSchemaParams);
    if (!json) {
        return;
    }
    const result = await calcColumnModelBySchema(json, c);
    const { degridColumns, degridDataItems, degridEditItems } = result;
    // 修改模型之前拷贝一份，避免污染原始数据
    c.model = clone(c.model);
    const uaColumns = ((_a = c.model.degridColumns) === null || _a === void 0 ? void 0 : _a.filter(column => column.columnType === 'UAGRIDCOLUMN')) || [];
    const hideColumns = ((_b = c.model.degridColumns) === null || _b === void 0 ? void 0 : _b.filter(column => column.hideMode === 2)) || [];
    c.model.degridColumns = [...degridColumns, ...hideColumns, ...uaColumns];
    c.model.degridDataItems = [
        ...(c.model.degridDataItems || []),
        ...degridDataItems,
    ];
    c.model.degridEditItems = [
        ...(c.model.degridEditItems || []),
        ...degridEditItems,
    ];
}
/**
 * 动态表格行编辑
 *
 * @export
 * @param {GridController} c
 * @param {GridRowState} row
 * @param {boolean} [editable]
 * @param {boolean} [_isSave=true]
 * @return {*}  {Promise<void>}
 */
export async function switchRowEditDynamic(c, row, editable, _isSave = true) {
    if (!c.allowRowEdit) {
        return;
    }
    const toState = editable === undefined ? !row.showRowEdit : editable;
    // 一样的状态不处理
    if (row.showRowEdit === toState) {
        return;
    }
    if (toState === false) {
        // * 处理关闭行编辑
        if (row.modified) {
            try {
                await c.save(row.data);
            }
            catch (error) {
                ibiz.message.error(error.message);
                if (row.data.srfuf === Srfuf.CREATE) {
                    return c.remove({ data: [row.data], silent: true });
                }
                if (row.cacheData) {
                    // 取消的时候，还原编辑前的数据
                    row.data = row.cacheData;
                    delete row.cacheData;
                }
            }
        }
        else if (row.data.srfuf === Srfuf.CREATE) {
            // 新建的行取消时删除这一行的数据
            row.showRowEdit = false;
            c.evt.emit('onRowEditChange', { row });
            return c.remove({ data: [row.data], silent: true });
        }
    }
    else {
        // 如果已经有一行处于行编辑了，切换该行的编辑状态
        const editingRow = c.state.rows.find(item => item.showRowEdit);
        if (editingRow) {
            await switchRowEditDynamic(c, editingRow);
        }
        if (row.data.srfuf === Srfuf.UPDATE) {
            // 打开时先缓存一下
            row.cacheData = clone(row.data);
            // 填充更新默认值
            const defaultVal = c.calcDefaultValue(row.data, false);
            Object.assign(row.data, defaultVal);
        }
    }
    // 修改行的编辑状态和编辑列的编辑状态。
    row.showRowEdit = toState;
    Object.values(c.editColumns).forEach(column => {
        row.editColStates[column.fieldName].editable = toState;
    });
    c.evt.emit('onRowEditChange', { row });
}
/**
 * 动态表格新建行
 *
 * @export
 * @param {GridController} c
 * @return {*}  {Promise<void>}
 */
export async function newRowDynamic(c) {
    const { enableRowEdit, enableRowNew } = c.model;
    if (!enableRowEdit || !enableRowNew) {
        ibiz.log.error(ibiz.i18n.t('runtime.controller.control.grid.newRows'));
        return;
    }
    // 如果已经有一行处于行编辑了，切换该行的编辑状态
    const editingRow = c.state.rows.find(item => item.showRowEdit);
    if (editingRow) {
        await c.switchRowEdit(editingRow);
    }
    const queryParams = Object.assign({}, c.params);
    const defaultData = c.calcDefaultValue({}, true); // 新建默认值
    Object.assign(queryParams, defaultData);
    let res;
    try {
        res = await c.service.getDraft(c.context, queryParams);
    }
    catch (error) {
        c.actionNotification('GETDRAFTERROR', {
            error: error,
        });
        throw error;
    }
    const draftData = res.data;
    // 处理后台导致的新建默认值丢失
    mergeDefaultInLeft(draftData, defaultData);
    // 加载完后续处理
    c.state.items.push(draftData);
    const row = new GridRowState(draftData, c);
    c.state.rows.push(row);
    c.gridStateNotify(row, GridNotifyState.DRAFT);
    c.switchRowEdit(row, true);
    c.actionNotification('GETDRAFTSUCCESS', { data: draftData });
}

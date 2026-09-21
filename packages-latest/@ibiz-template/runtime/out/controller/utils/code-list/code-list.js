/**
 * 计算阈值范围
 *
 * @export
 * @param {CodeListItem[]} codelist
 * @param {number} value
 * @return {*}  {(CodeListItem | undefined)}
 */
export function calcThresholdRange(codelist, value) {
    return codelist.find(item => {
        if (!item.beginValue && !item.endValue) {
            // eslint-disable-next-line eqeqeq
            return item.value == value;
        }
        let beginCond = true;
        if (item.beginValue) {
            if (item.includeBeginValue) {
                beginCond = value >= item.beginValue;
            }
            else {
                beginCond = value > item.beginValue;
            }
        }
        let endCond = true;
        if (item.endValue) {
            if (item.includeEndValue) {
                endCond = value <= item.endValue;
            }
            else {
                endCond = value < item.endValue;
            }
        }
        return beginCond && endCond;
    });
}
/**
 *   代码表或模式计算
 *
 * @author fangZhiHao
 * @date 2024-07-30 13:07:51
 * @export
 * @param {string} orMode
 * @param {string} valueType
 * @return {*}  {({
 *   getSelectArray: (
 *     value: string | number,
 *     codeList: IAppCodeList | undefined,
 *     codeListItem: readonly CodeListItem[],
 *     valueSeparator: string,
 *     codeItemValueNumber: boolean,
 *   ) => (string | number)[] | undefined;
 *   setSelectArray: (
 *     val: Array<string | number>,
 *     codeListItem: readonly CodeListItem[],
 *     valueSeparator: string,
 *   ) => null | string | number | string[] | number[];
 * })}
 */
export function useCalcOrMode(orMode, valueType = 'SIMPLE') {
    return {
        getSelectArray: (value, codeList, codeListItem, valueSeparator, codeItemValueNumber) => {
            if (Object.is(orMode, 'NUM')) {
                const selectsArray = [];
                const num = typeof value === 'string' ? parseInt(value, 10) : value;
                codeListItem.forEach((item) => {
                    // eslint-disable-next-line no-bitwise
                    if ((num & item.value) === item.value) {
                        selectsArray.push(item.value);
                    }
                });
                return selectsArray;
            }
            if (Object.is(orMode, 'STR')) {
                const strVal = value;
                if (strVal !== '') {
                    if (codeList) {
                        const selects = valueType === 'SIMPLES'
                            ? strVal
                            : strVal.toString().split(valueSeparator);
                        if (codeItemValueNumber) {
                            for (let i = 0, len = selects.length; i < len; i++) {
                                selects[i] = Number(selects[i]);
                            }
                        }
                        return selects;
                    }
                    return strVal.split(',');
                }
            }
        },
        setSelectArray: (val, codeListItem, valueSeparator) => {
            let value = null;
            if (Object.is(orMode, 'NUM')) {
                let temp = 0;
                val.forEach(item => {
                    const numVal = typeof item === 'string' ? parseInt(item, 10) : item;
                    // eslint-disable-next-line no-bitwise
                    temp |= numVal;
                });
                if (valueType === 'SIMPLES') {
                    value = [temp];
                }
                else if (valueType === 'SIMPLE') {
                    value = temp;
                }
            }
            else if (Object.is(orMode, 'STR')) {
                const _datas = [];
                if (codeListItem.length > 0) {
                    codeListItem.forEach((_item) => {
                        const index = val.findIndex((_key) => Object.is(_item.value, _key));
                        if (index === -1) {
                            return;
                        }
                        _datas.push(_item.value);
                    });
                    if (valueType === 'SIMPLES') {
                        value = _datas;
                    }
                    else if (valueType === 'SIMPLE') {
                        value = _datas.join(valueSeparator);
                    }
                }
            }
            return value;
        },
    };
}
/**
 * 获取代码表选中项
 *
 * @author zhanghengfeng
 * @date 2024-08-16 19:08:27
 * @export
 * @param {string} allItemsValue
 * @return {*}  {ICodeListSelection}
 */
export function useCodeListSelection(allItemsValue) {
    return {
        getSelection(oldValue = [], value = [], items = [], codeListItems = []) {
            if (!Array.isArray(oldValue) || !Array.isArray(value)) {
                return value;
            }
            // 之前是否选中全部
            const oldIndex = oldValue.findIndex(v => v === allItemsValue);
            // 现在是否选中全部
            const index = value.findIndex(v => v === allItemsValue);
            const set = new Set(value);
            const values = codeListItems.map(item => item.value);
            if (index !== -1) {
                // 之前未选中全部，现在选中全部
                if (oldIndex === -1) {
                    items.map(item => set.add(item.value));
                    return values.filter(v => set.has(v));
                }
                // 未选中所有项，取消选中全部
                if (!items.every(item => item.value === allItemsValue || set.has(item.value))) {
                    return value.filter((_v, i) => i !== index);
                }
                return value;
            }
            // 之前选中全部，现在未选中全部
            if (oldIndex !== -1) {
                items.map(item => set.delete(item.value));
                return values.filter(v => set.has(v));
            }
            // 选中除全部以外的所有项，选中全部
            if (items.every(item => item.value === allItemsValue || set.has(item.value))) {
                items.map(item => set.add(item.value));
                return values.filter(v => set.has(v));
            }
            return value;
        },
        getSelectionValue(value) {
            if (!Array.isArray(value)) {
                return value;
            }
            return value.filter(v => v !== allItemsValue);
        },
    };
}

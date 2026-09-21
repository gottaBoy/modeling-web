import { isNil } from 'ramda';
import { ControlVO } from '../../../service';
/**
 * 表单表格里判断属性的值是否发生改变
 * 如果两个值都是null，undefined，''中的一种，那么判断它为不变
 * 因为都是空
 * @author lxm
 * @date 2023-05-31 07:21:27
 * @export
 * @param {unknown} value
 * @param {unknown} value2
 * @return {*}  {boolean}
 */
export function isValueChange(value, value2) {
    if ((isNil(value) || value === '') && (isNil(value2) || value2 === '')) {
        return false;
    }
    return value !== value2;
}
/**
 * 获取单条后台数据
 * 如果是数组获取第一条
 * 如果是界面VO则转换成源数据返回
 * @author lxm
 * @date 2023-08-03 10:02:27
 * @export
 * @param {(IData | ControlVO | IData[] | ControlVO[])} data
 * @return {*}  {(IData | undefined)}
 */
export function getOriginData(data) {
    let singleData = Array.isArray(data) ? data[0] : data;
    if (singleData && singleData instanceof ControlVO) {
        singleData = singleData.getOrigin();
    }
    return singleData;
}
/**
 * 递归将树形数据转为一维数组
 *
 * @export
 * @param {IData[]} items 原始数据
 * @param {string} [childField='chidlren'] 存放子的属性
 */
export function getAllItems(items, childField = 'children') {
    const tempItems = [];
    if (items && Array.isArray(items)) {
        items.forEach((item) => {
            // const chidlren = [];
            tempItems.push(item);
            if (item[childField]) {
                const chidlren = getAllItems(item[childField]);
                tempItems.push(...chidlren);
            }
        });
    }
    return tempItems;
}
/**
 * 格式化分隔符
 *
 * @export
 * @param {string} type 类型--菜单 | 工具栏
 * @param {(IData[] | undefined)} items 所有项模型
 * @param {(IData | undefined)} state 所有项状态
 * @param {(IData[] | undefined)} [opts] 额外配置项（主要是针对菜单）
 * @return {*}  {string[]}
 */
export function formatSeparator(type, items, state, opts) {
    var _a, _b;
    const hideSeparator = [];
    const hideItems = getAllItems(opts || []);
    if (!items || !state)
        return hideSeparator;
    // 去除末尾的分隔符
    (_a = state.children) === null || _a === void 0 ? void 0 : _a.reverse().some((_state) => {
        const temp = items.find((_item) => {
            return _item.id === _state.name;
        });
        if (temp && temp.itemType === 'SEPERATOR') {
            hideSeparator.push(temp.id);
            return false;
        }
        // 在额外配置项里去找，如果找到了并且额外配置表示是隐藏，则继续找下一个分隔符
        if (temp && hideItems && hideItems.length > 0) {
            const target = hideItems.find((_item) => {
                return _item.key === temp.id;
            });
            if (target && !target.visible) {
                return false;
            }
        }
        return true;
    });
    (_b = state.children) === null || _b === void 0 ? void 0 : _b.reverse();
    // 递归处理尾部和中间的连续分隔符
    const calcChildrenFormat = (children) => {
        children.reverse().some((child) => {
            var _a;
            if (child.itemType === 'SEPERATOR') {
                hideSeparator.push(child.id);
                return false;
            }
            // 不是分隔符时判断当前项是否有额外配置给设置隐藏,有额外设置隐藏就相当于state.visible等于false
            if (hideItems && hideItems.length > 0) {
                const opt = hideItems.find((_item) => {
                    return _item.key === child.id;
                });
                if (opt && !opt.visible) {
                    return false;
                }
            }
            if (((_a = state[child.id]) === null || _a === void 0 ? void 0 : _a.visible) === false) {
                return false;
            }
            return true;
        });
        children.reverse();
        // 记录上一个显示的是否是分割线
        let lastIsSeperator = false;
        children.reduce((acc, item) => {
            var _a, _b;
            // 还需要判断上一个是否是被额外配置隐藏了的,
            let tag = false;
            if (acc.length > 0 && hideItems && hideItems.length > 0) {
                const opt = hideItems.find((_item) => {
                    return _item.key === acc[acc.length - 1].id;
                });
                if (opt && !opt.visible) {
                    tag = true;
                }
            }
            if (item.itemType === 'SEPERATOR' &&
                acc.length > 0 &&
                (acc[acc.length - 1].itemType === 'SEPERATOR' ||
                    ((((_a = state[acc[acc.length - 1].id]) === null || _a === void 0 ? void 0 : _a.visible) === false || tag) &&
                        lastIsSeperator))) {
                hideSeparator.push(item.id);
                return acc;
            }
            // 工具栏
            if (type === 'TOOLBAR' && item.detoolbarItems) {
                calcChildrenFormat(item.detoolbarItems);
            }
            // 菜单
            if (type === 'APPMENU' && item.appMenuItems) {
                calcChildrenFormat(item.appMenuItems);
            }
            // 判断当前项是否是被额外配置隐藏了的
            let ishide = false;
            const opt = hideItems.find((_item) => {
                return _item.key === item.id;
            });
            if (opt && !opt.visible) {
                ishide = true;
            }
            if (((_b = state[item.id]) === null || _b === void 0 ? void 0 : _b.visible) && !ishide) {
                if (item.itemType === 'SEPERATOR') {
                    lastIsSeperator = true;
                }
                else {
                    lastIsSeperator = false;
                }
            }
            acc.push(item);
            return acc;
        }, []);
    };
    calcChildrenFormat(items);
    return hideSeparator;
}

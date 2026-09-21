/* eslint-disable no-constructor-return */
import { createUUID } from 'qx-util';
// 更新属性，缺的补充定义
function updateKeyDefine(target, keys) {
    keys.forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(target, key)) {
            Object.defineProperty(target, key, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: undefined,
            });
        }
    });
}
export class ChartData {
    constructor(deData, seriesModel, catalog, groupName, chartId, catalogLevelData) {
        this._seriesModelId = seriesModel === null || seriesModel === void 0 ? void 0 : seriesModel.id;
        this._catalog = catalog;
        this._groupName = groupName;
        this._uuid = createUUID();
        this._chartid = chartId;
        this._catalogLevelData = catalogLevelData;
        return new Proxy(this, {
            set(target, p, value) {
                if (Object.prototype.hasOwnProperty.call(deData, p)) {
                    deData[p] = value;
                }
                else {
                    target[p] = value;
                }
                return true;
            },
            get(target, p, _receiver) {
                if (target[p] !== undefined) {
                    return target[p];
                }
                if (deData[p] !== undefined) {
                    return deData[p];
                }
            },
            ownKeys(target) {
                // 整合所有并排除重复
                const allKeys = [
                    ...new Set([...Object.keys(target), ...Object.keys(deData)]),
                ];
                updateKeyDefine(target, allKeys);
                return allKeys;
            },
        });
    }
}

import { isNil } from 'ramda';
import { updateKeyDefine } from '@ibiz-template/core';
import { calcDeCodeNameById } from '../../../model';
import { TreeNodeData } from './tree-node-data';
/**
 * 实体动态代码表树节点数据
 *
 * @export
 * @class TreeCodeListNodeData
 * @extends {TreeNodeData}
 * @implements {ITreeNodeData}
 */
export class TreeCodeListNodeData extends TreeNodeData {
    constructor(model, parentNodeData, opts) {
        super(model, parentNodeData, opts);
        const { data } = opts;
        this._deData = data;
        this._text = data.text;
        this._value = data.value;
        // id小写
        const selfId = `${model.id}@${this._value}`.toLowerCase();
        Object.defineProperty(this, '_id', {
            get() {
                return this._parent ? `${this._parent._id}:${selfId}` : selfId;
            },
            enumerable: true,
            configurable: true,
        });
        // 实体节点额外添加上自己的实体上下文
        if (model.appDataEntityId) {
            const deName = calcDeCodeNameById(model.appDataEntityId);
            this._context = Object.assign(this._context || {}, {
                [deName]: this._value,
            });
        }
        this.srfkey = this._value;
        this.srfmajortext = this._text;
        this._icon = this.calcIcon(model, data.sysImage);
        this.calcDynaClass(model);
        this.calcShapeDynaClass(model);
        const getDeKey = (key) => {
            // deData属性上可枚举的属性，返回该属性名称
            if (Object.prototype.hasOwnProperty.call(this._deData, key)) {
                return key;
            }
        };
        return new Proxy(this, {
            get(target, p, _receiver) {
                const deKey = getDeKey(p);
                if (!isNil(deKey)) {
                    return target._deData[deKey];
                }
                return target[p];
            },
            // 修改操作
            set(target, p, value, _receiver) {
                const deKey = getDeKey(p);
                if (!isNil(deKey)) {
                    target._deData[deKey] = value;
                }
                else {
                    target[p] = value;
                }
                return true;
            },
            ownKeys(target) {
                // 整合所有并排除重复
                const allKeys = [
                    ...new Set([...Object.keys(target), ...Object.keys(target._deData)]),
                ];
                updateKeyDefine(target, allKeys);
                return allKeys;
            },
        });
    }
    /**
     * 获取原始数据
     */
    getOrigin() {
        return this._deData;
    }
}

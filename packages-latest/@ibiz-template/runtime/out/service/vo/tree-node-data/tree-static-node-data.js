import { TreeNodeData } from './tree-node-data';
/**
 * 静态树节点数据
 *
 * @export
 * @class TreeStaticNodeData
 * @extends {TreeNodeData}
 * @implements {ITreeNodeData}
 */
export class TreeStaticNodeData extends TreeNodeData {
    constructor(model, parentNodeData, opts) {
        var _a, _b;
        super(model, parentNodeData, opts);
        // !!根节点的默认节点值root排除掉
        const nodeValue = model.nodeValue === 'root' ? undefined : model.nodeValue;
        // id小写
        const selfId = `${model.id}`.toLowerCase();
        Object.defineProperty(this, '_id', {
            get() {
                return this._parent ? `${this._parent._id}:${selfId}` : selfId;
            },
            enumerable: true,
            configurable: true,
        });
        this._text = model.text;
        this._value = nodeValue;
        // 静态节点数据去对应级别的父节点数据
        if (parentNodeData && opts.parentValueLevel) {
            // 根据父值级别查找父数据
            let parent = parentNodeData;
            for (let index = 1; index < opts.parentValueLevel; index++) {
                parent = parent === null || parent === void 0 ? void 0 : parent._parent;
            }
            if (parent === null || parent === void 0 ? void 0 : parent._deData) {
                this._deData = parent._deData;
            }
            // 静态节点值不存在时，取父数据的值
            this._value = nodeValue || (parent === null || parent === void 0 ? void 0 : parent._value);
        }
        this.srfkey = ((_a = this._deData) === null || _a === void 0 ? void 0 : _a.srfkey) || this._value;
        this.srfmajortext = ((_b = this._deData) === null || _b === void 0 ? void 0 : _b.srfmajortext) || this._text;
        this._icon = this.calcIcon(model);
        this.calcDynaClass(model);
        this.calcShapeDynaClass(model);
    }
}

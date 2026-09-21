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
        this._icon = this.calcIcon(model);
    }
}

import { createUUID } from 'qx-util';
import { isBase64Image } from '@ibiz-template/core';
/**
 * 树节点数据基类
 *
 * @export
 * @abstract
 * @class TreeNodeData
 */
export class TreeNodeData {
    constructor(model, parentNodeData, opts) {
        this._uuid = createUUID();
        this._leaf = false;
        this._defaultExpand = false;
        this._leaf = opts.leaf === true;
        this._defaultExpand = opts.defaultExpand === true;
        this._parent = parentNodeData;
        this._nodeType = model.treeNodeType;
        this._disableSelect = model.disableSelect === true;
        this._changedOnly = model.enableRowEditChangedOnly === true;
        // 所有节点都要继承父的上下文，如果父存在则复制父的资源上下文，否则返回空对象。
        if (this._parent) {
            this._context = Object.assign({}, this._parent._context);
        }
        // 附加导航上下文和视图参数
        if (opts.navContext) {
            this._context = Object.assign(this._context || {}, opts.navContext);
        }
        if (opts.navParams) {
            this._params = Object.assign({}, opts.navParams);
        }
        this._nodeId = model.id;
        Object.defineProperty(this, 'srfnodeid', {
            get() {
                return this._id;
            },
            enumerable: true,
            configurable: true,
        });
    }
    /**
     * 计算节点图标
     * @author lxm
     * @date 2023-08-15 02:24:55
     * @protected
     * @param {IDETreeNode} model
     * @return {*}  {(IIcon | undefined)}
     */
    calcIcon(model) {
        const { sysImage } = model;
        const icon = {};
        if (sysImage) {
            if (sysImage.cssClass) {
                icon.cssClass = sysImage.cssClass;
            }
            if (sysImage.imagePath) {
                icon.imagePath = sysImage.imagePath;
            }
            if (sysImage.rawContent) {
                if (isBase64Image(sysImage.rawContent)) {
                    icon.imagePath = sysImage.rawContent;
                }
                else {
                    icon.htmlStr = sysImage.rawContent;
                }
            }
        }
        return Object.values(icon).length > 0 ? icon : undefined;
    }
    /**
     * 获取改变数据
     * @author zzq
     * @date 2024-03-25 14:24:55
     * @return {*}  {(IData | undefined)}
     * @memberof TreeNodeData
     */
    getDiffData() {
        if (this._deData && this._oldDeData) {
            const diffData = {};
            Object.keys(this._deData).forEach(key => {
                // 值不一致 || 属性为主键
                if (this._deData[key] !== this._oldDeData[key] ||
                    key === this._deData.srfkeyfield) {
                    diffData[key] = this._deData[key];
                }
            });
            diffData.srfkey = this._deData.srfkey;
            return diffData;
        }
        return this._deData;
    }
}

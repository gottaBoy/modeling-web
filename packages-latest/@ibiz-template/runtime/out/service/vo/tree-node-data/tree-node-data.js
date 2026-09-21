import { createUUID } from 'qx-util';
import { isBase64Image } from '@ibiz-template/core';
import { calcDynaClass } from '../../../model';
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
        this._draggable = false;
        this.srfcollapsestate = -1;
        this._leaf = opts.leaf === true;
        this._defaultExpand = opts.defaultExpand === true;
        this._parent = parentNodeData;
        this._nodeType = model.treeNodeType;
        this._disableSelect = model.disableSelect === true;
        this._changedOnly = model.enableRowEditChangedOnly === true;
        // 父节点数据主键
        this._parentValue = parentNodeData === null || parentNodeData === void 0 ? void 0 : parentNodeData._value;
        // 节点勾选了拖动、拖入、排序时允许拖拽
        this._draggable = !!((model === null || model === void 0 ? void 0 : model.allowDrag) ||
            (model === null || model === void 0 ? void 0 : model.allowDrop) ||
            (model === null || model === void 0 ? void 0 : model.allowOrder));
        // 所有节点都要继承父的上下文，如果父存在则复制父的资源上下文，否则返回空对象。
        if (this._parent) {
            this._context = Object.assign({}, this._parent._context);
        }
        // 存储完整上下文和视图参数
        if (opts.context) {
            this._fullContext = opts.context;
        }
        if (opts.params) {
            this._fullParams = opts.params;
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
        let srfcollapsestate = opts.defaultExpand === true ? 1 : 0;
        Object.defineProperty(this, 'srfcollapsestate', {
            get() {
                if (this._leaf)
                    return -1;
                return srfcollapsestate;
            },
            set(state) {
                if (!this._leaf)
                    srfcollapsestate = state;
            },
            enumerable: true,
            configurable: true,
        });
    }
    /**
     * 计算节点图标
     * @param model
     * @param dataImage
     * @returns
     */
    calcIcon(model, dataImage) {
        let { sysImage } = model;
        // 数据中附加图标优先级更高
        if (dataImage &&
            (dataImage.cssClass || dataImage.imagePath || dataImage.rawContent)) {
            sysImage = dataImage;
        }
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
    /**
     * @description 计算动态样式表
     * @protected
     * @param {IDETreeNode} model
     * @memberof TreeNodeData
     */
    calcDynaClass(model) {
        const data = this._deData || {};
        if (model.dynaClass) {
            this._dynaClass = calcDynaClass(model.dynaClass, data);
        }
    }
    /**
     * @description 计算图形动态样式表
     * @protected
     * @param {IDETreeNode} model
     * @memberof TreeNodeData
     */
    calcShapeDynaClass(model) {
        const data = this._deData || {};
        if (model.shapeDynaClass) {
            this._shapeDynaClass = calcDynaClass(model.shapeDynaClass, data);
        }
    }
}

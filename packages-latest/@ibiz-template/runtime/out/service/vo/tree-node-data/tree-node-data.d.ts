import { IDETreeNode, ISysImage } from '@ibiz/model-core';
import { IIcon, ITreeNodeData } from '../../../interface';
/**
 * 树节点数据基类
 *
 * @export
 * @abstract
 * @class TreeNodeData
 */
export declare abstract class TreeNodeData implements ITreeNodeData {
    _uuid: string;
    _nodeType: string;
    _id: string;
    srfnodeid: string;
    _value?: string | undefined;
    _text: string;
    _children?: ITreeNodeData[] | undefined;
    _deData?: IData | undefined;
    _oldDeData?: IData | undefined;
    _changedOnly: boolean;
    srfkey?: string | undefined;
    srfmajortext?: string | undefined;
    _nodeId: string;
    _leaf: boolean;
    _defaultExpand: boolean;
    _draggable: boolean;
    _context?: IParams;
    _params?: IParams;
    _parent?: ITreeNodeData;
    _parentValue?: string | undefined;
    _icon?: IIcon;
    _textHtml?: string;
    _disableSelect?: boolean;
    srfcollapsestate: -1 | 0 | 1;
    _fullContext?: IContext;
    _fullParams?: IParams;
    _dynaClass?: string[];
    _shapeDynaClass?: string[];
    constructor(model: IDETreeNode, parentNodeData: ITreeNodeData | undefined, opts: {
        leaf: boolean;
        defaultExpand: boolean;
        context?: IContext;
        params?: IParams;
        navContext?: IParams;
        navParams?: IParams;
    });
    /**
     * 计算节点图标
     * @param model
     * @param dataImage
     * @returns
     */
    protected calcIcon(model: IDETreeNode, dataImage?: ISysImage): IIcon | undefined;
    /**
     * 获取改变数据
     * @author zzq
     * @date 2024-03-25 14:24:55
     * @return {*}  {(IData | undefined)}
     * @memberof TreeNodeData
     */
    getDiffData(): IData | undefined;
    /**
     * @description 计算动态样式表
     * @protected
     * @param {IDETreeNode} model
     * @memberof TreeNodeData
     */
    protected calcDynaClass(model: IDETreeNode): void;
    /**
     * @description 计算图形动态样式表
     * @protected
     * @param {IDETreeNode} model
     * @memberof TreeNodeData
     */
    protected calcShapeDynaClass(model: IDETreeNode): void;
}
//# sourceMappingURL=tree-node-data.d.ts.map
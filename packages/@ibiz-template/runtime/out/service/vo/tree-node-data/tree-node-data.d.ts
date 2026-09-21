import { IDETreeNode } from '@ibiz/model-core';
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
    _context?: IParams;
    _params?: IParams;
    _parent?: ITreeNodeData;
    _icon?: IIcon;
    _textHtml?: string;
    _disableSelect?: boolean;
    constructor(model: IDETreeNode, parentNodeData: ITreeNodeData | undefined, opts: {
        leaf: boolean;
        defaultExpand: boolean;
        navContext?: IParams;
        navParams?: IParams;
    });
    /**
     * 计算节点图标
     * @author lxm
     * @date 2023-08-15 02:24:55
     * @protected
     * @param {IDETreeNode} model
     * @return {*}  {(IIcon | undefined)}
     */
    protected calcIcon(model: IDETreeNode): IIcon | undefined;
    /**
     * 获取改变数据
     * @author zzq
     * @date 2024-03-25 14:24:55
     * @return {*}  {(IData | undefined)}
     * @memberof TreeNodeData
     */
    getDiffData(): IData | undefined;
}
//# sourceMappingURL=tree-node-data.d.ts.map
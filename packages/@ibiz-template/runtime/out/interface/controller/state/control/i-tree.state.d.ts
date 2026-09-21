import { IIcon } from '../../common';
import { IMDControlState } from './i-md-control.state';
/**
 * 树部件状态
 * @author lxm
 * @date 2023-05-22 02:18:43
 * @export
 * @interface ITreeState
 * @extends {IMDControlState}
 */
export interface ITreeState extends IMDControlState {
    items: ITreeNodeData[];
    selectedData: ITreeNodeData[];
    /**
     * 树的根节点
     *
     * @type {ITreeNodeData}
     * @memberof TreeState
     */
    rootNodes: ITreeNodeData[];
    /**
     * 外部提供的默认展开的节点集合
     *
     * @author zk
     * @date 2023-07-10 08:07:25
     * @type {string[]}
     * @memberof ITreeState
     */
    defaultExpandedKeys: string[];
    /**
     * 实际默认展开节点集合
     * @author lxm
     * @date 2023-08-09 05:06:56
     * @type {string[]}
     */
    expandedKeys: string[];
    /**
     * 是否是导航的（即树导航里的树）
     * @author lxm
     * @date 2023-11-08 03:25:21
     * @type {boolean}
     */
    navigational: boolean;
    /**
     * 查询条件
     * @author lxm
     * @date 2023-08-02 07:38:49
     * @type {string}
     */
    query: string;
    /**
     * 快速搜索占位符
     *
     * @type {string}
     * @memberof IExpBarControlState
     */
    placeHolder: string;
    /**
     * 移动端展开节点标识（存储最后展开节点的标识）
     * @type {string}
     * @memberof TreeState
     */
    mobExpandedKey: string;
}
/**
 * 树节点数据格式
 *
 * @export
 * @class ITreeNodeData
 */
export interface ITreeNodeData {
    /**
     * 节点数据的唯一标识（创建的时候自动生成）
     * @author lxm
     * @date 2023-12-18 10:24:26
     * @type {string}
     */
    _uuid: string;
    /**
     * 节点类型
     * @description 值模式 [云树视图节点类型] {STATIC：静态、 DE：动态（实体）、 CODELIST：动态（代码表） }
     * @type {( string | 'STATIC' | 'DE' | 'CODELIST')}
     * 来源  getTreeNodeType
     */
    _nodeType?: string;
    /**
     * 节点标识(对应节点模型的id)
     *
     * @type {string}
     * @memberof ITreeNodeData
     */
    _nodeId: string;
    /**
     * 节点唯一标识，在父的id上加上自身的唯一标识，用>分隔
     * 如：staticNode1>14>84847aa970ba3db7bbe00754aed3888d
     *
     * @type {string}
     * @memberof ITreeNodeData
     */
    _id: string;
    /**
     * 节点唯一标识，等同_id，树选择视图回显用
     *
     * @type {string}
     * @memberof ITreeNodeData
     */
    srfnodeid: string;
    /**
     * 节点的值(可能是自己的主键，也可能是沿用父的值)
     * 静态节点可能没有节点值
     *
     * @type {string}
     * @memberof ITreeNodeData
     */
    _value?: string;
    /**
     * 节点显示名称
     *
     * @type {string}
     * @memberof ITreeNodeData
     */
    _text: string;
    /**
     * 是否是叶子节点（没有子节点的节点）
     *
     * @type {boolean}
     * @memberof ITreeNodeData
     */
    _leaf: boolean;
    /**
     * 资源路径相关上下文参数
     * 根据节点展开的主从关系，在父的基础上附加自身的实体主键
     * 附加关系上转换的导航上下文
     *
     * @type {IParams}
     * @memberof ITreeNodeData
     */
    _context?: IParams;
    /**
     * 关系上转换的视图参数
     *
     * @type {IParams}
     * @memberof ITreeNodeData
     */
    _params?: IParams;
    /**
     * 子节点集合（没有子节点则不存在）
     *
     * @type {ITreeNodeData[]}
     * @memberof ITreeNodeData
     */
    _children?: ITreeNodeData[];
    /**
     * 父节点数据对象
     *
     * @type {ITreeNodeData}
     * @memberof ITreeNodeData
     */
    _parent?: ITreeNodeData;
    /**
     * 实体数据
     *
     * @type {IData}
     * @memberof ITreeNodeData
     */
    _deData?: IData;
    /**
     * 实体数据
     *
     * @type {IData}
     * @memberof ITreeNodeData
     */
    _oldDeData?: IData;
    /**
     * 是否只提交改变值
     *
     * @type {boolean}
     * @memberof ITreeNodeData
     */
    _changedOnly: boolean;
    /**
     * 图标
     * @author lxm
     * @date 2023-08-15 02:02:49
     * @type {IIcon}
     */
    _icon?: IIcon;
    /**
     * 节点文本的html显示
     * @author lxm
     * @date 2023-08-15 02:15:09
     * @type {string}
     */
    _textHtml?: string;
    /**
     * 是否禁止选择
     * @author lxm
     * @date 2024-02-07 09:28:14
     * @type {boolean}
     */
    _disableSelect?: boolean;
    /**
     * 作为实体数据时的主键
     * @author lxm
     * @date 2023-05-29 09:28:59
     * @type {string}
     */
    srfkey?: string;
    /**
     * 作为实体数据时的主信息
     * @author lxm
     * @date 2023-05-29 09:29:00
     * @type {string}
     */
    srfmajortext?: string;
    /**
     * 获取改变数据
     * @author zzq
     * @date 2024-03-25 14:29:00
     * @type {string}
     */
    getDiffData(): IData | undefined;
}
//# sourceMappingURL=i-tree.state.d.ts.map
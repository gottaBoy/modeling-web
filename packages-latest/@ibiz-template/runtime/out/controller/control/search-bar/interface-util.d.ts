import { IFilterNode, ISearchCond, ISearchCondEx } from '../../../interface';
/**
 * 获取初始过滤项树节点数据集合
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-12-21 17:29:47
 */
export declare function getOriginFilterNodes(): IFilterNode[];
/**
 * 校验过滤项集合是否正确且至少有一个属性过滤项
 * @author lxm
 * @date 2024-04-09 03:02:00
 * @export
 * @param {IFilterNode[]} filterNodes
 * @return {*}  {{
 *   pass: boolean; 是否通过校验
 * }}
 */
export declare function validateFilterNodes(filterNodes: IFilterNode[]): {
    pass: boolean;
};
/** 后续执行回调函数 */
export type AfterCallback = (filterNode: IFilterNode, searchCond: ISearchCond) => void;
/**
 * IFilterNode转换成ISearchCond接口
 * @author lxm
 * @date 2024-04-09 03:16:25
 * @export
 * @param {IFilterNode} filterNode
 * @return {*}  {ISearchCond}
 */
export declare function filterNode2SearchCond(filterNode: IFilterNode, opts?: {
    after: AfterCallback;
}): ISearchCond;
/**
 * 转换IFilterNode[]到ISearchCond[]
 * 如果filerNodes校验不通过，则返回undefined
 * @author lxm
 * @date 2024-04-09 03:48:21
 * @export
 * @param {IFilterNode[]} filterNodes
 * @return {*}  {(ISearchCond[] | undefined)}
 */
export declare function calcSearchConds(filterNodes: IFilterNode[], opts?: {
    after: AfterCallback;
}): ISearchCond[] | undefined;
/**
 * ISearchCondEx转换成IFilterNode接口
 * @author lxm
 * @date 2024-04-09 03:26:08
 * @export
 * @param {ISearchCondEx} cond
 * @return {*}  {IFilterNode}
 */
export declare function SearchCondEx2filterNode(cond: ISearchCondEx): IFilterNode;
/**
 * IFilterNode转换成ISearchCondEx接口
 * @author lxm
 * @date 2024-04-09 03:16:25
 * @export
 * @param {IFilterNode} filterNode
 * @return {*}  {ISearchCondEx}
 */
export declare function filterNode2SearchCondEx(filterNode: IFilterNode): ISearchCondEx;
/**
 * 转换IFilterNode[]到ISearchCondEx[]
 * 如果filerNodes校验不通过，则返回undefined
 * @author lxm
 * @date 2024-04-09 03:48:21
 * @export
 * @param {IFilterNode[]} filterNodes
 * @return {*}  {(ISearchCondEx[] | undefined)}
 */
export declare function calcSearchCondExs(filterNodes: IFilterNode[]): ISearchCondEx[] | undefined;
//# sourceMappingURL=interface-util.d.ts.map
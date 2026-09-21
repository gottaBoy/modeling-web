import { IAppDataEntity } from '@ibiz/model-core';
/**
 * 获取匹配的资源路径
 * - 没匹配返回undefined
 * - 匹配了返回一个对象，里面包含
 * - path是/父名称复数/${父名称小写}/子名称复数/${子名称小写}格式的字符串
 * - keys是所有名称小写的字符串集合
 * @author lxm
 * @date 2023-07-12 07:02:52
 * @export
 * @param {IParams} context
 * @param {IAppDataEntity} entity
 * @return {*}  {({ path: string; keys: string[] } | undefined)}
 */
export declare function getMatchResPath(context: IParams, entity: IAppDataEntity): {
    path: string;
    keys: string[];
} | undefined;
/**
 * 计算资源路径url（不包含自身的资源路径）
 *
 * @author lxm
 * @date 2022-11-25 13:11:53
 * @export
 * @param {IContext} context 上下文对象
 * @param {ServicePathItem[][]} pathItems 计算出的资源关系路径
 * @return {*}  {string}
 */
export declare function calcResPath(context: IContext, entity: IAppDataEntity): string;
//# sourceMappingURL=res-path.d.ts.map
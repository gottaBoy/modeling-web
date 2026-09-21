import { IDataEntity } from '../../../interface';
/**
 * 判断数据主键是否存在，不存在抛出异常
 *
 * @export
 * @param {string} funcName 执行方法名称
 * @param {IDataEntity} entity 判断数据
 * @return {*}  {boolean}
 */
export declare function isExistSrfKey(funcName: string, entity: IDataEntity): boolean;
/**
 * 判断缓存 srfsessionid 是否存在，不存在抛异常
 *
 * @export
 * @param {string} funcName 执行方法名称
 * @param {IContext} context 上下文
 * @return {*}  {boolean}
 */
export declare function isExistSessionId(funcName: string, context: IContext): boolean;
//# sourceMappingURL=service-exist-util.d.ts.map
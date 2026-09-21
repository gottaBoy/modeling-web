import { INavigateParam } from '@ibiz/model-core';
/**
 * 把对象格式的导航参数转换成数组格式的导航参数
 * @author lxm
 * @date 2023-07-10 03:33:14
 * @export
 * @param {IData} navParams
 * @return {*}  {IPSNavigateParam[]}
 */
export declare function convertObjectToNavParams(navParams: IData): INavigateParam[];
/**
 * 转换导航数据(如导航上下文，导航视图参数)
 * - 把%xxx%,转换成origins元素里对应叫xxx的值
 * - 按顺序查找origins的元素，且只要有xxx的属性就算找到，不管值是否为空。
 * - naviData里{a:%xxx%}，origins里找不到xxx则返回值里不存在a属性
 * - naviData里%a.b.c%,origins里找到origins.a.b.c,没找到则不做处理
 * - naviData里非%xxx%形式的，都当成直接值原样返回，包括空值。
 *
 * @author lxm
 * @date 2022-08-22 11:08:18
 * @export
 * @param {INavigateParam[]} navParams 导航参数
 * @param {...IData[]} origins 转换数据来源集合
 */
export declare function convertNavData(navParams: INavigateParam[] | IData | undefined | null, ...origins: IData[]): IData;
/**
 * 通过模型中的导航数组 转换导航数据(如导航上下文，导航视图参数)
 * - 把%xxx%,转换成origins元素里对应叫xxx的值
 * - 按顺序查找origins的元素，且只要有xxx的属性就算找到，不管值是否为空。
 * - naviData里{a:%xxx%}，origins里找不到xxx则返回值里不存在a属性
 * - naviData里%a.b.c%,origins里找到origins.a.b.c,没找到则不做处理
 * - naviData里非%xxx%形式的，都当成直接值原样返回，包括空值。
 *
 * @author lxm
 * @date 2022-08-22 11:08:18
 * @export
 * @param {INavigateParam[]} naviDatas 导航参数
 * @param {...IData[]} origins 转换数据来源集合
 */
export declare function convertNavDataByArray(naviDatas: INavigateParam[], ...origins: IData[]): IData;
/**
 * 根据导航参数把多条数据转换成单条数据，用 , 分隔
 * @author lxm
 * @date 2023-07-10 04:31:30
 * @export
 * @param {(IPSNavigateParam[] | IData | undefined | null)} navParams
 * @param {IData[]} dataArr
 * @return {*}  {IData}
 */
export declare function formatMultiData(navParams: INavigateParam[] | IData | undefined | null, dataArr: IData[]): IData;
/**
 * @description 解析url对象查询参数，防止浏览器不支持解析URL
 * @export
 * @param {string} search
 * @return {*}  {IData}
 */
export declare function parseSearchParams(search: string): IData;
//# sourceMappingURL=nav-params.d.ts.map
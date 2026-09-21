import { ControlVO } from '../../../service';
/**
 * 表单表格里判断属性的值是否发生改变
 * 如果两个值都是null，undefined，''中的一种，那么判断它为不变
 * 因为都是空
 * @author lxm
 * @date 2023-05-31 07:21:27
 * @export
 * @param {unknown} value
 * @param {unknown} value2
 * @return {*}  {boolean}
 */
export declare function isValueChange(value: unknown, value2: unknown): boolean;
/**
 * 获取单条后台数据
 * 如果是数组获取第一条
 * 如果是界面VO则转换成源数据返回
 * @author lxm
 * @date 2023-08-03 10:02:27
 * @export
 * @param {(IData | ControlVO | IData[] | ControlVO[])} data
 * @return {*}  {(IData | undefined)}
 */
export declare function getOriginData(data: IData | ControlVO | IData[] | ControlVO[]): IData | undefined;
/**
 * 递归将树形数据转为一维数组
 *
 * @export
 * @param {IData[]} items 原始数据
 * @param {string} [childField='chidlren'] 存放子的属性
 */
export declare function getAllItems(items: IData[], childField?: string): IData[];
/**
 * 格式化分隔符
 *
 * @export
 * @param {string} type 类型--菜单 | 工具栏
 * @param {(IData[] | undefined)} items 所有项模型
 * @param {(IData | undefined)} state 所有项状态
 * @param {(IData[] | undefined)} [opts] 额外配置项（主要是针对菜单）
 * @return {*}  {string[]}
 */
export declare function formatSeparator(type: string, items: IData[] | undefined, state: IData | undefined, opts?: IData[] | undefined): string[];
//# sourceMappingURL=util.d.ts.map
import { IAppCodeList, IApplication, ICodeItem } from '@ibiz/model-core';
import { CodeListItem } from '../../../interface';
import { DynamicCodeListCache } from '../../utils';
/**
 * 全局代码表服务
 *
 * @author chitanda
 * @date 2022-08-25 15:08:32
 * @export
 * @class CodeListService
 */
export declare class CodeListService {
    protected appModel: IApplication;
    /**
     * 所有代码表缓存
     *
     * @author lxm
     * @date 2022-08-25 20:08:16
     */
    protected allCodeLists: Map<string, IAppCodeList>;
    /**
     * 代码表项数据缓存
     *
     * @author lxm
     * @date 2022-08-25 21:08:12
     * @protected
     * @type {Map<string, CodeListItem[]>}
     */
    protected cache: Map<string, readonly CodeListItem[] | DynamicCodeListCache>;
    constructor(appModel: IApplication);
    /**
     * 获取静态代码表
     *
     * @author chitanda
     * @date 2022-08-25 15:08:11
     * @param {string} _tag
     * @return {*}  {CodeListItem[]}
     */
    protected getStatic(codeList: IAppCodeList): CodeListItem[];
    /**
     * 设置代码表模型
     *
     * @author lxm
     * @date 2023-5-23 19:38:51
     * @protected
     * @param {IAppCodeList} codeList
     * @returns {*}
     */
    setCodeList(codeList: IAppCodeList): void;
    /**
     * 获取代码表模型
     *
     * @author lxm
     * @date 2023-5-23 19:38:51
     * @protected
     * @param {string} tag
     * @returns {*}
     */
    getCodeList(tag: string): IAppCodeList | undefined;
    /**
     * 格式化代码表
     *
     * @author lxm
     * @date 2022-08-25 21:08:03
     * @protected
     * @param {ICodeItem[]} codeItems
     * @param {boolean} isValueNumber
     * @returns {*}
     */
    protected formatStaticItems(codeItems: ICodeItem[], isValueNumber: boolean): Readonly<CodeListItem>[];
    /**
     * 获取动态代码表
     *
     * @author lxm
     * @date 2022-08-25 21:08:06
     * @protected
     * @param {IAppCodeList} codeList
     * @returns {*}  {IData[]}
     */
    protected getDynamicCodeList(codeList: IAppCodeList, context: IContext, params?: IParams): Promise<CodeListItem[]>;
    /**
     * 获取代码表
     *
     * @author chitanda
     * @date 2022-08-25 15:08:45
     * @param {string} tag
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<CodeListItem[]>}
     */
    get(tag: string, context: IContext, params?: IParams): Promise<readonly CodeListItem[]>;
    /**
     * 递归查找代码表项
     *
     * @param {IAppCodeList} codeList 代码表模型
     * @param {readonly CodeListItem[] | undefined} dataItems 代码表数据
     * @param {string | number} value 代码项值
     * @returns 代码表项|CodeListItem | undefined
     */
    findCodeListItem(codeList: IAppCodeList, dataItems: readonly CodeListItem[] | undefined, value: string | number): CodeListItem | undefined;
    /**
     * 获取代码表项
     *
     * @param {string} tag 代码表标识
     * @param {string | number} value 代码表值
     * @param {IContext} context 上下文
     * @param {IParams} params 视图参数
     * @returns 代码表项|Promise<CodeListItem | undefined>
     */
    getItem(tag: string, value: string | number, context: IContext, params?: IParams): Promise<CodeListItem | undefined>;
    /**
     * 获取代码表实例对象(动态代码表返回具体实例，静态代码表返回undefined)
     *
     * @param tag 代码表标识
     * @returns 动态代码表实例|undefined
     */
    getCodeListInstance(tag: string): Promise<DynamicCodeListCache | undefined>;
    /**
     * 销毁(清除动态代码表监听)
     *
     * @author tony001
     * @return {void}
     */
    destroy(): void;
}
//# sourceMappingURL=code-list.service.d.ts.map
import { QXEvent } from 'qx-util';
import { IApiShortCutUtil, IShortCutData } from '../../interface';
/**
 * @description 快捷方式全局工具类
 * @export
 * @class ShortCutUtil
 * @implements {IApiShortCutUtil}
 */
export declare class ShortCutUtil implements IApiShortCutUtil {
    /**
     * @description 快捷方式
     * @private
     * @type {IShortCut}
     * @memberof ShortCutUtil
     */
    private $ShortCut;
    /**
     * @description 事件监听器
     * @protected
     * @memberof ShortCutUtil
     */
    protected evt: QXEvent<{
        change: (data: IShortCutData[]) => void;
    }>;
    /**
     * @description 快捷方式数据
     * @readonly
     * @type {IShortCutData[]}
     * @memberof ShortCutUtil
     */
    get data(): IShortCutData[];
    /**
     * @description 快捷方式模式
     * @readonly
     * @type {('horizontal' | 'vertical')}
     * @memberof ShortCutUtil
     */
    get mode(): 'horizontal' | 'vertical';
    constructor();
    /**
     * @description 初始化快捷方式数据
     * @private
     * @memberof ShortCutUtil
     */
    private initShortCut;
    /**
     * @description 持久化保存快捷方式
     * @private
     * @memberof ShortCutUtil
     */
    private saveShortCut;
    /**
     * @description 设置快捷方式模式
     * @param {('horizontal' | 'vertical')} mode
     * @memberof ShortCutUtil
     */
    setShortCutMode(mode: 'horizontal' | 'vertical'): void;
    /**
     * @description 订阅数据改变事件
     * @param {(data: IShortCutData[]) => void} callback
     * @memberof ShortCutUtil
     */
    onChange(callback: (data: IShortCutData[]) => void): void;
    /**
     * @description 取消订阅
     * @param {(data: IShortCutData[]) => void} callback
     * @memberof ShortCutUtil
     */
    offChange(callback: (data: IShortCutData[]) => void): void;
    /**
     * @description 计算快捷方式key
     * @param {{
     *     context: IContext;
     *     appViewId: string;
     *   }} {
     *     context,
     *     appViewId,
     *   }
     * @returns {*}  {Promise<string>}
     * @memberof ShortCutUtil
     */
    calcShortCutKey({ context, appViewId, }: {
        context: IContext;
        appViewId: string;
    }): Promise<string>;
    /**
     * @description 添加快捷方式
     * @param {IShortCutData} shortCut
     * @memberof ShortCutUtil
     */
    addShortCut(shortCut: IShortCutData): void;
    /**
     * @description 删除快捷方式
     * @param {string} key
     * @memberof ShortCutUtil
     */
    removeShortCut(key: string): void;
    /**
     * @description 改变顺序
     * @param {number} newIndex
     * @param {number} oldIndex
     * @memberof ShortCutUtil
     */
    changeIndex(newIndex: number, oldIndex: number): void;
    /**
     * @description 是否存在最小化
     * @param {string} key
     * @returns {*}  {boolean}
     * @memberof ShortCutUtil
     */
    isExist(key: string): boolean;
}
//# sourceMappingURL=short-cut-util.d.ts.map
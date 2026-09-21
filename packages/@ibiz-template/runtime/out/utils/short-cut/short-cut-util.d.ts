import { QXEvent } from 'qx-util';
import { IShortCutData } from '../../interface';
/**
 * 快捷方式全局工具类
 *
 * @export
 * @class ShortCutUtil
 */
export declare class ShortCutUtil {
    /**
     * 快捷方式
     *
     * @private
     * @type {IShortCut[]}
     * @memberof ShortCutUtil
     */
    private $ShortCut;
    /**
     * 事件监听器
     *
     * @protected
     * @memberof ShortCutUtil
     */
    protected evt: QXEvent<{
        change: (data: IShortCutData[]) => void;
    }>;
    /**
     * 快捷方式数据
     *
     * @memberof ShortCutUtil
     */
    get data(): IShortCutData[];
    /**
     * 快捷方式模式
     *
     * @readonly
     * @type {string}
     * @memberof ShortCutUtil
     */
    get mode(): 'horizontal' | 'vertical';
    /**
     * Creates an instance of ShortCutUtil.
     * @memberof ShortCutUtil
     */
    constructor();
    /**
     * 初始化快捷方式数据
     *
     * @private
     * @memberof ShortCutUtil
     */
    private initShortCut;
    /**
     * 持久化保存快捷方式
     *
     * @memberof ShortCutUtil
     */
    private saveShortCut;
    /**
     * 设置快捷方式模式
     *
     * @param {('horizontal' | 'vertical')} mode
     * @memberof ShortCutUtil
     */
    setShortCutMode(mode: 'horizontal' | 'vertical'): void;
    /**
     * 订阅数据改变事件
     *
     * @param {(data: IShortCutData) => void} callback 回调
     * @memberof ShortCutUtil
     */
    onChange(callback: (data: IShortCutData[]) => void): void;
    /**
     * 取消订阅
     *
     * @param {(data: IShortCutData) => void} callback
     * @memberof ShortCutUtil
     */
    offChange(callback: (data: IShortCutData[]) => void): void;
    /**
     * 计算快捷方式key
     *
     * @param {{
     *     context: IContext;
     *     appViewId: string;
     *   }} {
     *     context,
     *     appViewId,
     *   }
     * @return {*}  {Promise<string>}
     * @memberof ShortCutUtil
     */
    calcShortCutKey({ context, appViewId, }: {
        context: IContext;
        appViewId: string;
    }): Promise<string>;
    /**
     * 添加快捷方式
     *
     * @param {IShortcut} shortcut
     * @memberof ShortCutUtil
     */
    addShortCut(shortCut: IShortCutData): void;
    /**
     * 删除快捷方式
     *
     * @param {string} key
     * @memberof ShortcutUtil
     */
    removeShortCut(key: string): void;
    /**
     * 改变顺序
     *
     * @param {number} newIndex 新位置索引
     * @param {number} oldIndex 旧位置索引
     * @memberof ShortcutUtil
     */
    changeIndex(newIndex: number, oldIndex: number): void;
    /**
     * 是否存在最小化
     *
     * @param {string} key
     * @return {*}  {boolean}
     * @memberof ShortCutUtil
     */
    isExist(key: string): boolean;
}
//# sourceMappingURL=short-cut-util.d.ts.map
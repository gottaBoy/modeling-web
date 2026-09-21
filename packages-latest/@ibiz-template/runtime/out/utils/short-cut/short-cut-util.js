import { QXEvent } from 'qx-util';
import { calcDeCodeNameById } from '../../model';
/**
 * @description 快捷方式全局工具类
 * @export
 * @class ShortCutUtil
 * @implements {IApiShortCutUtil}
 */
export class ShortCutUtil {
    /**
     * @description 快捷方式数据
     * @readonly
     * @type {IShortCutData[]}
     * @memberof ShortCutUtil
     */
    get data() {
        return this.$ShortCut.items;
    }
    /**
     * @description 快捷方式模式
     * @readonly
     * @type {('horizontal' | 'vertical')}
     * @memberof ShortCutUtil
     */
    get mode() {
        return this.$ShortCut.mode;
    }
    constructor() {
        /**
         * @description 快捷方式
         * @private
         * @type {IShortCut}
         * @memberof ShortCutUtil
         */
        this.$ShortCut = {
            items: [],
            mode: 'vertical',
        };
        /**
         * @description 事件监听器
         * @protected
         * @memberof ShortCutUtil
         */
        this.evt = new QXEvent();
        this.initShortCut();
    }
    /**
     * @description 初始化快捷方式数据
     * @private
     * @memberof ShortCutUtil
     */
    initShortCut() {
        const shortcut = window.localStorage.getItem('IBizShortCut');
        if (shortcut) {
            this.$ShortCut = JSON.parse(shortcut);
        }
    }
    /**
     * @description 持久化保存快捷方式
     * @private
     * @memberof ShortCutUtil
     */
    saveShortCut() {
        this.evt.emit('change', [...this.$ShortCut.items]);
        window.localStorage.setItem('IBizShortCut', JSON.stringify(this.$ShortCut));
    }
    /**
     * @description 设置快捷方式模式
     * @param {('horizontal' | 'vertical')} mode
     * @memberof ShortCutUtil
     */
    setShortCutMode(mode) {
        this.$ShortCut.mode = mode;
        window.localStorage.setItem('IBizShortCut', JSON.stringify(this.$ShortCut));
    }
    /**
     * @description 订阅数据改变事件
     * @param {(data: IShortCutData[]) => void} callback
     * @memberof ShortCutUtil
     */
    onChange(callback) {
        this.evt.on('change', callback);
    }
    /**
     * @description 取消订阅
     * @param {(data: IShortCutData[]) => void} callback
     * @memberof ShortCutUtil
     */
    offChange(callback) {
        this.evt.off('change', callback);
    }
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
    async calcShortCutKey({ context, appViewId, }) {
        const appView = await ibiz.hub.config.view.get(appViewId);
        let key = `${context.srfappid}-${context.srfuserid}-${appViewId}`;
        if (appView.appDataEntityId) {
            const deName = calcDeCodeNameById(appView.appDataEntityId);
            key += `-${deName}-${context[deName]}`;
        }
        return key;
    }
    /**
     * @description 添加快捷方式
     * @param {IShortCutData} shortCut
     * @memberof ShortCutUtil
     */
    addShortCut(shortCut) {
        const index = this.$ShortCut.items.findIndex(item => item.key === shortCut.key);
        if (index > -1) {
            this.$ShortCut.items.splice(index, 1, shortCut);
        }
        else {
            this.$ShortCut.items.push(shortCut);
        }
        this.saveShortCut();
    }
    /**
     * @description 删除快捷方式
     * @param {string} key
     * @memberof ShortCutUtil
     */
    removeShortCut(key) {
        const index = this.$ShortCut.items.findIndex(item => item.key === key);
        if (index > -1) {
            this.$ShortCut.items.splice(index, 1);
            this.saveShortCut();
        }
    }
    /**
     * @description 改变顺序
     * @param {number} newIndex
     * @param {number} oldIndex
     * @memberof ShortCutUtil
     */
    changeIndex(newIndex, oldIndex) {
        const { length } = this.$ShortCut.items;
        // 确保索引在数组范围内
        if (oldIndex < 0 ||
            oldIndex >= length ||
            newIndex < 0 ||
            newIndex >= length) {
            throw new Error(ibiz.i18n.t('runtime.utils.shortCut.invalidIndexNewIndex', {
                newIndex,
                oldIndex,
                length,
            }));
        }
        const removedItem = this.$ShortCut.items.splice(oldIndex, 1)[0];
        this.$ShortCut.items.splice(newIndex, 0, removedItem);
        this.saveShortCut();
    }
    /**
     * @description 是否存在最小化
     * @param {string} key
     * @returns {*}  {boolean}
     * @memberof ShortCutUtil
     */
    isExist(key) {
        const index = this.$ShortCut.items.findIndex(item => item.key === key);
        if (index >= 0) {
            return true;
        }
        return false;
    }
}

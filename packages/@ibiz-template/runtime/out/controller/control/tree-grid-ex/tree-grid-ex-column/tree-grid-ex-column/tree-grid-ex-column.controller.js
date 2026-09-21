/**
 * 树表格（增强）列控制器
 * @author lxm
 * @date 2023-12-21 02:03:28
 * @export
 * @class TreeGridExColumnController
 * @template T
 */
export class TreeGridExColumnController {
    /**
     * 上下文
     *
     * @author lxm
     * @date 2022-09-05 19:09:24
     * @readonly
     * @type {IContext}
     */
    get context() {
        return this.treeGrid.context;
    }
    /**
     * 视图参数
     *
     * @author lxm
     * @date 2022-09-05 19:09:00
     * @readonly
     * @type {IParams}
     */
    get params() {
        return this.treeGrid.params;
    }
    /**
     * 是否是第一个显示的树表格列
     * @author lxm
     * @date 2023-12-22 03:28:10
     * @readonly
     * @type {boolean}
     */
    get isFirstShowColumn() {
        const firstColumn = this.treeGrid.state.columnStates.find(item => !item.hidden);
        return (firstColumn === null || firstColumn === void 0 ? void 0 : firstColumn.key) === this.model.codeName;
    }
    /**
     * Creates an instance of GridFieldColumnController.
     * @author lxm
     * @date 2022-08-24 20:08:22
     * @param {T} model
     */
    constructor(model, treeGrid) {
        /**
         * 是否是自适应列
         * @author lxm
         * @date 2023-07-07 11:20:16
         * @type {boolean}
         */
        this.isAdaptiveColumn = false;
        /**
         * 是否是脚本代码
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-08-15 10:51:25
         */
        this.isCustomCode = false;
        this.model = model;
        this.treeGrid = treeGrid;
        this.isAdaptiveColumn = model.widthUnit === 'STAR';
    }
    /**
     * 子类不可覆盖或重写此方法，在 init 时需要重写的使用 onInit 方法。
     *
     * @author lxm
     * @date 2022-08-18 22:08:30
     * @returns {*}  {Promise<void>}
     */
    async init() {
        await this.onInit();
    }
    /**
     * 初始化方法
     *
     * @author lxm
     * @date 2022-09-28 15:09:15
     * @protected
     * @returns {*}  {Promise<void>}
     */
    async onInit() {
        // 初始化操作
    }
    /**
     * 表格状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    gridStateNotify(_row, _state) {
        // 子类实现具体逻辑
    }
    async dataChangeNotify(_row, _names) {
        // 子类实现具体逻辑
    }
}

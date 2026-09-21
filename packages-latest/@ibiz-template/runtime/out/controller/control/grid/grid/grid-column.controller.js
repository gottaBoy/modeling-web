import { ScriptFactory } from '../../../../utils';
/**
 * @description 表格列控制器
 * @export
 * @class GridColumnController
 * @implements {IGridColumnController}
 * @template T
 */
export class GridColumnController {
    /**
     * 上下文
     *
     * @author lxm
     * @date 2022-09-05 19:09:24
     * @readonly
     * @type {IContext}
     */
    get context() {
        return this.grid.context;
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
        return this.grid.params;
    }
    /**
     * 该列是否启用行编辑
     *
     * @author lxm
     * @date 2022-09-06 11:09:58
     * @readonly
     */
    get enableRowEdit() {
        return !!(this.grid.model.enableRowEdit && this.model.enableRowEdit);
    }
    /**
     * 该列对应数据项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-15 10:48:22
     */
    get deGridDataItem() {
        var _a;
        return (_a = this.grid.model.degridDataItems) === null || _a === void 0 ? void 0 : _a.find(item => {
            return item.id === this.model.dataItemName;
        });
    }
    /**
     * 值格式化
     * @author lxm
     * @date 2023-08-25 05:03:07
     * @readonly
     * @type {(string | undefined)}
     */
    get valueFormat() {
        var _a;
        return (_a = this.deGridDataItem) === null || _a === void 0 ? void 0 : _a.format;
    }
    /**
     * 数据类型（数值）
     * @author lxm
     * @date 2023-08-25 05:03:07
     * @readonly
     * @type {(string | undefined)}
     */
    get dataType() {
        var _a;
        return (_a = this.deGridDataItem) === null || _a === void 0 ? void 0 : _a.dataType;
    }
    /**
     * Creates an instance of GridFieldColumnController.
     * @author lxm
     * @date 2022-08-24 20:08:22
     * @param {T} model
     */
    constructor(model, grid) {
        var _a;
        /**
         * @description 是否是自适应列
         * @type {boolean}
         * @memberof GridColumnController
         */
        this.isAdaptiveColumn = false;
        /**
         * @description 是否是脚本代码
         * @type {boolean}
         * @memberof GridColumnController
         */
        this.isCustomCode = false;
        this.model = model;
        this.grid = grid;
        this.isAdaptiveColumn = model.widthUnit === 'STAR';
        if (this.isAdaptiveColumn) {
            this.grid.hasAdaptiveColumn = true;
        }
        const renderCode = this.getRenderCode();
        if (((_a = this.deGridDataItem) === null || _a === void 0 ? void 0 : _a.customCode) || renderCode) {
            this.isCustomCode = true;
        }
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
     * 处理列过滤
     *
     * @param {unknown} _value
     * @return {*}  {Promise<void>}
     * @memberof GridColumnController
     */
    async handleColumnScreen(_value) {
        // 子类实现
    }
    /**
     * 解析获取脚本代码html
     * @param {GridRowState} row
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-15 11:29:58
     */
    async getCustomHtml(row) {
        var _a;
        const renderCode = this.getRenderCode();
        let scriptCode = ((_a = this.deGridDataItem) === null || _a === void 0 ? void 0 : _a.scriptCode) || renderCode;
        if (scriptCode) {
            // 兼容单行脚本
            if (!scriptCode.includes('return')) {
                scriptCode = `return (${scriptCode})`;
            }
            // 默认同步执行，设置自定义参数isAsync=false定义非同步执行
            const { userParam } = this.model;
            if (userParam && userParam.isAsync === 'false') {
                return ScriptFactory.execScriptFn({
                    data: row.data,
                    context: this.context,
                    params: this.params,
                    controller: this,
                    ctrl: this.grid,
                    view: this.grid.view,
                    metadata: { column: this.model },
                }, scriptCode, { isAsync: false });
            }
            return (await ScriptFactory.asyncExecScriptFn({
                data: row.data,
                context: this.context,
                params: this.params,
                controller: this,
                ctrl: this.grid,
                view: this.grid.view,
                metadata: { column: this.model },
            }, scriptCode));
        }
    }
    /**
     * @description 获取绘制器模型代码
     * @return {*}  {string}
     * @memberof GridColumnController
     */
    getRenderCode() {
        let result = '';
        const { controlRenders = [], id } = this.model;
        const item = controlRenders.find(renderItem => renderItem.renderType === 'LAYOUTPANEL_MODEL' &&
            ![
                `${id === null || id === void 0 ? void 0 : id.toLowerCase()}_tooltip`,
                `${id === null || id === void 0 ? void 0 : id.toLowerCase()}_edit_tooltip`,
            ].includes(renderItem.id));
        if (item) {
            result = item.layoutPanelModel || '';
        }
        return result;
    }
}

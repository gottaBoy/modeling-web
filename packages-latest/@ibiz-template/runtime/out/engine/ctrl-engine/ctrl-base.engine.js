/**
 * @description 挂载界面引擎基类
 * @export
 * @class CtrlEngineBase
 * @implements {ICtrlEngine}
 */
export class CtrlEngineBase {
    /**
     * @description 源部件
     * @readonly
     * @type {(IController | undefined)}
     * @memberof CtrlEngineBase
     */
    get resourceCtrl() {
        if (this.sourceCtrlName) {
            return this.view.getController(this.sourceCtrlName);
        }
    }
    /**
     * @description 目标源部件
     * @readonly
     * @type {(IMDControlController | undefined)}
     * @memberof CtrlEngineBase
     */
    get targetCtrl() {
        if (this.targetCtrlName) {
            return this.view.getController(this.targetCtrlName);
        }
    }
    /**
     * Creates an instance of CtrlEngineBase.
     * @param {IAppViewEngine} engine
     * @param {ViewController} view
     * @memberof CtrlEngineBase
     */
    constructor(engine, view) {
        this.engine = engine;
        this.view = view;
        const { params = [] } = this.engine;
        const resourceCtrl = params.find(x => x.name === 'CTRL') || {};
        this.sourceCtrlName = resourceCtrl.ctrlName;
        const targetCtrl = params.find(x => x.name === 'TRIGGER') || {};
        this.targetCtrlName = targetCtrl.ctrlName;
    }
    /**
     * @description 视图created生命周期执行逻辑
     * @returns {*}  {Promise<void>}
     * @memberof CtrlEngineBase
     */
    async onCreated() { }
    /**
     * @description 视图mounted生命周期执行逻辑
     * @returns {*}  {Promise<void>}
     * @memberof CtrlEngineBase
     */
    async onMounted() {
        if (this.resourceCtrl) {
            // 搜索部件搜索、数据选中、数据加载都触发目标部件源加载
            this.resourceCtrl.evt.onAll((eventName) => {
                if ([
                    'onSearch',
                    'onLoadSuccess',
                    'onLoadDraftSuccess',
                    'onSelectionChange',
                ].includes(eventName)) {
                    if (this.targetCtrl && this.targetCtrl.load) {
                        this.targetCtrl.load({ isInitialLoad: true });
                    }
                }
            });
        }
        if (this.targetCtrl) {
            this.targetCtrl.evt.on('onBeforeLoad', (args) => {
                const { params } = args;
                const filterParams = {};
                // 触发源是搜索类部件是添加搜索参数
                if (this.resourceCtrl && this.resourceCtrl.getFilterParams) {
                    Object.assign(filterParams, this.resourceCtrl.getFilterParams());
                }
                // searchconds参数特殊合并
                if (filterParams.searchconds) {
                    params.srfsearchconds = filterParams.searchconds;
                    delete filterParams.searchconds;
                }
                Object.assign(params, filterParams);
            });
        }
    }
    /**
     * @description 视图destroyed生命周期执行逻辑
     * @returns {*}  {Promise<void>}
     * @memberof CtrlEngineBase
     */
    async onDestroyed() { }
}

import { ControlController } from '../../common';
import { ReportPanelService } from './report-panel.service';
import { ReportPanelGeneratorFactory } from './generator/generator-factory';
export class ReportPanelController extends ControlController {
    /**
     * 事件对象
     *
     * @readonly
     * @protected
     * @type {ControllerEvent<IReportPanelEvent>}
     * @memberof ReportPanelController
     */
    get _evt() {
        return this.evt;
    }
    /**
     * @description 是否为BI报表设计
     * @readonly
     * @type {boolean}
     * @memberof ReportPanelController
     */
    get isBIReportDesign() {
        const { appDEReport } = this.model;
        const biReportType = [
            'DESYSBIREPORTS',
            'SYSBICUBE',
            'DESYSBICUBES',
            'ALLSYSBICUBES',
            'SYSBIREPORT',
            'SYSBICUBEREPORTS',
            'ALLSYSBIREPORTS',
        ];
        if ((appDEReport === null || appDEReport === void 0 ? void 0 : appDEReport.reportType) &&
            biReportType.includes(appDEReport === null || appDEReport === void 0 ? void 0 : appDEReport.reportType)) {
            return !this.generator.reportType;
        }
        return false;
    }
    /**
     * @description 获取数据
     * @returns {*}  {IData[]}
     * @memberof ReportPanelController
     */
    getData() {
        var _a;
        if (this.isBIReportDesign)
            return ((_a = this.generator.protoRef) === null || _a === void 0 ? void 0 : _a.state.items) || [];
        return this.state.data;
    }
    /**
     * @description 初始化状态
     * @protected
     * @memberof ReportPanelController
     */
    initState() {
        super.initState();
        this.state.data = [];
        this.state.searchParams = {};
        this.state.biReport = undefined;
    }
    /**
     * @description 生命周期-创建完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof ReportPanelController
     */
    async onCreated() {
        var _a;
        await super.onCreated();
        this.generator = ReportPanelGeneratorFactory.getInstance(this.model, this);
        await ((_a = this.generator) === null || _a === void 0 ? void 0 : _a.initConfig());
        this.dataEntity = await ibiz.hub.getAppDataEntity(this.model.appDataEntityId, this.model.appId);
        this.service = new ReportPanelService(this.model);
        await this.service.init(this.context);
    }
    /**
     * @description 生命周期-加载完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof ReportPanelController
     */
    async onMounted() {
        await super.onMounted();
        // 如果外面没有配置默认不加载的话，默认部件自己加载
        if (this.state.loadDefault) {
            this.load({ isInitialLoad: true });
        }
    }
    /**
     * @description 获取报表参数
     * @protected
     * @returns {*}  {IParams}
     * @memberof ReportPanelController
     */
    getReportParams() {
        var _a, _b;
        const appBIReport = (_a = this.model.appDEReport) === null || _a === void 0 ? void 0 : _a.appBIReport;
        if (!appBIReport)
            return {};
        const { appBICubeId, reportUIModel, appBIReportMeasures, appBIReportDimensions, } = appBIReport;
        const uiModel = reportUIModel ? JSON.parse(reportUIModel) : {};
        const period = (_b = uiModel.period) === null || _b === void 0 ? void 0 : _b[0];
        const colSort = uiModel.grid_col_sort;
        const result = {
            bicubetag: appBICubeId,
            bimeasures: (appBIReportMeasures === null || appBIReportMeasures === void 0 ? void 0 : appBIReportMeasures.map(measure => {
                var _a;
                const item = { name: (_a = measure.measureTag) === null || _a === void 0 ? void 0 : _a.toLowerCase() };
                if (measure.measureParams)
                    item.param = measure.measureParams;
                if (measure.aggMode)
                    item.aggmode = measure.aggMode;
                return item;
            })) || [],
            bidimensions: (appBIReportDimensions === null || appBIReportDimensions === void 0 ? void 0 : appBIReportDimensions.map(dimension => {
                var _a;
                const item = { name: (_a = dimension.dimensionTag) === null || _a === void 0 ? void 0 : _a.toLowerCase() };
                if (dimension.dimensionParams)
                    item.param = dimension.dimensionParams;
                return item;
            })) || [],
            bisort: colSort === null || colSort === void 0 ? void 0 : colSort.map(col => `${col.codename.toLowerCase()},${col.sort}`).join(';'),
            biperiod: period === null || period === void 0 ? void 0 : period.params,
        };
        return result;
    }
    /**
     * @description 获取请求过滤参数
     * @param {IParams} [extraParams]
     * @returns {*}  {Promise<IParams>}
     * @memberof ReportPanelController
     */
    async getFetchParams(extraParams) {
        const resultParams = Object.assign(Object.assign({}, this.params), this.getReportParams());
        // *请求参数处理
        await this._evt.emit('onBeforeLoad', undefined);
        // 合并搜索条件参数，这些参数在onBeforeLoad监听里由外部填入
        Object.assign(resultParams, Object.assign({}, this.state.searchParams));
        // 额外附加参数
        if (extraParams) {
            Object.assign(resultParams, extraParams);
        }
        return resultParams;
    }
    /**
     * @description 加载数据
     * @param {MDCtrlLoadParams} [args={}]
     * @returns {*}  {Promise<IData>}
     * @memberof ReportPanelController
     */
    async load(args = {}) {
        var _a, _b;
        // 如果是BI报表设计则交给BI报表设计组件处理
        if (this.isBIReportDesign)
            return this.state.data;
        try {
            // *查询参数处理
            await this.startLoading();
            const { codeName, appDEReport, appDataEntityId } = this.model;
            const reportTag = ((_a = appDEReport === null || appDEReport === void 0 ? void 0 : appDEReport.appBIReport) === null || _a === void 0 ? void 0 : _a.id) || codeName;
            const enyityId = ((_b = appDEReport === null || appDEReport === void 0 ? void 0 : appDEReport.appBIReport) === null || _b === void 0 ? void 0 : _b.appDataEntityId) || appDataEntityId;
            const { context } = this.handlerAbilityParams(args);
            const params = await this.getFetchParams(args === null || args === void 0 ? void 0 : args.viewParam);
            const res = await this.service.fetch(reportTag, enyityId, context, params);
            this.state.data = res.data;
            await this.afterLoad(args, res.data);
            this.state.isLoaded = true;
            await this._evt.emit('onLoadSuccess', undefined);
        }
        catch (error) {
            await this._evt.emit('onLoadError', undefined);
            this.actionNotification('FETCHERROR', {
                error: error,
            });
            throw error;
        }
        finally {
            await this.endLoading();
        }
        this.actionNotification('FETCHSUCCESS');
        return this.state.data;
    }
    /**
     * @description 部件加载后处理
     * @param {MDCtrlLoadParams} args
     * @param {IData} data
     * @returns {*}  {Promise<IData>}
     * @memberof ReportPanelController
     */
    async afterLoad(args, data) {
        this.state.biReport = this.generator.generate(data);
        return data;
    }
    /**
     * @description 刷新
     * @returns {*}  {Promise<void>}
     * @memberof ReportPanelController
     */
    async refresh() {
        if (this.isBIReportDesign) {
            this.generator.load();
        }
        else {
            this.doNextActive(() => this.load({ isInitialLoad: false }), {
                key: 'refresh',
            });
        }
    }
}

import { MapService } from './map.service';
import { MDControlController } from '../../common';
export class MapController extends MDControlController {
    initState() {
        super.initState();
        this.state.size = 1000;
        this.state.pointData = [];
        this.state.areaData = [];
        this.state.mapInfo = {};
    }
    async onCreated() {
        this.calcDefaultOptions();
        await super.onCreated();
        this.service = new MapService(this.model);
        await this.service.init(this.context);
    }
    /**
     * 部件加载数据行为
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    async load(args = {}) {
        if (this.state.isSimple) {
            this.state.isLoaded = true;
            return [];
        }
        await this.startLoading();
        try {
            // *初始加载需要重置分页
            const isInitialLoad = args.isInitialLoad === true;
            // *查询参数处理
            const { context } = this.handlerAbilityParams(args);
            const params = await this.getFetchParams(args === null || args === void 0 ? void 0 : args.viewParam);
            context.srfareacode = this.state.areaCode;
            const res = await this.service.fetchAll(context, params);
            this.state.items = res.data;
            await this.afterLoad(args, res.data);
            this.state.isLoaded = true;
            await this._evt.emit('onLoadSuccess', {
                isInitialLoad,
            });
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
        return this.state.items;
    }
    async afterLoad(args, items) {
        const result = (await super.afterLoad(args, items));
        const tempareaData = [];
        const temppointData = [];
        result.forEach(item => {
            if (item._itemStyle === 'REGION') {
                tempareaData.push(item);
            }
            else if (item._itemStyle === 'POINT') {
                temppointData.push(item);
            }
        });
        this.state.pointData = temppointData;
        this.state.areaData = tempareaData;
        return result;
    }
    /**
     * 计算默认选项
     * @author lxm
     * @date 2023-11-01 03:23:33
     */
    calcDefaultOptions() {
        this.state.strAreaCode = false;
        this.state.defaultAreaCode = 100000;
        Object.keys(this.controlParams).forEach(key => {
            const value = this.controlParams[key];
            switch (key.toLowerCase()) {
                case 'defaultareacode':
                    this.state.defaultAreaCode = value;
                    break;
                case 'strareacode':
                    this.state.strAreaCode = value === 'true';
                    break;
                case 'jsonbaseurl':
                    this.state.jsonBaseUrl = value;
                    break;
                default:
                    break;
            }
        });
        // 根据strAreaCode格式化默认区域代码的数值还是字符串
        this.state.defaultAreaCode = this.state.strAreaCode
            ? `${this.state.defaultAreaCode}`
            : Number(this.state.defaultAreaCode);
        this.state.areaCode = this.state.defaultAreaCode;
    }
    /**
     * 地图变更事件处理
     * @author lxm
     * @date 2023-10-31 05:28:36
     * @param {(string | number)} areaCode
     */
    async onMapChange(areaCode) {
        await this.evt.emit('onMapChange', { data: { areaCode } });
        // 修改预置视图参数，然后加载
        this.state.areaCode = areaCode;
        this.load({});
    }
    /**
     * 地图区域点击事件处理
     * @author lxm
     * @date 2023-10-31 05:30:54
     * @param {IData} mapData
     */
    onAreaClick(mapData) {
        this.evt.emit('onAreaClick', { data: [mapData] });
    }
    /**
     * 地图散点点击事件处理
     * @author lxm
     * @date 2023-10-31 05:30:58
     * @param {IData} mapData
     */
    onPointClick(mapData) {
        this.evt.emit('onPointClick', { data: [mapData] });
    }
}

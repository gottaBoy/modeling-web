/**
 * 应用功能组件服务
 *
 * @author tony001
 * @date 2024-04-23 11:04:58
 * @export
 * @class UtilService
 */
export class UtilService {
    /**
     * Creates an instance of UtilService.
     * @author tony001
     * @date 2024-04-24 14:04:41
     * @param {IAppUtil} appUtil
     */
    constructor(appUtil) {
        this.appUtil = appUtil;
        /**
         * 存储实体模型
         *
         * @author tony001
         * @date 2024-04-24 15:04:36
         * @type {(IAppDataEntity | null)}
         */
        this.stoageAppDataEntity = null;
        /**
         * 存储服务
         *
         * @author tony001
         * @date 2024-04-24 14:04:36
         * @type {(IAppDEService | null)}
         */
        this.appDEService = null;
    }
    /**
     * 获取存储服务
     *
     * @author tony001
     * @date 2024-04-24 14:04:21
     * @private
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IAppDEService>}
     */
    async getAppDEService(context) {
        if (this.appDEService) {
            return this.appDEService;
        }
        const { appId, name, stoageAppDataEntityId, utilTag, utilType, utilDEName, } = this.appUtil;
        // 自定义功能类型且功能标记不走DYNAMENU获取utilDEName作为实体标识
        const appDataEntityTag = utilType === 'USER' && utilTag !== 'DYNAMENU'
            ? utilDEName
            : stoageAppDataEntityId;
        if (appId && appDataEntityTag) {
            const app = ibiz.hub.getApp(appId);
            this.stoageAppDataEntity = await ibiz.hub.getAppDataEntity(appDataEntityTag, appId);
            const cloneContext = context.clone();
            cloneContext.srfappid = appId;
            const appDEService = await app.deService.getService(cloneContext, appDataEntityTag);
            if (appDEService) {
                this.appDEService = appDEService;
                return appDEService;
            }
            throw new Error(ibiz.i18n.t('runtime.service.noFoundStorageEntity', {
                name,
                stoageAppDataEntityId: appDataEntityTag,
            }));
        }
        throw new Error(ibiz.i18n.t('runtime.service.noExist', { name }));
    }
    /**
     * 加载指定数据
     *
     * @author tony001
     * @date 2024-04-23 11:04:22
     * @param {string} tag
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IData>}
     */
    async load(tag, context, params) {
        const { utilType, utilTag } = this.appUtil;
        if (utilType === 'USER' && utilTag !== 'DYNAMENU') {
            try {
                const { getAppDEActionId } = this.parseUserUtilParams();
                const dataService = await this.getAppDEService(context);
                const res = await dataService.exec(getAppDEActionId, context, params);
                return this.handleUserResponse(res);
            }
            catch (error) {
                return {};
            }
        }
        else {
            const tempContext = context.clone();
            const dataService = await this.getAppDEService(tempContext);
            // 设置数据主键
            tempContext[this.stoageAppDataEntity.codeName.toLowerCase()] = tag;
            const { getAppDEActionId } = this.appUtil;
            try {
                const res = await dataService.exec(getAppDEActionId || 'get', tempContext, params);
                return this.handleResponse(res);
            }
            catch (error) {
                return {};
            }
        }
    }
    /**
     * 保存指定数据
     *
     * @author tony001
     * @date 2024-04-23 12:04:36
     * @param {string} tag
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    async save(tag, context, params, data) {
        const dataService = await this.getAppDEService(context);
        const { utilType, utilTag } = this.appUtil;
        if (utilType === 'USER' && utilTag !== 'DYNAMENU') {
            const { saveAppDEActionId } = this.parseUserUtilParams();
            const tempData = this.handleUserRequestData(data);
            const res = await dataService.exec(saveAppDEActionId, context, tempData, params);
            return this.handleUserResponse(res);
        }
        const { context: tempContext, params: tempParams, data: tempData, } = this.handleRequestData(tag, context, params, data);
        return dataService.exec('save', tempContext, tempData, tempParams);
    }
    /**
     * 处理请求数据
     *
     * @author tony001
     * @date 2024-04-24 15:04:02
     * @private
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @return {*}  {{ context: IContext; params: IParams; data: IData }}
     */
    handleRequestData(tag, context, params, data) {
        const { modelIdAppDEFieldId, modelAppDEFieldId, appIdAppDEFieldId, userIdAppDEFieldId, stoageAppDataEntityId, } = this.appUtil;
        if (!this.stoageAppDataEntity) {
            throw new Error(ibiz.i18n.t('runtime.service.noFoundEntity', { stoageAppDataEntityId }));
        }
        const tempContext = context.clone();
        const tempData = {};
        // 设置数据主键
        tempContext[this.stoageAppDataEntity.codeName.toLowerCase()] = tag;
        const { keyAppDEFieldId } = this.stoageAppDataEntity;
        tempData[keyAppDEFieldId] = tag;
        // 设置数据
        tempData[modelIdAppDEFieldId] = params === null || params === void 0 ? void 0 : params.modelId;
        tempData[modelAppDEFieldId] = JSON.stringify(data);
        // 应用中appid为应用codeName，适配多应用情况
        const app = ibiz.hub.getApp(tempContext.srfappid);
        tempData[appIdAppDEFieldId] = app.model.codeName;
        tempData[userIdAppDEFieldId] = tempContext.srfpersonid;
        tempData.type = params === null || params === void 0 ? void 0 : params.type;
        tempData.owner_type = params === null || params === void 0 ? void 0 : params.ownerType;
        tempData.owner_id = params === null || params === void 0 ? void 0 : params.ownerId;
        return { context: tempContext, params, data: tempData };
    }
    /**
     * @description 处理自定义类型请求数据
     * @private
     * @param {(IData | IData[])} data
     * @returns {*}  IData | IData[]
     * @memberof UtilService
     */
    handleUserRequestData(data) {
        const { modelMapping } = this.parseUserUtilParams();
        let result;
        const convertData = (sourceObj) => {
            const targetObj = {};
            if (Object.keys(modelMapping).length === 0) {
                return sourceObj;
            }
            Object.keys(modelMapping).forEach(key => {
                targetObj[modelMapping[key]] = sourceObj[key];
            });
            return targetObj;
        };
        if (!data) {
            throw new Error(ibiz.i18n.t('runtime.service.dataException'));
        }
        if (Array.isArray(data) && data.length > 0) {
            result = data.map(item => {
                return convertData(item);
            });
            return result;
        }
        result = convertData(data);
        return result;
    }
    /**
     * @description 解析用户自定义功能参数(getAppDEActionId|saveAppDEActionId|modelMapping),分别表示获取行为|保存行为|数据映射关系
     * @private
     * @returns {*}  {IParams}
     * @memberof UtilService
     */
    parseUserUtilParams() {
        const { utilParams } = this.appUtil;
        const result = {
            getAppDEActionId: 'fetchDefault',
            saveAppDEActionId: 'save',
            modelMapping: {},
        };
        if (utilParams && Object.keys(utilParams).length > 0) {
            Object.keys(utilParams).forEach(key => {
                if (key !== 'appId') {
                    // 数据映射关系格式如：id:appid|caption:display_name|order:order|dataId:id|indexViewName:index_id",key为界面定义字段名称，value为数据源字段名称
                    if (key === 'modelMapping') {
                        const modelMapping = {};
                        if (utilParams.modelMapping) {
                            const pairs = utilParams.modelMapping.split('|');
                            pairs.forEach((pair) => {
                                const [tempKey, tempVal] = pair.split(':');
                                if (tempKey && tempVal) {
                                    modelMapping[tempKey] = tempVal;
                                }
                            });
                        }
                        Object.assign(result, { [key]: modelMapping });
                    }
                    else {
                        Object.assign(result, { [key]: utilParams[key] });
                    }
                }
            });
        }
        return result;
    }
    /**
     * 处理响应数据
     *
     * @author tony001
     * @date 2024-04-24 16:04:45
     * @private
     * @param {IData} response
     * @return {*}  {IData}
     */
    handleResponse(response) {
        const { data } = response;
        const { modelAppDEFieldId } = this.appUtil;
        return JSON.parse(data[modelAppDEFieldId]);
    }
    /**
     * @description 处理自定义类型响应数据
     * @private
     * @param {IData[]} response
     * @returns {*}  {IData | IData[]}
     * @memberof UtilService
     */
    handleUserResponse(response) {
        const { data } = response;
        const { modelMapping } = this.parseUserUtilParams();
        let result;
        const convertData = (sourceObj) => {
            const targetObj = {};
            if (Object.keys(modelMapping).length === 0) {
                return sourceObj;
            }
            Object.keys(modelMapping).forEach(key => {
                targetObj[key] = sourceObj[modelMapping[key]];
            });
            return targetObj;
        };
        if (!data) {
            throw new Error(ibiz.i18n.t('runtime.service.dataException'));
        }
        if (Array.isArray(data) && data.length > 0) {
            result = data.map(item => {
                return convertData(item);
            });
            return result;
        }
        result = convertData(data);
        return result;
    }
}

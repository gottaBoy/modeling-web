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
        const { appId, name, stoageAppDataEntityId } = this.appUtil;
        if (appId && stoageAppDataEntityId) {
            const app = ibiz.hub.getApp(appId);
            this.stoageAppDataEntity = await ibiz.hub.getAppDataEntity(stoageAppDataEntityId, appId);
            const appDEService = await app.deService.getService(context, stoageAppDataEntityId);
            if (appDEService) {
                this.appDEService = appDEService;
                return appDEService;
            }
            throw new Error(ibiz.i18n.t('runtime.service.noFoundStorageEntity', {
                name,
                stoageAppDataEntityId,
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
        tempData[appIdAppDEFieldId] = tempContext.srfappid;
        tempData[userIdAppDEFieldId] = tempContext.srfpersonid;
        tempData.type = params === null || params === void 0 ? void 0 : params.type;
        tempData.owner_type = params === null || params === void 0 ? void 0 : params.ownerType;
        tempData.owner_id = params === null || params === void 0 ? void 0 : params.ownerId;
        return { context: tempContext, params, data: tempData };
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
}

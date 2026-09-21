/**
 * 模型加载适配器
 *
 * @author chitanda
 * @date 2023-04-17 23:04:44
 * @export
 * @class ModelLoader
 * @implements {ModelLoaderProvider}
 */
export class ModelLoader {
    constructor(helper) {
        this.helper = helper;
    }
    initApp(id) {
        return this.helper.initApp(id);
    }
    getApp(id) {
        return this.helper.getAppModel(id);
    }
    getSubAppRef(appId) {
        return this.helper.getSubAppRef(appId);
    }
    getAppView(appId, codeName) {
        return this.helper.getAppViewModel(codeName, appId);
    }
    getAppDataEntity(appId, id) {
        return this.helper.getAppDataEntityModel(id, appId);
    }
    getAppDataEntityByCodeName(appId, codeName) {
        return this.helper.getAppDataEntityModel(codeName, appId, false);
    }
    async getPSAppLang(language, appId) {
        return this.helper.getPSAppLang(language, appId);
    }
    getAppStyle(appId) {
        return this.helper.getAppStyle(appId);
    }
    loadAppView(appId, viewId, params) {
        return this.helper.loadAppViewModel(viewId, params, appId);
    }
    getAppBISchemes(appId, ids) {
        return this.helper.getAppBISchemes(appId, ids);
    }
    getAppAppBICubes(appId, ids) {
        return this.helper.getAppAppBICubes(appId, ids);
    }
    getAppBIReports(appId, ids) {
        return this.helper.getAppBIReports(appId, ids);
    }
    translationModelToDsl(data, type) {
        return this.helper.translationModelToDsl(data, type);
    }
    mergeSubAppCodeList(codeList) {
        this.helper.mergeSubAppCodeList(codeList);
    }
}

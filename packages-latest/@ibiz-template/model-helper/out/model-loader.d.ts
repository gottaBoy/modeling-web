import { ModelLoaderProvider } from '@ibiz-template/runtime';
import { IApplication, IAppView, IAppDataEntity, IAppBIScheme, IAppBICube, IAppBIReport, ISubAppRef, IAppCodeList, IAppLan } from '@ibiz/model-core';
import { ModelHelper } from './model-helper';
/**
 * 模型加载适配器
 *
 * @author chitanda
 * @date 2023-04-17 23:04:44
 * @export
 * @class ModelLoader
 * @implements {ModelLoaderProvider}
 */
export declare class ModelLoader implements ModelLoaderProvider {
    protected helper: ModelHelper;
    constructor(helper: ModelHelper);
    initApp(id?: string): Promise<boolean>;
    getApp(id?: string): Promise<IApplication>;
    getSubAppRef(appId: string): Promise<ISubAppRef | undefined>;
    getAppView(appId: string, codeName: string): Promise<IAppView>;
    getAppDataEntity(appId: string, id: string): Promise<IAppDataEntity>;
    getAppDataEntityByCodeName(appId: string, codeName: string): Promise<IAppDataEntity>;
    getPSAppLang(language: string, appId?: string | IObject): Promise<IAppLan | null>;
    getAppStyle(appId: string): Promise<string | null>;
    loadAppView(appId: string, viewId: string, params: IParams): Promise<IAppView>;
    getAppBISchemes(appId: string, ids: string[]): Promise<IAppBIScheme[]>;
    getAppAppBICubes(appId: string, ids: string[]): Promise<IAppBICube[]>;
    getAppBIReports(appId: string, ids: string[]): Promise<IAppBIReport[]>;
    translationModelToDsl(data: IData, type: 'APP' | 'VIEW' | 'CTRL' | 'APPENTITY' | 'APPBIREPORT'): Promise<IModel | undefined>;
    mergeSubAppCodeList(codeList: IAppCodeList): void;
}
//# sourceMappingURL=model-loader.d.ts.map
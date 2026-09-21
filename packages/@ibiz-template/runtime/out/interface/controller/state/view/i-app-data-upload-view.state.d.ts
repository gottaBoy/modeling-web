import { IAppDEDataImport, IAppDataEntity } from '@ibiz/model-core';
import { IViewState } from './i-view.state';
/**
 * 应用数据导入视图UI状态
 *
 * @export
 * @class IAppDataUploadViewState
 * @extends {IViewState}
 */
export interface IAppDataUploadViewState extends IViewState {
    /**
     * 实体模型
     * @author lxm
     * @date 2024-04-15 05:18:15
     * @type {IAppDataEntity}
     */
    appDataEntity: IAppDataEntity;
    /**
     * 实体导入模型
     * @author lxm
     * @date 2024-04-15 05:18:56
     * @type {IAppDEDataImport}
     */
    deDataImport: IAppDEDataImport;
}
//# sourceMappingURL=i-app-data-upload-view.state.d.ts.map
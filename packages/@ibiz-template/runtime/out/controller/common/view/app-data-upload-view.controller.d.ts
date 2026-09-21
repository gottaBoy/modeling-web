import { IAppView } from '@ibiz/model-core';
import { IAppDataUploadViewState, IViewController, IViewEvent } from '../../../interface';
import { ViewController } from './view.controller';
import { ImportDataResult } from '../../utils';
export declare class AppDataUploadViewController<T extends IAppView = IAppView, S extends IAppDataUploadViewState = IAppDataUploadViewState, E extends IViewEvent = IViewEvent> extends ViewController<T, S, E> implements IViewController<T, S, E> {
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * 下载模版文件
     * @author lxm
     * @date 2024-04-16 02:15:29
     */
    downloadTemplate(): void;
    /**
     * 选中导入文件并导入
     * @author lxm
     * @date 2024-04-16 03:54:19
     * @return {*}
     */
    selectAndImport(): Promise<ImportDataResult>;
    /**
     * 自定义导入数据方法
     * @author lxm
     * @date 2024-04-18 05:17:22
     * @param {{
     *     fileId: string;
     *     schemaId: string;
     *   }} opts
     * @return {*}  {Promise<void>}
     */
    asyncImportData2(opts: {
        fileId: string;
        schemaId: string;
    }): Promise<void>;
}
//# sourceMappingURL=app-data-upload-view.controller.d.ts.map
import { IHttpResponse } from '@ibiz-template/core';
import { ISearchBar } from '@ibiz/model-core';
import { IAppService, IBackendSearchBarGroup } from '../../../interface';
/**
 * 搜索栏服务
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-12-22 10:28:32
 */
export declare class SearchBarService {
    /**
     * 应用
     *
     */
    app: IAppService;
    /**
     * 视图标识
     *
     */
    viewTag: string;
    /**
     * 部件模型
     *
     */
    readonly model: ISearchBar;
    /**
     * Creates an instance of ControlService.
     *
     */
    constructor(model: ISearchBar, viewTag: string);
    init(_context?: IContext): Promise<void>;
    /**
     * 主题管理URL
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 10:51:49
     */
    themeUrl: string;
    /**
     * 执行查询多条数据的方法
     *
     */
    fetch(): Promise<IHttpResponse>;
    /**
     * 执行获取单条数据方法
     *
     */
    get(id: string): Promise<IHttpResponse>;
    /**
     * 删除单条数据
     *
     */
    remove(id: string): Promise<IHttpResponse>;
    /**
     * 新建数据（只有一个标题）
     *
     */
    create(caption: string): Promise<IHttpResponse>;
    /**
     * 新建数据（带参数，给平台配置建立的分组用，分组项名称就是id）
     *
     */
    createWithParams(group: IBackendSearchBarGroup, data: IData): Promise<IHttpResponse>;
    /**
     * 批量新建
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-26 15:49:00
     */
    createBatch(data: IData[]): Promise<IHttpResponse>;
    /**
     * 更新数据
     *
     */
    update(id: string, data: IData): Promise<IHttpResponse>;
    /**
     * 批量更新数据
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-26 11:11:34
     */
    updateBatch(data: IData[]): Promise<IHttpResponse>;
    /**
     * 转换后台数据成前端需要的格式
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 11:19:50
     */
    convertBackDataToFront(data: IData[]): IData[];
    /**
     * 转换前端数据成后台需要的格式
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 11:19:50
     */
    convertFrontDataToBack(data: IData[]): IData[];
}
//# sourceMappingURL=search-bar.service.d.ts.map
import { IConfigService } from '../../../interface';
/**
 * 应用配置存储服务
 *
 * @author chitanda
 * @date 2023-09-22 10:09:05
 * @export
 * @class ConfigService
 */
export declare class ConfigService implements IConfigService {
    protected appId: string;
    protected folder: string;
    protected tag: string;
    private app;
    /**
     * Creates an instance of ConfigService.
     *
     * @author chitanda
     * @date 2023-09-22 10:09:16
     * @param {string} appId 应用标识
     * @param {string} folder 定义文件夹
     * @param {string} tag 存储标识
     */
    constructor(appId: string, folder: string, tag: string);
    /**
     * 保存配置
     *
     * @author chitanda
     * @date 2023-09-22 10:09:05
     * @param {IData} data
     * @return {*}  {Promise<boolean>}
     */
    save(data: IData): Promise<boolean>;
    /**
     * 重置配置
     *
     * @author tony001
     * @date 2024-12-27 18:12:54
     * @return {*}  {Promise<boolean>}
     */
    reset(): Promise<boolean>;
    /**
     * 加载配置
     *
     * @author chitanda
     * @date 2023-09-22 10:09:10
     * @return {*}  {Promise<IData>}
     */
    load(): Promise<IData>;
}
//# sourceMappingURL=config.service.d.ts.map
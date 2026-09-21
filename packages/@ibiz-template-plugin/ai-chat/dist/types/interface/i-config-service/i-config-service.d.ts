export interface IConfigService {
    /**
     * 保存配置
     *
     * @author tony001
     * @date 2025-02-23 16:02:33
     * @param {object} data
     * @return {*}  {Promise<boolean>}
     */
    save(data: object): Promise<boolean>;
    /**
     * 重置配置
     *
     * @author tony001
     * @date 2025-02-23 16:02:48
     * @return {*}  {Promise<boolean>}
     */
    reset(): Promise<boolean>;
    /**
     * 加载配置
     *
     * @author tony001
     * @date 2025-02-23 16:02:57
     * @return {*}  {Promise<object>}
     */
    load(): Promise<object>;
}

/**
 * 应用配置存储服务
 *
 * @author chitanda
 * @date 2023-09-22 10:09:05
 * @export
 * @class ConfigService
 */
export class ConfigService {
    /**
     * Creates an instance of ConfigService.
     *
     * @author chitanda
     * @date 2023-09-22 10:09:16
     * @param {string} appId 应用标识
     * @param {string} folder 定义文件夹
     * @param {string} tag 存储标识
     */
    constructor(appId, folder, tag) {
        this.appId = appId;
        this.folder = folder;
        this.tag = tag;
        this.app = ibiz.hub.getApp(appId);
    }
    /**
     * 保存配置
     *
     * @author chitanda
     * @date 2023-09-22 10:09:05
     * @param {IData} data
     * @return {*}  {Promise<boolean>}
     */
    async save(data) {
        const res = await this.app.net.put(`/configs/${this.folder}/${this.tag}`, data);
        if (res.ok) {
            return res.data;
        }
        return false;
    }
    /**
     * 重置配置
     *
     * @author tony001
     * @date 2024-12-27 18:12:54
     * @return {*}  {Promise<boolean>}
     */
    async reset() {
        const response = await this.app.net.request(`/configs/${this.folder}/${this.tag}`, {
            method: 'put',
            data: null,
        });
        return response.status === 200;
    }
    /**
     * 加载配置
     *
     * @author chitanda
     * @date 2023-09-22 10:09:10
     * @return {*}  {Promise<IData>}
     */
    async load() {
        const res = await this.app.net.get(`/configs/${this.folder}/${this.tag}`);
        if (res.ok) {
            return res.data || {};
        }
        return {};
    }
}

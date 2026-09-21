/**
 * 远程插件项
 *
 * @author chitanda
 * @date 2022-10-31 12:10:41
 * @export
 * @class RemotePluginItem
 */
export class RemotePluginItem {
    /**
     * Creates an instance of RemotePluginItem.
     *
     * @author chitanda
     * @date 2023-02-02 15:02:13
     * @param {string} tag 插件标识名称
     * @param {string} repo 插件路径
     * @param {RemotePluginConfig} config
     */
    constructor(tag, repo, config) {
        this.tag = tag;
        this.repo = repo;
        this.config = config;
    }
}

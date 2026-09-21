import { LogLevelDesc } from 'loglevel';
/**
 * devtool的配置对象
 * @author lxm
 * @date 2024-01-29 11:29:59
 * @export
 * @interface IDevToolConfig
 */
export interface IDevToolConfig {
    /**
     * 配置平台基础路径
     * @author lxm
     * @date 2024-01-19 05:26:35
     * @type {string}
     */
    studioBaseUrl?: string;
    /**
     * 模型预览宽度
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-20 13:28:20
     */
    modelPreviewWidth?: number;
    /**
     * 日志级别
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-20 13:28:20
     */
    logLevel?: LogLevelDesc;
    /**
     * v9模式
     *
     * @author tony001
     * @date 2025-02-07 13:02:02
     * @type {boolean}
     */
    v9Mode?: boolean;
}
//# sourceMappingURL=i-devtool-config.d.ts.map
import { HttpError } from '@ibiz-template/core';
import { IErrorHandler } from '@ibiz-template/runtime';
/**
 * 没有权限的错误处理器
 *
 * @author lxm
 * @date 2022-10-11 14:10:10
 * @export
 * @class UnauthorizedHandler
 */
export declare class UnauthorizedHandler implements IErrorHandler {
    match(error: unknown): boolean;
    /**
     * oauth登录处理
     *
     * @author tony001
     * @date 2024-12-22 10:12:48
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected oauthLogin(): Promise<void>;
    /**
     * cas登录处理
     *
     * @author lxm
     * @date 2022-10-11 14:10:35
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected casLogin(): Promise<void>;
    /**
     * 普通登录处理
     *
     * @author lxm
     * @date 2022-10-11 14:10:24
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected normalLogin(): Promise<void>;
    /**
     * 处理403
     * @author lxm
     * @date 2023-12-06 10:19:12
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected handle403(error: HttpError): Promise<void>;
    /**
     * 没有权限处理
     *
     * @author lxm
     * @date 2022-10-11 14:10:50
     * @returns {*}  {Promise<void>}
     */
    handle(error: unknown): boolean | undefined;
}

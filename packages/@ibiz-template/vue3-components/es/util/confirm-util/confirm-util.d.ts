import { IConfirmUtil, ConfirmParams } from '@ibiz-template/runtime';
/**
 * 确认操作框
 *
 * @author chitanda
 * @date 2022-08-17 16:08:52
 * @export
 * @class ConfirmUtil
 * @implements {IConfirmUtil}
 */
export declare class ConfirmUtil implements IConfirmUtil {
    private ns;
    info(params: ConfirmParams): Promise<boolean>;
    success(params: ConfirmParams): Promise<boolean>;
    warning(params: ConfirmParams): Promise<boolean>;
    error(params: ConfirmParams): Promise<boolean>;
}

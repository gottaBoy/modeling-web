import { IModalUtil, ModalParams } from '@ibiz-template/runtime';
/**
 * 简洁确认操作框
 *
 * @author chitanda
 * @date 2022-08-17 16:08:52
 * @export
 * @class ModalUtil
 * @implements {IModalUtil}
 */
export declare class ModalUtil implements IModalUtil {
    info(params: ModalParams): Promise<void>;
    success(params: ModalParams): Promise<void>;
    warning(params: ModalParams): Promise<void>;
    error(params: ModalParams): Promise<void>;
    confirm(params: ModalParams): Promise<boolean>;
}

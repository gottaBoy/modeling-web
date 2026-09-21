import { RuntimeModelError, ModelError, HttpError, NoticeError, RuntimeError, } from '@ibiz-template/core';
/**
 * 默认处理器
 * @author lxm
 * @date 2023-09-26 04:52:18
 * @export
 * @class DefaultErrorHandler
 * @implements {IErrorHandler}
 */
export class DefaultErrorHandler {
    handle(error) {
        var _a, _b;
        if (error instanceof RuntimeModelError || error instanceof ModelError) {
            ibiz.message.error(error.message, 10, true);
        }
        else if (error instanceof HttpError) {
            if (error.status === 401) {
                ibiz.message.error(ibiz.i18n.t('runtime.utils.errorHandler.noPermissionless'));
            }
            else if (error.status === 404) {
                ibiz.mc.error.send(error);
            }
            else if (error.status === 500 &&
                ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.type) === 'DataEntityRuntimeException') {
                ibiz.message.error(error.message);
            }
            else {
                ibiz.notification.error({
                    title: '',
                    desc: error.message,
                    duration: 10,
                });
            }
        }
        else if (error instanceof NoticeError) {
            ibiz.message.error(error.message, error.duration, error.duration === 0);
        }
        else if (error instanceof RuntimeError) {
            ibiz.message.error(error.message, 10, true);
        }
        ibiz.log.error(error);
        return true;
    }
}

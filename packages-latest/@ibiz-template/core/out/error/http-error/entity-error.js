import { HttpError } from '../http-error/http-error';
/**
 * @description 请求异常
 * @export
 * @class EntityError
 * @extends {HttpError}
 */
export class EntityError extends HttpError {
    constructor(err) {
        super(err);
        this.name = 'EntityError';
        this.details = [];
        if (this.response) {
            const { details = [] } = this.response.data;
            this.details = details.map((detail) => {
                return {
                    name: detail.fieldname.toLowerCase(),
                    logicName: detail.fieldlogicname,
                    errorType: detail.fielderrortype,
                    errorInfo: detail.fielderrorinfo,
                };
            });
        }
    }
}

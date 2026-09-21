import { HttpError } from '../http-error/http-error';
/**
 * 请求异常
 *
 * @author chitanda
 * @date 2022-09-18 17:09:10
 * @export
 * @class EntityError
 * @implements {Error}
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

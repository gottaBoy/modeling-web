import { AxiosResponse } from 'axios';
import { HttpError } from '../http-error/http-error';
type InputError = {
    message: string;
    response?: AxiosResponse;
};
type detailMessage = {
    name: string;
    logicName: string;
    errorType: number;
    errorInfo: string;
};
/**
 * 请求异常
 *
 * @author chitanda
 * @date 2022-09-18 17:09:10
 * @export
 * @class EntityError
 * @implements {Error}
 */
export declare class EntityError extends HttpError {
    name: string;
    details: detailMessage[];
    constructor(err: InputError);
}
export {};
//# sourceMappingURL=entity-error.d.ts.map
import { AxiosError } from 'axios';
import { HttpError } from './http-error';
/**
 * @description 错误工厂
 * @export
 * @class HttpErrorFactory
 */
export declare class HttpErrorFactory {
    static getInstance(error: AxiosError): Promise<HttpError>;
}
//# sourceMappingURL=http-error-factory.d.ts.map
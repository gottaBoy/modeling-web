import { FetchMethod } from './fetch';

/**
 * ac 模式下的数据集获取请求
 *
 * @author chitanda
 * @date 2023-10-12 17:10:03
 * @export
 * @class AcFetchMethod
 * @extends {FetchMethod}
 */
export class AcFetchMethod extends FetchMethod {
  protected mergeRequestPath(path: string, methodName: string): string {
    return `${path}/ac/${methodName}?srfac=ac`;
  }
}

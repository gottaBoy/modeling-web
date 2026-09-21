import { AxiosError } from 'axios';
import { HttpError } from './http-error';
import { EntityError } from './entity-error';

/**
 * @description 错误工厂
 * @export
 * @class HttpErrorFactory
 */
export class HttpErrorFactory {
  public static async getInstance(error: AxiosError): Promise<HttpError> {
    const { response } = error;
    // 后端返回 Blob 类型时(如 responseType: 'blob' 的请求失败)，先反序列化为对象
    if (response?.data instanceof Blob) {
      const text = await response.data.text();
      try {
        response.data = JSON.parse(text);
      } catch {
        response.data = { message: text };
      }
    }
    if (!response || !response.data) {
      return new HttpError(error);
    }
    const { type } = response.data as IData;
    switch (type) {
      case 'EntityException':
        return new EntityError(error);
      default:
        return new HttpError(error);
    }
  }
}

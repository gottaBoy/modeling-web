import { HttpError } from '../http-error/http-error';
import { detailMessage, InputError } from '../../interface';

/**
 * @description 请求异常
 * @export
 * @class EntityError
 * @extends {HttpError}
 */
export class EntityError extends HttpError {
  name: string = 'EntityError';

  details: detailMessage[] = [];

  constructor(err: InputError) {
    super(err);
    if (this.response) {
      const { details = [] } = this.response.data;
      this.details = details.map((detail: IData) => {
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

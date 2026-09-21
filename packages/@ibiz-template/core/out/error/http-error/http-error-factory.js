import { HttpError } from './http-error';
import { EntityError } from './entity-error';
export class HttpErrorFactory {
    static getInstance(error) {
        const { response } = error;
        if (!response || !response.data) {
            return new HttpError(error);
        }
        const { type } = response.data;
        switch (type) {
            case 'EntityException':
                return new EntityError(error);
            default:
                return new HttpError(error);
        }
    }
}

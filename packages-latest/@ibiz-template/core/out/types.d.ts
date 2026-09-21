import { IBizSys } from './ibizsys';
import { IApiContext, IApiData, IApiObject, IApiParams, IEnvironment } from './interface';
declare global {
    const ibiz: IBizSys;
    interface Window {
        ibiz: IBizSys;
        Environment: IEnvironment;
    }
    type IContext = IApiContext;
    type IParams = IApiParams;
    type IData = IApiData;
    type IObject = IApiObject;
}
//# sourceMappingURL=types.d.ts.map
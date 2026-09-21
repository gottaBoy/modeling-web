import { IApiGlobalWaterMarkConfig, IApiWaterMarkUtil } from '../../interface';
/**
 * @description 水印工具类
 * @export
 * @class WaterMarkUtil
 * @implements {IApiWaterMarkUtil}
 */
export declare class WaterMarkUtil implements IApiWaterMarkUtil {
    mount(option: Partial<IApiGlobalWaterMarkConfig>, container?: HTMLElement, context?: IContext, params?: IParams, data?: IData): null | (() => void);
}
//# sourceMappingURL=water-mark-util.d.ts.map
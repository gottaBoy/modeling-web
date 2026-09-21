import { isArray } from 'lodash-es';
import { WaterMarkManager } from './water-mark-manager/water-mark-manager';
import { ScriptFactory } from '../script';
/**
 * @description 水印工具类
 * @export
 * @class WaterMarkUtil
 * @implements {IApiWaterMarkUtil}
 */
export class WaterMarkUtil {
    mount(option, container, context, params, data) {
        // 水印未启用时不执行挂载
        if (!(option === null || option === void 0 ? void 0 : option.enable))
            return null;
        const _opts = Object.assign({}, option);
        if (_opts.text) {
            // 动态文本解析
            _opts.text = isArray(_opts.text)
                ? _opts.text.map(_textItem => ScriptFactory.execSingleLine(`\`${_textItem}\``, {
                    context,
                    params,
                    data,
                }))
                : ScriptFactory.execSingleLine(`\`${_opts.text}\``, {
                    context,
                    params,
                    data,
                });
        }
        const waterMarkManager = new WaterMarkManager(_opts, container);
        return () => waterMarkManager.destroy();
    }
}

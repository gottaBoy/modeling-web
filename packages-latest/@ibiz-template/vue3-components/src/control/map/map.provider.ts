import { IControlProvider } from '@ibiz-template/runtime';
/**
 * 地图适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ChartProvider
 * @implements {IControlProvider}
 */
export class MapProvider implements IControlProvider {
  component: string = 'IBizMapControl';
}

import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';
/**
 * 地图部件事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IMDControlEvent
 */
export interface IMapEvent extends IMDControlEvent {
    /**
     * 地图变更事件（下探，返回）
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {emitArgs} undefined
     * @return {*}  {Promise<void>}
     */
    onMapChange: {
        event: EventBase;
        emitArgs: {
            data: IData;
        };
    };
    /**
     * 地图区域点击事件
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {emitArgs} undefined
     * @return {*}  {Promise<void>}
     */
    onAreaClick: {
        event: EventBase;
        emitArgs: {
            data: IData;
        };
    };
    /**
     * 地图散点点击事件
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {emitArgs} undefined
     * @return {*}  {Promise<void>}
     */
    onPointClick: {
        event: EventBase;
        emitArgs: {
            data: IData;
        };
    };
    /**
     * @description 点击返回
     * @type {({
     *     event: EventBase;
     *     emitArgs: { areaCode: string | number };
     *   })}
     * @memberof IMapEvent
     */
    onBackClick: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * @description 更新之前
     * @type {{
     *     event: EventBase;
     *     emitArgs: { options: IData };
     *   }}
     * @memberof IMapEvent
     */
    onBeforeUpdate: {
        event: EventBase;
        emitArgs: {
            data: IData;
        };
    };
    /**
     * @description 鼠标移入
     * @type {{
     *     event: EventBase;
     *     emitArgs: { params: IData };
     *   }}
     * @memberof IMapEvent
     */
    onMouseOver: {
        event: EventBase;
        emitArgs: {
            data: IData;
        };
    };
    /**
     * @description 鼠标移出
     * @type {{
     *     event: EventBase;
     *     emitArgs: { params: IData };
     *   }}
     * @memberof IMapEvent
     */
    onMouseOut: {
        event: EventBase;
        emitArgs: {
            data: IData;
        };
    };
}
//# sourceMappingURL=i-map.event.d.ts.map
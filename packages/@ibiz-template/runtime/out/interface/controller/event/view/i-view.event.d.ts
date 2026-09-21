import { PartialWithObject } from '@ibiz-template/core';
import { CloseViewEvent, DataChangeEvent, EventBase, RedrawViewEvent, ViewInfoEvent } from '../argument';
import { IComponentEvent } from '../common/i-component.event';
/**
 * 视图事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:30
 * @export
 * @interface IViewEvent
 */
export interface IViewEvent extends IComponentEvent {
    /**
     *关闭视图
     *
     * @author lxm
     * @date 2022-08-30 16:08:35
     */
    onCloseView: {
        event: CloseViewEvent;
        emitArgs: PartialWithObject<CloseViewEvent, EventBase>;
    };
    /**
     * 视图信息变更事件
     *
     * @author lxm
     * @date 2022-08-30 16:08:35
     */
    onViewInfoChange: {
        event: ViewInfoEvent;
        emitArgs: PartialWithObject<ViewInfoEvent, EventBase>;
    };
    /**
     * 视图数据变更(有数据能力的视图才有)
     *
     * @author lxm
     * @date 2022-08-30 16:08:34
     */
    onDataChange: {
        event: DataChangeEvent;
        emitArgs: PartialWithObject<DataChangeEvent, EventBase> & {
            data?: IData[];
        };
    };
    /**
     * 重绘视图
     *
     * @type {{
     *     event: RedrawViewEvent;
     *     emitArgs: PartialWithObject<RedrawViewEvent, EventBase>;
     *   }}
     * @memberof IComponentEvent
     */
    onRedrawView: {
        event: RedrawViewEvent;
        emitArgs: PartialWithObject<RedrawViewEvent, EventBase>;
    };
    /**
     * 门户点击事件
     *
     * @author fangZhiHao
     * @date 2024-08-28 21:08:45
     * @type {{
     *     event: DataChangeEvent;
     *     emitArgs: { data: IData };
     *   }}
     */
    onPorletClick: {
        event: DataChangeEvent;
        emitArgs: {
            data: IData;
        };
    };
    /**
     * 预置class变更事件
     *
     * @type {{
     *     event: DataChangeEvent;
     *     emitArgs: { data: IData };
     *   }}
     * @memberof IViewEvent
     */
    onPresetClassChange: {
        event: DataChangeEvent;
        emitArgs: {
            data: string[];
        };
    };
}
//# sourceMappingURL=i-view.event.d.ts.map
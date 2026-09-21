import { IUIActionGroupDetail } from '@ibiz/model-core';
/**
 * 报表设计事件
 *
 * @author tony001
 * @date 2024-05-21 17:05:30
 * @export
 * @interface IBIReportDesignEvent
 */
export interface IBIReportDesignEvent {
    /**
     * 选中立方体事件
     *
     * @author tony001
     * @date 2024-05-21 17:05:24
     * @type {{}}
     */
    onSelectedCube: ({ tag }: {
        tag: string;
    }) => any;
    /**
     * 选中报表类型事件
     *
     * @author tony001
     * @date 2024-05-21 17:05:30
     */
    onSelectedReportType: ({ tag }: {
        tag: string;
    }) => any;
    /**
     * 拖拽指标，纬度类型事件
     *
     * @memberof IBIReportDesignEvent
     */
    onDragTarget: (target: IData | null) => any;
    /**
     * @description 行为项点击
     * @memberof IBIReportDesignEvent
     */
    onActionClick: ({ detail, item, event, }: {
        detail: IUIActionGroupDetail;
        item: IData;
        event: MouseEvent;
    }) => any;
}

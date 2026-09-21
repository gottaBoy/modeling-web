import { IAlertParams, PanelItemState } from '@ibiz-template/runtime';
export declare class CoopPosState extends PanelItemState {
    /**
     * alert标识
     *
     * @author zhanghengfeng
     * @date 2024-04-03 17:04:04
     * @type {string}
     */
    key: string;
    /**
     * 消息模式
     * - 显示操作人员模式下使用
     * @type {string[]}
     * @memberof CoopPosState
     */
    messageModes: string[] | undefined;
    /**
     * 消息map
     *
     * @type {Map<string, IData>}
     * @memberof CoopPosState
     */
    messageMap: Map<string, IData>;
    /**
     * 提示参数
     *
     * @author zhanghengfeng
     * @date 2024-04-03 17:04:55
     * @type {IAlertParams}
     */
    alertParams: IAlertParams;
}

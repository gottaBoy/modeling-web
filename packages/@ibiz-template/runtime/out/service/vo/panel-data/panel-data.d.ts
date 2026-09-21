import { IPanelField } from '@ibiz/model-core';
import { QXEvent } from 'qx-util';
type ChangeCallBack = (field: string) => void;
/**
 * 面板数据
 * @author lxm
 * @date 2023-11-01 05:13:53
 * @export
 * @class PanelData
 */
export declare class PanelData {
    [key: string | symbol]: any;
    /**
     * 事件
     * @author lxm
     * @date 2023-11-02 02:35:33
     * @protected
     */
    _evt: QXEvent<{
        change: ChangeCallBack;
    }>;
    constructor(fields: IPanelField[], origin: IParams);
    destroy(): void;
}
export {};
//# sourceMappingURL=panel-data.d.ts.map
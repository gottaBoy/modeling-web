import { ICaptionBar } from '@ibiz/model-core';
import { ICaptionBarState, ICaptionBarEvent, ICaptionBarController } from '../../../interface';
import { ControlController } from '../../common';
/**
 * 标题栏控制器
 *
 * @author chitanda
 * @date 2022-07-24 15:07:07
 * @export
 * @class CaptionBarController
 * @extends {ControlController}
 */
export declare class CaptionBarController extends ControlController<ICaptionBar, ICaptionBarState, ICaptionBarEvent> implements ICaptionBarController {
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * 设置浏览器标签页标题
     *
     * @author chitanda
     * @date 2024-02-29 10:02:02
     */
    setBrowserTabTitle(): void;
}
//# sourceMappingURL=caption-bar.controller.d.ts.map
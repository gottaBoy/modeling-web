import { ICaptionBar } from '@ibiz/model-core';
import { ICaptionBarEvent } from '../../event';
import { ICaptionBarState } from '../../state';
import { IControlController } from './i-control.controller';
/**
 * 列表控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface ICaptionBarController
 * @extends {IControlController}
 */
export interface ICaptionBarController extends IControlController<ICaptionBar, ICaptionBarState, ICaptionBarEvent> {
    /**
     * 设置浏览器标签页标题
     *
     * @author chitanda
     * @date 2024-02-29 10:02:32
     */
    setBrowserTabTitle(): void;
}
//# sourceMappingURL=i-caption-bar.controller.d.ts.map
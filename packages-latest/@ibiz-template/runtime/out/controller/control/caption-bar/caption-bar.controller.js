import { ControlController } from '../../common';
import { ViewMode } from '../../../constant';
/**
 * 标题栏控制器
 *
 * @author chitanda
 * @date 2022-07-24 15:07:07
 * @export
 * @class CaptionBarController
 * @extends {ControlController}
 */
export class CaptionBarController extends ControlController {
    initState() {
        super.initState();
        this.state.caption = this.view.model.caption;
        this.state.totalx = undefined;
        this.state.total = 0;
    }
    async onCreated() {
        await super.onCreated();
        this.view.evt.on('onViewInfoChange', ({ caption: _caption, dataInfo }) => {
            const { showDataInfoBar } = this.view.model;
            if (ibiz.config.view.onlyShowDataInfo && showDataInfoBar && dataInfo) {
                this.state.caption = dataInfo;
            }
            else if (!ibiz.config.view.enableDataInfoBar) {
                this.state.caption = `${this.view.model.caption}`;
            }
            else {
                this.state.caption = `${this.view.model.caption}${showDataInfoBar && dataInfo ? `-${dataInfo}` : ''}`;
            }
            this.setBrowserTabTitle();
        });
        this.view.evt.on('onDataChange', ({ dataArg }) => {
            if (dataArg) {
                this.state.total = dataArg.total;
                this.state.totalx = dataArg.totalx;
            }
        });
    }
    /**
     * 设置浏览器标签页标题
     *
     * @author chitanda
     * @date 2024-02-29 10:02:02
     */
    setBrowserTabTitle() {
        if (this.view.modal.mode === ViewMode.ROUTE ||
            this.view.modal.mode === ViewMode.ROUTE_MODAL) {
            ibiz.util.setBrowserTitle(this.state.caption);
        }
    }
}

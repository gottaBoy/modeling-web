import { isNotNil } from 'ramda';
import { PanelItemController } from '../panel/panel-item.controller';
import { PanelContainerState } from './panel-container.state';
/**
 * @description 面板容器控制器
 * @primary
 * @export
 * @class PanelContainerController
 * @extends {PanelItemController<T>}
 * @implements {IApiPanelContainerController}
 * @template T
 */
export class PanelContainerController extends PanelItemController {
    /**
     * @description 创建面板容器状态对象
     * @protected
     * @returns {*}  {PanelContainerState}
     * @memberof PanelContainerController
     */
    createState() {
        var _a;
        return new PanelContainerState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * @description 开始加载中
     * @exposedoc
     * @param {string} [loadingText] 加载提示文本
     * @memberof PanelContainerController
     */
    startLoading(loadingText) {
        this.state.loading = true;
        if (isNotNil(loadingText)) {
            this.state.loadingText = loadingText;
        }
        else {
            this.state.loadingText = '';
        }
    }
    /**
     * @description 结束加载中
     * @exposedoc
     * @memberof PanelContainerController
     */
    endLoading() {
        this.state.loading = false;
    }
}

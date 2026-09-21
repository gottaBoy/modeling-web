import { isNotNil } from 'ramda';
import { FormDetailController } from '../form-detail/form-detail.controller';
import { FormContainerState } from './form-container.state';
export class FormContainerController extends FormDetailController {
    /**
     * @description 创建表单容器状态对象
     * @protected
     * @returns {*}  {FormContainerState}
     * @memberof FormContainerController
     */
    createState() {
        var _a;
        return new FormContainerState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * @description 开始加载中
     * @param {(string | undefined)} [loadingText] 加载提示文本
     * @memberof FormContainerController
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
     * @memberof FormContainerController
     */
    endLoading() {
        this.state.loading = false;
    }
}

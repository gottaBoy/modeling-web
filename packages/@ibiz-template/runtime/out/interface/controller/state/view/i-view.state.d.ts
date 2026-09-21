import { IViewSession } from '../../../studio';
import { IViewMessage } from '../../common';
import { IControllerState } from '../common/i-controller.state';
/**
 * 视图UI状态对象
 *
 * @export
 * @class ViewState
 */
export interface IViewState extends IControllerState, IViewSession {
    /**
     * 当前视图是否为激活状态(缓存下的激活状态，一般与框架的生命周期相同)
     *
     * @author chitanda
     * @date 2023-12-13 11:12:20
     * @type {boolean}
     */
    activated: boolean;
    /**
     * 当前视图是否出现错误
     *
     * @author tony001
     * @date 2024-04-26 15:04:51
     * @type {boolean}
     */
    hasError: boolean;
    /**
     * 视图标题
     *
     * @author lxm
     * @date 2022-08-25 11:08:45
     * @type {string}
     */
    caption: string;
    /**
     * 视图是否正在加载
     *
     * @author lxm
     * @date 2022-09-19 14:09:12
     */
    isLoading: boolean;
    /**
     * 默认不加载
     * @author lxm
     * @date 2023-07-28 04:29:49
     * @type {boolean}
     */
    noLoadDefault: boolean;
    /**
     * 设置关闭视图时返回给外面的状态
     * @author lxm
     * @date 2023-09-01 10:37:46
     * @type {boolean}
     */
    closeOK?: boolean;
    /**
     * 视图消息数据
     * @author lxm
     * @date 2023-09-20 09:48:29
     * @type {{ [p: string]: IViewMessage[] }}
     */
    viewMessages: {
        [p: string]: IViewMessage[];
    };
    /**
     * 视图正在关闭（用于阻止一些视图关闭后仍在继续的逻辑，比如表单保存时的通知）
     * @author lxm
     * @date 2023-09-20 09:48:29
     * @type {{ [p: string]: IViewMessage[] }}
     */
    isClosing: boolean;
    /**
     * 视图是否最小化
     *
     * @author lxm
     * @date 2024-04-23 14:09:12
     */
    isShortCut: boolean;
    /**
     * 预设class列表
     *
     * @type {string}
     * @memberof IViewState
     */
    presetClassList: string[];
}
//# sourceMappingURL=i-view.state.d.ts.map
import { IAppView } from './iapp-view';
/**
 *
 * @export
 * @interface IAppExplorerView
 */
export interface IAppExplorerView extends IAppView {
    /**
     * IFrame模式
     * @type {boolean}
     * 来源  isIFrameMode
     */
    iframeMode?: boolean;
}

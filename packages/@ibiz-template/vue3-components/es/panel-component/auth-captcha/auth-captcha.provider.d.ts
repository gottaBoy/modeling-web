import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { AuthCaptchaController } from './auth-captcha.controller';
/**
 * 人机识别适配器
 *
 * @export
 * @class AuthCaptchaProvider
 * @implements {IPanelItemProvider}
 */
export declare class AuthCaptchaProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<AuthCaptchaController>;
}

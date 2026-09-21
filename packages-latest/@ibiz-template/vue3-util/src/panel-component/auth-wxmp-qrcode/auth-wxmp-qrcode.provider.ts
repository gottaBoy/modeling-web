import { IPanelItem } from '@ibiz/model-core';
import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { AuthWxmpQrcodeController } from './auth-wxmp-qrcode.controller';

/**
 * 微信公众号扫码登录适配器
 *
 * @export
 * @class AuthWxmpQrcodeProvider
 * @implements {IPanelItemProvider}
 */
export class AuthWxmpQrcodeProvider implements IPanelItemProvider {
  component: string = 'IBizAuthWxmpQrcode';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<AuthWxmpQrcodeController> {
    const c = new AuthWxmpQrcodeController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

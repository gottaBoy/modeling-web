import { IInternalMessage } from '@ibiz-template/core';
import { InternalMessageHTML } from './internal-message-html';
import { InternalMessageDefaultProvider } from '../common';

export class InternalMessageHTMLtProvider extends InternalMessageDefaultProvider {
  component = InternalMessageHTML;

  async onClick(
    message: IInternalMessage,
    event: MouseEvent,
  ): Promise<boolean> {
    const result = await super.onClick(message, event);

    // 没有url的时候看json里的redirecturl跳转
    if (!result && message.content_type === 'JSON' && message.content) {
      const json = JSON.parse(message.content);
      if (json.redirecturl) {
        this.openRedirectView(message, json.redirecturl);
        return true;
      }
    }

    return true;
  }
}

import {
  registerAsyncActionProvider,
  registerPanelItemProvider,
} from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { AsyncAction, AsyncActionProvider } from './async-action';
import { UserMessage } from './user-message';
import { UserMessageProvider } from './user-message.provider';
import { installInternalMessage } from './internal-message';

export const IBizUserMessage: ReturnType<typeof withInstall> = withInstall(
  UserMessage,
  function (v: App) {
    v.component(UserMessage.name!, UserMessage);
    v.component(AsyncAction.name!, AsyncAction);

    // 注册异步导入操作适配器
    registerAsyncActionProvider(
      'DEIMPORTDATA2',
      () => new AsyncActionProvider(),
    );
    // 注册异步导出操作适配器
    registerAsyncActionProvider(
      'DEEXPORTDATA',
      () => new AsyncActionProvider(),
    );
    registerAsyncActionProvider('DEFAULT', () => new AsyncActionProvider());

    installInternalMessage(v);

    // 注册面板成员
    registerPanelItemProvider(
      'RAWITEM_USERMESSAGE',
      () => new UserMessageProvider(),
    );
  },
);

export default IBizUserMessage;

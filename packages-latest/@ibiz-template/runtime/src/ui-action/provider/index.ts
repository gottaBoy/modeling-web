import { registerUIActionProvider } from '../../register';
import { BackendUIActionProvider } from './backend-ui-action-provider';
import { SysUIActionProvider } from './sys-ui-action-provider';
import { FrontUIActionProvider } from './front-ui-action-provider';
import { WFWithdrawUIActionProvider } from './wf-withdraw-ui-action-provider';
import { UIActionProviderBase } from './ui-action-provider-base';
import { LoginOutUIActionProvider } from './loginout-ui-action-provider';
import { CustomUIActionProvider } from './custom-ui-action-provider';

/**
 * 预置默认的界面行为适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:50
 * @export
 */
export function presetUIActionProvider(): void {
  // *前台调用
  const frontUIActionProvider = new FrontUIActionProvider();
  registerUIActionProvider('FRONT', () => frontUIActionProvider);
  // *后台调用
  const backendUIActionProvider = new BackendUIActionProvider();
  registerUIActionProvider('BACKEND', () => backendUIActionProvider);
  // *系统预置界面行为
  const sysUIActionProvider = new SysUIActionProvider();
  registerUIActionProvider('SYS', () => sysUIActionProvider);
  // *自定义界面行为
  const customUIActionProvider = new CustomUIActionProvider();
  registerUIActionProvider('CUSTOM', () => customUIActionProvider);

  // 预置插件
  // 工作流撤回
  const wfWithdrawUIActionProvider = new WFWithdrawUIActionProvider();
  registerUIActionProvider(
    'DEUIACTION_WFWithdraw',
    () => wfWithdrawUIActionProvider,
  );
  // 预置登出界面行为适配器
  const loginOutUIActionProvider = new LoginOutUIActionProvider();
  registerUIActionProvider('SYS_Logout', () => loginOutUIActionProvider);
}

export {
  FrontUIActionProvider,
  SysUIActionProvider,
  BackendUIActionProvider,
  WFWithdrawUIActionProvider,
  UIActionProviderBase,
};

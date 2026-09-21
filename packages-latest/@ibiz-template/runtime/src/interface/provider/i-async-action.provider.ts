import { IPortalAsyncAction } from '@ibiz-template/core';

/**
 * 异步操作适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IAsyncActionProvider
 */
export interface IAsyncActionProvider {
  /**
   * 绘制组件（不能是字符串）
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;

  /**
   * 绘制函数
   * @author lxm
   * @date 2024-01-26 05:38:09
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (props: IData & { action: IPortalAsyncAction }) => any;

  /**
   * 点击事件
   * @author lxm
   * @date 2024-01-15 12:47:22
   * @param {IPortalAsyncAction} asyncAction
   * @param {MouseEvent} event
   * @return {*}  {boolean} 返回是否需要隐藏外层组件消息
   */
  onClick?(
    asyncAction: IPortalAsyncAction,
    event: MouseEvent,
  ): Promise<boolean>;
}

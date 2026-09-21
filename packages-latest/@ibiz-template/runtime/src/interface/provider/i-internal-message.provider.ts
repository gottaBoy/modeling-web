import { IInternalMessage } from '@ibiz-template/core';

/**
 * 站内信适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IInternalMessageProvider
 */
export interface IInternalMessageProvider {
  /**
   * 绘制组件
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  component: unknown;

  /**
   * 绘制函数
   * @author lxm
   * @date 2024-01-26 05:38:09
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (props: IData & { message: IInternalMessage }) => any;

  /**
   * 点击事件
   * @author lxm
   * @date 2024-01-15 12:47:22
   * @param {IInternalMessage} message
   * @param {MouseEvent} event
   * @return {*}  {boolean} 返回是否隐藏消息popover
   */
  onClick?(message: IInternalMessage, event: MouseEvent): Promise<boolean>;

  /**
   * 解析url并打开对应视图
   * @param {string} redirectUrl
   * @return {*}
   * @author: zhujiamin
   * @Date: 2024-03-04 11:16:40
   */
  openViewByUrl(redirectUrl: string | undefined): boolean;
}

import { IAppViewMsg, ILayoutPanel } from '@ibiz/model-core';

export interface IViewMessage {
  /**
   * 消息唯一标识
   *
   * @author zhanghengfeng
   * @date 2024-04-23 19:04:42
   * @type {string}
   */
  key: string;

  /**
   * 位置
   * @author lxm
   * @date 2023-09-20 07:52:52
   * @type {IPSAppViewMsg['position']}
   */
  position: IAppViewMsg['position'];

  /**
   * 消息类型
   * @author lxm
   * @date 2023-09-20 09:11:34
   * @type {IAppViewMsg['messageType']}
   */
  messageType?: IAppViewMsg['messageType'];

  /**
   * 消息删除模式
   * @author lxm
   * @date 2023-09-20 09:11:35
   * @type {IAppViewMsg['removeMode']}
   */
  removeMode?: IAppViewMsg['removeMode'];

  /**
   * 标题
   * @author lxm
   * @date 2023-09-20 02:26:33
   * @type {string}
   */
  title?: string;
  /**
   * 消息内容
   * @author lxm
   * @date 2023-09-20 02:26:32
   * @type {string}
   */
  message?: string;

  /**
   * 额外参数
   *
   * @author zk
   * @date 2023-11-06 11:11:50
   * @type {IData}
   * @memberof IViewMessage
   */
  extraParams: IData;

  /**
   * 布局面板
   *
   * @author tony001
   * @date 2024-05-08 17:05:53
   * @type {ILayoutPanel}
   */
  layoutPanel?: ILayoutPanel;

  /**
   * 动态数据
   *
   * @author tony001
   * @date 2024-05-08 17:05:01
   * @type {IData}
   */
  data?: IData;

  /**
   * 是否显示
   *
   * @author zhanghengfeng
   * @date 2024-05-09 16:05:02
   * @type {boolean}
   */
  visible?: boolean;

  /**
   * 系统界面样式表
   *
   * @author zhanghengfeng
   * @date 2024-05-09 16:05:36
   * @type {IAppViewMsg['sysCss']}
   */
  sysCss?: IAppViewMsg['sysCss'];
}

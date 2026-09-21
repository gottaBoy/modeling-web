/**
 * 编辑器父容器控制器（定义编辑器parent需要提供的属性）
 * @author lxm
 * @date 2023-05-24 05:51:50
 * @export
 * @interface IEditorContainerController
 */
export interface IEditorContainerController {
  /**
   * 单位
   * @author lxm
   * @date 2023-05-24 03:28:15
   * @type {string}
   */
  unitName: string | undefined;

  /**
   * 值格式化
   * @author lxm
   * @date 2023-05-24 03:28:16
   * @type {string}
   */
  valueFormat: string | undefined;

  /**
   * 视图上下文
   * @author lxm
   * @date 2023-05-24 03:38:00
   * @type {IContext}
   */
  context: IContext;

  /**
   * 视图参数
   * @author lxm
   * @date 2023-05-24 03:38:11
   * @type {IParams}
   */
  params: IParams;

  /**
   * 数据类型
   *
   * @author zhanghengfeng
   * @date 2023-09-01 11:09:38
   * @type {(number | undefined)}
   */
  dataType: number | undefined;
}

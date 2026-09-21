/**
 * 插件项
 *
 * @author chitanda
 * @date 2023-02-06 21:02:03
 * @export
 * @interface IPluginItem
 */
export interface IPluginItem {
  /**
   * 插件名称，对应模型 rtObjectName
   *
   * @description 预置插件类型名称规则: 视图(VIEW_${视图类型}_DEFAULT)、部件(CONTROL_${部件类型}_DEFAULT)、编辑器(EDITOR_${编辑器类型}_DEFAULT)
   * @author chitanda
   * @date 2023-02-06 21:02:21
   * @type {string}
   */
  name: string;
  /**
   * 插件对应路径，对应模型 rtObjectRepo
   *
   * @author chitanda
   * @date 2023-02-06 21:02:39
   * @type {string}
   */
  path: string;
}

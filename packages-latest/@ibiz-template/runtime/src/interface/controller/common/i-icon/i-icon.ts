/**
 * 图标类型
 * @deprecated 已废弃，后面不要用了
 * @author lxm
 * @date 2023-06-09 06:40:32
 * @export
 * @interface IIcon
 */
export interface IIcon {
  /**
   * 图标class类名
   * @author lxm
   * @date 2023-06-09 06:31:08
   * @type {string}
   */
  cssClass?: string;

  /**
   * 图标图片路径
   * @author lxm
   * @date 2023-06-09 06:31:41
   * @type {string}
   */
  imagePath?: string;

  /**
   * html字符串
   * @author lxm
   * @date 2023-08-15 02:14:26
   * @type {string}
   */
  htmlStr?: string;
}

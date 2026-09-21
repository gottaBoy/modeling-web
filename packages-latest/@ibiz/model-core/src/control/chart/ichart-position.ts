import { IModelObject } from '../../imodel-object';

/**
 *
 * 图表位置模型对象接口
 * @export
 * @interface IChartPosition
 */
export interface IChartPosition extends IModelObject {
  /**
   * 下方间隔
   * @type {IModel}
   * 来源  getBottom
   */
  bottom?: IModel;

  /**
   * 高度
   * @type {IModel}
   * 来源  getHeight
   */
  height?: IModel;

  /**
   * 左侧间隔
   * @type {IModel}
   * 来源  getLeft
   */
  left?: IModel;

  /**
   * 右侧间隔
   * @type {IModel}
   * 来源  getRight
   */
  right?: IModel;

  /**
   * 上方间隔
   * @type {IModel}
   * 来源  getTop
   */
  top?: IModel;

  /**
   * 宽度
   * @type {IModel}
   * 来源  getWidth
   */
  width?: IModel;
}

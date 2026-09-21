import { INumberEditor } from './inumber-editor';

/**
 *
 * 继承父接口类型值[STEPPER,MOBSTEPPER]
 * @export
 * @interface IStepper
 */
export interface IStepper extends INumberEditor {
  /**
   * 步进值[STEPVALUE]
   * @type {number}
   * 来源  getStepValue
   */
  stepValue?: number;
}

/* eslint-disable @typescript-eslint/ban-types */
export * from './exports';

export type { IModelObject } from './imodel-object';

declare global {
  /**
   * 标准JSON对象
   *
   * @interface IModel
   * @extends {Object}
   */
  interface IModel extends Object, Record<string, any> {}
}

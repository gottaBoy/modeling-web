/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @description 指令参数, 主要用于在指令呈现时的展示参数
 * @export
 * @interface ICommandOption
 */
export interface ICommandOption {
  /**
   * @description 唯一标识符（必需）
   * @type {string}
   * @memberof ICommandOption
   */
  readonly id: string;
  /**
   * @description 显示标题（必需）
   * @type {string}
   * @memberof ICommandOption
   */
  readonly title: string;
  /**
   * @description 悬停提示（可选）
   * @type {string}
   * @memberof ICommandOption
   */
  readonly tooltip?: string;
  /**
   * @description 描述（可选）
   * @type {string}
   * @memberof ICommandOption
   */
  readonly description?: string;
  /**
   * @description svg图标（可选）
   * @type {string}
   * @memberof ICommandOption
   */
  readonly icon?: string;
}

/**
 * @description 指令处理回调
 * @export
 * @interface ICommandHandler
 */
export interface ICommandHandler {
  (...args: any[]): unknown | Promise<unknown>;
}

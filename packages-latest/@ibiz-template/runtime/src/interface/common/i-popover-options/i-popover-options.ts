import { ApiPlacement, IApiPopoverOptions } from '../../api';

export declare type Placement = ApiPlacement;

/**
 * @description 飘窗参数
 * @export
 * @interface IPopoverOptions
 * @extends {IApiPopoverOptions<O>}
 * @template O
 */
export interface IPopoverOptions<O = unknown> extends IApiPopoverOptions<O> {}

import { ComputePositionConfig } from '@floating-ui/dom';
import { IPopoverOptions } from '@ibiz-template/runtime';
import { OverlayPopoverContainer } from '@ibiz-template/vue3-util';
import { VNode } from 'vue';
import './app-popover-component.scss';
export type FloatingUIConfig = Partial<ComputePositionConfig>;
/**
 * 创建飘窗
 *
 * @author chitanda
 * @date 2022-12-29 15:12:59
 * @export
 * @param {() => VNode} render
 * @param {IPopoverOptions<FloatingUIConfig>} [opts]
 * @return {*}  {OverlayPopoverContainer}
 */
export declare function createPopover(render: () => VNode, opts?: IPopoverOptions<FloatingUIConfig>): OverlayPopoverContainer;

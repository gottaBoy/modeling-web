import { h as stencilH } from '@stencil/core';
import type { Host, VNode } from '@stencil/core';

export type RuntimeRenderChild =
  | VNode
  | string
  | number
  | boolean
  | null
  | undefined
  | RuntimeRenderChild[];

/**
 * Stencil 2.17's runtime supports variadic children, string classes and flat
 * event/attribute data, unlike its older public h overloads. Only widen types;
 * retain the actual runtime function and its exact arguments.
 */
export const h = stencilH as unknown as (
  tag: string | typeof Host,
  data?: Record<string, any> | null,
  ...children: RuntimeRenderChild[]
) => VNode;

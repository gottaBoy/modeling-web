import { Namespace } from '@ibiz-template/core';

/**
 * css 命名空间
 *
 * @author chitanda
 * @date 2022-09-06 15:09:04
 * @export
 * @param {string} block
 * @return {*}  {Namespace}
 */
export function useNamespace(block: string): Namespace {
  return new Namespace(block, ibiz.env.namespace);
}

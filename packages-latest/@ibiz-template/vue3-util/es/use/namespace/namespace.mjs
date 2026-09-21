import { Namespace } from '@ibiz-template/core';

"use strict";
function useNamespace(block) {
  return new Namespace(block, ibiz.env.namespace);
}

export { useNamespace };

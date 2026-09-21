'use strict';

var core = require('@ibiz-template/core');

"use strict";
function useNamespace(block) {
  return new core.Namespace(block, ibiz.env.namespace);
}

exports.useNamespace = useNamespace;

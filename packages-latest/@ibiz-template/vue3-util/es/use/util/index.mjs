import { inject } from 'vue';

"use strict";
function useCtx() {
  return inject("ctx");
}
function useMobCtx() {
  return inject("ctx");
}

export { useCtx, useMobCtx };

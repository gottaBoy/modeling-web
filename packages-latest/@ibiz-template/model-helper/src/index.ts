import '@ibiz/model-core';
import '@ibiz-template/runtime';

export type { IModelHandler } from './interface';
export * from './model-helper';
export * from './locale';
export { ModelHelper } from './model-helper';
export {
  MergeSubModelHelper,
  registerModelHandler,
  ModelHandler,
} from './utils';

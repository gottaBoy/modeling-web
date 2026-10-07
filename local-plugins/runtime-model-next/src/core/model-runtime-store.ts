/**
 * Reconstructed from runtime-model 0.2.2; original business-class attribution:
 * chitanda, 2021-11-19.
 */
import type { RuntimeItem, RuntimeParameters, RuntimeSelection } from './types';

export class ModelRuntimeStore {
  searchValue = '';
  rootData: RuntimeSelection = {};
  list: RuntimeItem[][] = [];
  activeList: RuntimeSelection[] = [];
  loading = false;
  context: RuntimeParameters = {};
  errorMessage: string | null | undefined = null;
  loaded = false;
}

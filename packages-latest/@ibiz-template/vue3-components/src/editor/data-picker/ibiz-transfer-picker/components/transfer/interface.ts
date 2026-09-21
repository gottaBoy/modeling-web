/* eslint-disable no-unused-vars */
import type { ExtractPropTypes, h as H, PropType, VNode } from 'vue';
import { isArray, isNil } from 'lodash-es';

export const UPDATE_MODEL_EVENT = 'update:modelValue';
export const CHANGE_EVENT = 'change';
export const INPUT_EVENT = 'input';
export const LEFT_CHECK_CHANGE_EVENT = 'leftCheckChange';
export const RIGHT_CHECK_CHANGE_EVENT = 'rightCheckChange';
export const LEFT_AC_SEARCH = 'leftAcSearch';

export type TransferKey = string | number;
export type TransferDirection = 'left' | 'right';
export type renderContent = (h: typeof H, option: IData) => VNode | VNode[];
export interface TransferFormat {
  noChecked?: string;
  hasChecked?: string;
}
export interface TransferPropsAlias {
  label?: string;
  key?: string;
  disabled?: string;
}
export interface TransferCheckedState {
  leftChecked: TransferKey[];
  rightChecked: TransferKey[];
}

export const transferCheckedChangeFn = (
  value: TransferKey[],
  movedKeys?: TransferKey[],
): boolean =>
  [value, movedKeys].every(isArray) || (isArray(value) && isNil(movedKeys));

export const transferProps = {
  data: {
    type: Array as PropType<IData>,
    default: (): IData => [],
  },
  titles: {
    type: Array as PropType<Array<string>>,
    default: (): Array<string> => [],
  },
  buttonTexts: {
    type: Array as PropType<Array<string>>,
    default: (): Array<string> => [],
  },
  filterPlaceholder: String,
  filterMethod: {
    type: Function as PropType<(query: string, item: IData) => boolean>,
  },
  rightSearchMethod: {
    type: Function as PropType<(query: string) => IData[]>,
  },
  leftDefaultChecked: {
    type: Array as PropType<Array<TransferKey>>,
    default: (): Array<TransferKey> => [],
  },
  rightDefaultChecked: {
    type: Array as PropType<Array<TransferKey>>,
    default: (): Array<TransferKey> => [],
  },
  renderContent: {
    type: Function as PropType<renderContent>,
  },
  modelValue: {
    type: Array as PropType<Array<TransferKey>>,
    default: (): Array<TransferKey> => [],
  },
  format: {
    type: Object as PropType<TransferFormat>,
    default: (): TransferFormat => ({}),
  },
  filterable: Boolean,
  props: {
    type: Object as PropType<TransferPropsAlias>,
    default: (): TransferPropsAlias => ({
      label: 'label',
      key: 'key',
      disabled: 'disabled',
    }),
  },
  targetOrder: {
    type: String,
    values: ['original', 'push', 'unshift'],
    default: 'original',
  },
  enableRemoteSearch: {
    type: Boolean,
    default: false,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
};

export type TransferProps = ExtractPropTypes<typeof transferProps>;

export const transferEmits = {
  [CHANGE_EVENT]: (
    value: TransferKey[],
    direction: TransferDirection,
    movedKeys: TransferKey[],
  ): boolean =>
    [value, movedKeys].every(isArray) && ['left', 'right'].includes(direction),
  [UPDATE_MODEL_EVENT]: (value: TransferKey[]): boolean => isArray(value),
  [LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [LEFT_AC_SEARCH]: (query: string): string => query,
};
export type TransferEmits = typeof transferEmits;

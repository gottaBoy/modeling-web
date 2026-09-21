/* eslint-disable no-unused-vars */
import { ExtractPropTypes, PropType, VNode } from 'vue';
import { isArray, isNil } from 'lodash-es';
import { TransferFormat } from '../transfer/interface';

export const CHECKED_CHANGE_EVENT = 'checkedChange';
export const AC_SEARCH = 'acSearch';
export type TransferKey = string | number;
export interface TransferPanelState {
  checked: TransferKey[];
  allChecked: boolean;
  query: string;
  checkChangeByUser: boolean;
}

export interface TransferPropsAlias {
  label?: string;
  key?: string;
  disabled?: string;
}
export type CheckboxValueType = string | number | boolean;

export const transferCheckedChangeFn = (
  value: TransferKey[],
  movedKeys?: TransferKey[],
): boolean =>
  [value, movedKeys].every(isArray) || (isArray(value) && isNil(movedKeys));
export const transferPanelProps = {
  data: {
    type: Array as PropType<IData>,
    default: (): IData => [],
  },
  optionRender: {
    type: Function as PropType<(option: IData) => VNode | VNode[]>,
  },
  placeholder: String,
  title: String,
  filterable: Boolean,
  enableAcSearch: Boolean,
  format: {
    type: Object as PropType<TransferFormat>,
    default: (): TransferFormat => ({}),
  },
  filterMethod: {
    type: Function as PropType<(query: string, item: IData) => boolean>,
  },
  defaultChecked: {
    type: Array as PropType<Array<TransferKey>>,
    default: (): Array<TransferKey> => [],
  },
  props: {
    type: Object as PropType<TransferPropsAlias>,
    default: (): TransferPropsAlias => ({
      label: 'label',
      key: 'key',
      disabled: 'disabled',
    }),
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
export type TransferPanelProps = ExtractPropTypes<typeof transferPanelProps>;

export const transferPanelEmits = {
  [CHECKED_CHANGE_EVENT]: transferCheckedChangeFn,
  [AC_SEARCH]: (query: string): string => query,
};
export type TransferPanelEmits = typeof transferPanelEmits;

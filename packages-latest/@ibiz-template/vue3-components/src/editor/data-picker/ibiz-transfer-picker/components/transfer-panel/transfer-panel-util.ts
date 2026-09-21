/* eslint-disable no-unused-vars */
import { computed, ComputedRef, ref, SetupContext, watch, Ref } from 'vue';
import { isFunction } from 'lodash-es';
import {
  CheckboxValueType,
  CHECKED_CHANGE_EVENT,
  TransferKey,
  TransferPanelEmits,
  TransferPanelProps,
  TransferPanelState,
  TransferPropsAlias,
} from './interface';

export const usePropsAlias = (props: {
  props: TransferPropsAlias;
}): ComputedRef => {
  const initProps: Required<TransferPropsAlias> = {
    label: 'label',
    key: 'key',
    disabled: 'disabled',
  };

  return computed(() => ({
    ...initProps,
    ...props.props,
  }));
};

export const useCheck = (
  props: TransferPanelProps,
  panelState: TransferPanelState,
  emit: SetupContext<TransferPanelEmits>['emit'],
): {
  filteredData: Ref;
  checkableData: ComputedRef;
  checkedSummary: ComputedRef;
  isIndeterminate: ComputedRef;
  onInputChange: (value: string) => void;
  updateAllChecked: () => void;
  handleAllCheckedChange: (value: CheckboxValueType) => void;
} => {
  const propsAlias = usePropsAlias(props);

  const filteredData = ref<IData>([]);

  const checkableData = computed(() =>
    filteredData.value.filter((item: IData) => {
      return !item[propsAlias.value.disabled];
    }),
  );

  const checkedSummary = computed(() => {
    const checkedLength = panelState.checked.length;
    const dataLength = props.data.length;
    const { noChecked, hasChecked } = props.format;

    if (noChecked && hasChecked) {
      return checkedLength > 0
        ? hasChecked
            .replace(/\${checked}/g, checkedLength.toString())
            .replace(/\${total}/g, dataLength.toString())
        : noChecked.replace(/\${total}/g, dataLength.toString());
    }
    return `${checkedLength}/${dataLength}`;
  });

  const isIndeterminate = computed(() => {
    const checkedLength = panelState.checked.length;
    return checkedLength > 0 && checkedLength < checkableData.value.length;
  });

  const handleFilteredData = (value: string = ''): void => {
    filteredData.value = props.data.filter((item: IData) => {
      if (isFunction(props.filterMethod)) {
        return props.filterMethod(value, item);
      }
      const label = String(
        item[propsAlias.value.label] || item[propsAlias.value.key],
      );
      return label.toLowerCase().includes(value.toLowerCase());
    });
  };

  const onInputChange = async (value: string): Promise<void> => {
    if (props.enableAcSearch) {
      emit('acSearch', value);
    } else {
      handleFilteredData(value);
    }
  };

  const updateAllChecked = (): void => {
    const checkableDataKeys = checkableData.value.map(
      (item: IData) => item[propsAlias.value.key],
    );
    // eslint-disable-next-line no-param-reassign
    panelState.allChecked =
      checkableDataKeys.length > 0 &&
      checkableDataKeys.every((item: string) =>
        panelState.checked.includes(item),
      );
  };

  const handleAllCheckedChange = (value: CheckboxValueType): void => {
    // eslint-disable-next-line no-param-reassign
    panelState.checked = value
      ? checkableData.value.map((item: IData) => item[propsAlias.value.key])
      : [];
  };

  watch(
    () => panelState.checked,
    (val, oldVal) => {
      updateAllChecked();

      if (panelState.checkChangeByUser) {
        const movedKeys = val
          .concat(oldVal)
          .filter(v => !val.includes(v) || !oldVal.includes(v));
        emit(CHECKED_CHANGE_EVENT, val, movedKeys);
      } else {
        emit(CHECKED_CHANGE_EVENT, val);
        // eslint-disable-next-line no-param-reassign
        panelState.checkChangeByUser = true;
      }
    },
  );

  watch(checkableData, () => {
    updateAllChecked();
  });

  watch(
    () => props.data,
    () => {
      handleFilteredData(panelState.query);
      const checked: TransferKey[] = [];
      const filteredDataKeys = filteredData.value.map(
        (item: IData) => item[propsAlias.value.key],
      );
      panelState.checked.forEach(item => {
        if (filteredDataKeys.includes(item)) {
          checked.push(item);
        }
      });
      // eslint-disable-next-line no-param-reassign
      panelState.checkChangeByUser = false;
      // eslint-disable-next-line no-param-reassign
      panelState.checked = checked;
    },
  );

  watch(
    () => props.defaultChecked,
    val => {
      const checked: TransferKey[] = [];
      const checkableDataKeys = props.data.map(
        (item: IData) => item[propsAlias.value.key],
      );

      val.forEach(item => {
        if (checkableDataKeys.includes(item)) {
          checked.push(item);
        }
      });
      // eslint-disable-next-line no-param-reassign
      panelState.checkChangeByUser = false;
      // eslint-disable-next-line no-param-reassign
      panelState.checked = checked;
    },
    {
      immediate: true,
    },
  );

  return {
    filteredData,
    checkableData,
    checkedSummary,
    isIndeterminate,
    onInputChange,
    updateAllChecked,
    handleAllCheckedChange,
  };
};

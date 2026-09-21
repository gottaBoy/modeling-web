/* eslint-disable no-unused-vars */
import { computed } from 'vue';
import type { ComputedRef, SetupContext } from 'vue';
import {
  CHANGE_EVENT,
  LEFT_CHECK_CHANGE_EVENT,
  RIGHT_CHECK_CHANGE_EVENT,
  UPDATE_MODEL_EVENT,
} from './interface';
import type {
  TransferCheckedState,
  TransferDirection,
  TransferEmits,
  TransferKey,
  TransferProps,
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

export const useComputedData = (
  props: TransferProps,
): {
  sourceData: ComputedRef;
  targetData: ComputedRef;
} => {
  const propsAlias = usePropsAlias(props);

  const dataObj = computed(() =>
    props.data.reduce(
      // eslint-disable-next-line no-return-assign, no-param-reassign
      (o: IData, cur: IData) => (o[cur[propsAlias.value.key]] = cur) && o,
      {},
    ),
  );

  const sourceData = computed(() =>
    props.data.filter(
      (item: IData) => !props.modelValue.includes(item[propsAlias.value.key]),
    ),
  );

  const targetData = computed(() => {
    if (props.targetOrder === 'original') {
      return props.data.filter((item: IData) =>
        props.modelValue.includes(item[propsAlias.value.key]),
      );
    }
    return props.modelValue.reduce((arr: IData[], cur: TransferKey) => {
      const val = dataObj.value[cur];
      if (val) {
        arr.push(val);
      }
      return arr;
    }, []);
  });

  return {
    sourceData,
    targetData,
  };
};

export const useCheckedChange = (
  checkedState: TransferCheckedState,
  emit: SetupContext<TransferEmits>['emit'],
): {
  onSourceCheckedChange: (
    val: TransferKey[],
    movedKeys?: TransferKey[],
  ) => void;
  onTargetCheckedChange: (
    val: TransferKey[],
    movedKeys?: TransferKey[],
  ) => void;
} => {
  const onSourceCheckedChange = (
    val: TransferKey[],
    movedKeys?: TransferKey[],
  ): void => {
    // eslint-disable-next-line no-param-reassign
    checkedState.leftChecked = val;
    if (!movedKeys) return;
    emit(LEFT_CHECK_CHANGE_EVENT, val, movedKeys);
  };

  const onTargetCheckedChange = (
    val: TransferKey[],
    movedKeys?: TransferKey[],
  ): void => {
    // eslint-disable-next-line no-param-reassign
    checkedState.rightChecked = val;
    if (!movedKeys) return;
    emit(RIGHT_CHECK_CHANGE_EVENT, val, movedKeys);
  };

  return {
    onSourceCheckedChange,
    onTargetCheckedChange,
  };
};

export const useMove = (
  props: TransferProps,
  checkedState: TransferCheckedState,
  emit: SetupContext<TransferEmits>['emit'],
): {
  addToLeft: () => void;
  addToRight: () => void;
} => {
  const propsAlias = usePropsAlias(props);

  const _emit = (
    value: TransferKey[],
    direction: TransferDirection,
    movedKeys: TransferKey[],
  ): void => {
    emit(UPDATE_MODEL_EVENT, value);
    emit(CHANGE_EVENT, value, direction, movedKeys);
  };

  const addToLeft = (): void => {
    const currentValue = props.modelValue.slice();

    checkedState.rightChecked.forEach(item => {
      const index = currentValue.indexOf(item);
      if (index > -1) {
        currentValue.splice(index, 1);
      }
    });
    _emit(currentValue, 'left', checkedState.rightChecked);
  };

  const addToRight = (): void => {
    let currentValue = props.modelValue.slice();

    const itemsToBeMoved = props.data
      .filter((item: IData) => {
        const itemKey = item[propsAlias.value.key];
        return (
          checkedState.leftChecked.includes(itemKey) &&
          !props.modelValue.includes(itemKey)
        );
      })
      .map((item: IData) => item[propsAlias.value.key]);

    currentValue =
      props.targetOrder === 'unshift'
        ? itemsToBeMoved.concat(currentValue)
        : currentValue.concat(itemsToBeMoved);

    if (props.targetOrder === 'original') {
      currentValue = props.data
        .filter((item: IData) =>
          currentValue.includes(item[propsAlias.value.key]),
        )
        .map((item: IData) => item[propsAlias.value.key]);
    }

    _emit(currentValue, 'right', checkedState.leftChecked);
  };

  return {
    addToLeft,
    addToRight,
  };
};

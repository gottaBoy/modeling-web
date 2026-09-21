import { computed } from 'vue';
import { LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT, UPDATE_MODEL_EVENT, CHANGE_EVENT } from './interface.mjs';

"use strict";
const usePropsAlias = (props) => {
  const initProps = {
    label: "label",
    key: "key",
    disabled: "disabled"
  };
  return computed(() => ({
    ...initProps,
    ...props.props
  }));
};
const useComputedData = (props) => {
  const propsAlias = usePropsAlias(props);
  const dataObj = computed(
    () => props.data.reduce(
      // eslint-disable-next-line no-return-assign, no-param-reassign
      (o, cur) => (o[cur[propsAlias.value.key]] = cur) && o,
      {}
    )
  );
  const sourceData = computed(
    () => props.data.filter(
      (item) => !props.modelValue.includes(item[propsAlias.value.key])
    )
  );
  const targetData = computed(() => {
    if (props.targetOrder === "original") {
      return props.data.filter(
        (item) => props.modelValue.includes(item[propsAlias.value.key])
      );
    }
    return props.modelValue.reduce((arr, cur) => {
      const val = dataObj.value[cur];
      if (val) {
        arr.push(val);
      }
      return arr;
    }, []);
  });
  return {
    sourceData,
    targetData
  };
};
const useCheckedChange = (checkedState, emit) => {
  const onSourceCheckedChange = (val, movedKeys) => {
    checkedState.leftChecked = val;
    if (!movedKeys)
      return;
    emit(LEFT_CHECK_CHANGE_EVENT, val, movedKeys);
  };
  const onTargetCheckedChange = (val, movedKeys) => {
    checkedState.rightChecked = val;
    if (!movedKeys)
      return;
    emit(RIGHT_CHECK_CHANGE_EVENT, val, movedKeys);
  };
  return {
    onSourceCheckedChange,
    onTargetCheckedChange
  };
};
const useMove = (props, checkedState, emit) => {
  const propsAlias = usePropsAlias(props);
  const _emit = (value, direction, movedKeys) => {
    emit(UPDATE_MODEL_EVENT, value);
    emit(CHANGE_EVENT, value, direction, movedKeys);
  };
  const addToLeft = () => {
    const currentValue = props.modelValue.slice();
    checkedState.rightChecked.forEach((item) => {
      const index = currentValue.indexOf(item);
      if (index > -1) {
        currentValue.splice(index, 1);
      }
    });
    _emit(currentValue, "left", checkedState.rightChecked);
  };
  const addToRight = () => {
    let currentValue = props.modelValue.slice();
    const itemsToBeMoved = props.data.filter((item) => {
      const itemKey = item[propsAlias.value.key];
      return checkedState.leftChecked.includes(itemKey) && !props.modelValue.includes(itemKey);
    }).map((item) => item[propsAlias.value.key]);
    currentValue = props.targetOrder === "unshift" ? itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved);
    if (props.targetOrder === "original") {
      currentValue = props.data.filter(
        (item) => currentValue.includes(item[propsAlias.value.key])
      ).map((item) => item[propsAlias.value.key]);
    }
    _emit(currentValue, "right", checkedState.leftChecked);
  };
  return {
    addToLeft,
    addToRight
  };
};

export { useCheckedChange, useComputedData, useMove, usePropsAlias };

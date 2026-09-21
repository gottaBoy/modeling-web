import { computed, ref, watch } from 'vue';
import { isFunction } from 'lodash-es';
import { CHECKED_CHANGE_EVENT } from './interface.mjs';

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
const useCheck = (props, panelState, emit) => {
  const propsAlias = usePropsAlias(props);
  const filteredData = ref([]);
  const checkableData = computed(
    () => filteredData.value.filter((item) => {
      return !item[propsAlias.value.disabled];
    })
  );
  const checkedSummary = computed(() => {
    const checkedLength = panelState.checked.length;
    const dataLength = props.data.length;
    const { noChecked, hasChecked } = props.format;
    if (noChecked && hasChecked) {
      return checkedLength > 0 ? hasChecked.replace(/\${checked}/g, checkedLength.toString()).replace(/\${total}/g, dataLength.toString()) : noChecked.replace(/\${total}/g, dataLength.toString());
    }
    return "".concat(checkedLength, "/").concat(dataLength);
  });
  const isIndeterminate = computed(() => {
    const checkedLength = panelState.checked.length;
    return checkedLength > 0 && checkedLength < checkableData.value.length;
  });
  const handleFilteredData = (value = "") => {
    filteredData.value = props.data.filter((item) => {
      if (isFunction(props.filterMethod)) {
        return props.filterMethod(value, item);
      }
      const label = String(
        item[propsAlias.value.label] || item[propsAlias.value.key]
      );
      return label.toLowerCase().includes(value.toLowerCase());
    });
  };
  const onInputChange = async (value) => {
    if (props.enableAcSearch) {
      emit("acSearch", value);
    } else {
      handleFilteredData(value);
    }
  };
  const updateAllChecked = () => {
    const checkableDataKeys = checkableData.value.map(
      (item) => item[propsAlias.value.key]
    );
    panelState.allChecked = checkableDataKeys.length > 0 && checkableDataKeys.every(
      (item) => panelState.checked.includes(item)
    );
  };
  const handleAllCheckedChange = (value) => {
    panelState.checked = value ? checkableData.value.map((item) => item[propsAlias.value.key]) : [];
  };
  watch(
    () => panelState.checked,
    (val, oldVal) => {
      updateAllChecked();
      if (panelState.checkChangeByUser) {
        const movedKeys = val.concat(oldVal).filter((v) => !val.includes(v) || !oldVal.includes(v));
        emit(CHECKED_CHANGE_EVENT, val, movedKeys);
      } else {
        emit(CHECKED_CHANGE_EVENT, val);
        panelState.checkChangeByUser = true;
      }
    }
  );
  watch(checkableData, () => {
    updateAllChecked();
  });
  watch(
    () => props.data,
    () => {
      handleFilteredData(panelState.query);
      const checked = [];
      const filteredDataKeys = filteredData.value.map(
        (item) => item[propsAlias.value.key]
      );
      panelState.checked.forEach((item) => {
        if (filteredDataKeys.includes(item)) {
          checked.push(item);
        }
      });
      panelState.checkChangeByUser = false;
      panelState.checked = checked;
    }
  );
  watch(
    () => props.defaultChecked,
    (val) => {
      const checked = [];
      const checkableDataKeys = props.data.map(
        (item) => item[propsAlias.value.key]
      );
      val.forEach((item) => {
        if (checkableDataKeys.includes(item)) {
          checked.push(item);
        }
      });
      panelState.checkChangeByUser = false;
      panelState.checked = checked;
    },
    {
      immediate: true
    }
  );
  return {
    filteredData,
    checkableData,
    checkedSummary,
    isIndeterminate,
    onInputChange,
    updateAllChecked,
    handleAllCheckedChange
  };
};

export { useCheck, usePropsAlias };

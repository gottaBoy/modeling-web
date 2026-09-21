"use strict";
function useAutoFocusBlur(props, emit) {
  return {
    useInFocusAndBlur: () => {
      if (!props.autoFocus) {
        emit("blur");
      }
    },
    useInValueChange: () => {
      if (props.autoFocus) {
        emit("blur");
      }
    }
  };
}

export { useAutoFocusBlur };

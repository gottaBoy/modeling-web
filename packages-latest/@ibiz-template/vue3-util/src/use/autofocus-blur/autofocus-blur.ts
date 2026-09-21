type MyComponentEmits = 'blur';

type EmitFn = <E extends MyComponentEmits>(event: E) => void;

/**
 *  自动聚焦及改变值时失焦
 *
 * @author fangZhiHao
 * @date 2024-06-12 18:06:40
 * @export
 * @param {IData} props
 * @param {EmitFn} Fn
 * @return {*}  {{ useInFocusAndBlur: () => void; useInValueChange: () => void }}
 */
export function useAutoFocusBlur(
  props: IData,
  emit: EmitFn,
): { useInFocusAndBlur: () => void; useInValueChange: () => void } {
  return {
    useInFocusAndBlur: () => {
      if (!props.autoFocus) {
        emit('blur');
      }
    },
    useInValueChange: () => {
      if (props.autoFocus) {
        emit('blur');
      }
    },
  };
}

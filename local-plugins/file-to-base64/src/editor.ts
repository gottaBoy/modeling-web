import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { getEditorEmits, getUploadProps } from '@ibiz-template/vue3-util';
import type { FileToBase64Controller } from './controller';
import { COMPONENT_NAME } from './provider';
import {
  FileConversionError,
  formatFileSize,
  readFileAsValue,
  validateSelection,
  valueChanges,
} from './file-logic';

export const AIBizFileToBase64 = defineComponent({
  name: COMPONENT_NAME,
  props: getUploadProps<FileToBase64Controller>(),
  emits: getEditorEmits<string | null>(),
  setup(props, { emit }) {
    const controller = props.controller;
    const input = ref<HTMLInputElement>();
    const root = ref<HTMLElement>();
    const busy = ref(false);
    const error = ref('');
    const selectedName = ref('');
    const selectedSize = ref<number>();
    const readonly = computed(() => props.readonly || controller.readonly || controller.config.readonly);
    const locked = computed(() => readonly.value || props.disabled || controller.config.disabled);
    const hasValue = computed(() => props.value !== undefined && props.value !== null &&
      (props.value !== '' || !!selectedName.value || !!props.data?.[controller.config.filenameField]));
    const displayName = computed(() => selectedName.value ||
      String(props.data?.[controller.config.filenameField] || 'Stored file'));
    let active: AbortController | undefined;
    let generation = 0;
    let emittedValue: string | null | undefined;

    const cancelRead = () => {
      generation += 1;
      active?.abort();
      active = undefined;
      busy.value = false;
      if (input.value) input.value.value = '';
    };
    const publish = (value: string | null, filename: string | null) => {
      emittedValue = value;
      for (const change of valueChanges(value, filename, controller.config.filenameField)) {
        emit('change', ...change);
      }
    };
    const select = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = Array.from(target.files || []);
      target.value = '';
      if (locked.value) return;
      cancelRead();
      error.value = '';
      const current = generation;
      try {
        const descriptor = validateSelection(files, controller.config);
        if (!descriptor) return;
        const file = files[0];
        active = new AbortController();
        busy.value = true;
        const value = await readFileAsValue(file, controller.config.encoding, active.signal);
        if (current !== generation || locked.value) return;
        busy.value = false;
        selectedName.value = file.name;
        selectedSize.value = file.size;
        publish(value, file.name);
      } catch (failure) {
        if (current === generation && !(failure instanceof FileConversionError && failure.code === 'aborted')) {
          error.value = failure instanceof Error ? failure.message : 'The file could not be read.';
        }
      } finally {
        if (current === generation) {
          active = undefined;
          busy.value = false;
        }
      }
    };
    const remove = () => {
      if (locked.value) return;
      cancelRead();
      error.value = '';
      selectedName.value = '';
      selectedSize.value = undefined;
      publish(null, null);
    };

    watch(() => props.value, value => {
      if (value !== emittedValue) {
        cancelRead();
        selectedName.value = '';
        selectedSize.value = undefined;
      }
      error.value = '';
    }, { flush: 'sync' });
    watch(locked, value => {
      if (value) cancelRead();
    }, { flush: 'sync' });
    onBeforeUnmount(cancelRead);
    onMounted(() => {
      if (props.autoFocus && !locked.value) input.value?.focus();
    });

    return () => h('div', {
      ref: root,
      class: ['aibiz-file-to-base64', { 'is-disabled': locked.value }],
      style: controller.style,
      'aria-busy': busy.value,
      onFocusin: (event: FocusEvent) => {
        if (!root.value?.contains(event.relatedTarget as Node | null)) emit('focus', event);
      },
      onFocusout: (event: FocusEvent) => {
        if (!root.value?.contains(event.relatedTarget as Node | null)) emit('blur', event);
      },
      onKeydown: (event: KeyboardEvent) => {
        if (event.key === 'Enter') emit('enter', event);
      },
    }, [
      readonly.value ? null : h('input', {
        ref: input,
        type: 'file',
        class: 'aibiz-file-to-base64__input',
        accept: controller.config.accept || undefined,
        multiple: false,
        disabled: locked.value,
        'aria-label': controller.placeHolder || 'Choose file',
        onChange: select,
      }),
      hasValue.value ? h('div', { class: 'aibiz-file-to-base64__file' }, [
        h('span', { class: 'aibiz-file-to-base64__name', title: displayName.value }, displayName.value),
        selectedSize.value !== undefined ?
          h('span', { class: 'aibiz-file-to-base64__size' }, formatFileSize(selectedSize.value)) : null,
      ]) : null,
      !readonly.value && (hasValue.value || busy.value) ? h('button', {
        type: 'button',
        class: 'aibiz-file-to-base64__remove',
        disabled: locked.value,
        title: 'Remove file',
        'aria-label': 'Remove file',
        onClick: remove,
      }, [h('ion-icon', { name: 'trash-outline', 'aria-hidden': 'true' }), h('span', 'Remove')]) : null,
      busy.value ? h('span', { class: 'aibiz-file-to-base64__status', role: 'status' }, 'Reading file...') : null,
      error.value ? h('span', { class: 'aibiz-file-to-base64__error', role: 'alert' }, error.value) : null,
      readonly.value && !hasValue.value ? h('span', '-') : null,
    ]);
  },
});

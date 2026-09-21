/* eslint-disable no-param-reassign */
import { computed, defineComponent, ref, watch } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  getInputIpProps,
} from '@ibiz-template/vue3-util';
import { ElInput } from 'element-plus';
import { TextBoxEditorController } from '../text-box-editor.controller';
import './ibiz-input-ip.scss';

/**
 * IP地址输入框
 *
 * @description 由多个el-input组件组合而成，用于IP地址数据的录入。支持编辑器类型包含：`IP地址输入框`
 * @primary
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops overflowMode
 * @ignoreemits infoTextChange
 */
export const IBizInputIP: ReturnType<typeof defineComponent> = defineComponent({
  name: 'IBizInputIP',
  props: getInputIpProps<TextBoxEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('input-ip');

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    // 是否显示表单默认内容
    const showFormDefaultContent = computed(() => {
      if (
        props.controlParams &&
        props.controlParams.editmode === 'hover' &&
        !props.readonly
      ) {
        return true;
      }
      return false;
    });

    // 当前组件是否已获取到焦点
    const activeElement = ref(false);

    // 当前组件输入框是否全部失焦
    const isAllBlur = ref(false);

    // 分割ip地址
    const splitIp = (ip: string): string[] => {
      const parts = ip.split('.');
      return [parts[0] || '', parts[1] || '', parts[2] || '', parts[3] || ''];
    };

    // 拼接ip地址
    const joinIp = (parts: string[]): string => {
      return parts.join('.');
    };

    // 验证ip地址
    const isValidIp = (parts: string[]): boolean => {
      return parts.every(part => {
        if (!part) {
          return false;
        }
        return /^(0|[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])$/.test(part);
      });
    };

    // ip段
    const ipSegments = ref<string[]>(splitIp(props.value || ''));

    // ip输入框
    const ipInputs = ref<(InstanceType<typeof ElInput> | undefined)[]>([]);

    // 处理输入
    const handleInput = (value: string, index: number) => {
      value = value.replace(/[^0-9]/g, '').slice(0, 3);

      if (value) {
        const num = parseInt(value, 10);
        if (num > 255) {
          value = '255';
        } else {
          value = `${num}`;
        }
      }

      ipSegments.value[index] = value;

      const target = ipInputs.value[index];
      const input = target?.input;

      if (
        ipSegments.value[index].length === 3 &&
        index < 3 &&
        input &&
        input.selectionStart === ipSegments.value[index].length &&
        input.selectionEnd === ipSegments.value[index].length
      ) {
        const ipInput = ipInputs.value[index + 1];
        if (ipInput) {
          ipInput.focus();
          ipInput.input?.setSelectionRange(
            0,
            ipSegments.value[index + 1].length,
          );
        }
      }

      if (isValidIp(ipSegments.value)) {
        emit('change', joinIp(ipSegments.value));
      }
    };

    // 处理键盘事件
    const handleKeydown = (event: KeyboardEvent, index: number) => {
      if (event.key === 'Enter') {
        emit('enter', event);
        return;
      }

      if (/^[0-9]$/.test(event.key)) {
        const input = event.target as HTMLInputElement | null;
        if (
          input &&
          ipSegments.value[index].length === 3 &&
          input.selectionStart === input.selectionEnd
        ) {
          event.preventDefault();
          if (
            index < 3 &&
            input.selectionEnd === ipSegments.value[index].length
          ) {
            const nextIndex = index + 1;
            const nextInput = ipInputs.value[nextIndex];
            if (nextInput) {
              nextInput.focus();
              nextInput.input?.setSelectionRange(
                0,
                ipSegments.value[nextIndex].length,
              );
            }
          }
        }
        return;
      }

      if (event.key === '.') {
        event.preventDefault();
        const input = event.target as HTMLInputElement | null;
        if (
          input &&
          index < 3 &&
          input.selectionStart === input.selectionEnd &&
          input.selectionEnd !== 0 &&
          ipSegments.value[index].length
        ) {
          const nextIndex = index + 1;
          const nextInput = ipInputs.value[nextIndex];
          if (nextInput) {
            nextInput.focus();
            nextInput.input?.setSelectionRange(
              0,
              ipSegments.value[nextIndex].length,
            );
          }
        }
        return;
      }

      // 处理退格键
      if (event.key === 'Backspace') {
        const input = event.target as HTMLInputElement | null;
        if (
          input &&
          index > 0 &&
          input.selectionStart === 0 &&
          input.selectionEnd === 0
        ) {
          event.preventDefault();
          const prevIndex = index - 1;
          const prevValue = ipSegments.value[prevIndex];
          const prevInput = ipInputs.value[prevIndex];
          if (prevValue.length > 0) {
            ipSegments.value[prevIndex] = prevValue.slice(0, -1);
          }
          if (prevInput) {
            prevInput.focus();
            prevInput.input?.setSelectionRange(
              ipSegments.value[prevIndex].length,
              ipSegments.value[prevIndex].length,
            );
          }
        }
      }

      // 处理方向键：左箭头切换到前一个输入框
      if (event.key === 'ArrowLeft') {
        const input = event.target as HTMLInputElement | null;
        if (
          input &&
          index > 0 &&
          input.selectionStart === 0 &&
          input.selectionEnd === 0
        ) {
          event.preventDefault();
          const prevIndex = index - 1;
          const prevInput = ipInputs.value[prevIndex];
          if (prevInput) {
            prevInput.focus();
            prevInput.input?.setSelectionRange(
              ipSegments.value[prevIndex].length,
              ipSegments.value[prevIndex].length,
            );
          }
        }
      }

      // 处理方向键：右箭头切换到后一个输入框
      if (event.key === 'ArrowRight') {
        const input = event.target as HTMLInputElement | null;
        if (
          input &&
          index < 3 &&
          input.selectionStart === ipSegments.value[index].length &&
          input.selectionEnd === ipSegments.value[index].length
        ) {
          event.preventDefault();
          const nextIndex = index + 1;
          const nextInput = ipInputs.value[nextIndex];
          if (nextInput) {
            nextInput.focus();
            nextInput.input?.setSelectionRange(0, 0);
          }
        }
      }
    };

    // 处理聚焦
    const handleFocus = () => {
      activeElement.value = true;
      if (isAllBlur.value) {
        isAllBlur.value = false;
        emit('focus');
      }
    };

    // 处理失焦
    const handleBlur = () => {
      activeElement.value = false;
      setTimeout(() => {
        if (!activeElement.value) {
          isAllBlur.value = true;
          emit('blur');
        }
      }, 0);
    };

    watch(
      () => props.value,
      newVal => {
        ipSegments.value = splitIp(newVal || '');
      },
    );

    watch(
      () => ipInputs.value[0],
      input => {
        if (props.autoFocus && input) {
          input.focus();
        }
      },
    );

    return {
      c,
      ns,
      ipInputs,
      ipSegments,
      semanticClass,
      semanticStyle,
      activeElement,
      showFormDefaultContent,
      joinIp,
      handleBlur,
      handleInput,
      handleFocus,
      handleKeydown,
    };
  },
  render() {
    let content = null;
    if (this.readonly) {
      content = this.value;
    } else {
      content = (
        <div
          class={[this.ns.b('content'), this.semanticClass('editor.content')]}
          style={this.semanticStyle('editor.content')}
        >
          {this.ipSegments.map((segment, index) => {
            return [
              <el-input
                maxlength={4}
                model-value={segment}
                class={[this.ns.e('input'), this.semanticClass('editor.input')]}
                style={this.semanticStyle('editor.input')}
                disabled={this.disabled}
                readonly={this.readonly}
                ref={(el: InstanceType<typeof ElInput>) => {
                  if (el) {
                    this.ipInputs[index] = el;
                  } else {
                    this.ipInputs[index] = undefined;
                  }
                }}
                onInput={(value: string) => this.handleInput(value, index)}
                onKeydown={(e: KeyboardEvent) => this.handleKeydown(e, index)}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              ></el-input>,
              index < 3 && (
                <span
                  class={[
                    this.ns.b('dot'),
                    this.ns.e('separator'),
                    this.semanticClass('editor.separator'),
                  ]}
                  style={this.semanticStyle('editor.separator')}
                >
                  .
                </span>
              ),
            ];
          })}
        </div>
      );
    }

    // 表单默认内容
    const formDefaultContent = (
      <div
        class={[
          this.ns.b('form-default-content'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
      >
        {this.ipSegments.some(segment => segment) ? (
          this.joinIp(this.ipSegments)
        ) : (
          <iBizEditorEmptyText
            showPlaceholder={this.c.emptyShowPlaceholder}
            placeHolder={this.c.placeHolder}
          />
        )}
      </div>
    );

    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
          this.ns.is(
            'focus',
            this.activeElement && !this.disabled && !this.readonly,
          ),
        ]}
        style={this.semanticStyle('editor.root')}
      >
        {this.showFormDefaultContent && formDefaultContent}
        {content}
      </div>
    );
  },
});

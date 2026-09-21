import { computed, defineComponent, ref, watch } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  getInputNumberProps,
} from '@ibiz-template/vue3-util';
import './ibiz-input-number.scss';
import { isNilOrEmpty } from 'qx-util';
import { toNumber } from 'lodash-es';
import { TextBoxEditorController } from '../text-box-editor.controller';

/**
 * 数值框
 *
 * @description 使用el-input-number组件，用于仅允许输入标准的数字值的场景。支持编辑器类型包含：`数值框`
 * @primary
 * @editorparams {name:precision,parameterType:number,description:el-input-number组件的precision属性，设置数值精度}
 * @editorparams {name:maxvalue,parameterType:number,defaultvalue:Infinity,description:el-input-number组件的max属性，设置数值框允许的最大值}
 * @editorparams {name:minvalue,parameterType:number,defaultvalue:-Infinity,description:el-input-number组件的min属性，设置数值框允许的最小值}
 * @editorparams {name:enablethousands,parameterType:boolean,defaultvalue:false,description:是否启用千分位}
 * @editorparams {"name":"triggermode","parameterType":"'blur' | 'input'","defaultvalue":"'blur'","description":"指定编辑器触发 `change` 值变更事件的模式，input: 输入框输入时触发事件，blur：输入框blur时触发事件"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops overflowMode
 * @ignoreemits infoTextChange
 */
export const IBizInputNumber = defineComponent({
  name: 'IBizInputNumber',
  props: getInputNumberProps<TextBoxEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('input-number');

    // 是否启用千分位
    const enablethousands = ref(false);

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const editorModel = c.model;

    const currentVal = ref<number | null | string>(null);

    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.input'),
        selector: '.el-input__inner',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.input'),
        selector: '.el-input__inner',
      },
    ];

    // 设置允许的最大值
    let max = Infinity;
    // 设置允许的最小值
    let min = -Infinity;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = toNumber(editorModel.editorParams.minvalue);
      }
      if (editorModel.editorParams.enablethousands) {
        enablethousands.value = JSON.parse(
          editorModel.editorParams.enablethousands,
        );
      }
    }

    // 是否编辑态
    const isEditable = ref(false);

    // 编辑器Ref
    const editorRef = ref();

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

    //  数字转换成千分位字符
    const numberconvertToStr = (num: number, decimalPlaces = 0) => {
      // 自定义选项来控制小数点后的位数，这里以2位为例
      const options = {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      };
      return num?.toLocaleString('en-US', options); // 'en-US'代表美国英语格式，可以根据需要更换
    };

    // 千分位字符转换成数字
    const convertToNumber = (str: string) => {
      const stringWithoutCommas = str.replace(/,/g, '');
      // 将处理后的字符串转换回数字
      const originalNumber = parseFloat(stringWithoutCommas);
      return originalNumber;
    };

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const number =
            newVal != null && !Object.is(newVal, '') ? Number(newVal) : null;
          if (!enablethousands.value) {
            currentVal.value = Number.isNaN(number) ? null : number;
          } else {
            currentVal.value = Number.isNaN(number)
              ? null
              : numberconvertToStr(number!, c.precision ? c.precision : 0);
          }
        }
      },
      { immediate: true },
    );

    // 当前格式化文本值
    const currentFormatVal = computed(() => {
      if (!enablethousands.value) {
        if (currentVal.value || currentVal.value === 0) {
          return props.controller.formatValue(currentVal.value);
        }
      } else if (currentVal.value || currentVal.value === 0) {
        return numberconvertToStr(
          Number(currentVal.value!),
          c.precision ? c.precision : 0,
        );
      }
      return '';
    });

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    const handleChange = (e: number | null, eventName: string = 'blur') => {
      if (eventName === c.triggerMode) {
        emit('change', e);
      }
    };

    watch(editorRef, newVal => {
      if (props.autoFocus && newVal) {
        const input = newVal.$el.getElementsByTagName('input')[0];
        input.focus();
      }
    });

    // 聚焦
    const onFocus = (e: IData) => {
      emit('focus', e);
      setEditable(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const debounce = (func: any, wait: number) => {
      let timeout: string | number | NodeJS.Timeout | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const debouncedOnInput = debounce((value: string | number) => {
      let data = null;
      if (typeof value === 'string') {
        data = convertToNumber(value);
      }
      emit('change', data);
    }, 300); // 300毫秒为延迟时间，根据实际情况调整

    // 失焦
    const onBlur = (e: IData) => {
      emit('blur', e);
      if (enablethousands.value) {
        debouncedOnInput(currentVal.value);
      }
      setEditable(false);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    const onInput = (value: string | number) => {
      currentVal.value = value;
    };

    return {
      ns,
      c,
      max,
      min,
      editorRef,
      childClass,
      childStyle,
      currentVal,
      isEditable,
      semanticClass,
      semanticStyle,
      enablethousands,
      currentFormatVal,
      showFormDefaultContent,
      onBlur,
      onFocus,
      onInput,
      handleKeyUp,
      setEditable,
      handleChange,
    };
  },
  render() {
    const { unitName } = this.c.parent;

    let content = null;
    if (this.readonly) {
      // 只读显示
      content = isNilOrEmpty(this.currentVal) ? '' : `${this.currentFormatVal}`;
      // 当有值且单位存在时才显示单位
      if (unitName) {
        if (this.c.emptyHiddenUnit) {
          if (content) {
            content += unitName;
          }
        } else {
          content += unitName;
        }
      }
    } else {
      // 编辑态显示
      content = [
        !this.enablethousands ? (
          <el-input-number
            ref='editorRef'
            class={[this.ns.b('input'), this.semanticClass('editor.content')]}
            style={this.semanticStyle('editor.content')}
            model-value={this.currentVal}
            placeholder={this.c.placeHolder}
            min={this.min}
            max={this.max}
            precision={this.c.precision}
            disabled={this.disabled}
            controls={false}
            onChange={(val: number) => this.handleChange(val, 'blur')}
            onInput={(value: number) => this.handleChange(value, 'input')}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyup={this.handleKeyUp}
            v-child-class={this.childClass}
            v-child-style={this.childStyle}
            {...this.$attrs}
          ></el-input-number>
        ) : (
          <el-input
            ref='editorRef'
            class={[this.ns.b('input'), this.semanticClass('editor.content')]}
            style={this.semanticStyle('editor.content')}
            model-value={this.currentVal}
            onInput={this.onInput}
            placeholder={this.c.placeHolder}
            disabled={this.disabled}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyup={this.handleKeyUp}
            {...this.$attrs}
          ></el-input>
        ),
        unitName && (
          <i
            class={[this.ns.e('unit'), this.semanticClass('editor.unit')]}
            style={this.semanticStyle('editor.unit')}
          >
            {unitName}
          </i>
        ),
      ];
    }

    // 表单默认内容
    const formDefaultContent = () => {
      let unit = '';
      if (unitName) {
        if (this.c.emptyHiddenUnit) {
          if (this.currentFormatVal) {
            unit = unitName;
          }
        } else {
          unit = unitName;
        }
      }
      return (
        <div
          class={[
            this.ns.b('form-default-content'),
            this.semanticClass('editor.content'),
          ]}
          style={this.semanticStyle('editor.content')}
        >
          {this.currentVal || this.currentVal === 0 ? (
            this.currentFormatVal + unit
          ) : (
            <iBizEditorEmptyText
              showPlaceholder={this.c.emptyShowPlaceholder}
              placeHolder={this.c.placeHolder}
            />
          )}
        </div>
      );
    };

    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('editable', this.isEditable),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        style={this.semanticStyle('editor.root')}
      >
        {this.showFormDefaultContent && formDefaultContent()}
        {content}
      </div>
    );
  },
});

import { computed, defineComponent, Ref, ref, watch } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useFocusAndBlur,
  useSemanticNode,
  useAutoFocusBlur,
  getNumberRangeProps,
} from '@ibiz-template/vue3-util';
import { toNumber } from 'lodash-es';
import { NumberRangeEditorController } from '../number-range-editor.controller';
import './ibiz-number-range-picker.scss';

/**
 * 数值范围编辑框
 *
 * @description 使用el-input-number组件封装，用于输入数值范围，如：1~10。支持编辑器类型包含：`数值范围编辑框`
 * @primary
 * @editorparams {name:precision,parameterType:number,description:el-input-number组件的precision属性，设置数值精度}
 * @editorparams {"name":"maxvalue","parameterType":"number","defaultvalue":"Infinity","description":"el-input-number组件的max属性，设置右侧输入框最大输入值"}
 * @editorparams {"name":"minvalue","parameterType":"number","defaultvalue":"-Infinity","description":"el-input-number组件的min属性，设置左侧输入框最小输入值"}
 * @editorparams {"name":"valueseparator","parameterType":"string","defaultvalue":"'-'","description":"值分隔符，是最大值与最小值转为字符串时的分隔符号"}
 * @editorparams {"name":"rangeseparator","parameterType":"string","defaultvalue":"'~'","description":"选择范围时的分隔符，是数值范围组件在呈现时中间位置的分隔符"}
 * @editorparams {"name":"triggermode","parameterType":"'blur' |' input'","defaultvalue":"'blur'","description":"指定编辑器触发 `change` 值变更事件的模式，input: 输入框输入时触发事件，blur：输入框blur时触发事件"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits infoTextChange
 */
export const IBizNumberRangePicker = defineComponent({
  name: 'IBizNumberRangePicker',
  props: getNumberRangeProps<NumberRangeEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('number-range-picker');

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const editorModel = c.model;

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    // 最大值
    let max = Infinity;
    // 最小值
    let min = -Infinity;
    // 数值精度
    let precision = 0;
    // 值分割符
    let valueSeparator = '-';
    // 开始占位提示
    const startPlaceHolder = editorModel.placeHolder
      ? editorModel.placeHolder.split(';')[0] || ''
      : '';
    // 结束占位提示
    const endPlaceHolder = editorModel.placeHolder
      ? editorModel.placeHolder.split(';')[1] || ''
      : '';
    // 选择范围时的分隔符
    let rangeSeparator = '~';
    if (editorModel.editorParams) {
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = toNumber(editorModel.editorParams.minvalue);
      }
      if (editorModel.editorParams.precision) {
        precision = toNumber(editorModel.editorParams.precision);
      }
      if (editorModel.editorParams.valueSeparator) {
        valueSeparator = editorModel.editorParams.valueSeparator;
      }
      if (editorModel.editorParams.valueseparator) {
        valueSeparator = editorModel.editorParams.valueseparator;
      }
      if (editorModel.editorParams.rangeSeparator) {
        rangeSeparator = editorModel.editorParams.rangeSeparator;
      }
      if (editorModel.editorParams.rangeseparator) {
        rangeSeparator = editorModel.editorParams.rangeseparator;
      }
    }

    // 关系表单项集合
    const refFormItem: Ref<string[]> = ref([]);
    const editorItems = editorModel.editorItems;
    if (editorItems && editorItems.length > 0) {
      const editorItemNames: string[] = editorItems.map(
        (item: IData) => item.id,
      );
      refFormItem.value = editorItemNames;
    }

    // 范围最小值
    const minValue = ref<number | null>(null);

    // 范围最大值
    const maxValue = ref<number | null>(null);

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

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal !== oldVal && typeof newVal === 'string') {
          minValue.value = newVal.split(valueSeparator)[0]
            ? Number(newVal.split(valueSeparator)[0])
            : null;
          maxValue.value = newVal.split(valueSeparator)[1]
            ? Number(newVal.split(valueSeparator)[1])
            : null;
        }
      },
      { immediate: true },
    );

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    const onEmit = (
      eventName: string,
      value: number | string,
      valueName?: string,
    ) => {
      if (eventName === c.triggerMode) {
        emit('change', value, valueName);
      }
    };

    // 处理值变化
    const handleChange = (
      value: number,
      index: number,
      eventName: string = 'blur',
    ) => {
      if (index === 0) {
        minValue.value = value;
      } else if (index === 1) {
        maxValue.value = value;
      }
      if (minValue.value !== null && maxValue.value !== null) {
        onEmit(
          eventName,
          [minValue.value, maxValue.value].join(valueSeparator),
        );
        setEditable(false);
        useInValueChange();
      }
      if (refFormItem.value) {
        const valueName = refFormItem.value[index];
        onEmit(eventName, value, valueName);
        useInValueChange();
      }
    };

    // 聚焦失焦事件
    const { componentRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    // 聚焦
    const onFocus = (e: IData) => {
      emit('focus', e);
      setEditable(true);
    };

    // 失焦
    const onBlur = (e: IData) => {
      if (minValue.value !== null && maxValue.value !== null) {
        emit('blur', e);
        setEditable(false);
      }
    };

    // 处理点击键盘
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    // 只读值
    const valueText = computed(() => {
      if (
        typeof minValue.value === 'number' &&
        typeof maxValue.value === 'number'
      ) {
        return `${minValue.value}${rangeSeparator}${maxValue.value}`;
      }
      return null;
    });

    return {
      c,
      ns,
      max,
      min,
      minValue,
      maxValue,
      precision,
      editorRef,
      valueText,
      isEditable,
      refFormItem,
      componentRef,
      semanticClass,
      semanticStyle,
      endPlaceHolder,
      rangeSeparator,
      valueSeparator,
      startPlaceHolder,
      showFormDefaultContent,
      onBlur,
      onFocus,
      handleKeyUp,
      setEditable,
      handleChange,
    };
  },
  render() {
    // 编辑态内容
    const editContent = (
      <div
        class={[this.ns.b('input'), this.semanticClass('editor.content')]}
        style={this.semanticStyle('editor.content')}
      >
        <el-input-number
          ref='editorRef'
          min={this.min}
          class={[this.ns.e('min'), this.semanticClass('editor.min')]}
          style={this.semanticStyle('editor.min')}
          modelValue={this.minValue}
          disabled={this.disabled}
          readonly={this.readonly}
          precision={this.controller.model.precision}
          placeholder={this.startPlaceHolder}
          controls={false}
          onChange={(val: number) => this.handleChange(val, 0)}
          onInput={(val: number) => this.handleChange(val, 0, 'input')}
          onKeyup={this.handleKeyUp}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.$attrs}
        ></el-input-number>
        <div
          class={[
            this.ns.b('separator'),
            this.semanticClass('editor.separator'),
          ]}
          style={this.semanticStyle('editor.separator')}
        >
          {this.rangeSeparator}
        </div>
        <el-input-number
          min={
            typeof this.minValue === 'number' ? this.minValue + 1 : -Infinity
          }
          max={this.max}
          class={[this.ns.e('max'), this.semanticClass('editor.max')]}
          style={this.semanticStyle('editor.max')}
          modelValue={this.maxValue}
          disabled={this.disabled}
          readonly={this.readonly}
          precision={this.controller.model.precision}
          placeholder={this.endPlaceHolder}
          controls={false}
          onChange={(val: number) => this.handleChange(val, 1)}
          onInput={(val: number) => this.handleChange(val, 1, 'input')}
          onKeyup={this.handleKeyUp}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.$attrs}
        ></el-input-number>
      </div>
    );

    // 只读态内容
    const readonlyContent = (
      <div
        class={[
          this.ns.b(),
          this.ns.m('readonly'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
      >
        {this.valueText}
      </div>
    );

    // 表单默认内容
    const formDefaultContent = (
      <div
        class={[
          this.ns.b('form-default-content'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
      >
        {this.valueText ? (
          [
            <div class={this.ns.b('default-min')}>{this.minValue}</div>,
            <div class={this.ns.b('default-separator')}>
              {this.rangeSeparator}
            </div>,
            <div class={this.ns.b('default-max')}>{this.maxValue}</div>,
          ]
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
          this.ns.is('editable', this.isEditable),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        ref='componentRef'
        style={this.semanticStyle('editor.root')}
      >
        {this.showFormDefaultContent && formDefaultContent}
        {this.readonly ? readonlyContent : editContent}
      </div>
    );
  },
});

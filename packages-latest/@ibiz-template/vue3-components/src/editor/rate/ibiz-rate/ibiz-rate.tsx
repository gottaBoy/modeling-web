import { computed, defineComponent, ref, watch } from 'vue';
import {
  getRateProps,
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  useFocusAndBlur,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import { toNumber } from 'lodash-es';
import { RateEditorController } from '../rate-editor.controller';
import './ibiz-rate.scss';

/**
 * 评分器
 *
 * @description 使用el-rate评分组件，让用户进行评分。支持编辑器类型包含：`评分器`
 * @primary
 * @editorparams {name:showtext,parameterType:boolean,defaultvalue:false,description:el-rate组件的show-text属性，是否显示辅助文字，值为 true 时会在右侧显示辅助文字}
 * @editorparams {name:maxvalue,parameterType:number,defaultvalue:5,description:el-rate组件的max属性，设置允许的最大分值}
 * @editorparams {name:texts,parameterType:string[],defaultvalue:[],description:el-rate组件的texts属性，辅助文字数组}
 * @editorparams {"name":"colors","parameterType":"string[]","defaultvalue":"[]","description":"设置评分不同阶段展示的颜色，传入数组，共有 3 个元素，为 3 个分段所对应的颜色。示例配置：[\"#99A9BF\",\"#F7BA2A\",\"#FF9900\"]"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizRate = defineComponent({
  name: 'IBizRate',
  props: getRateProps<RateEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('rate');
    // 当前值
    const currentVal = ref<number>();

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const editorModel = c.model;

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.rate'),
        selector: '.el-rate__item',
      },
      {
        class: semanticClass('editor.label'),
        selector: '.el-rate__text',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.rate'),
        selector: '.el-rate__item',
      },
      {
        style: semanticStyle('editor.label'),
        selector: '.el-rate__text',
      },
    ];

    // icon 的颜色
    let colors: IData[] = [];
    // 是否显示辅助文字
    let showText = false;
    // 设置允许的最大值
    let max = 5;
    //  辅助文字数组
    let texts: IData[] = [];
    if (editorModel.editorParams) {
      if (editorModel.editorParams.colors) {
        colors = c.toObj(editorModel.editorParams.colors) as IData[];
      }
      if (editorModel.editorParams.showText) {
        showText = c.toBoolean(editorModel.editorParams.showText);
      }
      if (editorModel.editorParams.showtext) {
        showText = c.toBoolean(editorModel.editorParams.showtext);
      }
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.texts) {
        texts = c.toObj(editorModel.editorParams.texts) as IData[];
      }
    }

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
        if (newVal !== oldVal) {
          if (!newVal) {
            currentVal.value = 0;
          } else {
            currentVal.value = newVal as number;
          }
        }
      },
      { immediate: true },
    );

    const handleChange = (currentValue: number | undefined): void => {
      emit('change', currentValue);
      useInValueChange();
    };

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      ns,
      max,
      texts,
      colors,
      showText,
      editorRef,
      childClass,
      childStyle,
      currentVal,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      handleChange,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        ref='editorRef'
        style={this.semanticStyle('editor.root')}
      >
        <el-rate
          class={[this.ns.e('content'), this.semanticClass('editor.content')]}
          style={this.semanticStyle('editor.content')}
          v-model={this.currentVal}
          disabled={this.disabled || this.readonly}
          max={this.max}
          colors={this.colors}
          showText={this.showText}
          texts={this.texts}
          v-child-class={this.childClass}
          v-child-style={this.childStyle}
          onChange={this.handleChange}
          {...this.$attrs}
        ></el-rate>
      </div>
    );
  },
});

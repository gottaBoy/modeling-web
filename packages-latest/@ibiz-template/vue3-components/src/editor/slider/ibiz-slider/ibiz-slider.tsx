/* eslint-disable no-use-before-define */
import {
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  defineComponent,
  onBeforeUnmount,
  normalizeStyle,
} from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getSliderProps,
  useFocusAndBlur,
  useSemanticNode,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import { toNumber } from 'lodash-es';
import { SliderEditorController } from '../slider-editor.controller';
import './ibiz-slider.scss';

/**
 * 进度条
 *
 * @description 使用el-slider或el-progress组件，用于展示操作进度，告知用户当前状态和预期，并且直线进度条是可编辑的。支持编辑器类型包含：`滑动输入条`
 * @primary
 * @editorparams {name:type,parameterType:'line' | 'circle' | 'pie',defaultvalue:'line',description:'line' 绘制直线进度条、'circle' 绘制环形进度条、'pie' 绘制饼图进度条}
 * @editorparams {name:stepvalue,parameterType:number,defaultvalue:1,description:当 `type` 为 'line' 时，设置进度条改变的步长，el-slider组件的step属性}
 * @editorparams {name:maxvalue,parameterType:number,defaultvalue:100,description:当 `type` 为 'line' 时，设置进度条允许的最大值，el-slider组件的max属性}
 * @editorparams {name:minvalue,parameterType:number,defaultvalue:0,description:当 `type` 为 'line' 时，设置进度条允许的最小值，el-slider组件的min属性}
 * @editorparams {name:showstops,parameterType:boolean,defaultvalue:false,description:当 `type` 为 'line' 时，是否显示间断点，el-slider组件的show-stops属性}
 * @editorparams {name:range,parameterType:boolean,defaultvalue:false,description:当 `type` 为 'line' 时，是否开启选择范围，el-slider组件的range属性}
 * @editorparams {name:showinput,parameterType:boolean,defaultvalue:false,description:当 `type` 为 'line' 时，是否显示输入框，仅在非范围选择时有效，el-slider组件的show-input属性}
 * @editorparams {name:showtext,parameterType:boolean,defaultvalue:false,description:当 `type` 为 'line' 或 'circle' 时，是否显示文本}
 * @editorparams {name:format,parameterType:string,defaultvalue:'0%',description:当 `type` 为 'line' 或 'circle' 时，设置显示文本的格式}
 * @editorparams {name:textitem,parameterType:string,description:当 `type` 为 'line' 或 'circle' 时，设置显示文本属性。设置后，环形进度条的显示文本将优先获取主数据内对应属性的数据进行展示}
 * @editorparams {name:piebg,parameterType:string,description:当 `type` 为 'pie' 时，设置饼图进度条背景色，可配置十六进制颜色、rgb颜色}
 * @editorparams {name:piepercentbg,parameterType:string,description:当 `type` 为 'pie' 时，设置饼图进度条占比背景色，可配置十六进制颜色、rgb颜色}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizSlider = defineComponent({
  name: 'IBizSlider',
  props: getSliderProps<SliderEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('slider');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const editorModel = c.model;
    const { valueFormat } = c.parent;

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );
    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.track'),
        selector: '.el-slider__bar',
      },
      {
        class: semanticClass('editor.rail'),
        selector: '.el-slider__runway',
      },
      {
        class: semanticClass('editor.handle'),
        selector: '.el-slider__button',
      },
      {
        class: semanticClass('editor.stop'),
        selector: '.el-slider__stop',
      },
      {
        class: semanticClass('editor.input'),
        selector: '.el-input__inner',
      },
      {
        class: semanticClass('editor.decrease'),
        selector: '.el-input-number__decrease',
      },
      {
        class: semanticClass('editor.increase'),
        selector: '.el-input-number__increase',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.track'),
        selector: '.el-slider__bar',
      },
      {
        style: semanticStyle('editor.rail'),
        selector: '.el-slider__runway',
      },
      {
        style: semanticStyle('editor.handle'),
        selector: '.el-slider__button',
      },
      {
        style: semanticStyle('editor.stop'),
        selector: '.el-slider__stop',
      },
      {
        style: semanticStyle('editor.input'),
        selector: '.el-input__inner',
      },
      {
        style: semanticStyle('editor.decrease'),
        selector: '.el-input-number__decrease',
      },
      {
        style: semanticStyle('editor.increase'),
        selector: '.el-input-number__increase',
      },
    ];
    // 饼图样式
    const pieStyle = ref<string>('');
    // 饼图宽高
    const pieSize = ref<number>(0);
    // 步长
    let step = 1;
    // 设置滑动输入条允许的最大值
    let max = 100;
    // 设置滑动输入条允许的最小值
    let min = 0;
    //  是否显示间断点
    let showStops = false;
    // 是否开启选择范围
    let range = false;
    // 是否显示输入框，仅在非范围选择时有效
    let showInput = false;
    // 是否显示百分比
    let showText = false;
    // 格式化
    let format = valueFormat || '0%';
    // 进度条类型
    let type = 'line';
    // 文本显示属性
    let textItem = '';
    // 饼图背景色
    let pieBg = '';
    // 饼图占比背景色
    let piePercentBg = '';
    if (editorModel.editorParams) {
      if (editorModel.editorParams.stepvalue) {
        step = toNumber(editorModel.editorParams.stepvalue);
      }
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = toNumber(editorModel.editorParams.minvalue);
      }
      if (editorModel.editorParams.showstops) {
        showStops = c.toBoolean(editorModel.editorParams.showstops);
      }
      if (editorModel.editorParams.range) {
        range = c.toBoolean(editorModel.editorParams.range);
      }
      if (editorModel.editorParams.showinput) {
        showInput = c.toBoolean(editorModel.editorParams.showinput);
      }
      if (editorModel.editorParams.showText) {
        showText = c.toBoolean(editorModel.editorParams.showText);
      }
      if (editorModel.editorParams.showtext) {
        showText = c.toBoolean(editorModel.editorParams.showtext);
      }
      if (editorModel.editorParams.format) {
        format = editorModel.editorParams.format;
      }
      if (editorModel.editorParams.type) {
        type = editorModel.editorParams.type;
      }
      if (editorModel.editorParams.textItem) {
        textItem = editorModel.editorParams.textItem;
      }
      if (editorModel.editorParams.textitem) {
        textItem = editorModel.editorParams.textitem;
      }
      if (editorModel.editorParams.pieBg) {
        pieBg = editorModel.editorParams.pieBg;
      }
      if (editorModel.editorParams.piebg) {
        pieBg = editorModel.editorParams.piebg;
      }
      if (editorModel.editorParams.piePercentBg) {
        piePercentBg = editorModel.editorParams.piePercentBg;
      }
      if (editorModel.editorParams.piepercentbg) {
        piePercentBg = editorModel.editorParams.piepercentbg;
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

    // 处理线型进度条数据
    const handleLineVal = (val: string | number) => {
      // 如果是范围解析JSON成数组
      // eslint-disable-next-line no-lonely-if
      if (range) {
        return JSON.parse(val as string);
      }
      return Number(val) as number;
    };

    // 处理圆形进度条数据
    const handleCircleVal = (val: string | number) => {
      return Number(val) * 100;
    };

    // 处理当前值
    const handleCurVal = (val: string | number) => {
      switch (type) {
        case 'line':
          return handleLineVal(val);
        case 'circle':
          return handleCircleVal(val);
        case 'pie':
          return handleCircleVal(val);
        default:
          return val;
      }
    };

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    // 计算饼图宽高，直径取容器宽度高度最小值
    const caclPieWidth = () => {
      if (editorRef.value) {
        pieSize.value = Math.min(
          editorRef.value.clientHeight,
          editorRef.value.clientWidth,
        );
      }
    };

    // 计算饼图行内样式
    const caclPieStyle = () => {
      caclPieWidth();
      pieStyle.value = '';
      if (pieSize.value > 0) {
        pieStyle.value = `height:${pieSize.value}px;width:${pieSize.value}px;min-width:unset;min-height:unset;`;
      }
      if (pieBg) {
        pieStyle.value += `${ns.cssVarName('editor-slider-pie-bg')}:${pieBg};`;
      }
      if (piePercentBg) {
        pieStyle.value += `${ns.cssVarName(
          'editor-slider-pie-percent-bg',
        )}:${piePercentBg};`;
      }
      pieStyle.value += `animation-delay:-${currentVal.value}s;`;
    };

    // 当前值
    const currentVal = ref<number | Array<number>>();
    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (newVal === null || newVal === undefined) {
            // 如果是范围给数组
            if (range) {
              currentVal.value = [0, 1];
            } else {
              currentVal.value = 0;
            }
            if (type === 'pie') {
              caclPieStyle();
            }
          } else {
            currentVal.value = handleCurVal(newVal);
            if (type === 'pie') {
              caclPieStyle();
            }
          }
        }
      },
      { immediate: true },
    );

    const calcSize = () => {
      caclPieStyle();
    };

    onMounted(() => {
      if (type === 'pie') {
        // 监听窗口变化
        window.addEventListener('resize', calcSize);
        nextTick(() => {
          caclPieStyle();
        });
      }
    });

    onBeforeUnmount(() => {
      if (type === 'pie') {
        // 销毁 取消监听窗口变化
        window.removeEventListener('resize', calcSize);
      }
    });

    // 计算文本显示值
    const textVal = computed(() => {
      if (textItem) {
        const data = props.data || {};
        return ibiz.util.text.format(
          `${data[textItem] != null ? data[textItem] : ''}`,
          format,
        );
      }
      const tempCurVal = Number(currentVal.value);
      const value = Number(tempCurVal / max);
      const formatValue = ibiz.util.text.format(
        `${value != null ? value : ''}`,
        format,
      );
      return formatValue;
    });

    const handleChange = (currentValue: number | undefined | Array<number>) => {
      if (Array.isArray(currentValue)) {
        emit('change', JSON.stringify(currentValue));
      } else {
        emit('change', currentValue);
      }
      useInValueChange();
    };

    return {
      ns,
      max,
      min,
      type,
      step,
      range,
      textVal,
      textItem,
      showText,
      pieStyle,
      showStops,
      showInput,
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
    let content;
    if (this.type === 'line') {
      content = [
        <el-slider
          class={[this.ns.e('content'), this.semanticClass('editor.content')]}
          style={this.semanticStyle('editor.content')}
          v-model={this.currentVal}
          disabled={this.disabled || this.readonly}
          step={this.step}
          max={this.max}
          min={this.min}
          showStops={this.showStops}
          range={this.range}
          showInput={this.showInput}
          onChange={this.handleChange}
          v-child-class={this.childClass}
          v-child-style={this.childStyle}
          {...this.$attrs}
        ></el-slider>,
        this.showText ? (
          <span
            class={[
              this.ns.e('text'),
              this.ns.em('text', 'val'),
              this.semanticClass('editor.label'),
            ]}
            style={this.semanticStyle('editor.label')}
          >
            {this.textVal}
          </span>
        ) : null,
      ];
    }

    if (this.type === 'circle') {
      content = (
        <el-progress
          class={[this.ns.e('content'), this.semanticClass('editor.content')]}
          style={this.semanticStyle('editor.content')}
          type={this.type}
          percentage={this.currentVal}
          {...this.$attrs}
        >
          {{
            default: (item: IData) => {
              if (!this.showText) return '';
              let text = item.percentage;
              if (this.textItem) {
                text = this.textVal;
              }
              return (
                <span
                  class={[
                    this.ns.em('circle', 'text'),
                    this.ns.e('text'),
                    this.semanticClass('editor.label'),
                  ]}
                  style={this.semanticStyle('editor.label')}
                >
                  {text}
                </span>
              );
            },
          }}
        </el-progress>
      );
    }

    if (this.type === 'pie') {
      content = (
        <div
          class={[
            this.semanticClass('editor.content'),
            this.ns.e('pie-content'),
            this.ns.is(
              'hundred-percent',
              (this.currentVal as number) >= this.max,
            ),
          ]}
          style={normalizeStyle([this.pieStyle, this.semanticStyle('editor.content')])}
        ></div>
      );
    }

    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.readonly ? this.ns.m('readonly') : '',
          this.showText ? this.ns.e('text') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
          this.ns.e(this.type),
        ]}
        ref='editorRef'
        style={this.semanticStyle('editor.root')}
      >
        {content}
      </div>
    );
  },
});

import {
  computed,
  defineComponent,
  Ref,
  ref,
  watch,
  normalizeStyle,
} from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  getColorPickerProps,
} from '@ibiz-template/vue3-util';
import { ColorPickerEditorController } from '../color-picker-editor.controller';
import { IBizColorMPickerCustom } from '../ibiz-color-mpicker-custom/ibiz-color-mpicker-custom';
import { IBizColorMPickerDefault } from '../ibiz-color-mpicker-default/ibiz-color-mpicker-default';
import './ibiz-color-picker.scss';

/**
 * 颜色选择器
 *
 * @description 用于颜色选择，支持单选和多选模式，根据需求选择一个或多个颜色。支持编辑器类型包含：`颜色选择器`
 * @primary
 * @editorparams {"name":"defaultval","parameterType":"string[]","defaultvalue":[],"description": "表示在颜色选择器初始化时默认呈现的颜色数组。当编辑器的自定义模式 `custom` 值为 true 时，该参数生效，会按照此数组显示默认颜色"}
 * @editorparams {"name":"multiple","parameterType":"boolean","defaultvalue":false,"description": "该参数用于控制颜色选择器是否支持多选功能。默认情况下为单选模式，当该值设置为 true 时，启用多选模式，用户可以选择多个颜色"}
 * @editorparams {"name":"custom","parameterType":"boolean","defaultvalue":false,"description": "该参数决定颜色选择器是否处于自定义模式。默认不启用自定义模式，当值为 true 时，启用自定义模式，此时可以按照自定义的方式进行颜色选择和设置，例如自定义颜色列表等相关操作"}
 * @editorparams {"name":"type","parameterType":"'ITEM' | 'ITEMS'","defaultvalue":"'ITEMS'","description": "用于设置下拉选择的颜色数组的显示类型。当值为 'ITEM' 时，表示下拉选择的颜色数组仅有一个颜色；当值为 'ITEMS' 时，表示下拉选择的颜色数组包含多个颜色"}
 * @editorparams {"name":"ishiddentext","parameterType":"boolean","defaultvalue":false,"description": "用于控制是否隐藏颜色选择器中的颜色文本。默认情况下不隐藏颜色文本，当该值设置为 true 时，会隐藏颜色文本，仅展示颜色选择相关的组件"}
 * @editorparams {"name":"customcolorlist","parameterType":"{text:string;value:string[]}[]","description": "该参数用于设置自定义的颜色列表，其格式是一个对象形式的JSON数组。配置示例：`customcolorlist=[{'text':'颜色名字','value':['#123123','#111222','#333322','#11ff33']}]`，通过此配置可以自定义颜色选择器中显示的颜色选项"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits enter | infoTextChange
 */
export const IBizColorPicker = defineComponent({
  name: 'IBizColorPicker',
  props: getColorPickerProps<ColorPickerEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('color-picker');

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const currentVal = ref<string | string[] | null>('');

    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.item'),
        selector: `.${ns.b('content')}`,
      },
      {
        class: semanticClass('editor.item.color'),
        selector: `.el-color-picker__color`,
      },
      {
        class: semanticClass('editor.item.label'),
        selector: `.${ns.b('text')}`,
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.item'),
        selector: `.${ns.b('content')}`,
      },
      {
        style: semanticStyle('editor.item.color'),
        selector: `.el-color-picker__color`,
      },
      {
        style: semanticStyle('editor.item.label'),
        selector: `.${ns.b('text')}`,
      },
    ];

    const colorPicker: Ref<null | IData> = ref(null);

    // 是否多选
    const multiple =
      c.editorParams?.MULTIPLE === 'true' ||
      c.editorParams?.multiple === 'true';

    // 是否自定义模式
    const isCustom =
      c.editorParams?.CUSTOM === 'true' || c.editorParams?.custom === 'true';

    // 设置下拉选择的颜色数组是否仅有一个，TYPE值为ITEM | ITEMS
    const type = c.editorParams?.TYPE || c.editorParams?.type;

    // 自定义颜色列表值,这个值格式是一个字符串json数组，
    /**
     *  配置示例：
     *    CUSTOMCOLORLIST = [{"text":"颜色名字","value":["#123123","#111222","#333322","#11ff33"]}]
     */
    const customColorList =
      c.editorParams?.CUSTOMCOLORLIST || c.editorParams?.customcolorlist || '';

    const predefineColors = ref([
      '#000000',
      '#2C2C2C',
      '#50555C',
      '#ACB3BF',
      '#D0D3D9',
      '#C4C4C4',
      '#DADADA',
      '#E5E5E5',
      '#F0F0F0',
      '#F24E1E',
      '#E99C58',
      '#FFC700',
      '#FF4D00',
      '#FF00D6',
      '#D82E57',
      '#8E1DE8',
      '#0ACF83',
      '#18A0FB',
      '#A259FF',
      '#907CFF',
    ]);

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
          if (multiple) {
            if (!newVal) {
              if (isCustom) {
                currentVal.value = [];
              } else {
                currentVal.value = '';
              }
            } else {
              currentVal.value = newVal;
            }
          } else if (!newVal) {
            currentVal.value = '';
          } else {
            currentVal.value = newVal;
          }
        }
      },
      { immediate: true },
    );

    // 值改变抛值
    const handleChange = (e: string | null) => {
      emit('change', e);
    };

    const showPicker = (_e: Event) => {
      // element-plus源码里有100延时，必须在之后打开
      setTimeout(() => {
        if (colorPicker.value) {
          colorPicker.value.show();
        }
      }, 200);
    };

    const contentStyle = computed(() => {
      if (c.style) {
        return c.style;
      }
      return null;
    });

    // 聚焦
    const onFocus = (e: IData) => {
      emit('focus', e);
    };

    // 失焦
    const onBlur = (e: IData) => {
      emit('blur', e);
    };

    const onChange = (value: string | string[]) => {
      emit('change', value);
    };

    return {
      c,
      ns,
      type,
      multiple,
      isCustom,
      childClass,
      childStyle,
      currentVal,
      colorPicker,
      contentStyle,
      semanticClass,
      semanticStyle,
      predefineColors,
      customColorList,
      showFormDefaultContent,
      onBlur,
      onFocus,
      onChange,
      showPicker,
      handleChange,
    };
  },
  render() {
    if (this.multiple) {
      if (this.isCustom) {
        return (
          <IBizColorMPickerCustom
            value={(this.currentVal as string[]) || []}
            onChange={this.onChange}
            readonly={this.readonly}
            disabled={this.disabled}
            semanticStyle={this.semanticStyle}
            semanticClass={this.semanticClass}
            defaultVal={this.controller.defaultVal}
          ></IBizColorMPickerCustom>
        );
      }
      return (
        <IBizColorMPickerDefault
          value={this.currentVal || ''}
          type={this.type}
          customColorList={this.customColorList}
          readonly={this.readonly}
          disabled={this.disabled}
          onChange={this.onChange}
          semanticStyle={this.semanticStyle}
          semanticClass={this.semanticClass}
        ></IBizColorMPickerDefault>
      );
    }

    let content = null;
    if (this.readonly) {
      // 只读显示
      content = `${this.currentVal?.toString()}`;
    } else {
      // 编辑态显示
      content = (
        <span
          style={normalizeStyle(this.contentStyle)}
          onClick={this.showPicker}
          class={this.ns.b('content')}
        >
          <el-color-picker
            ref='colorPicker'
            v-model={this.currentVal}
            disabled={this.disabled}
            onChange={this.handleChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            size='small'
            popper-class={[
              this.ns.b('popup'),
              this.semanticClass('editor.popup'),
            ]}
            popper-style={this.semanticStyle('editor.popup')}
            predefine={this.predefineColors}
            show-alpha
            {...this.$attrs}
          ></el-color-picker>
          {this.c.editorParams?.isHiddenText === 'true' ||
          this.c.editorParams?.ishiddentext === 'true' ? null : (
            <span class={this.ns.b('text')}>{this.currentVal}</span>
          )}
        </span>
      );
    }

    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        style={{
          color: (this.currentVal as string) || '',
          ...this.semanticStyle('editor.root'),
        }}
        v-child-class={this.childClass}
        v-child-style={this.childStyle}
      >
        {content}
      </div>
    );
  },
});

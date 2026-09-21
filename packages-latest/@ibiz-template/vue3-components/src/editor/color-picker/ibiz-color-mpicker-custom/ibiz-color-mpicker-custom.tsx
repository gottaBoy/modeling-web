/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  useNamespace,
  UseSemanticClassReturn,
  UseSemanticStyleReturn,
} from '@ibiz-template/vue3-util';
import { PropType, defineComponent, ref, watch } from 'vue';
import './ibiz-color-mpicker-custom.scss';

export const IBizColorMPickerCustom = defineComponent({
  name: 'IBizColorMPickerCustom',
  props: {
    value: {
      type: Array<string>,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    defaultVal: {
      type: Array<string>,
      default: () => [],
    },
    semanticClass: {
      type: Function as PropType<UseSemanticClassReturn>,
    },
    semanticStyle: {
      type: Function as PropType<UseSemanticStyleReturn>,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace('color-mpicker-custom');
    // 子类类名透传
    const childClass = [
      {
        class: props.semanticClass?.('editor.content'),
        selector: `.${ns.e('content')}`,
      },
      {
        class: props.semanticClass?.('editor.tabs'),
        selector: `.${ns.e('tabs')}`,
      },
      {
        class: props.semanticClass?.('editor.tabs.tab'),
        selector: `.${ns.em('tabs', 'tab')}`,
      },
      {
        class: props.semanticClass?.('editor.add'),
        selector: `.${ns.em('color-list', 'add')}`,
      },
      {
        class: props.semanticClass?.('editor.textarea'),
        selector: `.${ns.e('textarea')}`,
      },
      {
        class: props.semanticClass?.('editor.item'),
        selector: `.${ns.em('color-list', 'item')}`,
      },
      {
        class: props.semanticClass?.('editor.item.color'),
        selector: `.el-color-picker__color`,
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: props.semanticStyle?.('editor.content'),
        selector: `.${ns.e('content')}`,
      },
      {
        style: props.semanticStyle?.('editor.tabs'),
        selector: `.${ns.e('tabs')}`,
      },
      {
        style: props.semanticStyle?.('editor.tabs.tab'),
        selector: `.${ns.em('tabs', 'tab')}`,
      },
      {
        style: props.semanticStyle?.('editor.add'),
        selector: `.${ns.em('color-list', 'add')}`,
      },
      {
        style: props.semanticStyle?.('editor.textarea'),
        selector: `.${ns.e('textarea')}`,
      },
      {
        style: props.semanticStyle?.('editor.item'),
        selector: `.${ns.em('color-list', 'item')}`,
      },
      {
        style: props.semanticStyle?.('editor.item.color'),
        selector: `.el-color-picker__color`,
      },
    ];
    // 选择类型
    const tabs: IData[] = [
      {
        text: ibiz.i18n.t('editor.colorPicker.selector'),
        value: 'select',
      },
      {
        text: ibiz.i18n.t('editor.colorPicker.textValue'),
        value: 'write',
      },
    ];

    // 默认提供待选颜色
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

    // 颜色列表
    const items = ref<string[]>([]);

    // 当前选中类型--选择器，文本值
    const curSelect = ref('select');

    // 文本框的值
    const colorStr = ref('');

    // 颜色选择
    const onColorChange = (index: number, value: string) => {
      items.value[index] = value;
      emit('change', [...items.value]);
    };

    // 切换类型
    const onSelect = (value: string) => {
      curSelect.value = value;
      if (value === 'select') {
        // 切换到选择器
        const list = colorStr.value.split(',');
        items.value = list.filter((item: string) => {
          return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(item);
        });
      } else {
        // 切换到文本值
        colorStr.value = items.value.toString();
      }
    };

    // 新增颜色项
    const onAdd = () => {
      if (props.readonly || props.disabled) {
        return;
      }
      items.value.push('#FFFFFF');
      emit('change', [...items.value]);
    };

    const onRemove = (index: number) => {
      items.value.splice(index, 1);
      if (items.value.length) {
        emit('change', [...items.value]);
      } else {
        emit('change', null);
      }
    };

    // 文本域失去焦点
    const onBlur = () => {
      if (curSelect.value === 'select') {
        emit('change', items.value);
      } else {
        const list = colorStr.value.split(',');
        items.value = list.filter((item: string) => {
          return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(item);
        });
        emit('change', items.value);
      }
    };

    // 绘制颜色选择列表
    const renderColorList = () => {
      return items.value.map((item: string, index: number) => {
        return (
          <div class={ns.em('color-list', 'item')}>
            <el-color-picker
              v-model={item}
              disabled={props.disabled || props.readonly}
              predefine={predefineColors.value}
              onChange={(value: string) => onColorChange(index, value)}
            />
            <ion-icon
              name='close-circle-outline'
              onClick={() => onRemove(index)}
            ></ion-icon>
          </div>
        );
      });
    };

    // 监听值变化
    watch(
      () => props.value,
      () => {
        if (!props.value || props.value.length === 0) {
          colorStr.value = '';
          items.value = props.defaultVal || [];
        } else {
          items.value = props.value;
          colorStr.value = items.value.toString();
        }
      },
      { immediate: true, deep: true },
    );

    return {
      ns,
      tabs,
      colorStr,
      curSelect,
      childClass,
      childStyle,
      onAdd,
      onBlur,
      onSelect,
      renderColorList,
    };
  },
  render() {
    return (
      <div
        style={this.semanticStyle?.('editor.root')}
        class={[this.ns.b(), this.semanticClass?.('editor.root')]}
        v-child-class={this.childClass}
        v-child-style={this.childStyle}
      >
        <div class={this.ns.e('tabs')}>
          <div
            class={[
              this.ns.e('anchor'),
              this.ns.is('select-text', this.curSelect === 'write'),
            ]}
          >
            {this.tabs.map((tab: IData) => {
              return (
                <div
                  class={[
                    this.ns.em('tabs', 'tab'),

                    this.ns.is('selected', tab.value === this.curSelect),
                  ]}
                  onClick={() => this.onSelect(tab.value)}
                >
                  {tab.text}
                </div>
              );
            })}
          </div>
        </div>
        <div class={this.ns.e('content')}>
          {this.curSelect === 'select' ? (
            <div class={this.ns.e('color-list')}>
              {this.renderColorList()}
              <div
                class={[
                  this.ns.em('color-list', 'add'),

                  this.ns.is('disabled', this.disabled || this.readonly),
                ]}
                onClick={this.onAdd}
                title={ibiz.i18n.t('editor.colorPicker.add')}
              >
                <ion-icon name='add-outline'></ion-icon>
              </div>
            </div>
          ) : (
            <el-input
              type='textarea'
              class={this.ns.e('textarea')}
              v-model={this.colorStr}
              disabled={this.disabled}
              readonly={this.readonly}
              onBlur={this.onBlur}
            ></el-input>
          )}
        </div>
      </div>
    );
  },
});

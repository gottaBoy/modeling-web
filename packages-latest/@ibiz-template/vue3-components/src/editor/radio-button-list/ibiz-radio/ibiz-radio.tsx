/* eslint-disable no-nested-ternary */
import { computed, defineComponent, ref, watch, normalizeStyle } from 'vue';
import {
  useNamespace,
  getRadioProps,
  getEditorEmits,
  useSemanticNode,
  useFocusAndBlur,
  useAutoFocusBlur,
  useCodeListListen,
} from '@ibiz-template/vue3-util';
import { notNilEmpty } from 'qx-util';
import { CodeListItem } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import { RadioButtonListEditorController } from '../radio-button-list.controller';
import './ibiz-radio.scss';

/**
 * 单选框列表
 *
 * @description 使用el-radio-group组件，在一组备选项中进行单选。支持编辑器类型包含：`单选项列表`
 * @primary
 * @editorparams {name:rownumber,parameterType:number,description:设置每行呈现的单选框个数}
 * @editorparams {name:rendermode,parameterType:'radio' | 'button' | 'tab',defaultvalue:'radio',description:默认绘制单选框列表，当值为 'button' 时绘制按钮列表，当值为 'tab' 时绘制分页列表}
 * @editorparams {name:isbtnroundcorner,parameterType:boolean,defaultvalue:false,description:设置按钮是否显示圆角}
 * @editorparams {name:itemwidth,parameterType:number,description:设置单选框列表的项宽度}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @editorparams {name:autoselectfirstoption,parameterType:boolean,defaultvalue:false,description:编辑器无值时，自动选中第一个数据}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter
 */
export const IBizRadio = defineComponent({
  name: 'IBizRadio',
  props: getRadioProps<RadioButtonListEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('radio');

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const editorModel = c.model;
    /**
     * @description 获取项子类类名透传
     * @param {IParams} params
     * @returns {*}
     */
    const getItemChildClass = (params: IParams) => {
      return [
        {
          class: semanticClass('editor.item.input', params),
          selector: '.el-radio__input',
        },
        {
          class: semanticClass('editor.item.icon', params),
          selector: `.${ns.em('item', 'icon')}`,
        },
        {
          class: semanticClass('editor.item.label', params),
          selector: `.${ns.em('item', 'label')}`,
        },
      ];
    };

    /**
     * @description 获取项子类样式透传
     * @param {IParams} params
     * @returns {*}
     */
    const getItemChildStyle = (params: IParams) => {
      return [
        {
          style: semanticStyle('editor.item.input', params),
          selector: '.el-radio__input',
        },
        {
          style: semanticStyle('editor.item.icon', params),
          selector: `.${ns.em('item', 'icon')}`,
        },
        {
          style: semanticStyle('editor.item.label', params),
          selector: `.${ns.em('item', 'label')}`,
        },
      ];
    };

    // 绘制模式
    let renderMode = 'radio';
    // 按钮圆角显示
    let isBtnRoundCorner = false;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.renderMode) {
        renderMode = editorModel.editorParams.renderMode;
      }
      if (editorModel.editorParams.rendermode) {
        renderMode = editorModel.editorParams.rendermode;
      }
      if (editorModel.editorParams.isBtnRoundCorner) {
        isBtnRoundCorner = c.toBoolean(
          editorModel.editorParams.isBtnRoundCorner,
        );
      }
      if (editorModel.editorParams.isbtnroundcorner) {
        isBtnRoundCorner = c.toBoolean(
          editorModel.editorParams.isbtnroundcorner,
        );
      }
    }

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    const onSelectValueChange = (value: string | number) => {
      emit('change', value);
      useInValueChange();
    };

    // 代码表
    const items = ref<readonly IData[]>([]);

    /**
     * @description 自动选择第一条数据
     * @returns {*}  {void}
     */
    const autoSelectFirstOption = (): void => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item) return;
      emit('change', item.value, undefined, true);
    };

    watch(
      () => props.data,
      newVal => {
        c.loadCodeList(newVal).then(_codeList => {
          items.value = _codeList;
          autoSelectFirstOption();
        });
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const fn = (data: CodeListItem[] | undefined) => {
      if (data) items.value = data;
    };

    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);

    const valueText = computed(() => {
      // eslint-disable-next-line eqeqeq
      return items.value.find(item => item.value == props.value)?.text || '';
    });

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
      valueText,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('infoTextChange', newVal);
        }
      },
      { immediate: true },
    );

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      ns,
      items,
      valueText,
      editorRef,
      renderMode,
      editorModel,
      semanticClass,
      semanticStyle,
      isBtnRoundCorner,
      showFormDefaultContent,
      getItemChildClass,
      getItemChildStyle,
      onSelectValueChange,
    };
  },
  render() {
    const itemWidth = this.controller.editorParams?.itemwidth;
    const width = itemWidth ? `${itemWidth}px` : '';
    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
          this.ns.is('grid-layout', !!this.controller.rowNumber),
        ]}
        style={normalizeStyle([
          this.controller.rowNumber
            ? `${this.ns.cssVarBlockName('row-number')}:${
                this.controller.rowNumber
              }`
            : '',
          this.semanticStyle('editor.root'),
        ])}
        ref='editorRef'
      >
        {this.readonly ? (
          this.valueText
        ) : this.renderMode !== 'tab' ? (
          <el-radio-group
            class={[
              this.ns.e('group'),
              this.ns.e('content'),
              this.semanticClass('editor.content'),
            ]}
            style={this.semanticStyle('editor.content')}
            model-value={notNilEmpty(this.value) ? String(this.value) : ''}
            onChange={this.onSelectValueChange}
            {...this.$attrs}
          >
            {this.items.map((_item, index: number) => {
              if (this.renderMode === 'radio')
                return (
                  <el-radio
                    key={index}
                    class={[
                      this.ns.e('item'),
                      this.semanticClass('editor.item', { item: _item, index }),
                    ]}
                    style={{
                      width,
                      ...this.semanticStyle('editor.item', {
                        item: _item,
                        index,
                      }),
                    }}
                    v-child-class={this.getItemChildClass({
                      item: _item,
                      index,
                    })}
                    v-child-style={this.getItemChildStyle({
                      item: _item,
                      index,
                    })}
                    title={showTitle(_item.text)}
                    label={notNilEmpty(_item.value) ? String(_item.value) : ''}
                    disabled={this.disabled || _item.disableSelect === true}
                  >
                    {_item.sysImage && (
                      <iBizIcon
                        class={this.ns.em('item', 'icon')}
                        icon={_item.sysImage}
                      ></iBizIcon>
                    )}
                    <span
                      class={[this.ns.e('text'), this.ns.em('item', 'label')]}
                    >
                      {_item.text}
                    </span>
                  </el-radio>
                );
              return (
                <el-radio-button
                  key={index}
                  class={[
                    this.ns.e('item'),
                    this.ns.e('button'),
                    this.isBtnRoundCorner
                      ? this.ns.em('button', 'round-corner')
                      : '',
                    this.semanticClass('editor.item', { item: _item, index }),
                  ]}
                  style={{
                    width,
                    ...this.semanticStyle('editor.item', {
                      item: _item,
                      index,
                    }),
                  }}
                  v-child-class={this.getItemChildClass({
                    item: _item,
                    index,
                  })}
                  v-child-style={this.getItemChildStyle({
                    item: _item,
                    index,
                  })}
                  title={showTitle(_item.text)}
                  label={notNilEmpty(_item.value) ? String(_item.value) : ''}
                  disabled={this.disabled || _item.disableSelect === true}
                >
                  {_item.sysImage && (
                    <iBizIcon
                      class={this.ns.em('item', 'icon')}
                      icon={_item.sysImage}
                    ></iBizIcon>
                  )}
                  <span
                    class={[
                      this.ns.em('button', 'text'),
                      this.ns.em('item', 'label'),
                    ]}
                  >
                    {_item.text}
                  </span>
                </el-radio-button>
              );
            })}
          </el-radio-group>
        ) : (
          <div
            class={[
              this.ns.b('tab'),
              this.ns.e('content'),
              this.semanticClass('editor.content'),
            ]}
            style={this.semanticStyle('editor.content')}
          >
            {this.items.map((_item, index) => {
              const currentValue = notNilEmpty(this.value)
                ? String(this.value)
                : '';
              const value = notNilEmpty(_item.value) ? String(_item.value) : '';
              const disabled = this.disabled || _item.disableSelect === true;
              return (
                <span
                  class={[
                    this.ns.e('item'),
                    this.ns.b('tab-item'),
                    this.ns.is('selected', currentValue === value),
                    this.ns.is('disabled', disabled),
                    this.semanticClass('editor.item', { item: _item, index }),
                  ]}
                  style={{
                    width,
                    ...this.semanticStyle('editor.item', {
                      item: _item,
                      index,
                    }),
                  }}
                  v-child-class={this.getItemChildClass({
                    item: _item,
                    index,
                  })}
                  v-child-style={this.getItemChildStyle({
                    item: _item,
                    index,
                  })}
                  title={showTitle(_item.text)}
                  onClick={() => {
                    if (disabled) {
                      return;
                    }
                    this.onSelectValueChange(value);
                  }}
                >
                  {_item.sysImage && (
                    <iBizIcon
                      class={this.ns.em('item', 'icon')}
                      icon={_item.sysImage}
                    ></iBizIcon>
                  )}
                  <span
                    class={[
                      this.ns.be('tab-item', 'text'),
                      this.ns.em('item', 'label'),
                    ]}
                  >
                    {_item.text || ''}
                  </span>
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});

import { computed, defineComponent, ref, watch, normalizeStyle } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useFocusAndBlur,
  useSemanticNode,
  useAutoFocusBlur,
  useCodeListListen,
  getCheckboxListProps,
} from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import {
  CodeListItem,
  useCalcOrMode,
  useCalcOrModeType,
  useCodeListSelection,
} from '@ibiz-template/runtime';
import { CheckBoxListEditorController } from '../checkbox-list-editor.controller';
import './ibiz-checkbox-list.scss';

/**
 * 选项框列表
 *
 * @description 使用el-checkbox-group组件，通过选项框组选择多项数据，该组件通常用于绘制代码表。支持编辑器类型包含：`选项框列表`
 * @primary
 * @editorparams {name:rownumber,parameterType:number,description:设置每行呈现的选项框个数}
 * @editorparams {name:allitems,parameterType:boolean,defaultvalue:false,description:选项框列表是否启用全部项}
 * @editorparams {name:itemstext,parameterType:string,defaultvalue:'全部',description:选项框列表全部项文本}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @editorparams {name:rendermode,parameterType:'default' | 'button',defaultvalue:'default',description:默认绘制选项框列表，当值为 'button' 时绘制按钮列表}
 * @editorparams {name:isbtnroundcorner,parameterType:boolean,defaultvalue:false,description:设置按钮是否显示圆角}
 * @editorparams {name:autoselectfirstoption,parameterType:boolean,defaultvalue:false,description:编辑器无值时，自动选中第一个数据}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter
 */
export const IBizCheckboxList = defineComponent({
  name: 'IBizCheckboxList',
  props: getCheckboxListProps<CheckBoxListEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('checkbox-list');

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const codeList = c.codeList;

    /**
     * @description 获取项子类类名透传
     * @param {IParams} params
     * @returns {*}
     */
    const getItemChildClass = (params: IParams) => {
      return [
        {
          class: semanticClass('editor.item.input', params),
          selector: '.el-checkbox__input',
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
          selector: '.el-checkbox__input',
        },
        {
          style: semanticStyle('editor.item.label', params),
          selector: `.${ns.em('item', 'label')}`,
        },
      ];
    };

    // 绘制模式
    let renderMode: 'button' | 'default' = 'default';
    // 按钮圆角显示
    let isBtnRoundCorner = false;
    const editorModel = c.model;
    if (editorModel.editorParams) {
      const rendermode = editorModel.editorParams.rendermode;
      if (rendermode === 'button' || rendermode === 'default') {
        renderMode = rendermode;
      }
      if (editorModel.editorParams.isbtnroundcorner) {
        isBtnRoundCorner = c.toBoolean(
          editorModel.editorParams.isbtnroundcorner,
        );
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

    // 值分隔符
    const valueSeparator = codeList?.valueSeparator || ',';

    // 代码表数据
    const items = ref<readonly CodeListItem[]>([]);

    /**
     * @description 自动选择第一条数据
     * @returns {*}  {void}
     */
    const autoSelectFirstOption = (): void => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item) return;
      const selections = c.allItems
        ? items.value
            .filter(_item => _item.value !== c.allItemsValue)
            .map(_item => _item.value)
        : [item.value];
      emit(
        'change',
        c.model.valueType === 'SIMPLES'
          ? selections
          : selections.join(valueSeparator),
        undefined,
        true,
      );
    };

    watch(
      () => props.data,
      newVal => {
        c.loadCodeList(newVal).then(_codeList => {
          items.value = c.handleCodeListAllItems(_codeList);
          autoSelectFirstOption();
        });
      },
      {
        immediate: true,
        deep: true,
      },
    );

    // 根据value获取对应代码表项
    const getCodeListItem = (value: string | number) => {
      return items.value?.find(item => item.value === value);
    };

    const currentMode = computed(() => {
      if (codeList && codeList.orMode) {
        return codeList.orMode;
      }
      return 'STR';
    });

    const calcOrMode: useCalcOrModeType = useCalcOrMode(
      currentMode.value,
      c.model.valueType,
    );

    const fn = (data: CodeListItem[] | undefined) => {
      if (data) items.value = c.handleCodeListAllItems(data);
    };

    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    const { getSelection, getSelectionValue } = useCodeListSelection(
      c.allItemsValue,
    );

    // 选中数组
    const selectArray = computed({
      get() {
        if (!isNil(props.value)) {
          const { getSelectArray } = calcOrMode;
          const selectsArray = getSelectArray(
            props.value,
            codeList,
            items.value,
            valueSeparator,
            codeList?.codeItemValueNumber,
          );
          if (selectsArray) {
            if (c.allItems) {
              return getSelection([], selectsArray, items.value, items.value);
            }
            return selectsArray;
          }
        }
        return [];
      },
      set(val: Array<string | number>) {
        if (c.allItems) {
          const selection = getSelection(
            selectArray.value,
            val,
            items.value,
            items.value,
          );
          val = getSelectionValue(selection);
        }
        let value: null | string | number | string[] | number[] = null;
        const { setSelectArray } = calcOrMode;
        value = setSelectArray(val, items.value, valueSeparator);
        emit('change', value);
        useInValueChange();
      },
    });

    const onSelectArrayChange = (value: Array<string | number>) => {
      selectArray.value = value;
    };

    const valueText = computed(() => {
      const valueArr = Array.isArray(selectArray.value)
        ? selectArray.value
        : [selectArray.value];

      return items.value
        .filter(item => {
          let isInclude = false;
          valueArr.forEach(val => {
            // eslint-disable-next-line eqeqeq
            if (val == item.value) {
              isInclude = true;
            }
          });
          return isInclude;
        })
        .map(item => item.text)
        .join(',');
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
      selectArray,
      semanticClass,
      semanticStyle,
      isBtnRoundCorner,
      showFormDefaultContent,
      getCodeListItem,
      getItemChildClass,
      getItemChildStyle,
      onSelectArrayChange,
    };
  },
  render() {
    return (
      <div
        ref='editorRef'
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
      >
        {this.readonly ? (
          this.valueText
        ) : (
          <el-checkbox-group
            class={[
              this.ns.e('content'),
              this.semanticClass('editor.content'),
              this.renderMode === 'button' ? this.ns.e('button-group') : '',
              this.ns.is('round-btn', this.isBtnRoundCorner),
            ]}
            style={this.semanticStyle('editor.content')}
            model-value={this.selectArray}
            onChange={this.onSelectArrayChange}
            {...this.$attrs}
          >
            {this.renderMode === 'button'
              ? this.items.map((item, index: number) => {
                  const codeListItem = this.getCodeListItem(item.value);
                  return (
                    <el-checkbox-button
                      key={index}
                      label={item.value}
                      class={[
                        this.ns.e('item'),
                        this.semanticClass('editor.item', { item, index }),
                      ]}
                      style={this.semanticStyle('editor.item', { item, index })}
                      disabled={this.disabled || item.disableSelect === true}
                      v-child-class={[
                        [
                          {
                            class: codeListItem?.textCls,
                            selector: '.el-checkbox-button__inner',
                          },
                          ...this.getItemChildClass({ item, index }),
                        ],
                      ]}
                      v-child-style={this.getItemChildStyle({ item, index })}
                    >
                      <span
                        class={[this.ns.e('text'), this.ns.em('item', 'label')]}
                        style={{
                          color: codeListItem?.color || undefined,
                          backgroundColor: codeListItem?.bkcolor || undefined,
                          borderColor: codeListItem?.bkcolor || undefined,
                        }}
                      >
                        {item.text}
                      </span>
                    </el-checkbox-button>
                  );
                })
              : this.items.map((item, index: number) => {
                  return (
                    <el-checkbox
                      key={index}
                      label={item.value}
                      class={[
                        this.ns.e('item'),
                        this.semanticClass('editor.item', { item, index }),
                      ]}
                      style={this.semanticStyle('editor.item', { item, index })}
                      v-child-class={this.getItemChildClass({ item, index })}
                      v-child-style={this.getItemChildStyle({ item, index })}
                      disabled={this.disabled || item.disableSelect === true}
                    >
                      <span
                        class={[this.ns.e('text'), this.ns.em('item', 'label')]}
                      >
                        {item.text}
                      </span>
                    </el-checkbox>
                  );
                })}
          </el-checkbox-group>
        )}
      </div>
    );
  },
});

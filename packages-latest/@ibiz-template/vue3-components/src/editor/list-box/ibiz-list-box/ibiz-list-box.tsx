import {
  h,
  Ref,
  ref,
  watch,
  computed,
  defineComponent,
  resolveComponent,
} from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getListBoxProps,
  useFocusAndBlur,
  useSemanticNode,
  useAutoFocusBlur,
  useCodeListListen,
} from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import {
  CodeListItem,
  useCalcOrMode,
  useCalcOrModeType,
  useCodeListSelection,
} from '@ibiz-template/runtime';
import { ListBoxEditorController } from '../list-box-editor.controller';
import { ListBoxPickerEditorController } from '../list-box-picker-editor.controller';
import './ibiz-list-box.scss';

/**
 * 列表框
 *
 * @description 使用el-radio-group或el-checkbox-group组件，用于选择多项数据或者选择单项数据，单选时绘制单选框组，多选时绘制多选框组。支持编辑器类型包含：`列表框`、`列表框（选择）`
 * @primary
 * @editorparams {name:multiple,parameterType:boolean,defaultvalue:false,description:列表框是否启用多选}
 * @editorparams {name:allitems,parameterType:boolean,defaultvalue:false,description:列表框是否启用全部项}
 * @editorparams {name:itemstext,parameterType:string,defaultvalue:'全部',description:列表框全部项文本}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @editorparams {name:autoselectfirstoption,parameterType:boolean,defaultvalue:false,description:编辑器无值时，自动选中第一个数据}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizListBox = defineComponent({
  name: 'IBizListBox',
  props: getListBoxProps<
    ListBoxEditorController | ListBoxPickerEditorController
  >(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('list-box');

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const editorModel = c.model;

    let multiple: boolean = false;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.multiple) {
        multiple = c.toBoolean(editorModel.editorParams.multiple);
      }
    }

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
          selector: '.el-radio__input',
        },
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

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

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

    const codeList = (c as ListBoxEditorController).codeList;

    const editorType = editorModel.editorType;

    // 值分隔符
    const valueSeparator = codeList?.valueSeparator || ',';

    // 代码表数据（LISTBOX） or AC请求数据（LISTBOXPICKUP）
    const items = ref<readonly IData[]>([]);

    /**
     * @description 自动选择第一条数据
     * @returns {*}  {void}
     */
    const autoSelectFirstOption = (): void => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item) return;
      let value: string | undefined | string[];
      if (multiple) {
        const selections = (c as ListBoxEditorController).allItems
          ? items.value
              .filter(
                _item =>
                  _item.value !== (c as ListBoxEditorController).allItemsValue,
              )
              .map(_item => _item.value)
          : [item.value];
        value =
          c.model.valueType === 'SIMPLES'
            ? selections
            : selections.join(valueSeparator);
      } else {
        value = item.value;
      }
      emit('change', value, undefined, true);
    };

    // 更新列表框选项
    const loadListBoxItems = async () => {
      if (Object.is('LISTBOX', editorType)) {
        const controller = c as ListBoxEditorController;
        controller.loadCodeList(props.data).then(_codeList => {
          if (multiple) {
            items.value = controller.handleCodeListAllItems(_codeList);
          } else {
            items.value = _codeList;
          }
          autoSelectFirstOption();
        });
      } else if (Object.is('LISTBOXPICKUP', editorType)) {
        const controller = c as ListBoxPickerEditorController;
        if (controller.model.appDataEntityId) {
          const res = await controller.getServiceData(props.data);
          if (res) {
            items.value = res.data.map(item => ({
              value: item[controller.keyName],
              text: item[controller.textName],
            }));
            autoSelectFirstOption();
          }
        }
      }
    };

    watch(
      () => props.data,
      () => {
        loadListBoxItems();
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const fn = (data: CodeListItem[] | undefined) => {
      if (data) {
        if (Object.is('LISTBOX', editorType) && multiple) {
          items.value = (c as ListBoxEditorController).handleCodeListAllItems(
            data,
          );
          return;
        }
        items.value = data;
      }
    };

    useCodeListListen(
      (c as ListBoxEditorController).model.appCodeListId,
      c.context.srfappid,
      fn,
    );

    // 当前模式
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

    const { getSelection, getSelectionValue } = useCodeListSelection(
      Object.is('LISTBOX', editorType)
        ? (c as ListBoxEditorController).allItemsValue
        : '',
    );

    // 选中数组
    const selectArray: Ref<(string | number)[]> = ref([]);

    // 监听当前值生成selectArray
    watch(
      () => props.value,
      newVal => {
        if (!isNil(newVal)) {
          if (multiple) {
            let selectsArray: Array<string | number> = [];
            if (editorType === 'LISTBOX') {
              const { getSelectArray } = calcOrMode;
              const arr = getSelectArray(
                newVal,
                codeList,
                items.value as readonly CodeListItem[],
                valueSeparator,
                codeList?.codeItemValueNumber,
              );
              if (arr) {
                selectsArray = arr;
                if ((c as ListBoxEditorController).allItems) {
                  selectsArray = getSelection(
                    [],
                    selectsArray,
                    items.value as readonly CodeListItem[],
                    items.value as readonly CodeListItem[],
                  );
                }
              }
            } else if (editorType === 'LISTBOXPICKUP') {
              if (newVal !== '') {
                selectsArray =
                  c.model.valueType === 'SIMPLES' && Array.isArray(newVal)
                    ? newVal
                    : (newVal as string).split(valueSeparator);
              }
            }
            selectArray.value = selectsArray;
          } else {
            selectArray.value = [newVal];
          }
        } else {
          selectArray.value = [];
        }
      },
      { immediate: true, deep: true },
    );

    // 选中数据改变
    const onSelectArrayChange = (value: Array<string | number>) => {
      let _value;
      // 单多选
      if (multiple) {
        let values = [...value];
        if (Object.is('LISTBOX', editorType)) {
          if ((c as ListBoxEditorController).allItems) {
            const selection = getSelection(
              selectArray.value,
              values,
              items.value as readonly CodeListItem[],
              items.value as readonly CodeListItem[],
            );
            values = getSelectionValue(selection);
          }
          // 根据代码表模式对值进行计算
          const { setSelectArray } = calcOrMode;
          _value = setSelectArray(
            values,
            items.value as readonly CodeListItem[],
            valueSeparator,
          );
        } else if (Object.is('LISTBOXPICKUP', editorType)) {
          if (c.model.valueType === 'SIMPLES') {
            _value = values;
          } else if (c.model.valueType === 'SIMPLE') {
            _value = values.join(valueSeparator);
          }
        }
      } else {
        _value = value;
      }
      emit('change', _value);
      useInValueChange();
    };

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      ns,
      items,
      multiple,
      editorRef,
      selectArray,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      getItemChildClass,
      getItemChildStyle,
      onSelectArrayChange,
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
        {this.multiple ? (
          <el-checkbox-group
            class={[
              this.ns.b('checkbox'),
              this.ns.e('content'),
              this.semanticClass('editor.content'),
            ]}
            style={this.semanticStyle('editor.content')}
            modelValue={this.selectArray}
            onChange={this.onSelectArrayChange}
            {...this.$attrs}
          >
            {this.items.map((item, index: number) => (
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
                disabled={
                  this.disabled || this.readonly || item.disableSelect === true
                }
              >
                {{
                  default: () => {
                    const c = this.controller as ListBoxPickerEditorController;
                    if (c.acItemProvider) {
                      const component = resolveComponent(
                        c.acItemProvider.component,
                      );
                      return h(component, {
                        item,
                        controller: c,
                      });
                    }
                    return (
                      <span
                        class={[this.ns.e('text'), this.ns.em('item', 'label')]}
                      >
                        {item.text}
                      </span>
                    );
                  },
                }}
              </el-checkbox>
            ))}
          </el-checkbox-group>
        ) : (
          <el-radio-group
            class={[
              this.ns.b('radio'),
              this.ns.e('content'),
              this.semanticClass('editor.content'),
            ]}
            style={this.semanticStyle('editor.content')}
            modelValue={this.selectArray[0]}
            {...this.$attrs}
          >
            {this.items.map((item, index: number) => (
              <el-radio
                key={index}
                label={item.value}
                disabled={
                  this.disabled || this.readonly || item.disableSelect === true
                }
                class={[
                  this.ns.e('item'),
                  this.semanticClass('editor.item', { item, index }),
                ]}
                style={this.semanticStyle('editor.item', { item, index })}
                v-child-class={this.getItemChildClass({ item, index })}
                v-child-style={this.getItemChildStyle({ item, index })}
                onChange={() => {
                  this.onSelectArrayChange(item.value);
                }}
              >
                {{
                  default: () => {
                    const c = this.controller as ListBoxPickerEditorController;
                    if (c.acItemProvider) {
                      const component = resolveComponent(
                        c.acItemProvider.component,
                      );
                      return h(component, {
                        item,
                        controller: c,
                      });
                    }
                    return (
                      <span
                        class={[this.ns.e('text'), this.ns.em('item', 'label')]}
                      >
                        {item.text}
                      </span>
                    );
                  },
                }}
              </el-radio>
            ))}
          </el-radio-group>
        )}
      </div>
    );
  },
});

import {
  ref,
  Ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  defineComponent,
  normalizeStyle,
} from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  useClickOutside,
  getDropdownProps,
  useCodeListListen,
} from '@ibiz-template/vue3-util';
import { OnClickOutsideResult, showTitle } from '@ibiz-template/core';
import { CodeListItem, useCodeListSelection } from '@ibiz-template/runtime';
import { INavigateParamContainer } from '@ibiz/model-core';
import { DropDownListEditorController } from '../dropdown-list-editor.controller';
import './ibiz-dropdown.scss';

/**
 * 下拉列表框
 *
 * @description 使用el-select或el-tree-select组件，用于在选项较多的情况下，以列表形式展示内容供其选择，该组件通常用于绘制代码表。支持编辑器类型包含：`下拉列表框`、`下拉列表框（100宽度）`、`下拉列表框（多选）`
 * @primary
 * @editorparams {name:forceselection,parameterType:boolean,defaultvalue:true,description:是否禁止用户创建选择项。当参数为false时，可在输入框输入内容，使其显示在下拉选项中呈现，并且可选择}
 * @editorparams {name:defaultfirstoption,parameterType:boolean,defaultvalue:false,description:默认选中第一个，在该属性为 true 的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位}
 * @editorparams {name:autoselectfirstoption,parameterType:boolean,defaultvalue:false,description:编辑器无值时，自动选中第一个数据}
 * @editorparams {name:blankitemname,parameterType:string,description:在单选模式下，用于在下拉展示数据顶部添加一条空白项数据，其文本内容为配置的该参数值}
 * @editorparams {name:blankitemvalue,parameterType:string,description:在单选模式下，用于在下拉展示数据顶部添加一条空白项数据，其值内容为配置的该参数值}
 * @editorparams {name:alwaysload,parameterType:boolean,defaultvalue:false,description:当值改变、下拉框出现时，是否重新加载代码表数据。设置为 true 时每次相关事件触发都会重新加载数据}
 * @editorparams {name:type,parameterType:'round' | 'other',defaultvalue:'other',description:下拉框选项的样式类型，可取值为 'round'（圆角类型）或 'other'（其他类型）}
 * @editorparams {name:overflowmode,parameterType:'auto' | 'ellipsis',defaultvalue:'auto',description:用于控制该编辑器下拉区域的宽度显示方式。当参数值为 'auto' 时，下拉区域宽度会根据内容自动展开；当参数值为 'ellipsis' 时，下拉区域宽度将与输入框保持一致，若内容超出宽度则会显示省略号，鼠标悬浮在内容上时会出现提示信息}
 * @editorparams {name:allitems,parameterType:boolean,defaultvalue:false,description:下拉列表框是否启用全部项}
 * @editorparams {name:itemstext,parameterType:string,defaultvalue:'全部',description:下拉列表框全部项文本}
 * @editorparams {"name":"valueseparator","parameterType":"string","defaultvalue":"','","description":"下拉列表框值分隔符，用于多选时，拼接多个选项值为字符串和分割字符串为选项值数组"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @editorparams {"name":"valuetype","parameterType":"string","description":"编辑器的值类型"}
 * @ignoreprops overflowMode
 */
export const IBizDropdown = defineComponent({
  name: 'IBizDropdown',
  props: getDropdownProps<DropDownListEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('dropdown');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const items: Ref<readonly IData[]> = ref([]);

    /**
     * @description 获取项子类类名透传
     * @param {IParams} params
     * @returns {*}
     */
    const getItemChildClass = (params?: IParams) => {
      return [
        {
          class: semanticClass('editor.input', params),
          selector: `.el-select__input`,
        },
        {
          class: semanticClass('editor.suffix', params),
          selector: `.el-input__suffix`,
        },
        {
          class: semanticClass('editor.item', params),
          selector: `.el-tag`,
        },
        {
          class: semanticClass('editor.item.label', params),
          selector: '.el-tag__content',
        },
        {
          class: semanticClass('editor.item.label', params),
          selector: `.${ns.em('item', 'label')}`,
        },
        {
          class: semanticClass('editor.item.icon', params),
          selector: `.${ns.em('item', 'icon')}`,
        },
        {
          class: semanticClass('editor.item.remove', params),
          selector: `.el-tag__close`,
        },
      ];
    };

    /**
     * @description 获取项子类样式透传
     * @param {IParams} params
     * @returns {*}
     */
    const getItemChildStyle = (params?: IParams) => {
      return [
        {
          style: semanticStyle('editor.input', params),
          selector: `.el-select__input`,
        },
        {
          style: semanticStyle('editor.suffix', params),
          selector: `.el-input__suffix`,
        },
        {
          style: semanticStyle('editor.item', params),
          selector: `.el-tag`,
        },
        {
          style: semanticStyle('editor.item.label', params),
          selector: '.el-tag__content',
        },
        {
          style: semanticStyle('editor.item.label', params),
          selector: `.${ns.em('item', 'label')}`,
        },
        {
          style: semanticStyle('editor.item.icon', params),
          selector: `.${ns.em('item', 'icon')}`,
        },
        {
          style: semanticStyle('editor.item.remove', params),
          selector: `.el-tag__close`,
        },
      ];
    };

    /**
     * @description 获取项子类类名透传
     * @param {IParams} params
     * @returns {*}
     */
    const getPopupItemChildClass = (params: IParams) => {
      return [
        {
          class: semanticClass('editor.popup.item.icon', params),
          selector: `.${ns.em('option-item', 'icon')}`,
        },
        {
          class: semanticClass('editor.popup.item.label', params),
          selector: `.${ns.em('option-item', 'label')}`,
        },
      ];
    };

    /**
     * @description 获取项子类样式透传
     * @param {IParams} params
     * @returns {*}
     */
    const getPopupItemChildStyle = (params: IParams) => {
      return [
        {
          style: semanticStyle('editor.popup.item.icon', params),
          selector: `.${ns.em('option-item', 'icon')}`,
        },
        {
          style: semanticStyle('editor.popup.item.label', params),
          selector: `.${ns.em('option-item', 'label')}`,
        },
      ];
    };

    // 树型数据展开的代码表
    const codeListItems: Ref<IData[]> = ref([]);

    // 是否已加载代码表
    const isLoadedCodeList = ref(false);

    // 是否是树形
    const hasChildren = ref(false);

    // 树数据
    const treeNodes: Ref<IData[]> = ref([]);

    // 是否编辑态
    const isEditable = ref(false);

    // 编辑器Ref
    const editorRef = ref();

    // 值项
    const editorItems = c.model.editorItems;

    // 是否正在加载
    const isLoading = ref(false);

    // 编辑器状态
    let editorState = '';

    // 点击外部
    let funcs: OnClickOutsideResult;

    // 代码项值是否为数值
    const codeItemValueNumber = ref(false);

    // 隐藏的input框，用来替代下拉搜索框在浏览器焦点管理系统中的目标元素，用于触发enter键的keyup事件
    const hiddenInputRef = ref();

    // 值分隔符
    const valueSeparator = c.editorParams?.valueseparator || ',';

    const { getSelection, getSelectionValue } = useCodeListSelection(
      c.allItemsValue,
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

    // 样式变量
    const cssVars = computed(() => {
      if (c.model.editorType === 'DROPDOWNLIST_100') {
        return ns.cssVarBlock({ width: `100px` });
      }
      return {};
    });

    // 处理树数据
    const handleTreeNodes = (nodes: readonly IData[]): IData[] => {
      if (nodes.length === 0) {
        return [];
      }

      const list: IData[] = [];
      const existingValues = new Set(
        codeListItems.value.map(item => item.value),
      );

      nodes.forEach((codeItem: IData) => {
        if (!existingValues.has(codeItem.value)) {
          codeListItems.value.push(codeItem);
        }

        const tempObj: IData = {
          label: codeItem.text,
          value: codeItem.value?.toString(),
          color: codeItem?.color,
          textCls: codeItem?.textCls,
          sysImage: codeItem.sysImage,
          disabled: codeItem.disableSelect === true,
          children: [],
        };

        if (codeItem.children && codeItem.children.length > 0) {
          tempObj.children = handleTreeNodes(codeItem.children);
        }

        list.push(tempObj);
      });

      return list;
    };

    /**
     * @description 自动选中第一项
     */
    const autoSelectFirstOption = (): void => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item) return;
      if (c.multiple) {
        const value =
          c.allItems && !hasChildren.value
            ? items.value
                .filter(_item => _item.value !== c.allItemsValue)
                .map(_item => _item.value)
            : [item.value];
        emit(
          'change',
          c.model.valueType === 'SIMPLES' ? value : value.join(valueSeparator),
          undefined,
          true,
        );
      } else if (editorItems && editorItems.length > 0) {
        emit('change', item.value, editorItems[0].id!, true);
        emit('change', item.text, undefined, true);
      } else {
        emit('change', item.value, undefined, true);
      }
    };

    /**
     * 加载代码表后续处理
     *
     * @param {readonly} codeList
     * @param {*} CodeListItem
     * @param {*} []
     */
    const afterLoadCodeList = (codeList: readonly CodeListItem[]) => {
      items.value = [];
      codeListItems.value = [];
      if (c.multiple && !codeList.some(item => item.children)) {
        codeList = c.handleCodeListAllItems(codeList);
      }
      if (c.blankItemName && !c.multiple) {
        items.value = [
          {
            value: c.blankItemValue,
            text: ibiz.appUtil.resolveI18nText(c.blankItemName),
          },
          ...codeList,
        ];
      } else {
        items.value = codeList;
      }
      for (let i = 0; i < items.value.length; i++) {
        const _item = items.value[i];
        if (_item.children) {
          hasChildren.value = true;
          treeNodes.value = handleTreeNodes(codeList);
          break;
        }
      }
      autoSelectFirstOption();
    };

    // 加载代码表数据
    const loadCodeList = async () => {
      if (c.model.appCodeListId) {
        const app = ibiz.hub.getApp(c.context.srfappid);
        const codeListModel = app.codeList.getCodeList(c.model.appCodeListId);
        if (codeListModel) {
          codeItemValueNumber.value =
            codeListModel.codeItemValueNumber || false;
        }
      }
      isLoading.value = true;
      const codeList = await c.loadCodeList(props.data!);
      afterLoadCodeList(codeList);
      isLoadedCodeList.value = true;
      isLoading.value = false;
    };

    watch(
      () => props.value,
      async (newVal, oldVal) => {
        if (newVal || newVal === null || newVal === 0) {
          // 值从无到有、并且没搜索过的情况
          if (!isLoadedCodeList.value && oldVal === undefined) {
            await loadCodeList();
          }
        }
      },
      { immediate: true },
    );

    const useEditorNavParams = (): void => {
      const { navigateContexts = [], navigateParams = [] } =
        c.model as INavigateParamContainer;
      const navParamName: string[] = [];
      [...navigateContexts, ...navigateParams].forEach(nav => {
        if (!nav.rawValue && nav.value) {
          navParamName.push(nav.value);
        }
      });
      // 导航参数发生改变时重新加载数据
      watch(
        () => {
          // 直接监听props.data时 newVal, oldVal 值一样，所以在这直接监听导航参数数据项变化
          const data: IData = {};
          if (props.data) {
            Object.keys(props.data).forEach(key => {
              if (navParamName.includes(key)) {
                data[key] = props.data[key];
              }
            });
          }
          return data;
        },
        () => {
          if (props.data) {
            loadCodeList();
          }
        },
        { deep: true },
      );
    };

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    /**
     * 根据值获取代码表
     *
     * @author zk
     * @date 2024-01-17 03:01:53
     * @param {string} value
     * @return {*}
     */
    const getCodeListItemByValue = (value: string | number) => {
      const list = hasChildren.value ? codeListItems.value : items.value;
      return list.find(item => item.value === value);
    };

    // 当前值
    const curValue = computed({
      get() {
        if (!isLoadedCodeList.value) {
          return c.multiple ? [] : '';
        }
        // 单选才考虑值项
        if (editorItems && editorItems.length > 0 && !c.multiple) {
          return props.data[editorItems[0].id!]?.toString();
        }
        if (props.value && typeof props.value === 'string') {
          if (c.allItems && c.multiple && !hasChildren.value) {
            return getSelection(
              [],
              props.value.split(valueSeparator),
              items.value as readonly CodeListItem[],
              items.value as readonly CodeListItem[],
            ).map(v => `${v}`);
          }
          return c!.multiple
            ? props.value?.toString().split(valueSeparator)
            : props.value.toString();
        }
        if (props.value && Array.isArray(props.value)) {
          if (c.allItems && c.multiple && !hasChildren.value) {
            return getSelection(
              [],
              props.value,
              items.value as readonly CodeListItem[],
              items.value as readonly CodeListItem[],
            ).map(v => `${v}`);
          }
          return c.multiple ? props.value : props.value.toString();
        }
        return c.multiple ? [] : props.value?.toString() || '';
      },
      set(_select: string | Array<string> | undefined) {
        let select = _select;
        // 如果配置有空白项，清空时置为blankItemValue
        if (c.blankItemName && !_select) select = c.blankItemValue;
        if (Array.isArray(select)) {
          if (c.allItems && c.multiple && !hasChildren.value) {
            const selection = getSelection(
              curValue.value as string[],
              select,
              items.value as readonly CodeListItem[],
              items.value as readonly CodeListItem[],
            );
            select = getSelectionValue(selection).map(v => `${v}`);
          }
          let selectArr = null;
          if (select.length === 0) {
            selectArr = null;
          } else if (c.model.valueType === 'SIMPLES') {
            selectArr = select;
          } else {
            selectArr = select.join(valueSeparator);
          }
          emit('change', selectArr);
        } else if (editorItems && editorItems.length > 0) {
          // 有值项 默认抛标题 值项抛实际value
          let emitVal: number | string | undefined | null = select;
          if (codeItemValueNumber.value) {
            emitVal = select === '' ? null : Number(select);
          }
          emit('change', emitVal, editorItems[0].id!);
          const selectItem = getCodeListItemByValue(
            (codeItemValueNumber.value ? Number(select) : select)!,
          );
          if (selectItem) {
            emit('change', selectItem.text);
          }
        } else {
          let emitVal: number | string | undefined | null = select;
          if (codeItemValueNumber.value) {
            emitVal = select === '' ? null : Number(select);
          }
          emit('change', emitVal);
        }
        setEditable(false);
        if (
          c.editorParams.alwaysLoad === 'true' ||
          c.editorParams.alwaysload === 'true'
        ) {
          loadCodeList();
        }
        if (props.autoFocus) {
          editorState = 'blur';
          emit('blur');
        }
      },
    });

    const valueText = computed(() => {
      const valueArr = Array.isArray(curValue.value)
        ? curValue.value
        : [curValue.value];

      const list = hasChildren.value ? codeListItems.value : items.value;
      const isNumber = codeItemValueNumber.value;
      const codeMap = new Map(
        list.map(codeItem => [
          isNumber ? Number(codeItem.value) : String(codeItem.value),
          codeItem.text,
        ]),
      );
      const textArr: (string | undefined)[] = [];
      valueArr.forEach(item => {
        const key = isNumber ? Number(item) : String(item);
        const text = codeMap.get(key);
        // 代码表集合存在则使用代码表文本，反之，直接使用值（兼容可输可选的情况下，forceselection编辑器参数设置为false）
        if (text !== undefined) {
          textArr.push(text);
        } else {
          textArr.push(item);
        }
      });
      return textArr.join(valueSeparator);
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

    // 自动聚焦
    watch(editorRef, newVal => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });

    const onFocus = (e: IData) => {
      editorState = 'focus';
      emit('focus', e);
      setEditable(true);
    };

    const onBlur = (e: IData) => {
      editorState = 'blur';
      emit('blur', e);
      setEditable(false);
    };

    // 处理点击键盘
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    /**
     * 自定义节点样式
     * @param data 数据对象
     * @param _node 节点对象
     * @returns
     */
    const customNodeClass = (data: IData, _node: Node) => {
      return data.children.length ? ns.e('branch-node') : null;
    };

    // 根据text获取对应代码表项
    const getCodeListItem = (text: string) => {
      const list = hasChildren.value ? codeListItems.value : items.value;
      return list.find(item => item.text === text);
    };

    // 下拉框出现/隐藏时触发
    const onVisibleChange = async (visible: boolean) => {
      // 处于搜索表单中且下拉列表隐藏时阻止输入框的自动获取焦点，避免按enter键时触发显示下拉框
      const isSearchForm =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (c.parent as any)?.form?.model?.controlType === 'SEARCHFORM';
      if (!visible && isSearchForm) {
        nextTick(() => {
          hiddenInputRef.value?.focus(); // 获取焦点
        });
      }
      if (
        visible &&
        (!isLoadedCodeList.value ||
          c.editorParams.alwaysLoad === 'true' ||
          c.editorParams.alwaysload === 'true')
      ) {
        // 下拉框出现时如果没有加载过代码表去加载
        await loadCodeList();
        // 树型的情况下，得自动聚焦, 如果已经失焦就不要focus了
        if (hasChildren.value && editorRef.value && editorState !== 'outside') {
          nextTick(() => {
            editorRef.value.focus();
          });
        }
        nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      }
    };

    const fn = (data: CodeListItem[] | undefined) => {
      if (data) afterLoadCodeList(data);
    };

    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);

    onMounted(() => {
      useEditorNavParams();
      if (editorRef.value) {
        funcs = useClickOutside(editorRef, async _evt => {
          editorState = 'outside';
        });
      }
    });

    onUnmounted(() => {
      if (funcs && funcs.stop) {
        funcs.stop();
      }
    });

    const prefix: { prefix?: () => JSX.Element[] | undefined } = {};
    if (c.editorParams.type === 'round') {
      Object.assign(prefix, {
        prefix: () => {
          return valueText.value.split(valueSeparator).map(text => {
            const codeListItem = getCodeListItem(text);
            return (
              <div
                class={[ns.b('select-option-text'), codeListItem?.textCls]}
                style={
                  codeListItem?.color || codeListItem?.bkcolor
                    ? ns.cssVarBlock({
                        'select-option-item-color': `${
                          codeListItem.color || ''
                        }`,
                        'select-option-item-bkcolor': `${
                          codeListItem.bkcolor || ''
                        }`,
                        'select-option-item-padding': `0 var(${ns.cssVarName(
                          'spacing-base',
                        )})`,
                      })
                    : ''
                }
              >
                {codeListItem?.sysImage && (
                  <iBizIcon icon={codeListItem?.sysImage}></iBizIcon>
                )}
                {text || ''}
              </div>
            );
          });
        },
      });
    }

    return {
      ns,
      c,
      items,
      prefix,
      cssVars,
      curValue,
      valueText,
      editorRef,
      treeNodes,
      isLoading,
      isEditable,
      hasChildren,
      semanticClass,
      semanticStyle,
      hiddenInputRef,
      valueSeparator,
      showFormDefaultContent,
      onBlur,
      onFocus,
      setEditable,
      handleKeyUp,
      getCodeListItem,
      onVisibleChange,
      customNodeClass,
      getItemChildClass,
      getItemChildStyle,
      getPopupItemChildClass,
      getPopupItemChildStyle,
    };
  },

  render() {
    const overflowMode =
      this.c.editorParams.overflowMode ||
      this.c.editorParams.overflowmode ||
      ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === 'ellipsis';

    // 编辑态内容
    const editContent = this.hasChildren ? (
      <el-tree-select
        ref='editorRef'
        v-model={this.curValue}
        clearable
        class={[
          this.ns.b('select'),
          this.ns.e('content'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
        filterable={true}
        teleported={!this.showFormDefaultContent}
        data={this.treeNodes}
        allow-create={!this.c.forceSelection}
        default-first-option={this.c.defaultFirstOption}
        check-strictly
        render-after-expand={true}
        multiple={this.c.multiple}
        placeholder={this.c.placeHolder ? this.c.placeHolder : ' '}
        disabled={this.disabled}
        loading={this.isLoading}
        fit-input-width={isEllipsis}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyup={this.handleKeyUp}
        onVisibleChange={this.onVisibleChange}
        popper-class={[
          this.ns.b('popper'),
          this.semanticClass('editor.popup'),
          this.ns.is('allow-create', !this.c.forceSelection),
        ]}
        popper-style={this.semanticStyle('editor.popup')}
        v-child-class={this.getItemChildClass()}
        v-child-style={this.getItemChildStyle()}
        props={{
          class: this.customNodeClass,
        }}
        {...this.$attrs}
      >
        {{
          default: (node: IData) => {
            const data = node.data || {};
            const label = data.label || '';
            return (
              <span
                title={showTitle(isEllipsis ? label : '')}
                class={[
                  this.ns.e('option-item'),
                  this.semanticClass('editor.popup.item', { item: data }),
                ]}
                style={this.semanticStyle('editor.popup.item', { item: data })}
                v-child-class={this.getPopupItemChildClass({ item: data })}
                v-child-style={this.getPopupItemChildStyle({ item: data })}
              >
                <span class={this.ns.em('option-item', 'label')}>{label}</span>
              </span>
            );
          },
        }}
      </el-tree-select>
    ) : (
      <el-select
        ref='editorRef'
        v-model={this.curValue}
        clearable
        class={[
          this.ns.b('select'),
          this.ns.e('content'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
        filterable={true}
        teleported={!this.showFormDefaultContent}
        multiple={this.c.multiple}
        allow-create={!this.c.forceSelection}
        placeholder={this.c.placeHolder ? this.c.placeHolder : ' '}
        disabled={this.disabled}
        loading={this.isLoading}
        fit-input-width={isEllipsis}
        popper-class={[
          this.ns.b('popper'),
          this.c.editorParams.type === 'round'
            ? this.ns.bm('popper', 'round')
            : '',
          this.semanticClass('editor.popup'),
          this.ns.bm('popper', `${this.c.model.id}`),
        ]}
        popper-style={this.semanticStyle('editor.popup')}
        v-child-class={this.getItemChildClass()}
        v-child-style={this.getItemChildStyle()}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyup={this.handleKeyUp}
        onVisibleChange={this.onVisibleChange}
        {...this.$attrs}
      >
        {{
          default: () => {
            return this.items.map(item => {
              return (
                <el-option
                  key={item.value}
                  value={item.value?.toString()}
                  label={item.text}
                  disabled={item.disableSelect === true}
                  style={[
                    item.bkcolor
                      ? this.ns.cssVarBlock({
                          'select-option-item-bkcolor': `${item.bkcolor}`,
                        })
                      : '',
                    this.semanticStyle('editor.popup.item', { item }),
                  ]}
                  class={[
                    item.cls ? item.cls : null,
                    this.ns.e('option-item'),
                    this.semanticClass('editor.popup.item', { item }),
                  ]}
                  v-child-class={this.getPopupItemChildClass({ item })}
                  v-child-style={this.getPopupItemChildStyle({ item })}
                  title={showTitle(isEllipsis ? item.text : '')}
                >
                  {{
                    default: () => {
                      return (
                        <div
                          class={[
                            this.ns.b('select-option-content'),
                            item.textCls ? item.textCls : null,
                          ]}
                          style={
                            item.color
                              ? this.ns.cssVarBlock({
                                  'select-option-item-color': `${item.color}`,
                                })
                              : ''
                          }
                        >
                          {item.sysImage && (
                            <iBizIcon
                              class={this.ns.em('option-item', 'icon')}
                              icon={item.sysImage}
                            ></iBizIcon>
                          )}
                          <span
                            class={[
                              isEllipsis &&
                                this.ns.be('select-option-content', 'text'),
                              this.ns.em('option-item', 'label'),
                            ]}
                          >
                            {item.text}
                          </span>
                        </div>
                      );
                    },
                  }}
                </el-option>
              );
            });
          },
          ...this.prefix,
        }}
      </el-select>
    );

    // 只读态内容
    const readonlyContent = this.valueText
      .split(this.valueSeparator)
      .map(text => {
        const codeListItem = this.getCodeListItem(text);
        return (
          <span
            class={[
              this.ns.e('item'),
              codeListItem?.textCls,
              this.ns.b('readonly-text-item'),
              this.semanticClass('editor.item', { item: codeListItem }),
            ]}
            style={normalizeStyle([
              codeListItem?.color || codeListItem?.bkcolor
                ? this.ns.cssVarBlock({
                    'readonly-text-item-color': `${codeListItem.color || ''}`,
                    'select-option-item-color': `${codeListItem.color || ''}`,
                    'select-option-item-bkcolor': `${
                      (this.c.editorParams.type === 'round'
                        ? codeListItem.bkcolor
                        : '') || ''
                    }`,
                  })
                : '',
              this.semanticStyle('editor.item', { item: codeListItem }),
            ])}
            v-child-class={this.getItemChildClass({ item: codeListItem })}
            v-child-style={this.getItemChildStyle({ item: codeListItem })}
          >
            {codeListItem?.sysImage && (
              <iBizIcon
                class={this.ns.em('item', 'icon')}
                icon={codeListItem.sysImage}
              ></iBizIcon>
            )}
            <span
              class={[
                this.ns.em('item', 'label'),
                this.ns.be('readonly-text-item', 'label'),
              ]}
            >
              {text}
            </span>
          </span>
        );
      });

    // 表单默认内容
    const formDefaultContent = (
      <div
        class={[
          this.ns.e('content'),
          this.ns.b('form-default-content'),
          this.semanticClass('editor.content'),
          this.ns.is('multiple', this.c.multiple),
        ]}
        style={this.semanticStyle('editor.content')}
      >
        {this.valueText ? (
          this.valueText.split(this.valueSeparator).map(text => {
            const codeListItem = this.getCodeListItem(text);
            return (
              <span
                class={[
                  this.ns.e('item'),
                  codeListItem?.textCls,
                  this.ns.b('content-item'),
                  this.semanticClass('editor.item', { item: codeListItem }),
                ]}
                style={normalizeStyle([
                  codeListItem?.color || codeListItem?.bkcolor
                    ? this.ns.cssVarBlock({
                        'select-option-item-color': `${
                          codeListItem.color || ''
                        }`,
                        'select-option-item-bkcolor': `${
                          (this.c.editorParams.type === 'round'
                            ? codeListItem.bkcolor
                            : '') || ''
                        }`,
                      })
                    : '',
                  this.semanticStyle('editor.item', { item: codeListItem }),
                ])}
                v-child-class={this.getItemChildClass({ item: codeListItem })}
                v-child-style={this.getItemChildStyle({ item: codeListItem })}
              >
                <span
                  class={[
                    this.ns.be('content-item', 'label'),
                    this.ns.em('item', 'label'),
                  ]}
                >
                  {text}
                </span>
              </span>
            );
          })
        ) : (
          <iBizEditorEmptyText
            class={[this.ns.e('content'), this.semanticClass('editor.content')]}
            style={this.semanticStyle('editor.content')}
            showPlaceholder={this.c.emptyShowPlaceholder}
            placeHolder={this.c.placeHolder}
          />
        )}
      </div>
    );

    // 隐藏的辅助input,用来触发当下拉框隐藏时enter键的keyup事件，进而触发搜索表单的搜索事件，同时避免下拉框在搜索时出现
    const hiddenInput = (
      <input
        type='text'
        readonly={true}
        ref='hiddenInputRef'
        class={this.ns.e('hidden-input')}
        onKeyup={this.handleKeyUp}
      />
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
          this.c.editorParams.type === 'round' && this.ns.m('round'),
        ]}
        style={{ ...this.cssVars, ...this.semanticStyle('editor.root') }}
      >
        {this.showFormDefaultContent && formDefaultContent}
        {this.readonly ? readonlyContent : editContent}
        {this.readonly ? null : hiddenInput}
      </div>
    );
  },
});

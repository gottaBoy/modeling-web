import {
  h,
  ref,
  Ref,
  watch,
  computed,
  nextTick,
  onMounted,
  defineComponent,
  resolveComponent,
} from 'vue';
import {
  renderString,
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  usePopoverzIndex,
  getDataPickerProps,
} from '@ibiz-template/vue3-util';
import { isNil, clone } from 'ramda';
import { IAppDEUIActionGroupDetail } from '@ibiz/model-core';
import { showTitle } from '@ibiz-template/core';
import { PickerEditorController } from '../picker-editor.controller';
import './ibiz-picker-dropdown.scss';

/**
 * 数据选择（下拉）
 *
 * @description 使用el-select组件封装，用于选择单项数据，仅以下拉列表的方式呈现选择数据。支持编辑器类型包含：`数据选择（下拉）`
 * @primary
 * @editorparams {"name":"overflowmode","parameterType":"'auto' | 'ellipsis'","defaultvalue":"'auto'","description":"用于控制该编辑器下拉区域的宽度显示方式。当参数值为 'auto' 时，下拉区域宽度会根据内容自动展开；当参数值为 'ellipsis' 时，下拉区域宽度将与输入框保持一致，若内容超出宽度则会显示省略号，鼠标悬浮在内容上时会出现 tooltip 提示信息"}
 * @editorparams {"name":"valuetype","parameterType":"string","description":"编辑器的值类型"}
 * @editorparams {"name":"objectidfield","parameterType":"string","description":"值类型为OBJECT时的对象标识属性"}
 * @editorparams {"name":"objectnamefield","parameterType":"string","description":"值类型为OBJECT时的对象名称属性"}
 * @editorparams {"name":"objectvaluefield","parameterType":"string","description":"值类型为OBJECT时的对象值属性"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops overflowMode
 */
export const IBizPickerDropDown = defineComponent({
  name: 'IBizPickerDropDown',
  props: getDataPickerProps<PickerEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('picker-dropdown');

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.input'),
        selector: '.el-input__inner',
      },
      {
        class: semanticClass('editor.suffix'),
        selector: '.el-input__suffix',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.input'),
        selector: '.el-input__inner',
      },
      {
        style: semanticStyle('editor.suffix'),
        selector: '.el-input__suffix',
      },
    ];

    // 当前值
    const curValue: Ref<string | null> = ref('');

    // 实体数据集
    const items: Ref<IData[]> = ref([]);

    // 是否能请求
    const shouldLoad = ref(false);

    // 获取关联数据项值
    const refValue = ref('');

    // 是否编辑态
    const isEditable = ref(false);

    // 编辑器Ref
    const editorRef = ref();

    // 加载中
    const loading: Ref<boolean> = ref(false);

    // 在搜索中时，再次触发搜索记录搜索值，等待上次搜索触发完成后再次搜索
    let waitQuery: string | null = null;

    // 是否已加载过
    const isLoaded = ref(false);

    // 隐藏的input框，用来替代下拉搜索框在浏览器焦点管理系统中的目标元素，用于触发enter键的keyup事件
    const hiddenInputRef = ref();

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

    const resetCurValue = () => {
      const { value } = props;
      if (c.model.valueType === 'OBJECT') {
        curValue.value =
          value && c.objectNameField ? (value as IData)[c.objectNameField] : '';
      } else {
        curValue.value = (value as string) || '';
      }
      const valueItem = props.data[c.valueItem];
      refValue.value = valueItem || curValue.value;
      const index = items.value.findIndex((item: IData) =>
        Object.is(item[c.keyName], valueItem),
      );
      if (index !== -1) return;
      // items里匹配不到当前值项值时，生成自身的选项
      items.value = [];
      if (!isNil(props.value) && !isNil(valueItem)) {
        items.value.push({ [c.textName]: props.value, [c.keyName]: valueItem });
      }
    };

    watch(
      () => props.value,
      () => {
        resetCurValue();
      },
      { immediate: true },
    );

    // 自动聚焦
    watch(editorRef, newVal => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });

    // 搜索
    const onSearch = async (query: string) => {
      // 失焦那次不用发请求
      if (!shouldLoad.value) {
        return;
      }
      if (c.model.appDataEntityId && loading.value === false) {
        loading.value = true;
        try {
          let trimQuery = '';
          if (query !== props.value) {
            trimQuery = query.trim();
          }
          const res = await c.getServiceData(trimQuery, props.data!);
          if (res) {
            items.value = res.data as IData[];
          }
        } finally {
          loading.value = false;
          isLoaded.value = true;
          if (waitQuery != null) {
            const selfQuery = waitQuery;
            waitQuery = null;
            await onSearch(selfQuery);
          }
        }
      } else {
        waitQuery = query;
      }
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

    // 往外抛值
    const onACSelect = async (data: IData) => {
      // 处理回填数据
      const dataItems = await c.calcFillDataItems(data);
      if (dataItems.length) {
        dataItems.forEach(dataItem => {
          emit('change', dataItem.value, dataItem.id);
        });
      }

      // 处理值项和本身的值
      const item: IData = clone(data);
      Object.assign(item, {
        [c.keyName]: item[c.keyName] ? item[c.keyName] : item.srfkey,
        [c.textName]: item[c.textName] ? item[c.textName] : item.srfmajortext,
      });
      if (c.valueItem) {
        emit('change', item[c.keyName], c.valueItem);
      }
      if (c.model.valueType === 'OBJECT') {
        emit('change', c.handleObjectParams(item));
      } else {
        emit('change', data[c.textName]);
      }
      setEditable(false);
    };

    // 值变更
    const onSelect = (select: string | Array<string>) => {
      shouldLoad.value = false;
      setEditable(false);
      // 回车选中空白
      if (select === 'empty') {
        resetCurValue();
        return;
      }
      // 回车选中行为项，手动触发
      const actionItem = c.actionDetails.find(
        (detail: IAppDEUIActionGroupDetail) => detail.id === select,
      );
      if (actionItem) {
        c.onActionClick(actionItem, props.data);
        resetCurValue();
        return;
      }
      const index = items.value.findIndex(item =>
        Object.is(item[c.keyName], select),
      );
      if (index >= 0) {
        onACSelect(items.value[index]);
      }
    };

    // 下拉打开
    const onOpenChange = (isOpen: boolean) => {
      if (isOpen) {
        items.value = [];
        onSearch('');
      } else {
        // 处于搜索表单时，但下拉框消失，更改浏览器当前焦点元素，避免按下enter搜索时select弹出下拉框
        const isSearchForm =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (c.parent as any)?.form?.model?.controlType === 'SEARCHFORM';
        if (isSearchForm) {
          nextTick(() => {
            hiddenInputRef.value?.focus();
          });
        }
      }
    };

    // 清除
    const onClear = () => {
      // 清空回填数据
      const dataItems = c.dataItems;
      if (dataItems?.length) {
        dataItems.forEach(dataItem => {
          emit('change', null, dataItem.id);
        });
      }
      if (c.valueItem) {
        emit('change', null, c.valueItem);
      }
      emit('change', null);
    };

    // 聚焦
    const onFocus = (e: IData) => {
      shouldLoad.value = true;
      emit('focus', e);
      setEditable(true);
    };

    // 失焦
    const onBlur = (e: IData) => {
      shouldLoad.value = false;
      emit('blur', e);
      setEditable(false);
    };

    // 处理点击键盘
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    // 点击
    const onClick = () => {
      shouldLoad.value = true;
    };

    const valueText = computed(() => {
      return renderString(curValue.value);
    });

    // 设置层级
    const { popoverid, setPopoverZIndex } = usePopoverzIndex();

    watch(
      valueText,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('infoTextChange', newVal);
        }
      },
      { immediate: true },
    );

    onMounted(() => {
      watch(
        () => props.data[c.valueItem],
        async (newVal, oldVal) => {
          // 值项发生变化选中值项对应文本值
          if (newVal !== oldVal) {
            // 当只配置值项时，值项有值但文本没值需加载数据回显
            if (!isLoaded.value && isNil(props.value) && !isNil(newVal)) {
              shouldLoad.value = true;
              await onSearch('');
              shouldLoad.value = false;
            }
            const curItem = items.value.find((item: IData) =>
              Object.is(item[c.keyName], newVal),
            );
            if (curItem) {
              curValue.value = curItem[c.textName];
              if (isNil(props.value) && !isNil(newVal)) {
                emit('change', curValue.value, c.model.id, true);
              }
            }
            refValue.value = newVal;
            // 如果值项被清空了，主文本也需清空
            if (newVal === null) {
              emit('change', null, c.model.id, true);
            }
          }
        },
        { immediate: true, deep: true },
      );
      setPopoverZIndex(`--${ns.namespace}-picker-dropdown-transfer-zindex`);
    });

    const renderActionItem = (detail: IAppDEUIActionGroupDetail) => {
      if (!c.groupActionState[detail.id!].visible) return;
      const semanticParams = {
        item: detail,
        state: c.groupActionState[detail.id!],
      };
      return (
        <el-option
          value={detail.id}
          title={showTitle(detail.tooltip)}
          disabled={c.groupActionState[detail.id!].disabled}
          class={[
            ns.be('popper', 'action'),
            semanticClass('editor.popup.action', { semanticParams }),
          ]}
          style={semanticStyle('editor.popup.action', { semanticParams })}
        >
          <div class={ns.e('action-item')}>
            {detail.showIcon && detail.sysImage && (
              <iBizIcon
                icon={detail.sysImage}
                class={[
                  ns.em('action-item', 'icon'),
                  semanticClass('editor.popup.action.icon', semanticParams),
                ]}
                style={semanticStyle(
                  'editor.popup.action.icon',
                  semanticParams,
                )}
              ></iBizIcon>
            )}
            <span
              class={[
                ns.em('action-item', 'caption'),
                ns.em('action-item', 'label'),
                semanticClass('editor.popup.action.label', semanticParams),
              ]}
              style={semanticStyle('editor.popup.action.label', semanticParams)}
            >
              {detail.showCaption ? detail.caption : ''}
            </span>
          </div>
        </el-option>
      );
    };

    const renderGroupAction = () => {
      const actionDetails = c.actionDetails;
      if (!actionDetails.length || !c.groupActionState.visible) return;
      return actionDetails.map((item: IAppDEUIActionGroupDetail) => {
        return renderActionItem(item);
      });
    };

    const renderEmpty = () => {
      if (items.value.length) return;
      return (
        <el-option
          value='empty'
          style={semanticStyle('editor.popup.empty')}
          class={[ns.be('popper', 'item'), semanticClass('editor.popup.empty')]}
        >
          <iBizNoData
            class={ns.e('empty')}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          ></iBizNoData>
        </el-option>
      );
    };

    return {
      ns,
      c,
      items,
      loading,
      refValue,
      curValue,
      valueText,
      editorRef,
      popoverid,
      childClass,
      childStyle,
      isEditable,
      semanticClass,
      semanticStyle,
      hiddenInputRef,
      showFormDefaultContent,
      onBlur,
      onClick,
      onClear,
      onFocus,
      onSelect,
      onSearch,
      handleKeyUp,
      setEditable,
      renderEmpty,
      onOpenChange,
      renderGroupAction,
    };
  },
  render() {
    const overflowMode =
      this.c.editorParams.overflowMode ||
      this.c.editorParams.overflowmode ||
      ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === 'ellipsis';

    // 编辑态内容
    const editContent = this.readonly ? (
      this.value
    ) : (
      <el-select
        ref='editorRef'
        class={[
          this.ns.b('select'),
          this.ns.e('content'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
        v-model={this.refValue}
        filterable
        remote
        remote-show-suffix={this.c.model.showTrigger}
        clearable
        popper-class={[
          this.popoverid,
          this.ns.b('popper'),
          this.ns.e('transfer'),
          this.ns.is('empty', !this.items.length),
          this.semanticClass('editor.popup'),
        ]}
        popper-style={this.semanticStyle('editor.popup')}
        loading={this.loading}
        placeholder={this.c.placeHolder ? this.c.placeHolder : ' '}
        remote-method={this.onSearch}
        onVisibleChange={this.onOpenChange}
        onChange={this.onSelect}
        onClear={this.onClear}
        disabled={this.disabled}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyup={this.handleKeyUp}
        onClick={this.onClick}
        fit-input-width={isEllipsis}
        {...this.$attrs}
      >
        {this.items.map(item => {
          return (
            <el-option
              title={showTitle(isEllipsis ? item[this.c.textName] : '')}
              value={item[this.c.keyName]}
              key={item[this.c.keyName]}
              label={item[this.c.textName]}
              class={[
                this.ns.be('popper', 'item'),
                this.semanticClass('editor.popup.item', { item }),
              ]}
              style={this.semanticStyle('editor.popup.item', { item })}
            >
              {{
                default: () => {
                  if (this.c.acItemProvider) {
                    const component = resolveComponent(
                      this.c.acItemProvider.component,
                    );
                    return h(component, {
                      item,
                      controller: this.c,
                    });
                  }
                  const panel = this.c.deACMode?.itemLayoutPanel;
                  if (panel) {
                    return (
                      <iBizControlShell
                        data={item}
                        modelData={panel}
                        context={this.c.context}
                        params={this.c.params}
                      ></iBizControlShell>
                    );
                  }
                  return (
                    <span>
                      {item[this.c.textName] != null
                        ? item[this.c.textName]
                        : ''}
                    </span>
                  );
                },
              }}
            </el-option>
          );
        })}
        {this.renderEmpty()}
        {this.renderGroupAction()}
      </el-select>
    );

    // 只读态内容
    const readonlyContent = (
      <div
        class={[
          this.ns.b(),
          this.ns.m('readonly'),
          this.ns.e('content'),
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
          this.ns.e('content'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
      >
        {this.curValue ? (
          this.valueText
        ) : (
          <iBizEditorEmptyText
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
        ]}
        style={this.semanticStyle('editor.root')}
        v-child-class={this.childClass}
        v-child-style={this.childStyle}
      >
        {this.showFormDefaultContent && formDefaultContent}
        {this.readonly ? readonlyContent : editContent}
        {this.readonly ? null : hiddenInput}
      </div>
    );
  },
});

import {
  h,
  Ref,
  ref,
  watch,
  computed,
  resolveComponent,
  defineComponent,
} from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  getAutoCompleteProps,
} from '@ibiz-template/vue3-util';
import { debounce } from 'lodash-es';
import { showTitle } from '@ibiz-template/core';
import {
  IUIActionGroupDetail,
  IAppDEUIActionGroupDetail,
} from '@ibiz/model-core';
import { AutoCompleteEditorController } from '../autocomplete-editor.controller';
import './ibiz-autocomplete.scss';

/**
 * 自动填充
 *
 * @description 使用el-autocomplete组件封装，可选择单项数据，支持AC。支持编辑器类型包含：`自动填充`
 * @primary
 * @editorparams {"name":"overflowmode","parameterType":"'auto' | 'ellipsis'","defaultvalue":"'auto'","description":"用于控制该编辑器下拉区域的宽度显示方式。当参数值为 'auto' 时，下拉区域宽度会根据内容自动展开；当参数值为 'ellipsis' 时，下拉区域宽度将与输入框保持一致，若内容超出宽度则会显示省略号，鼠标悬浮在内容上时会出现 tooltip 提示信息"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops overflowMode
 * @ignoreemits infoTextChange
 */
export const IBizAutoComplete = defineComponent({
  name: 'IBizAutoComplete',
  props: getAutoCompleteProps<AutoCompleteEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('autocomplete');

    const c = props.controller!;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const editorType = c.model.editorType;
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
    const curValue: Ref<string[] | string | null> = ref('');

    // 实体数据集
    const items: Ref<IData[]> = ref([]);

    // 是否显示所有数据
    const isShowAll = ref(true);

    // 是否编辑态
    const isEditable = ref(false);

    // 编辑器Ref
    const editorRef = ref();

    // 是否搜索过
    const isSearched = ref(false);

    const isReverse = ref(false);

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

    // 获取实体数据后，需要判断一次当前值是否在返回数据中
    watch(items, (newVal, oldVal) => {
      if (oldVal.length === 0 && newVal.length > 0) {
        const index = newVal.findIndex((item: IData) =>
          Object.is(item[c.keyName], props.value),
        );
        if (index !== -1) {
          curValue.value = newVal[index][c.textName];
        }
      }
    });

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    // 搜索
    const onSearch = async (query: string, cb?: (_items: IData[]) => void) => {
      if (c.model.appDataEntityId) {
        const trimQuery = query.trim();
        const res = await c.getServiceData(trimQuery, props.data);
        if (res) {
          items.value = res.data as IData[];
          isSearched.value = true;
          if (cb && cb instanceof Function) {
            if (items.value.length) {
              cb([...items.value, ...c.actionDetails]);
            } else {
              const empty = {
                srftype: 'empty',
              };
              cb([empty, ...c.actionDetails]);
            }
          }
        }
      }
    };

    watch(
      () => props.value,
      async (newVal, oldVal) => {
        if (newVal || newVal === null) {
          // 应对表单项更新等值从无到有、并且没搜索过的情况
          if (!isSearched.value && oldVal === undefined) {
            await onSearch('');
          }
          if (newVal === null) {
            curValue.value = '';
          }
          const index = items.value.findIndex((item: IData) =>
            Object.is(item[c.keyName], newVal),
          );
          if (index !== -1) {
            curValue.value = items.value[index][c.textName];
          } else {
            curValue.value = newVal as string;
            if (newVal === null) {
              curValue.value = '';
            }
          }
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

    // 处理选中数据后的处理逻辑
    const handleDataSelect = async (data: IData) => {
      // 处理回填数据
      const dataItems = await c.calcFillDataItems(data);
      if (dataItems.length) {
        dataItems.forEach(dataItem => {
          emit('change', dataItem.value, dataItem.id);
        });
      }

      // 处理本身的值
      emit('change', data[c.keyName]);
    };

    const resetValue = () => {
      if (!items.value.length) {
        onSearch('');
      } else {
        const index = items.value.findIndex((item: IData) =>
          Object.is(item[c.keyName], props.value),
        );
        if (index !== -1) {
          curValue.value = items.value[index][c.textName];
        }
      }
    };

    // 往外抛值
    const onACSelect = async (item: IData) => {
      isShowAll.value = true;
      setEditable(false);
      // 回车选中空白
      if (item.srftype === 'empty') {
        resetValue();
        return;
      }
      // 回车选中行为项，手动触发
      if (item.detailType === 'DEUIACTION') {
        c.onActionClick(item as IUIActionGroupDetail, props.data);
        resetValue();
      } else {
        await handleDataSelect(item);
      }
    };

    // 清除
    const onClear = () => {
      // 清空回填数据
      const dataItems = c.dataItems;
      if (dataItems.length > 0) {
        dataItems.forEach(dataItem => {
          emit('change', null, dataItem.id);
        });
      }
      emit('change', null);
    };

    // 聚焦
    const onFocus = (e: IData) => {
      isReverse.value = true;
      // 自动填充时聚焦时手动loading，防止闪烁
      editorRef.value.loading = true;
      emit('focus', e);
      setEditable(true);
    };

    // 失焦
    const onBlur = (e: IData) => {
      isReverse.value = false;
      emit('blur', e);
      setEditable(false);
    };

    // 输入框focus时是否显示建议
    const triggerOnFocus = computed(() => {
      return !Object.is('AC_NOBUTTON', editorType);
    });

    // 是否可以清空
    const autoCompleteClearable = computed(() => {
      return !(
        Object.is('AC_NOBUTTON', editorType) ||
        Object.is('AC_FS_NOBUTTON', editorType)
      );
    });

    let isDebounce = false;
    let blurCacheValue: string | undefined;
    // 防抖值变更回调
    const debounceChange = debounce(
      (val: string | number) => {
        // 拦截掉blur触发后change
        if (blurCacheValue !== val) {
          emit('change', val);
        }
        blurCacheValue = undefined;
        isDebounce = false;
      },
      300,
      { leading: true },
    );
    // 输入完成后抛值
    const handleInput = (val: string | number) => {
      if (editorType !== 'AC_FS' && editorType !== 'AC_FS_NOBUTTON') {
        isDebounce = true;
        debounceChange(val);
      }
    };

    // 处理点击键盘
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    const renderActionItem = (detail: IAppDEUIActionGroupDetail) => {
      if (!c.groupActionState[detail.id!].visible) return;
      const semanticParams = {
        item: detail,
        state: c.groupActionState[detail.id!],
      };
      return (
        <div
          class={[
            ns.e('action-item'),
            ns.be('popper', 'action'),
            semanticClass('editor.popup.action', semanticParams),
            ns.is('disabled', c.groupActionState[detail.id!].disabled),
          ]}
          style={semanticStyle('editor.popup.action', semanticParams)}
          onClick={event => c.onActionClick(detail, props.data, event)}
          title={showTitle(detail.tooltip)}
        >
          {detail.showIcon && detail.sysImage && (
            <iBizIcon
              icon={detail.sysImage}
              class={[
                ns.em('action-item', 'icon'),
                semanticClass('editor.popup.action.icon', semanticParams),
              ]}
              style={semanticStyle('editor.popup.action.icon', semanticParams)}
            ></iBizIcon>
          )}
          <span
            class={[
              ns.em('action-item', 'label'),
              ns.em('action-item', 'caption'),
              semanticClass('editor.popup.action.label', semanticParams),
            ]}
            style={semanticStyle('editor.popup.action.label', semanticParams)}
          >
            {detail.showCaption ? detail.caption : ''}
          </span>
        </div>
      );
    };

    const renderEmpty = () => {
      return (
        <iBizNoData
          style={semanticStyle('editor.popup.empty')}
          class={[
            ns.e('empty'),
            ns.be('popper', 'item'),
            semanticClass('editor.popup.empty'),
          ]}
          onClick={(event: MouseEvent) => event.stopPropagation()}
        ></iBizNoData>
      );
    };

    return {
      c,
      ns,
      items,
      curValue,
      isReverse,
      editorRef,
      isDebounce,
      isEditable,
      childClass,
      childStyle,
      semanticClass,
      semanticStyle,
      triggerOnFocus,
      autoCompleteClearable,
      showFormDefaultContent,
      onBlur,
      onClear,
      onFocus,
      onSearch,
      onACSelect,
      setEditable,
      handleInput,
      handleKeyUp,
      renderEmpty,
      renderActionItem,
    };
  },
  render() {
    const overflowMode =
      this.c.editorParams.overflowMode ||
      this.c.editorParams.overflowmode ||
      ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === 'ellipsis';
    const panel = this.c.deACMode?.itemLayoutPanel;
    const { context, params } = this.c;

    // 编辑态内容
    const editContent = (
      <el-autocomplete
        class={[
          this.ns.b('input'),
          this.ns.e('content'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
        ref='editorRef'
        v-model={this.curValue}
        value-key={this.c.textName}
        placeholder={this.c.placeHolder}
        placement='bottom'
        clearable={this.autoCompleteClearable}
        popper-class={[
          this.ns.b('popper'),
          this.ns.e('transfer'),
          this.ns.is('empty', !this.items.length),
          this.semanticClass('editor.popup'),
        ]}
        popper-style={this.semanticStyle('editor.popup')}
        teleported={!this.showFormDefaultContent}
        fetch-suggestions={this.onSearch}
        onClear={this.onClear}
        disabled={this.disabled || this.readonly}
        onSelect={this.onACSelect}
        onInput={this.handleInput}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyup={this.handleKeyUp}
        fit-input-width={isEllipsis}
        {...this.$attrs}
      >
        {{
          default: ({ item }: { item: IData }) => {
            if (item.srftype === 'empty') return this.renderEmpty();
            if (item.detailType === 'DEUIACTION')
              return this.renderActionItem(item as IAppDEUIActionGroupDetail);
            if (this.c.acItemProvider) {
              const component = resolveComponent(
                this.c.acItemProvider.component,
              );
              return h(component, {
                item,
                controller: this.c,
              });
            }
            const className = [
              this.ns.is('ellipsis', isEllipsis),
              this.ns.e('transfer-item'),
              this.ns.be('popper', 'item'),
              this.semanticClass('editor.popup.item', { item }),
            ];
            if (panel) {
              return (
                <iBizControlShell
                  data={item}
                  class={className}
                  modelData={panel}
                  context={context}
                  params={params}
                  onClick={() => {
                    this.onACSelect(item);
                  }}
                  style={this.semanticStyle('editor.popup.item', { item })}
                ></iBizControlShell>
              );
            }
            return (
              <div
                class={className}
                title={showTitle(isEllipsis ? item[this.c.textName] : '')}
                style={this.semanticStyle('editor.popup.item', { item })}
              >
                {item[this.c.textName]}
              </div>
            );
          },
          suffix: () => {
            if (this.controller.model.showTrigger) return;
            <ion-icon
              name='chevron-down-outline'
              class={[
                this.ns.e('suffix'),
                this.ns.is('reverse', this.isReverse),
              ]}
            ></ion-icon>;
          },
        }}
      </el-autocomplete>
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
        {this.curValue}
      </div>
    );

    // 表单默认内容
    const formDefaultContent = (
      <div
        class={[
          this.ns.e('content'),
          this.ns.b('form-default-content'),
          this.semanticClass('editor.content'),
        ]}
        style={this.semanticStyle('editor.content')}
      >
        {this.curValue ? (
          this.curValue
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
        style={this.semanticStyle('editor.root')}
        v-child-class={this.childClass}
        v-child-style={this.childStyle}
      >
        {this.showFormDefaultContent && formDefaultContent}
        {this.readonly ? readonlyContent : editContent}
      </div>
    );
  },
});

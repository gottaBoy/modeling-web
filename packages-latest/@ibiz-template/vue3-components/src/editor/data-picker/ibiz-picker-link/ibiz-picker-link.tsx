import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import {
  renderString,
  useNamespace,
  getEditorEmits,
  useFocusAndBlur,
  useSemanticNode,
  useAutoFocusBlur,
  getDataPickerProps,
} from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { isNil } from 'ramda';
import { PickerEditorController } from '../picker-editor.controller';
import './ibiz-picker-link.scss';

/**
 * 数据链接
 *
 * @description 提供数据链接功能，支持打开数据链接视图。支持编辑器类型包含：`数据链接`
 * @primary
 * @editorparams {"name":"overflowmode","parameterType":"'auto' | 'ellipsis'","defaultvalue":"'auto'","description":"数据链接换行模式。当参数为 'auto' 时，若内容超出宽度则会换行显示；当参数为 'ellipsis' 时，若内容超出宽度则会显示省略号"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter
 */
export const IBizPickerLink = defineComponent({
  name: 'IBizPickerLink',
  props: getDataPickerProps<PickerEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('picker-link');

    const c = props.controller!;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const curValue: Ref<string> = ref('');

    // 实体数据集
    const items: Ref<IData[]> = ref([]);

    // 是否已加载过
    const isLoaded = ref(false);

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    const onSearch = async (query: string) => {
      if (c.model.appDataEntityId) {
        let trimQuery = '';
        if (query !== props.value) {
          trimQuery = query.trim();
        }
        const res = await c.getServiceData(trimQuery, props.data);
        if (res) {
          isLoaded.value = true;
          items.value = res.data as IData[];
        }
      }
    };

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
      newVal => {
        if (c.model.valueType === 'OBJECT') {
          curValue.value =
            newVal && c.objectNameField
              ? (newVal as IData)[c.objectNameField]
              : '';
        } else {
          curValue.value = (newVal as string) || '';
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
            // 没有加载过先加载数据
            if (!isLoaded.value && isNil(props.value) && !isNil(newVal)) {
              await onSearch('');
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
            // 如果值项被清空了，主文本也需清空
            if (newVal === null) {
              emit('change', null, c.model.id, true);
            }
          }
        },
        { immediate: true },
      );
    });

    // 处理视图关闭，往外抛值
    const handleOpenViewClose = (data: IData) => {
      // 处理值项和本身的值
      const item: IData = {};
      Object.assign(item, data);
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
      useInValueChange();
    };

    // 打开数据链接视图
    const openLinkView = async () => {
      const res = await c.openLinkView(props.data!);
      if (res && res.ok && res.data && res.data.length) {
        handleOpenViewClose(res.data[0]);
      }
    };

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    const valueText = computed(() => {
      return renderString(curValue.value);
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

    return {
      ns,
      curValue,
      editorRef,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      openLinkView,
    };
  },
  render() {
    const isEmpty = this.curValue == null || this.curValue === '';
    const isEllipsis =
      this.controller.editorParams?.overflowMode === 'ellipsis' ||
      this.controller.editorParams?.overflowmode === 'ellipsis';
    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
          this.ns.is('empty', isEmpty),
          this.ns.is('ellipsis', isEllipsis),
        ]}
        style={this.semanticStyle('editor.root')}
        ref='editorRef'
        title={showTitle(isEmpty ? '' : this.curValue)}
      >
        <a
          class={[this.ns.e('content'), this.semanticClass('editor.content')]}
          style={this.semanticStyle('editor.content')}
          onClick={() => {
            if (isEmpty) return;
            this.openLinkView();
          }}
        >
          {isEmpty ? (
            <iBizEditorEmptyText
              showPlaceholder={this.controller.emptyShowPlaceholder}
              placeHolder={this.controller.placeHolder}
            />
          ) : (
            this.curValue
          )}
        </a>
      </div>
    );
  },
});

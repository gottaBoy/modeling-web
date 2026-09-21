import { Ref, computed, defineComponent, ref, watch } from 'vue';
import {
  getEditorEmits,
  getInputProps,
  useNamespace,
} from '@ibiz-template/vue3-util';
import { isNilOrEmpty } from 'qx-util';
import {
  IFilterNode,
  ISearchCondEx,
  calcSearchCondExs,
  getOriginFilterNodes,
  SearchCondEx2filterNode,
  IOverlayPopoverContainer,
} from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import { SearchCondEditEditorController } from './ibiz-searchcond-edit.controller';
import './ibiz-searchcond-edit.scss';

/**
 * 搜索条件编辑
 *
 * @description 使用el-input组件封装，用于搜素条件编辑，适用于条件组合搜索。支持编辑器样式为`搜索条件编辑`，基于`数据选择`编辑器进行扩展
 * @primary
 * @ignoreprops overflowMode
 * @ignoreemits infoTextChange
 */
export const IBizSearchCondEdit = defineComponent({
  name: 'IBizSearchCondEdit',
  props: getInputProps<SearchCondEditEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('searchcond-edit');

    const c = props.controller;

    // 文本框值
    const currentVal = ref<null | string>(null);

    // 是否编辑态
    const isEditable = ref(false);

    // 编辑器Ref
    const editorRef = ref();

    // 过滤项树节点数据集合
    const filterNodes: Ref<IFilterNode[]> = ref([]);

    // 过滤按钮ref
    const filterButtonRef = ref();

    // 弹窗
    let popover: IOverlayPopoverContainer | undefined;

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
          if (newVal == null) {
            currentVal.value = '';
            filterNodes.value = getOriginFilterNodes();
          } else if (typeof newVal === 'string') {
            currentVal.value = newVal;
            // 有值回显出filterNodes
            if (newVal) {
              try {
                const searchconds = JSON.parse(newVal);
                filterNodes.value = searchconds.map((item: IData) =>
                  SearchCondEx2filterNode(item as ISearchCondEx),
                );
              } catch (error) {
                ibiz.log.error(`${newVal}值格式不正确，必须为json字符串`);
              }
            }
          }
        }
      },
      { immediate: true },
    );

    // 重置filterNodes
    const resetFilter = () => {
      filterNodes.value = getOriginFilterNodes();
    };
    resetFilter();

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    const handleChange = (e: number | null) => {
      emit('change', e);
    };

    watch(editorRef, newVal => {
      if (props.autoFocus && newVal) {
        const input = newVal.$el.getElementsByTagName('input')[0];
        input.focus();
      }
    });

    // 聚焦
    const onFocus = (e: IData) => {
      emit('focus', e);
      setEditable(true);
    };

    // 失焦
    const onBlur = (e: IData) => {
      emit('blur', e);
      setEditable(false);
    };

    // 键盘输入
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    // 根据当前filterNodes计算出文本框的值
    const getCurrentValByFilterNodes = () => {
      const searchconds = calcSearchCondExs(filterNodes.value);
      if (searchconds) {
        currentVal.value = JSON.stringify(searchconds, null, 2);
      }
    };

    // 确认
    const onConfirm = () => {
      getCurrentValByFilterNodes();
      if (popover) {
        popover.dismiss();
      }
      emit('change', currentVal.value);
    };

    // 取消
    const onCancel = () => {
      resetFilter();
      getCurrentValByFilterNodes();
      emit('change', '');
    };

    // 显示过滤项
    const showFilter = async () => {
      popover = ibiz.overlay.createPopover(
        () => {
          return (
            <iBizFilterTreeControl
              filterControllers={c.filterControllers}
              filterNodes={filterNodes.value}
              parent='searchcond-edit'
              onConfirm={() => {
                onConfirm();
              }}
              onCancel={() => {
                onCancel();
              }}
            ></iBizFilterTreeControl>
          );
        },
        undefined,
        { placement: 'bottom-end', autoClose: true },
      );
      popover.present(filterButtonRef.value.$el as HTMLElement);
      await popover.onWillDismiss();
      popover = undefined;
    };

    const triggerFilter = () => {
      if (popover) {
        popover.dismiss();
      } else {
        showFilter();
      }
    };

    return {
      ns,
      c,
      currentVal,
      handleChange,
      onFocus,
      onBlur,
      editorRef,
      handleKeyUp,
      isEditable,
      setEditable,
      showFormDefaultContent,
      filterNodes,
      triggerFilter,
      filterButtonRef,
      resetFilter,
    };
  },
  render() {
    let content = null;
    if (this.readonly) {
      // 只读显示
      content = isNilOrEmpty(this.currentVal) ? '' : `${this.currentVal}`;
    } else {
      // 编辑态显示
      content = [
        <el-input
          ref='editorRef'
          class={[this.ns.b('input')]}
          model-value={this.currentVal}
          type='textarea'
          rows={10}
          placeholder={this.c.placeHolder}
          disabled={this.disabled}
          controls={false}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyup={this.handleKeyUp}
          {...this.$attrs}
        ></el-input>,
        <el-button
          ref='filterButtonRef'
          type='primary'
          title={showTitle(ibiz.i18n.t('app.edit'))}
          class={this.ns.b('filter')}
          onClick={() => this.triggerFilter()}
        >
          <iBizIcon icon={{ cssClass: 'fa fa-edit' }}></iBizIcon>
        </el-button>,
      ];
    }

    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('editable', this.isEditable),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
      >
        {content}
      </div>
    );
  },
});
